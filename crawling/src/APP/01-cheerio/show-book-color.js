// モジュールの取り込み
var cheerio = require('cheerio');
var fs = require('fs');

// サンプルXMLデータを得て、cheerioに読み込ませる
var xml = fs.readFileSync("test.xml", "utf-8");
$ = cheerio.load(xml);

// 本のタイトルと色を表示
$("book").each(function(i, e) {
  // タイトルを表示
  var title = $(e).children("title").text();
  // 色を表示 ---- (※1)
  var color = $(e).find("color").text();
  console.log(title + " - " + color);
});
