// モジュールの読込
var client = require('cheerio-httpcli');

// ダウンロード
var url = "http://www.aozora.gr.jp/index_pages/person81.html";
var param = {};
client.fetch(url, param, function(err, $, res) { //---- (※1)
  if (err) { console.log("error"); return; }
  // リンクを抽出して表示 --- (※2)
  $("a").each(function(idx) {
    var text = $(this).text();
    var href = $(this).attr('href');
    console.log(text+":"+href);
  });
});

