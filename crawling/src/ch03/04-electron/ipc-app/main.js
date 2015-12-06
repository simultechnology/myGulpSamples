// モジュールの取り込み
var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

// メインウインドウを起動
var mainWindow = null;
app.on('ready', function(){
  mainWindow = new BrowserWindow({width:800, height:600});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function(){
    mainWindow = null;
  });
});

// 同期メッセージの受信
ipc.on('mul-sync', function(event, arg) {
  console.log(arg); // コンソールに表示
  event.returnValue = arg.a * arg.b;
});

// 非同期メッセージの受信
ipc.on('mul-async', function(event, arg) {
  console.log(arg);// コンソールに表示
  // レンダラープロセスへ返信
  var result = arg.a * arg.b;
  event.sender.send('mul-async-reply', result);
});
