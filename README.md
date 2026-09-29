# apricot personal labo

GitHub Pages 向けのシンプルなポートフォリオです。`index.html` を公開ルートに置く静的サイトなので、ビルドは不要です。

## 掲載するサイト

Tabby Paste のカードは `index.html` に常時表示しています。ほかのカードは閲覧時に GitHub の公開 API から取得し、`apricotpersonallabo` が所有する公開リポジトリのうち GitHub Pages が有効なものを表示します。

カードのリンク先には Pages API が返す公開 URL を使うため、独自ドメインにも対応します。取得できない場合は、リポジトリの `homepage` が `https://apricotpersonallabo.github.io/` で始まればその URL、そうでなければ `https://apricotpersonallabo.github.io/リポジトリ名/` を使います。

GitHub API を取得できない場合も、Tabby Paste のカードと GitHub プロフィールへのリンクを表示します。

## 言語

初回表示はブラウザーの優先言語が日本語なら日本語、それ以外なら英語です。ヘッダーの `EN` / `日本語` ボタンで切り替えられ、選択した言語はブラウザーに保存され、次回以降はその選択を優先します。サイトの文言は `script.js` の `translations` で管理しています。GitHub から取得したリポジトリ名と説明文は、元の表記のまま表示します。

## サイトマップ

`sitemap.xml` にこのサイトのトップページを掲載し、`robots.txt` から参照しています。カードのリンク先はそれぞれ別の GitHub Pages サイトなので、このサイトのサイトマップには含めません。静的ファイルのため Jekyll は不要です。

## 公開

GitHub のリポジトリ設定で Pages の公開元をルートディレクトリに設定してください。
