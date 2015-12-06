// モジュールの取り込み
var fs = require('fs');

// フォルダを作成する
console.log("mkdir実行します。");
fs.mkdir("test", function () {
  console.log("フォルダ作成完了しました。");
});
console.log("mkdir実行しました。結果待ち。");
