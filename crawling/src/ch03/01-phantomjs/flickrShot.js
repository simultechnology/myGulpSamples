// Flickrで検索しスクリーンショット撮る for CasperJS
// CasperJSのオブジェクトを作成
var casper = require('casper').create();

// CasperJSの処理を開始する ---- (※1)
casper.start();

// 画面サイズを指定する ---- (※2)
casper.viewport(1024, 800);

// Flickrのサイトを開く ---- (※3)
casper.open('https://www.flickr.com/');

// その後、検索フォームに「ネコ」を設定 ---- (※4)
casper.then(function(){
  this.fill("form[role='search']", {q:"ネコ"}, true);
});

// その後、画面をキャプチャ---- (※5)
casper.then(function(){
  this.capture('flickr-cat.png',{
    top:0, left:0, width: 1024, height: 800
  });
});

// 実行開始
casper.run();
