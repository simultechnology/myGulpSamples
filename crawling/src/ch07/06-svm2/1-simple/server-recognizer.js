// 文字認識サーバー
// 設定
var SERVER_PORT = 1337; // サーバーポート
var FILE_CLIENT = __dirname + "/client-recognizer.html";
var FILE_MODEL = __dirname + "/train-mini.model";

// モジュールの取り込み
var
  http = require('http'),
  URL  = require('url'),
  path = require('path'),
  fs   = require('fs'),
  svm  = require('node-svm');

// 学習モデルの読込 --- (※1)
var model_json = fs.readFileSync(FILE_MODEL,"utf-8");
var model_obj = JSON.parse(model_json, model_obj);
var clf = new svm.SVM({}, model_obj);


// サーバーを起動 --- (※2)
var svr = http.createServer(checkRequest);
svr.listen(SERVER_PORT, function(){
  console.log("サーバー起動しました");
  console.log("http://localhost:" + SERVER_PORT);
});

// サーバーにリクエストがあった時の処理 --- (※3)
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

// APIへのリクエストを処理 --- (※4)
function api_predict(req, res, uri) {
  var p = uri.query.p;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var value = JSON.parse("[" + p + "]");
  for (var i in value) {
    value[i] = value[i] / 255;
  }
  console.log("value.length=" + value.length + "/" + 28*28);
  clf.predict(value).then(function (predicted) {
    console.log(predicted);
    res.end("" + predicted); // ----- (※5)
  });
}



