// コマンドライン引数を得てスクリーンショットを撮る for CasperJS

var casper = require('casper').create();
var utils = require('utils');

// 引数を得る
var args = casper.cli.args;
if (args.length < 1) {
  // 使い方を表示
  casper.echo("USES:");
  casper.echo("shot-tool URL [savepath]");
  casper.exit();
}
var savepath = "screenshot.png";
var url = args[0];
if (args.length >= 2) {
  savepath = args[1];
}

// CasperJSの処理を開始
casper.start();
casper.viewport(1024, 768);
casper.open(url);
casper.then(function(){
  this.capture(savepath, {
    top:0, left:0, width:1024, height:768
  });
});
casper.run();
