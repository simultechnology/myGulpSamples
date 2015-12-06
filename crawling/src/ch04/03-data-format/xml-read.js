// 地域防災拠点を読む for Node.js

// モジュールの取り込み
var fs = require('fs');
var cheerio = require('cheerio');

// XMLファイルを読む --- (※1)
var xml = fs.readFileSync("shelter.xml", "utf-8");

// XMLファイルをパースする --- (※2)
$ = cheerio.load(xml);

// 各防災拠点を順にチェック --- (※3)
$("Shelter").each(function(i, el){
  // 名前と地区を画面に表示 --- (※4)
  var name = $(this).children("Name").text();
  var ward = $(this).children("Ward").text();
  console.log(ward, name);
});
