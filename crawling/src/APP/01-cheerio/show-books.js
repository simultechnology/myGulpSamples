// モジュールの取り込み
var cheerio = require('cheerio');
var fs = require('fs');

// サンプルXMLデータを得て、cheerioに読み込ませる
var xml = fs.readFileSync("test.xml", "utf-8");
$ = cheerio.load(xml);

// 本の情報を表示
$("book").each(function(i, e) {
  // <book>タグの子要素から値を取得 ---- (※1)
  var title = $(e).children('title').text();
  var author = $(e).children('author').text();
  console.log(title + " - " + author);
});
