// MongoDBへ青空文庫のデータを挿入 for Node.js

// モジュールの取り込み
var mongo = require('mongodb').MongoClient;
var cheerio = require('cheerio');
var fs = require('fs');

// 接続するDBの指定
var MONGO_SERVER = 'mongodb://localhost:27017/aozora';
// データパスの指定
var AOZORA_FILES_DIR = __dirname + "/aozora";

// MongoDBサーバーに接続 --- (※1)
mongo.connect(MONGO_SERVER, function(err, db) {
  if (err) { console.log(err); return; }

  // コレクションを取得 ---- (※2)
  var items = db.collection('items');
  
  // データベースに入れるファイル一覧を取得 --- (※3)
  var files = fs.readdirSync(AOZORA_FILES_DIR);
  files = files.filter(function(s){ // HTMLファイルだけ取得
    return s.match(/\.html$/);
  });
  
  // コレクションに青空文庫の作品を挿入 --- (※4)
  var n = 0;
  files.forEach(function(file, i, ar) {
    // ファイルを読む
    var html = fs.readFileSync(AOZORA_FILES_DIR + '/' + file);
    // HTMLから要素を抽出
    var $ = cheerio.load(html);
    var o = {
      title   : $(".title").text(),
      author  : $(".author").text(),
      body    : $("body").text()
    };
    // 実際にコレクションに挿入 ---- (※5) 
    items.insert(o, function(err, result) {
      if (err) { 
        console.log(err);
      } else {
        console.log("inserted:" + o.title);
      }
      // 全て挿入したDBと切断 --- (※6)
      if (++n == files.length) db.close();
    });
  });

});

