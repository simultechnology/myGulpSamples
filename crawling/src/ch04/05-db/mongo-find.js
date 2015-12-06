// 芥川龍之介の作品一覧を表示 
var mongo = require('mongodb').MongoClient;

// 接続するDBの情報
var MONGO_SERVER = 'mongodb://localhost:27017/aozora';

// MongoDBサーバーに接続
var db;
mongo.connect(MONGO_SERVER, function(err, _db) {
  if (err) { console.log(err); return; }
  db = _db;
  // コレクションを取得
  var items = db.collection('items');
  // 検索
  search1(items);
});

// 芥川の作品一覧を取得 --- (※1)
function search1(items) {
  console.log("=== (1) 芥川の作品一覧を表示 === ");
  var cond = { author: '芥川龍之介' };
  items.find(cond).toArray(function(err, docs){
    for (var i in docs) {
      var doc = docs[i];
      console.log(doc.title);
    }
    search2(items);
  });
}

// 作家ごとに作品をまとめて表示 --- (※2)
function search2(items) {
  console.log("=== (2) 作者ごとに作品をまとめて表示 ===");
  var query = {}; // 全てを指定
  var option = {
    sort: 'author' // 著者でソート
  };
  var f_auth = "";
  items.find(query, option).toArray(function(err, docs) {
    for (var i in docs) {
      var doc = docs[i];
      if (doc.author != f_auth) {
        console.log(" + " + doc.author + "の作品");
        f_auth = doc.author;
      }
      console.log(" | - " + doc.title);
    }
    search3(items);
  });
}

// 正規表現で作品を検索 --- (※3)
function search3(items) {
  console.log("=== (3) 正規表現で作品を検索 === ");
  var query = {
    title: /(蟹|猫|狐)/
  };
  items.find(query).toArray(function(err, docs) {
    for (var i in docs) {
      var doc = docs[i];
      console.log(doc.title + " by " + doc.author);
    }
    db.close();
  });
}





