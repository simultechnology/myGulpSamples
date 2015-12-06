// iconv-liteの利用例 for Node.js
var iconv = require('iconv-lite');
var fs = require('fs');

// テキストをShift-JISで書き込む
var str = "拙者は忍者だ、ニンニン!!";
var fname = "iconv-lite-test-sjis.txt";
// Shift_JISに変換
var buf = iconv.encode(str, "SHIFT_JIS");
// 保存
fs.writeFileSync(fname, buf, "binary");

// Shift_JISのテキストを読み出して表示
var bin = fs.readFileSync(fname, "binary");
// Shift_JISのテキストをUTF-8に変換
var txt = iconv.decode(bin, "SHIFT_JIS");
console.log(txt);


