// INIファイルを読み込む for Node.js

var fs  = require('fs'),
    ini = require('ini');

// ここでは、INIファイルがUTF-8であると仮定して読む
var txt = fs.readFileSync('test.ini', 'utf-8');

// JSのオブジェクトに変換
var obj = ini.parse(txt);

// 内容を表示
for (var name in obj) {
  var it = obj[name];
  console.log(name, it.price, it.color);
}
