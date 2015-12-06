// Webサイトからタイトルを表示する
var TARGET_URL = "http://kujirahand.com";

// CaperJSのオブジェクトを作成 ---- (※1)
var casper = require('casper').create();

// 指定のWebサイトを開く ---- (※2)
casper.start(TARGET_URL, function() {
  // タイトルを表示する ---- (※3)
  this.echo(casper.getTitle());
});

// 処理を実行する --- (※4)
casper.run();


