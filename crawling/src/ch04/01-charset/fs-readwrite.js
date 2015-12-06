// ファイルの読み書き for Node.js
var fs = require('fs');

// UTF-8のファイルを読み込む
var txt = fs.readFileSync("sample-utf8.txt", "utf-8");
console.log(txt);

// ファイルをUTF-8で書き込む
fs.writeFileSync("test.txt", txt);


