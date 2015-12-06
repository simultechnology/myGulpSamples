// 文字認識サーバー
// 設定
var SERVER_PORT = 1337; // サーバーポート
var FILE_CLIENT = __dirname + "/client-recognizer.html";
var FILE_MODEL = __dirname + "/train.model";
var SVM_PREDICT = "~/libsvm/svm-predict"; // svm-predictのパスを指定
var DIR_TEMP = __dirname;

// モジュールの取り込み
var
  http = require('http'),
  URL  = require('url'),
  path = require('path'),
  fs   = require('fs'),
  exec = require('child_process').exec;


// サーバーを起動
var svr = http.createServer(checkRequest);
svr.listen(SERVER_PORT, function(){
  console.log("サーバー起動しました");
  console.log("http://localhost:" + SERVER_PORT);
});

// サーバーにリクエストがあった時の処理
function checkRequest(req, res) {
  var uri = URL.parse(req.url, true);
  var pathname = uri.pathname;
  // パス名で処理を分岐
  if (pathname == "/predict") {
    api_predict(req, res, uri);
  }
  else if (pathname == "/") {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(fs.readFileSync(FILE_CLIENT, "utf-8"));
  } else {
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.end("File not found");
  }
  console.log(pathname);
};

// APIへのリクエストを処理
function api_predict(req, res, uri) {
  var p = uri.query.p;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var value = JSON.parse("[" + p + "]");
  var list = [];
  for (var i in value) {
    var v = value[i] / 255;
    if (v == 0) continue;
    list.push( (parseInt(i) + 1) + ":" + v );
  }
  
  // テスト用のデータを作成 ---- (※1)
  var testdata = "0 " + list.join(" ") + "\n";
  console.log(testdata);

  // 一時ファイルに保存する
  var r = Math.random();
  var t = (new Date()).getTime();
  var tmp_test = DIR_TEMP + "/test-" + t + "-" + r;
  var tmp_res  = DIR_TEMP + "/res-" + t + "-" + r;
  fs.writeFileSync(tmp_test, testdata, "utf-8");

  // コマンドを生成 ---- (※2)
  var cmd_a = [
    SVM_PREDICT,
    '"' + tmp_test + '"',
    '"' + FILE_MODEL  + '"',
    '"' + tmp_res + '"'
  ];
  var cmd = cmd_a.join(" ");
  console.log("*** cmd ***",cmd, "***");

  // コマンドを実行 --- (※3)
  exec(cmd, function (err, stdin, stdout) {
    if (err) {
      res.end("ERROR: exec commnad");
      return;
    }
    // 結果ファイルを開く
    var a = fs.readFileSync(tmp_res, "utf-8");
    console.log("predict>" + a);
    console.log(stdout);
    res.end("" + a);
    // 一時ファイルを削除
    fs.unlink(tmp_test);
    fs.unlink(tmp_res);
  });
}



