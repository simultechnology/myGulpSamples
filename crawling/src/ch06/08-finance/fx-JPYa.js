// 対円の為替情報を取得 for Node.js

// モジュールの取り込み
var client = require('cheerio-httpcli');

// 基本通貨の指定
var baseCode = "JPY";
var codeList = [
  "JPY", "USD", "EUR", "AUD", "GBP",
  "NZD", "CAD", "CHF", "ZAR", "CNH"
];
// Yahoo!ファイナンスの基本URL
var baseUrl = "http://info.finance.yahoo.co.jp/fx/detail/";

// 一気にいろんな為替情報を取得
for (var i in codeList) {
  var a = codeList[i];
  if (a == baseCode) continue; // JPYJPYはスキップ
  var code = a + baseCode;
  getFX(code);
}

// ページの取得
function getFX(code) {
  client.fetch(baseUrl, {"code": code}, function(err, $, res) {
    if (err) { console.log(err); return; }
    // 値を取得
    var bid = $("#" + code + "_detail_bid").text();
    var ask = $("#" + code + "_detail_ask").text();
    // 結果を表示
    console.log("+ " + code);
    console.log("| Bid=" + bid);
    console.log("| Ask=" + ask);
    console.log("---");
  });
}

