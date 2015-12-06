// Wikipediaのタイトルを調べる for Node.js

// モジュールの利用
var levelup = require('level');

// データベースの指定
var db = levelup('./wikidata');

// 正規表現で項目を検索する ----- (※1)
var search_re = /.{4,}の女$/;

//すべての項目を検索する
var cnt = 0, result = [];
db.createReadStream()
  .on('data', function (data) {
    // 検索経過の表示
    if (cnt % 50000 == 49999) {
      console.log(cnt+"件を検索:" + data.key);
    }
    // 正規表現マッチ ---- (※2)
    if (search_re.test(data.key)) {
      result.push(data.key);
      console.log("発見:" + data.key);
    }
    cnt++;
  })
  // 最終結果を表示
  .on('end', function () {
    console.log("発見:\n" + result.join("\n"));
    console.log('ok.');
  });


