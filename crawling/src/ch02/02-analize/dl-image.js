// モジュールの読込
var client = require('cheerio-httpcli');
var request = require('request');
var fs = require('fs');
var URL = require('url');

// ダウンロード先のディレクトリを作る
var savedir = __dirname + "/img"; // --- (※1)
if (!fs.existsSync(savedir)) {    // --- (※2)
  fs.mkdirSync(savedir);          // --- (※3)
}

// HTMLファイルの指定
var url = "http://ja.wikipedia.org/wiki/イヌ";
var param = {};
// HTMLファイルの取得 --- (※4)
client.fetch(url, param, function(err, $, res) {
  if (err) { console.log("error"); return; }
  // リンクを抽出して表示 --- (※5)
  $("img").each(function(idx) {
    var src = $(this).attr('src');
    // 相対パスを絶対パスに変更 --- (※6)
    src = URL.resolve(url, src);
    // 保存用のファイル名を作成 --- (※7)
    var fname = URL.parse(src).pathname;
    fname = savedir + "/" + fname.replace(/[^a-zA-Z0-9\.]+/g, '_');
    // ダウンロード --- (※8)
    request(src).pipe(fs.createWriteStream(fname));
  });
});

