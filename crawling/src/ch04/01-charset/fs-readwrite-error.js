// [エラー]ファイルの読み書き for Node.js
var fs = require('fs');

// ファイルを読み込む
var txt = fs.readFileSync("sample-utf8.txt");
console.log("UTF-8のオプションを指定しない時");
console.log(txt);

// ファイルをUTF-8で書き込む
fs.writeFileSync("test.txt", txt);


