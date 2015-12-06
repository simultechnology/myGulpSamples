#!/bin/sh

# カレントディレクトリを設定
CDIR=`dirname $0`
cd $CDIR

# atom-shellを起動
/usr/local/bin/atom-shell $CDIR/kabu-chart-app/ 

