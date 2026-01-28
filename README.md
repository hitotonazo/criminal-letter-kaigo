# 星美ケアホーム（Cloudflare Pages用・静的サイトテンプレ）

このZIPは、老人用介護施設のWebサイトを作るための **静的テンプレート** です。
Cloudflare Pages にそのままデプロイできます（ビルド不要）。

## フォルダ構成（画像は後から追加しやすい形）

- `index.html` … トップページ
- `pages/` … 下層ページ（施設紹介 / サービス / お知らせ / など）
- `assets/css/style.css` … デザイン
- `assets/js/main.js` … モバイルメニュー / お知らせ・行事の読み込み
- `assets/img/` … 画像置き場（差し替え・追加OK）
  - `hero/` … トップの大きい画像
  - `gallery/` … 施設紹介などの丸い画像
  - `news/` … お知らせのカード画像
  - `icons/` … ロゴ等
- `data/`
  - `news.json` … お知らせ一覧（カード表示）
  - `events.json` … 年間行事

## 画像を差し替える方法（超簡単）

例）トップ画像を差し替えたい場合：

1. 画像を `assets/img/hero/` に入れる（例：`hero.jpg`）
2. `index.html` のこの行を変更：
   ```html
   <img class="hero-img" src="/assets/img/hero/hero.svg" ...>
   ```
   を
   ```html
   <img class="hero-img" src="/assets/img/hero/hero.jpg" ...>
   ```

お知らせ画像も同様に `data/news.json` の `"image"` を差し替えます。

## お知らせを追加する方法

1. `data/news.json` に1行追加
2. `pages/` に記事ページ（例：`news-YYYYMMDD.html`）を追加
3. JSONの `"url"` をその記事ページに合わせる

## Cloudflare Pages へのデプロイ

### 方法A：ダッシュボード（おすすめ）
1. Cloudflare → Pages → `Create a project`
2. GitHubにこのフォルダをpushして連携
3. Framework preset：`None`
4. Build command：空欄
5. Build output directory：空欄（ルート）

### 方法B：Direct Upload
「Direct Upload」が使える場合は、ZIPを展開したフォルダをそのままアップロードします。

## 注意（必ず確認）
- 料金、職員配置基準、医療行為、加算など **制度に関わる表現は必ず事実に合わせて監修** してください。
- 現在のフォームは `mailto:` です。実運用でフォーム送信にしたい場合は、Cloudflare Pages Functions を追加できます。

---

作りたい雰囲気（色、余白、フォント、セクション構成）があれば、スクショをもう数枚もらえれば寄せて調整します。
