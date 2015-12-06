// Shift_JISを読んでUTF-8で保存する for Node.js

var fs = require('fs');
var Iconv = require('iconv').Iconv;

// Shift_JISからUTF-8へ変換するオブジェクト
var sjis_utf8 = new Iconv('SHIFT_JIS', 'utf-8');

// Shift_JISのファイルを読み込む
var buf = fs.readFileSync('sample-sjis.txt');

var buf2 = sjis_utf8.convert(buf); // Shift_JISをUTF-8に変換
var txt = buf2.toString('utf-8');  // バッファを文字列に変換
console.log(txt);

// UTF-8でファイルへ保存
fs.writeFileSync('test.txt', txt, 'utf-8');
