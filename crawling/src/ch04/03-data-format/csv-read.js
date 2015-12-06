// CSVファイルを読む for Node.js

var fs    = require('fs');
var CSV   = require('comma-separated-values');
var Iconv = require('iconv').Iconv;

// Shift_JISをUTF-8に変換するオブジェクトを生成 --- (※1)
var iconv = new Iconv('SHIFT_JIS', 'UTF-8');
// Shift_JISに変換
var buf = fs.readFileSync("test.csv");
var txt = iconv.convert(buf).toString("utf-8");

// CSVファイルをパースする ---- (※2)
var csv = new CSV(txt, {header:false});
var records = csv.parse();

// 一行目はヘッダなので捨てる --- (※3)
records.shift();

// 結果を出力する --- (※4)
for (var i = 0; i < records.length; i++) {
  var fs = records[i];
  var name = fs[0];
  var price = fs[1];
  var memo = fs[2];
  console.log(name, price, memo);
}
