// 撮影までの待ち時間
var DELAY_TIME = 1000 * 1; // 1秒

// Googleの画像検索のページ
var WORD = "ネコ";
var TARGET_URL = "https://www.google.co.jp/search" +
      "?source=lnms&tbm=isch&q=" + 
      encodeURIComponent(WORD);

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
  win.webContents.on('did-finish-load', captureFunc);
});

// キャプチャ処理 --- (※1)
function captureFunc() {
  // ディレイ処理をはさむ
  setTimeout(function () {
    // 適当な名前で保存する
    var fname = "cat-" + (new Date()).getTime() + ".png";
    win.capturePage(function(img) {
      fs.writeFileSync(fname, img.toPng());
      app.quit(); // アプリを自動終了
    });
  }, DELAY_TIME);
}


