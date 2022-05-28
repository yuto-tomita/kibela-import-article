# Kibela記事をローカルにダウンロードするツール

# Usage
## このリポジトリをクローンする

```shell
$ git clone https://github.com/yuto-tomita/kibela-export-markdown.git
```

## `.env`ファイルの作成

`.env.example`をコピーし、`.env`ファイルを作成する。
`KIBELA_DOMAIN`と`ACCESS_TOKEN`に取得した内容を入力する

## `.env`に環境変数を設定する

```
KIBELA_DOMAIN=
ACCESS_TOKEN=
```

### ACCESS_TOKENの取得方法

https://person-link.kibe.la/settings/access_tokens

上記にアクセスして取得してください

### KIBELA_DOMAINの入力方法

チームで使用しているKibelaのドメインを入力してください

```
https://${YOUR_TEAM_DOMAIN}/api/v1
```

## スクリプト実行

```shell
$ node -r esbuild-register script/index.ts
```

指示に従ってKibelaの記事をダウンロードしてください