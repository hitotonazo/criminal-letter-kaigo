# 児童養護施設サイト（Cloudflare Pages + R2 画像配信）

このフォルダは **静的サイト + Pages Functions** で動きます。
HTML/CSS/JS は GitHub から Pages にデプロイし、**画像は R2（オブジェクトストレージ）に置いて `/media/...` 経由で配信**します。

---

## 仕組み（重要）
- 画像URLはすべて `https://<あなたのドメイン>/media/<パス>` を参照します
- `/media/*` は **Pages Functions**（`/functions/media/[...path].js`）が受け取り、R2 から読み出して返します
- R2 バケットは Pages プロジェクトに **Binding 名 `MEDIA_BUCKET`** で接続します（ダッシュボード設定 or wrangler）

---

## 1) Cloudflare 側（R2 の準備）
### A. R2 バケット作成
1. Cloudflare ダッシュボード → **R2** → **Create bucket**
2. バケット名（例: `jido-yogo-media`）を作成

### B. 画像アップロード
- 本ZIPには `media-src/` が同梱されています。
- **`media-src/` の中身（icons/ hero/ gallery/ news/）を、そのまま R2 バケットのルートにアップロード**してください。

> 例：R2 内のキー  
> `icons/logo.png`  
> `hero/hero.png`  
> `gallery/gallery1.png`  
> `news/news1.png` など

---

## 2) Cloudflare Pages に R2 をバインド（Binding）
GitHub 連携で Pages デプロイしている前提です。

1. Cloudflare ダッシュボード → **Workers & Pages** → 対象の **Pages プロジェクト**
2. **Settings** → **Bindings**（または Settings → Functions → R2 bucket bindings）へ移動
3. **Add binding** → **R2 bucket**
4. **Variable name（Binding 名）** を `MEDIA_BUCKET` にする
5. 対象の R2 バケットを選択して保存
6. 再デプロイ（通常は GitHub push で自動）

---

## 3) リポジトリ側（このZIPの中身）
### フォルダ構成（抜粋）
- `index.html` / `pages/*.html` … 静的ページ
- `assets/css/style.css` … スタイル
- `assets/js/main.js` … 表示制御（サイト情報/お知らせの読み込み等）
- `data/site.json` … 施設情報・R2参照設定
- `data/news.json` … お知らせ（画像キー含む）
- `functions/media/[...path].js` … `/media/*` → R2 から配信する関数
- `media-src/` … **R2 に最初にアップロードするダミー画像一式**

---

## 4) 画像差し替え方法（R2）
- R2 バケット内の同じキーに画像をアップロードし直すだけで差し替えできます  
  例）`hero/hero.jpg` に差し替え → `data/site.json` の `heroKey` を `hero/hero.jpg` に変更

### 画像のキー（site.json / news.json）
- `data/site.json`
  - `mediaBaseUrl`: 通常は `"/media"`
  - `logoKey`: 例 `icons/logo.png`
  - `heroKey`: 例 `hero/hero.png`
- `data/news.json`
  - `imageKey`: 例 `news/news1.png`

---

## 5) ローカルで画像も見ながら確認したい場合（任意）
R2 をまだ用意していない段階で表示確認したい場合は、`data/site.json` の `mediaBaseUrl` を一時的に下記に変更すると、リポジトリ内の画像（`assets/img`）を参照できます。

```json
{
  "mediaBaseUrl": "/assets/img"
}
```

---

## 6) キャッシュについて
`/functions/media/[...path].js` は `Cache-Control: public, max-age=31536000, immutable` を付与しています。
同じキーを頻繁に上書きして差し替える運用なら、`max-age` を短くするか、**ファイル名（キー）を変える**運用をおすすめします。

---

## 画像をR2へ「フォルダごと一括同期」する運用（PNG推奨）

このテンプレでは、ページ内の画像は `/media/<キー>` にアクセスすると、Pages Functions が R2 から読み出して返します。
そのため、**画像の追加・差し替えは R2 側だけ**でできます。

### 1) 画像を置く場所
- ローカル: `media-src/` （この中身をR2へ同期）
- R2のキー: `media-src/` の相対パスがそのままキーになります  
  例）`media-src/icons/logo.png` → R2キー `icons/logo.png`

### 2) 推奨サイズ（迷ったらこれ）
- `hero/hero.png` : **1600x720**
- `gallery/circle*.png` : **600x600**
- `news/news*.png` : **800x450**
- `icons/logo.png` : **600x180**（透過推奨）
- `icons/ig.png`, `icons/fb.png` : **128x128**（透過推奨）

### 3) 一括同期（wrangler）
`tools/` に同期スクリプトを入れています。

- Mac/Linux: `bash tools/sync-media.sh <R2_BUCKET_NAME>`
- Windows(PowerShell): `powershell -ExecutionPolicy Bypass -File tools/sync-media.ps1 -Bucket <R2_BUCKET_NAME>`

> 事前に `wrangler login` を済ませてください。

### 4) 画像を増やす
`media-src/` に PNG を追加 → 同期 → HTML/JSON側では `...Key` にキー（例: `gallery/new1.png`）を設定すればOKです。
