// 文章の校正ツール
var MAX_WORD = 40; // 最大単語数の警告

var Mecab = require('./mecab-mod.js');
var mecab = new Mecab();
var fs = require('fs');

// 引数をチェック ---- (※1)
var args = process.argv;
args.shift(); // 除去 'node'
args.shift(); // 除去 スクリプトのパス
if (args.length <= 0) {
  console.log('node kousei.js textfile');
  process.exit();
}
var filename = args.shift();

// ファイルを読み込む --- (※2)
var text = fs.readFileSync(filename, "utf-8");
// 形態素解析を行う
mecab.parse(text, function(err, items) {
  checkSentence(items);
});

// 文章をチェックする
function checkSentence(items) {
  checkJosiNo(items);
  checkTaiou(items);
}

// 助詞の「の」の連続と単語数の長さを確認する ------ (※3)
function checkJosiNo(items) {
  var cnt = 0; // 助詞「の」が出現した回数を数える
  var cur = []; // 現在読み込んでいる文を保存する
  var lineno = 1; // 行番号を数える
  for (var i in items) {
    var it = items[i];
    var w = it[0];
    if (w == "EOS") { // 改行
      lineno++; cur = []; cnt = 0;
      continue;
    }
    // 文末および句点の確認 ---- (※4)
    if (w == "。" || w == "、") {
      // 「の」の回数
      if (cnt >= 3) {
        console.log("[警告] 助詞「の」が" + cnt + "回連続しています。");
        console.log("\t(" + lineno + "行目)" + cur.join(""));
      }
      // 単語数を確認 --- (※5)
      if (cur.length >= MAX_WORD) {
        console.log("[警告] 一文が長すぎます。" + cur.length + "以上の単語です。");
        console.log("\t(" + lineno + "行目)" + cur.join("|"));
      }
      cnt = 0;
      if (w == "。") { cur = []; }
      continue;
    }
    // 「の」があるか確認 ---- (※6)
    if (it[0] == "の" && it[1] == "助詞") cnt++;
    cur.push(w);
  }
}

// 対応チェック ----- (※7)
function checkTaiou(items) {
  var heiritujosi = 0, cur = [], lineno = 1;
  var meisi = {};
  var setuzokusi = {}, oldCur = [];
  for (var i in items) {
    var it = items[i];
    var w = it[0];
    if (w == "EOS") { // 改行
      lineno++;
      setuzokusi = {};
      oldCur = cur; cur = [];
      continue;
    }
    // 文末の処理 ----- (※8)
    if (w == "。") {
      if (heiritujosi == 1) {
        console.log("[警告] 並立助詞「〜たり」が一度しか出現しません。");
        console.log("\t(" + lineno + "行目)" + cur.join(""));
      }
      oldCur = cur; cur = []; heiritujosi = 0;
      continue;
    }
    // 並立助詞「たり」のチェック --- (※9)
    if (it[2] == "並立助詞" && (w == "たり" || w == "だり")) {
      heiritujosi++;
    }
    // 接続詞のチェック(一行に同じ接続詞が出てこないようにする) --- (※10)
    if (it[1] == "接続詞") {
      if (typeof(setuzokusi[w]) == "undefined") {
        setuzokusi[w] = 1;
      } else {
        console.log("[警告] 一行に同じ接続詞「" + w + "」が複数回使われています。");
        console.log("\t(" + lineno + "行目)" + oldCur.join(""));
      }
    }
    // 表記の揺れチェック --- (※11)
    if (it[1] == "名詞" && w.length >= 2) {
      var kana = it[8];
      if (kana == undefined) kana = it[0]; // 辞書にない単語対策
      kana = kana.replace(/ー/g, ''); // カタカナ対策
      if (meisi[kana] == undefined) {
        meisi[kana] = w;
      } else if (meisi[kana] != w) {
        console.log("[確認] 表記の揺れ: " + meisi[kana] + " != " + w);
      }
    }
    cur.push(w);
  }
}




