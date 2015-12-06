// YAMLを読む for Node.js
var yaml = require('js-yaml');
var fs = require('fs');

// YAMLデータを読み込む
var txt = fs.readFileSync('test.yml', 'utf-8');

// JavaScriptのオブジェクトに変換
var obj = yaml.safeLoad(txt);

// 果物の内容を表示
for (var i in obj.items) {
  var it = obj.items[i];
  console.log(it.name, it.price);
}



