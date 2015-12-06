// CSVファイルを読む for Node.js

var fs    = require('fs');
var CSV   = require('comma-separated-values');

// CSVデータ
var txt = "id,name,price\r\n" +
  "1001,Banana,300\r\n" +
  "1002,Apple,230\r\n";

// CSVファイルをパースする
var csv = new CSV(txt, {header:true});
var records = csv.parse();

// コンソールに出力
console.log(records);
