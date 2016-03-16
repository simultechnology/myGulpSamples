// モジュールの読込
var client = require('cheerio-httpcli');
var URL = require('url');

module.exports = function (callback) {
// ダウンロード
  var url = "https://ja.wikipedia.org/wiki/" + encodeURIComponent("イヌ");
//var url = "http://en.wikipedia.org/wiki/Dog";
  var param = {};
  client.fetch(url, param, function(err, $, res) {
    if (err) { console.log(err); return; }
    // リンクを抽出して表示
    var images = [];
    $("img").each(function(idx) {
      var src = $(this).attr('src');
      src = URL.resolve(url, src);
      images.push(src);
    });
    if (typeof callback === 'function') {
      callback(images);
    }
  });
};

