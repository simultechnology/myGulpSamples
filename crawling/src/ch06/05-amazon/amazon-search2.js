// Amazonの書籍を調べる for Node.js

// モジュールの取り込み
var OperationHelper = require('apac').OperationHelper;
var cheerio = require('cheerio');

// 以下、アカウント情報を書き入れる --------- (※1)
var opHelper = new OperationHelper({
    awsId:     '*********',  // アクセスキーID
    awsSecret: '*********', // シークレットアクセスキー
    assocId:   'text2musiccom-22', // アソシエイトID
    endPoint: 'ecs.amazonaws.jp',  // 日本のendPointを指定
});

// 書籍を検索する
opHelper.execute('ItemSearch', {
  'SearchIndex': 'Books',
  'BrowseNode': 465610, // 日本の書籍ID
  'Keywords': '宮沢賢治',
  'ResponseGroup': 'Small,OfferSummary',
  'Sort': 'salesrank',
  'MinimumPrice': 10,
  'MaximumPrice': 8000,
  'Sort': 'salesrank'
}, function(err, results, xml) {
  if (err) { console.log("error"); return; }
  // XMLを解析する ---- (※2)
  var $ = cheerio.load(xml);
  // 商品情報を抽出する ----- (※3)
  $("Items > Item").each(function(idx, item) {
    var ASIN = $(item).children("ASIN").text();
    var author = $(item).find("Author").text();
    var title = $(item).find("Title").text();
    console.log(title + " - "+ author + " : " + ASIN);
  });
});



