// HTMLをPDFとして出力 for CasperJS 

// 宮沢賢治 - やまなし 
var url = "http://www.aozora.gr.jp/cards/000081/files/46605_31178.html";
var savepath = "test.pdf";

// CasperJSのオブジェクトを作成
var casper = require('casper').create();
casper.start();
// ページの設定 ----- (※1)
casper.page.paperSize = {
  width: '8.5in',
  height: '11in',
  orientation: "portrait",
  margin: '1cm'
};
casper.open(url);
casper.then(function () {
  casper.capture(savepath);
});
casper.run();


