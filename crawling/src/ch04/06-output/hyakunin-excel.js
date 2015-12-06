// 百人一首をExcelに書き出す for Node.js

var API = "http://api.aoikujira.com/hyakunin/get.php?fmt=json";

// モジュールを取り込む
var fs = require('fs');
var officegen = require('officegen');
var xlsx = officegen('xlsx');
var request = require('request');

// 百人一首をダウンロード
request(API, function(err, res, body){
  if (err) throw err;
  var list = JSON.parse(body);
  exportToExcel(list);
  console.log(list);
});

function exportToExcel(list) {
  // 新規シートを作成
  var sheet = xlsx.makeNewSheet();
  sheet.name = "百人一首";

  // 直接データを書き換え
  sheet.data[0] = [
    "番号","上の句","下の句"
  ];
  for (var i = 0; i < list.length; i++) {
    var r = list[i];
    sheet.data[i + 1] = [r.no, r.kami, r.simo];
  }
  // ファイルを書き出す
  var strm = fs.createWriteStream('hyakunin.xlsx');
  xlsx.generate(strm);
  console.log("ok");
}
