// モジュールの取り込み
var app = require('app');
var BrowserWindow = require('browser-window');

// メインウインドウを起動 --- (※1)
var mainWindow = null;
app.on('ready', function(){
  mainWindow = new BrowserWindow({width:800, height:600});
  mainWindow.loadUrl('file://' + __dirname + '/index.html'); // ---- (※2)
  mainWindow.on('closed', function(){
    mainWindow = null;
  });
});
