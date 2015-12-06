// Yahoo!Japan天気予報RSS(cheerio利用版) for Node.js

// 対象RSS
var RSS = "http://rss.weather.yahoo.co.jp/rss/days/4410.xml";

// モジュールを読む
var client = require('cheerio-httpcli');

// RSSをダウンロード
client.fetch(RSS, {}, function(err, $, res) {
  if (err) { console.log("error"); return; }
  // 必要な項目を抽出して表示 ---------------------- (※1)
  $("item > title").each(function(idx) {
    var title = $(this).text();
    console.log(title);
  });
});
