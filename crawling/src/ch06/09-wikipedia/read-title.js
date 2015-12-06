// Wikipediaのタイトルを調べる for Node.js

// モジュールの利用
var levelup = require('level');

// データベースの指定
var db = levelup('./wikidata');

// 検索キーを指定 ----- (※1)
var opt = {
  start : "猫",
  end   : "猫\uFFFF"
};
//検索 ------ (※2)
db.createReadStream(opt)
  .on('data', function (data) {
    console.log(data.key);
  })
  .on('end', function () {
    console.log('ok.');
  });


