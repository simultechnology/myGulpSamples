// Amazonの書籍を調べる for Node.js

// モジュールの取り込み
var OperationHelper = require('apac').OperationHelper;

// 以下、アカウント情報を書き入れる --------- (※1)
var opHelper = new OperationHelper({
    awsId:     '**********',  // アクセスキーID
    awsSecret: '**********', // シークレットアクセスキー
    assocId:   'text2musiccom-22', // アソシエイトID
    endPoint: 'ecs.amazonaws.jp',  // 日本のendPointを指定
});

// 書籍を検索する ------------- (※2)
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
  // 結果を表示 --- (※3)
  var Items = results.ItemSearchResponse.Items;
  console.log(Items);
});

