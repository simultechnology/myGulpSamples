// 変数などの宣言
var TARGET_URL = "https://atom.io"; //対象Webサイト

// モジュールの取り込み
var app = require('app');
var BrowserWindow = require('browser-window');
var fs = require('fs');

// メインウインドウを起動
var win = null;
app.on('ready', function(){
  win = new BrowserWindow({width:1024, height:800});
  win.loadUrl(TARGET_URL);
  // ページがロード完了したらキャプチャする
  win.webContents.on('did-finish-load',captureFunc);
});

// キャプチャ処理
function captureFunc() {
  win.capturePage(function(img) {
    fs.writeFileSync('screenshot.png', img.toPng());
  });
}
