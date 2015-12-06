// 単語の出現頻度を調べる
var Mecab = require('./mecab-mod.js');
var mecab = new Mecab();
var fs = require('fs');

// 引数をチェック
var args = process.argv;
args.shift(); // 除去 'node'
args.shift(); // 除去 スクリプトのパス
if (args.length <= 0) {
  console.log('node hindo.js textfile');
  process.exit();
}
var filename = args.shift();

// ファイルを読み込む
var text = fs.readFileSync(filename, "utf-8");
// 形態素解析を行う
mecab.parse(text, function(err, items) {
  checkHindo(items);
});

// 出現頻度を調べる
function checkHindo(items) {
  // 語句をオブジェクトに格納し頻度を調べる
  var words = {};
  for (var i in items) {
    var it = items[i];
    var w = it[0];
    if (words[w] == undefined) {
      words[w] = 1;
    } else {
      words[w]++;
    }
  }
  // 語句を出現頻度にソートするため配列にコピー
  var list = [];
  for (var key in words) {
    list.push({
      "word":key,
      "nums":words[key]
    });
  }
  // ソートする
  list.sort(function(a, b){
    return b.nums - a.nums;
  });
  // 画面に出力する
  for (var i = 0; i < list.length; i++) {
    var it = list[i];
    console.log((i + 1) + ":" + it.word + "(" + it.nums + ")");
  }
}
