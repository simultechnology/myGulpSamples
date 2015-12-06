// Yahoo!天気予報のRSSからJSONファイルを出力

// RSSのアドレス ----- (※1)
var RSS = "http://rss.weather.yahoo.co.jp/rss/days/4410.xml";
var SAVE_PATH = "temperature-data.js";

// モジュールを読む
var client = require('cheerio-httpcli');
var fs = require('fs');

// RSSをダウンロード ----- (※2)
client.fetch(RSS, {}, function(err, $, res) {
  if (err) { console.log("error"); return; }
  
  // 必要な項目を抽出して表示
  var res = [];
  $("item > title").each(function(idx) {
    var title = $(this).text();
    // 正規表現で日付、最高気温、最低気温を抽出 ---- (※3)
    var tm = title.match(/(\d+日).*?(\d+)℃\/(\d+)℃/);
    if (!tm) return;
    var line  = [tm[1], parseInt(tm[2]), parseInt(tm[3])];
    res.push(line);
    console.log(line);
  });
  
  // 保存 ---- (※4)
  res.unshift(['日付','最高気温','最低気温']);
  var src = "var tempData = " + JSON.stringify(res);
  fs.writeFileSync(SAVE_PATH, src, "utf-8");
  console.log("ok!");
});


