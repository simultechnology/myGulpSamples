// Wikipediaを表示するだけのプログラム for Electron 
var TARGET_URL = "https://ja.wikipedia.org/";

// 必要モジュールの取り込み
var app = require('app');
var BrowserWindow = require('browser-window');

// メインウインドウを起動
var mainWindow = null;
// 準備ができたタイミングで呼ばれるイベント
app.on('ready', function(){
  // メインウィンドウを作成
  mainWindow = new BrowserWindow({width:800, height:600});
  // 指定のURLを読み込み
  mainWindow.loadUrl(TARGET_URL);
});

