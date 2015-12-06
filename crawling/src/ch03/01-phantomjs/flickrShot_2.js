// Flickrで検索しスクリーンショット撮る for CasperJS
// CasperJSのオブジェクトを作成
var casper = require('casper').create();

// CasperJSの処理を開始する ---- (※1)
casper.start();

// 画面サイズを指定する ---- (※2)
casper.viewport(1400, 800);

// UserAgentの指定
casper.userAgent('User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');

// Flickrのサイトでネコを検索 ---- (※3)
var text = encodeURIComponent("ネコ");
casper.open('https://www.flickr.com/search/?text=' + text);

// その後、画面をキャプチャ---- (※4)
casper.then(function(){
  this.capture('flickr-cat.png',{
    top:0, left:0, width: 1400, height: 800
  });
});

// 実行開始
casper.run();