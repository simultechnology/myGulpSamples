// Flickrで猫画像をダウンロード for Node.js

// モジュールの取り込み
var Flickr = require('node-flickr');
var fs = require('fs');
var request = require('request');

// APIキーを指定 以下を書き換えてください ----- (※1)
var keys = {
  api_key: 'f87065dee7e4a0db71177989e0992c76'
};
// 何の写真を検索するか ----- (※2)
var KEYWORD = "猫";
// ダウンロード先の指定
var PHOTO_DIR = __dirname + "/photo";

// Flickrオブジェクトを作成
var flickr = new Flickr(keys);

// ダウンロードフォルダを作成 ---- (※3)
if (!fs.existsSync(PHOTO_DIR)) fs.mkdirSync(PHOTO_DIR);

// 画像を検索 ----- (※4)
flickr.get("photos.search", {
  "text": encodeURIComponent(KEYWORD),
  "sort": "interestingness-desc",
  "per_page": 20,
  "license": 4 // creativecommons by
}, function (result) {
  // 各写真の詳細情報を取得する
  var photo_list = result.photos.photo;
  for (var i in photo_list) {
    var p = photo_list[i];
    // URLを生成
    var url = "https://farm" + p.farm + ".staticflickr.com/" +
      p.server + "/" + p.id + "_" + p.secret + ".jpg";
    // ファイル名を生成
    var fname = PHOTO_DIR + "/" + p.id + ".jpg";
    console.log("+ " + p.title);
    console.log("| URL:" + url);
    // 保存 ----- (※5)
    request(url).pipe(fs.createWriteStream(fname));
  }
});


