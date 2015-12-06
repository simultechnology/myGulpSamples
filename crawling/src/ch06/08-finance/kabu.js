// 為替情報を取得 for Node.js

// モジュールの取り込み
var client = require('cheerio-httpcli');

// HTMLをダウンロード
var code = '8411'; // 証券コードの指定 ----- (※1)
var url = "http://stocks.finance.yahoo.co.jp/stocks/detail/";
// ページの取得 ---- (※2)
client.fetch(url, {"code":code}, function(err, $, res) {
  if (err) { console.log(err); return; }
  // 値を取得 ---- (※3)
  var price = $("td.stoksPrice").text().replace(/\s/g, "");
  var name = $("th.symbol > h1").text();
  // 結果を表示
  console.log("+ code=" + code);
  console.log("| name=" + name);
  console.log("| price=" + price);
});


