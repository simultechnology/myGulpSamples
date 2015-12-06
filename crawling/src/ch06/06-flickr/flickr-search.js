// Flickrで写真検索 for Node.js

// APIキーを指定 以下を書き換えてください ----- (※1)
var keys = {
  api_key: 'f87065dee7e4a0db71177989e0992c76'
};

// Flickrオブジェクトを作成 ------- (※2)
var Flickr = require('node-flickr');
var flickr = new Flickr(keys);

// 画像を検索 --- (※3)
flickr.get("photos.search", {
  "text": "cat",
  "sort": "interestingness-desc",
  "per_page": 5
}, function (result) {
  // 写真数の情報 ----- (※4)
  var page = result.photos.page;
  var pages = result.photos.pages;
  var perpage = result.photos.perpage;
  var total = result.photos.total;
  console.log("total:", total);
  // 各写真の詳細情報を取得する
  var photo_list = result.photos.photo;
  for (var i in photo_list) {
    var p = photo_list[i];
    // URLを生成 ---- (※5)
    var url = "https://farm" + p.farm + ".staticflickr.com/" +
      p.server + "/" + p.id + "_" + p.secret + ".jpg";
    console.log(p);
    console.log("URL:" + url);
  }
});


