// 文字コードが分からない場合 for Node.js

var fs = require('fs');
var Iconv = require('iconv').Iconv;
var jschardet = require('jschardet');

// 文字コードが分からないファイルを読み込む
var buf = fs.readFileSync('sample-unknown.txt');

// 文字コード判定を行う
var det = jschardet.detect(buf);
console.log(det);
// Iconvでutf-8に変換するオブジェクトを作る
var iconv = new Iconv(det.encoding, "utf-8");
var buf2 = iconv.convert(buf); // UTF-8に変換
var txt = buf2.toString('utf-8');  // バッファを文字列に変換
console.log(txt);
