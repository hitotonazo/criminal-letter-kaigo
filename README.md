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
- 本ZIPには `seed-media/` が同梱されています。
- **`seed-media/` の中身（icons/ hero/ gallery/ news/）を、そのまま R2 バケットのルートにアップロード**してください。

> 例：R2 内のキー  
> `icons/logo.svg`  
> `hero/hero.svg`  
> `gallery/gallery1.svg`  
> `news/news1.svg` など

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
- `seed-media/` … **R2 に最初にアップロードするダミー画像一式**

---

## 4) 画像差し替え方法（R2）
- R2 バケット内の同じキーに画像をアップロードし直すだけで差し替えできます  
  例）`hero/hero.jpg` に差し替え → `data/site.json` の `heroKey` を `hero/hero.jpg` に変更

### 画像のキー（site.json / news.json）
- `data/site.json`
  - `mediaBaseUrl`: 通常は `"/media"`
  - `logoKey`: 例 `icons/logo.svg`
  - `heroKey`: 例 `hero/hero.svg`
- `data/news.json`
  - `imageKey`: 例 `news/news1.svg`

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
