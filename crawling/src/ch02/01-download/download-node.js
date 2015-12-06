// urlにあるファイルをsavepathにダウンロードする

// ダウンロード元URLの指定
var url = "http://kujirahand.com/";
// 保存先のパスを指定
var savepath = "test.html";

// 利用モジュールの取り込み ---- (※1)
var http = require('http'); // HTTPのモジュール
var fs = require('fs');     // ファイル関連モジュール

// 出力先を指定 --- (※2)
var outfile = fs.createWriteStream(savepath);

// 非同期でURLからファイルをダウンロード --- (※3)
http.get(url, function(res) {
  res.pipe(outfile); // --- (※4)
  res.on('end', function () { // --- (※5)
    outfile.close();
    console.log("ok");
  });
});

