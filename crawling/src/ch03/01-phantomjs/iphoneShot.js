// iPhoneのふりをしてキャプチャ for CasperJS

var TARGET_URL = "http://google.co.jp";

// Casperを生成
var casper = require('casper').create();
casper.start();

// iPhoneのふり --- (※1)
casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53');

// 画面サイズを指定--- (※2)
casper.viewport(750, 1334);

casper.open(TARGET_URL);

// 画面キャプチャ
casper.then(function(){
  this.capture('screenshot.png');
});
// 実行
casper.run();
