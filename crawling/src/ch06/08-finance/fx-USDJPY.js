// 為替情報を取得 for Node.js

// モジュールの取り込み
var client = require('cheerio-httpcli');

// HTMLをダウンロード
var code = 'USDJPY'; // 通貨の指定
var url = "http://info.finance.yahoo.co.jp/fx/detail/";
// ページの取得
client.fetch(url, {"code":code}, function(err, $, res) {
  if (err) { console.log(err); return; }
  // 値を取得
  var bid = $("#USDJPY_detail_bid").text();
  var ask = $("#USDJPY_detail_ask").text();
  // 結果を表示
  console.log("Bid=" + bid);
  console.log("Ask=" + ask);
});


