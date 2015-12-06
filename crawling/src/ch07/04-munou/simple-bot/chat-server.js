// チャットサーバーを作る
//-----------------------------
// 設定
var SERVER_PORT = 1337; // サーバーポート
var FILE_CLIENT = "chat-client.html";

// モジュールの取り込み
var
  http = require('http'),
  URL  = require('url'),
  path = require('path'),
  fs   = require('fs'),
  bot  = require('./chat-server-bot.js');

// サーバーを起動 --- (※1)
var svr = http.createServer(checkRequest);
svr.listen(SERVER_PORT, function(){
  console.log("サーバー起動しました");
  console.log("http://localhost:" + SERVER_PORT);
});

// サーバーにリクエストがあった時の処理 --- (※2)
function checkRequest(req, res) {
  var uri = URL.parse(req.url, true);
  var pathname = uri.pathname;
  // パス名で処理を分岐
  if (pathname == "/api") {
    apiRequest(req, res, uri);
  } else if (pathname == "/") {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(fs.readFileSync(FILE_CLIENT, "utf-8"));
  } else {
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.end("File not found");
  }
  console.log(pathname);
};

// APIへのリクエストを処理 --- (※3)
function apiRequest(req, res, uri) {
  msg = uri.query["msg"];
  bot.getResponse(msg, function(bot_msg) {
    body = JSON.stringify({"msg":bot_msg});
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(body);
  });
};




