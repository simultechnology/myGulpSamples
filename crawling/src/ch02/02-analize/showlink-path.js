// モジュールの読込
var client = require('cheerio-httpcli');
var URL = require('url');

// URLとパラメーター
var url = "http://www.aozora.gr.jp/index_pages/person81.html";
var param = {};

// ダウンロード
client.fetch(url, param, function(err, $, res) {
  if (err) { console.log("error"); return; }
  // リンクを抽出して表示
  $("a").each(function(idx) {
    var text = $(this).text();
    var href = $(this).attr('href');
    if (!href) return;
    // 相対パスを絶対パスに直す--- (※1)
    var href2 = URL.resolve(url, href);
    // 結果を表示
    console.log(text + " : " + href);
    console.log("  => " + href2 + "\n");
  });
});

