// モジュールの取り込み
var cheerio = require('cheerio');

// サンプルXMLデータ
var xml = "<books>" +
  "<book><title>リンゴの山</title><author>山田</author></book>" +
  "<book><title>ミカンの歌</title><author>佐藤</author></book>" +
  "<book><title>バナナの里</title><author>市川</author></book>" +
  "</books>";

// cheerioにXMLデータを読み込ませる ---- (※1)
$ = cheerio.load(xml);

// 本のタイトル一覧を表示 --- (※2)
$("title").each(function(i, e) {
  var title = $(e).text();
  console.log(title);
});
