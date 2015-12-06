// HTTPサーバーを作る
//-----------------------------
// 設定
var SERVER_PORT = 1337; // サーバーポート
var FILE_DEFAULT = "/line.html";

// モジュールの取り込み
var
  http = require('http'),
  URL  = require('url'),
  path = require('path'),
  fs   = require('fs');

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
  if (pathname == "/") pathname = FILE_DEFAULT;
  console.log(pathname);
  
  // ファイルの存在確認
  var filename = path.join(__dirname, pathname);
  if (!fs.existsSync(filename)) {
    res.writeHead(404, {'Content-Type':'text/html'});
    res.end("404 file not found");
    return;
  }

  // ディレクトリ?
  var stat = fs.statSync(filename);
  if (stat && stat.isDirectory()) {
    res.writeHead(403, {'Content-Type':'text/html'});
    res.end("403");
    return;
  }

  // ファイルを送出
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end(fs.readFileSync(filename, "utf-8"));
}
