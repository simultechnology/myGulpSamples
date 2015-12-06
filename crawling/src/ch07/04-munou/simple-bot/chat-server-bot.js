// 会話ボットの応答を生成するモジュール
//---------------------------------

// MongoDBの設定情報
var MONGO_DSN = "mongodb://localhost:27017/simple-bot";

// モジュールの取り込み
var Mecab = require('mecab-lite'),
    mecab = new Mecab(),
    mongo_client = require('mongodb').MongoClient;

// MongoDBの接続情報を保持する変数
var mongo_db = null, keywords_co;

// 外部に getResponse() メソッドを公開 --- (※1)
module.exports = {
  "getResponse": getResponse
};

// 会話ボットの応答を返す関数 --- (※2)
function getResponse(msg, callback) {
  checkDB(function(){
    var bot = new Bot(msg, callback);
    bot.talk();
  });
}

// MongoDBへ接続 --- (※3)
function checkDB(next_func) {
  // 既に接続していれば何もしない
  if (mongo_db) {
    next_func(); return;
  }
  
  // MongoDBに接続
  mongo_client.connect(MONGO_DSN, function (err, db) {
    // エラーチェック
    if (err) { console.log("DB error", err); return; }
    // 接続情報を記録
    mongo_db = db;
    // コレクションを取得
    keywords_co = db.collection('keywords');
    // 次の処理を実行
    next_func();
  });
}

// ボットクラスの定義 ---- (※4)
function Bot(msg, callback) {
  this.callback = callback;
  this.msg = msg;
  this.results = [];
  this.words = [];
  this.index = 0;
}

// ボットからの応答を得るメソッド ---- (※5)
Bot.prototype.talk = function () {
  var self = this;
  // 形態素解析 --- (※6)
  mecab.parse(this.msg, function (err, words) {
    if (err) {
      self.callback("Error");
      return;
    }
    // 単語を一つずつ確認する ---- (※7)
    self.index = 0;
    self.words = words;
    self.nextWord();
  });
};

// 各単語を一語ずつ調べるメソッド ---- (※8)
Bot.prototype.nextWord = function() {
  // 単語を最後まで調べたか確認
  if (this.index >= this.words.length) {
    this.response();
    return;
  }
  // データベースを検索
  var w = this.words[this.index++];
  // 活用のない単語 - 「頑張ら」なら「頑張る」を利用
  var org = (w.length >= 7) ? w[7] : w[0];
  var self = this;
  keywords_co
  .find({key:org})
  .toArray(function(err, rows) {
    // データベースに合致する語があったか？
    if (rows.length == 0) {
      self.nextWord(); return;
    }
    // パターンにマッチするか確認 --- (※9)
    var keys = rows.filter(function(el, index, ary) {
      if (el.pattern == "*") return true;
      if (self.msg.indexOf(el.pattern) >= 0) return true;
      return false;
    });
    if (keys.length > 0) {
      var r = Math.floor(Math.random() * keys.length);
      var key = keys[r];
      self.results.push(key.msg);
    }
    self.response();
  });
};

// 結果を戻す
Bot.prototype.response = function () {
  var res = "もう少しかみ砕いて話してください。";
  if (this.results.length > 0) {
    res = this.results.join("。");
  }
  this.callback(res);
};



