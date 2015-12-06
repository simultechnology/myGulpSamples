// モジュールの読込
var client = require('cheerio-httpcli');
var URL = require('url');

// ダウンロード
var url = "http://ja.wikipedia.org/wiki/イヌ";
var param = {};
client.fetch(url, param, function(err, $, res) {
  if (err) { console.log("error"); return; }
  // リンクを抽出して表示
  $("img").each(function(idx) {
    var src = $(this).attr('src');
    src = URL.resolve(url, src);
    console.log(src);
  });
});

