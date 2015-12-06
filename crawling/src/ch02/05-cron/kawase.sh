#!/bin/sh

# パスを設定
PATH=/usr/local/bin:/usr/bin:/bin
NODE_PATH=/usr/lib/node_modules

# カレントディレクトリをスクリプトのパスに変更
cd `dirname $0`
# 為替スクリプトを実行
node kawase-usd_jpy.js

