// mecab-mod.jsのテストプログラム

var Mecab = require('./mecab-mod.js');
var mecab = new Mecab();

var text = "すもももももももものうち";
mecab.parse(text, function(err, items) {
  for (var i in items) {
    var k = items[i];
    if (k == "EOS") continue;
    console.log(k[0] + ":" + k[1]);
  }
});
