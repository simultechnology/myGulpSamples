// モジュールの取り込み
var cheerio = require('cheerio');
var fs = require('fs');

// ファイルをcheerioに読み込ませる
var html= fs.readFileSync("table.html", "utf-8");
$ = cheerio.load(html);

// テーブルを取得
var data = readTable("#tbl");
console.log(data);

// テーブルのセルを全部読む
function readTable(query) {
  var data = [];
  var table = $(query);
  var tr_list = $(table).children("tr");
  for (var i = 0; i < tr_list.length; i++) {
    var cells = tr_list.eq(i).children();
    var cols = [];
    for (var j = 0; j < cells.length; j++) {
      var v = cells.eq(j).text();
      cols.push(v);
    }
    data.push(cols);
  }
  return data;
}
