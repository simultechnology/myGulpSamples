// HTMLをPDFとして出力 for CasperJS 

// 宮沢賢治 - やまなし 
var url = "http://www.aozora.gr.jp/cards/000081/files/46605_31178.html";
var savepath = "test.pdf";

// CasperJSのオブジェクトを作成
var casper = require('casper').create();
casper.start();
// ページの設定
casper.page.paperSize = {
  width: '8.5in',
  height: '11in',
  orientation: "portrait",
  margin: '1cm'
};
casper.open(url);
// CSSを書き換える
casper.then(function () {
  casper.evaluate(function () {
    var els = document.querySelectorAll('h4');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      e.style.backgroundColor = "red";
      e.style.color = "white";
      e.style.padding = "10px";
    }
  });
});
casper.then(function () {
  casper.capture(savepath);
});
casper.run();


