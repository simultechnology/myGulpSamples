// 単語の出現頻度を調べる(その２)
var Mecab = require('./mecab-mod.js');
var mecab = new Mecab();
var fs = require('fs');

// 引数を読む
if (process.argv.length < 3) {
  console.log("no file");
  process.exit();
}
var filename = process.argv[2];
// ファイルを読み込む
var text = fs.readFileSync(filename, "utf-8");
// 形態素解析を行う
mecab.parse(text, function(err, items) {
  checkHindo2(items);
});

// 出現頻度を調べる ---- (※1)
function checkHindo2(items) {
  // 語句をオブジェクトに格納し頻度を調べる
  var words = {}; // --- (※2)
  for (var i in items) {
    var it = items[i];
    var w = it[0];
    var h = it[1];
    // 意味のない語句を除外する ---- (※3)
    if (h != "名詞" && h != "動詞" && h != "形容詞") continue;
    if (words[w] == undefined) {
      words[w] = 1;
    } else {
      words[w]++;
    }
  }
  // 語句を出現頻度にソートするため配列にコピー --- (※4)
  var list = [];
  for (var key in words) {
    list.push({
      "word":key,
      "nums":words[key]
    });
  }
  // ソートする --- (※5)
  list.sort(function(a, b){
    return b.nums - a.nums;
  });
  // 頻出上位の語句を画面に出力する
  for (var i = 0; i < 15; i++) {
    var it = list[i];
    console.log((i + 1) + ":" + it.word + "(" + it.nums + ")");
  }
}
