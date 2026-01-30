# media-src (R2に同期する素材置き場)

このフォルダの中身を、そのまま R2 バケットのルートにアップロード/同期してください。
例: media-src/icons/logo.png → R2キー: icons/logo.png

## 推奨サイズ（迷ったらこのサイズ）
- hero/hero.png : 1600x720（トップの大画像）
- gallery/circle*.png : 600x600（丸写真）
- news/news*.png : 800x450（お知らせカード）
- icons/logo.png : 600x180（透過推奨）
- icons/ig.png, icons/fb.png : 128x128（透過推奨）

## ルール
- 形式は PNG 推奨（透過が必要なら PNG）
- 差し替えは「同じキーで上書き」でもOKですが、反映が遅い場合はファイル名を変えて data/*.json を更新すると確実です。

## 追加した画像（今回）
### トップ：年間行事（4枚）
- `events/spring.png`（推奨 800×450）
- `events/summer.png`（推奨 800×450）
- `events/autumn.png`（推奨 800×450）
- `events/winter.png`（推奨 800×450）

### 子ページ：ヘッダー画像（各1枚）
- `pages/about.png`（推奨 1600×720）
- `pages/life.png`（推奨 1600×720）
- `pages/library.png`（推奨 1600×720）
- `pages/volunteer.png`（推奨 1600×720）
- `pages/donate.png`（推奨 1600×720）

### SNSアイコン（assets側・SVG）
- `assets/img/icons/ig.svg`
- `assets/img/icons/fb.svg`
