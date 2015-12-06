// MongoDBを使う for Node.js
var mongo = require('mongodb').MongoClient;

// 接続するDBの情報 --- (※1)
var serverUrl = 'mongodb://localhost:27017/test';

// MongoDBサーバーに接続 ---- (※2)
mongo.connect(serverUrl, function(err, db) {
  // 接続できたか確認 ---- (※3)
  if (err) { console.log(err); return; }
  // コレクション「contacts」を取得 --- (※4)
  var co = db.collection('contacts');
  // 検索し全ての結果について取得 --- (※5)
  co.find({}).toArray(function(err, docs){
    // 各ドキュメントの内容を画面に表示 --- (※6)
    for (var i in docs) {
      var doc = docs[i];
      console.log(doc);
    }
    db.close(); // ---- (※7)
  });
});

