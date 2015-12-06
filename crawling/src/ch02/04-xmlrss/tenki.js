// Yahoo!Japan天気予報RSS
var RSS = "http://rss.weather.yahoo.co.jp/rss/days/4410.xml";

// モジュールの取り込み
var parseString = require('xml2js').parseString;
var request = require('request');

// RSSをダウンロード ---- (※1)
request(RSS, function (err, response, body) {
  if (!err && response.statusCode == 200) {
    analyzeRSS(body);
  }
});

// RSSを解析する ---- (※2)
function analyzeRSS(xml) {
  // XMLをJSのオブジェクトに変換
  parseString(xml, function(err, obj) {
    if (err) { console.log(err); return; }
    // 天気を表示 ----- (※3)
    // console.log(JSON.stringify(obj)); // ----- (※4)
    var items = obj.rss.channel[0].item;
    for (var i in items) {
      var item = items[i];
      console.log(item.title[0]);
    }
  });
}

