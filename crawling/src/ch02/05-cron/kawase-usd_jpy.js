// 為替情報を取得 for Node.js

// 為替APIのURL
var API = "http://api.aoikujira.com/kawase/get.php?code=USD&format=json";

// モジュールの取り込み
var request = require('request');
var fs = require('fs');

// Web APIにアクセスする
request(API, function(err, response, body) {
  // HTTPのエラーをチェック
  if (err || response.statusCode != 200) {
    console.log("ERROR", err); return;
  }
  // JSONをJSのオブジェクトに変換
  var r = JSON.parse(body);
  var jpy = r["JPY"];
  // 為替レートをファイルへ保存(ファイル名には日付を入れる)
  var t = new Date();
  var fname = "USD_JPY_" +
      t.getFullYear() + "-" + (t.getMonth()+1) + 
      "-" + t.getDay() + ".txt";
  var text = "1usd=" + jpy + "jpy";
  console.log(text);
  fs.writeFile(fname, text);
});


