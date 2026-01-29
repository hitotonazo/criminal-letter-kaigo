# 児童養護施設サイト（Cloudflare Pages 用）

このフォルダは **静的サイト** です。Cloudflare Pages にそのままデプロイできます。

## デプロイ（Cloudflare Pages）
- Framework preset: None
- Build command: なし
- Output directory: なし（ルート）

## 重要：施設情報の編集
`/data/site.json` を編集すると、ヘッダー/フッター等に反映されます。
- 施設名、住所、電話、アクセス、ロゴ、トップ画像 など

## 画像の追加場所
- `/assets/img/hero/` … トップの大きい画像
- `/assets/img/gallery/` … 丸写真（施設紹介）
- `/assets/img/news/` … お知らせ画像
- `/assets/img/icons/` … ロゴ等

※まずは SVG のダミーが入っています。jpg/png/webp へ差し替えOK。

## お知らせの追加
1. `/data/news.json` に項目を追加
2. `/pages/news-YYYYMMDD.html` を追加
3. `url` をそのページに合わせる

## 注意（児童施設の掲載配慮）
- 子どもが特定される写真・詳細な個人情報は掲載しない
- 体験談・事例は匿名化し、時系列や属性をぼかす
