// WikipediaのタイトルDBを作成する for Node.js

// モジュールの利用
var request = require('request');
var fs = require('fs');
var zlib = require('zlib');
var levelup = require('level');

// Wikipediaの最新タイトルデータ --- (※1)
var titleName = "jawiki-latest-all-titles-in-ns0";
var titleUrl = "http://dumps.wikimedia.org/jawiki/latest/" +
      titleName + ".gz";
var local_gz  = __dirname + "/" + titleName + ".gz";
var local_txt = __dirname + "/" + titleName;

// データベースの指定 ---- (※2)
var db = levelup('./wikidata');

// テスト用
titleUrl = "http://localhost/" + titleName + ".gz";

// データをダウンロード ----- (※3)
request
  .get(titleUrl)
  .on('end', goGunzip)
  .pipe(fs.createWriteStream(local_gz));
console.log("ダウンロードします");

// ファイルの解凍 ----- (※4)
function goGunzip() {
  console.log('解凍します');
  // ファイルを読む
  var gz_data = fs.readFileSync(local_gz);
  // 解凍
  zlib.gunzip(gz_data, function (err, bin) {
    if (err) { console.log(err); return; }
    // 結果をファイルに書き込み(念のため)
    fs.writeFileSync(local_txt, bin);
    var txt = bin.toString('utf-8'); // --- (※5)
    insertDB(txt);
  });
}

// LevelDBに結果を書き込む ----- (※6)
function insertDB(txt) {
  console.log("データベースに書き込みます。");
  var lines = txt.split("\n");
  lines.shift(); // 一行目は捨てる
  var t = db.batch();
  for (var i in lines) {
    var it = lines[i];
    if (it == "") continue;
    t.put(it, 1);
    if (i % 1000 == 0) console.log(i + "件目:" + it); // --- (※7)
  }
  t.write(function() {
    console.log("書き込み完了しました:" + lines.length);
  });
}

