// モジュールの取り込み
var cheerio = require('cheerio');
var fs = require('fs');

// サンプルXMLデータを得て、cheerioに読み込ませる
var xml = fs.readFileSync("test.xml", "utf-8");
$ = cheerio.load(xml);

// 本のIDと値段を表示
$("book").each(function(i, e) {
  // ID属性を取得 --- (※1)
  var id = $(e).attr("id");
  // <price>タグのvalue属性を取得 --- (※2)
  var price = $(e).children("price").attr("value");
  console.log(id + ":" + price);
});
