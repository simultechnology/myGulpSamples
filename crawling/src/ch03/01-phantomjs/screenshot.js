// CasperJSでスクリーンショットを撮る

// Casperオブジェクトを作成 ---- (※1)
var casper = require('casper').create();

// 開始する --- (※2)
casper.start();

// ページを開く --- (※3)
casper.open('http://google.co.jp');

// その後、スクリーンショット撮影 --- (※4)
casper.then(function() {
  casper.capture("screenshot.png");
});

// 実行 --- (※5)
casper.run();
