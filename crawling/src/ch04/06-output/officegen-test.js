// Excelファイルを生成するテスト for Node.js

// モジュールを取り込む
var fs = require('fs');
var officegen = require('officegen');
var xlsx = officegen('xlsx');

// 新規シートを作成
var sheet = xlsx.makeNewSheet();
sheet.name = "test";

// 直接データを書き換え
sheet.data[0] = ["商品名", "値段", "備考"];
sheet.data[1] = ["リンゴ", 340];
sheet.data[2] = ["ミカン", 980];
sheet.data[3] = ["バナナ", 280];

// セル名を指定して書き換え
sheet.setCell('C2', '新鮮');
sheet.setCell('C3', '甘い');

// ファイルを書き出す
var strm = fs.createWriteStream('test.xlsx');
xlsx.generate(strm);

