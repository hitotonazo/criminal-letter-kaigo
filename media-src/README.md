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
