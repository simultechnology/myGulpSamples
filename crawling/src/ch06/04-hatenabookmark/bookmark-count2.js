// はてなブックマークのブックマーク数を取得

// 取得対象URLの指定
var url_list = [
  "http://www.hatena.ne.jp/",
  "https://twitter.com/",
  "http://www.amazon.co.jp/"
];
var COUNTS_API = "http://api.b.st-hatena.com/entry.counts";

// モジュールの取り込み
var request = require('request');

// リクエスト用URLの作成
var params = [];
for (var i in url_list) {
  params.push("url=" + escape(url_list[i]));
}
var url = COUNTS_API + "?" + params.join("&");

// APIから結果の取得
request(url, function(err, res, body) {
  var obj = JSON.parse(body);
  for (var key in obj) {
    console.log(key + "のブックマーク数: " + obj[key]);
  }
});

