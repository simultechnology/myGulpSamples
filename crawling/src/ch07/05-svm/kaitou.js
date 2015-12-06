// カレントディレクトリのGZファイルを一気に解凍 for Node.js

var fs = require('fs');
var exec = require('child_process').exec;

// ファイル一覧を得る
fs.readdir('.', function(err,files) {
  files.forEach(function(file) {
    // .gz以外は無視
    if (!/\.gz$/.test(file)) return;
    // 解凍
    console.log("file=" + file);
    var fn = file.replace(/\.gz$/,"");
    var cmd = [
      "gzip", "-dc",
      '"' + file + '"',
      '>"' + fn + '"'
    ].join(" ");
    // 実行
    exec(cmd,
    function(err, stdout, stderr) {
      if (err) throw err;
      console.log(stdout, stderr);
    });
  });
});


