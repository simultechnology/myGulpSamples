// CSONデータを読む for Node.js

var CSON = require('cson');
var fs = require('fs');

// CSONファイルを読み出す
var cson = fs.readFileSync('test.cson', 'utf-8');

// CSONをJSのオブジェクトにパース
var obj = CSON.parse(cson);

// 内容を出力
for (var i in obj.items) {
  var it = obj.items[i];
  console.log(it.name, it.price);
}

// JSオブジェクトをCSONに変換
var cson_out = CSON.stringify(obj);
console.log(cson_out);


