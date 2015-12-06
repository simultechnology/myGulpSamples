// はてなブックマークの注目のエントリーを表示 for Node.js

// 対象RSS
var RSS_URL = "http://b.hatena.ne.jp/hotentry?mode=rss";

// モジュールの読込
var client = require('cheerio-httpcli');

// ダウンロード
client.fetch(RSS_URL, {}, function(err, $, res) { //---- (※1)
  if (err) { console.log("error"); return; }
  // エントリーを抽出して表示 --- (※2)
  $("item").each(function(idx, item) {
    // タイトルと説明とブックマーク数を取得
    var title = $(this).children('title').text();
    var desc = $(this).children('description').text();
    var count = $(this).children("hatena\\:bookmarkcount").text();
    console.log("(" + count + "B!) " + title);
    console.log(desc);
    console.log("---------");
  });
});
