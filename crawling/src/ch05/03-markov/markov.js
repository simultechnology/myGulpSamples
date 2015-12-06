// マルコフ連鎖で文章を要約する
var SENTENCE_COUNT = 3; // 3文作文する
var Mecab = require('./mecab-mod.js');
var mecab = new Mecab();
var fs = require('fs');

// サンプルテキストファイルを読む
var text = fs.readFileSync("sample.txt", "utf-8");
// 形態素解析して作文する ---- (※1)
mecab.parse(text, function(err, items) {
  var dic = makeDic(items);
  makeSentence(dic);
});

// マルコフ連鎖用辞書の作成 ----- (※2)
function makeDic(items) {
  var tmp = ["@"];
  var dic = {};
  for (var i in items) {
    var t = items[i];
    var word = t[0];
    word = word.replace(/\s*/, '');
    if (word == "" || word == "EOS") continue;
    tmp.push(word);
    if (tmp.length < 3) continue;
    if (tmp.length > 3) tmp.splice(0, 1);
    setWord3(dic, tmp);
    if (word == "。") {
      tmp = ["@"];
      continue;
    }
  }
  return dic;
}
function setWord3(p, s3) {
  var w1 = s3[0], w2 = s3[1], w3 = s3[2];
  if (p[w1] == undefined) p[w1] = {};
  if (p[w1][w2] == undefined) p[w1][w2] = {};
  if (p[w1][w2][w3] == undefined) p[w1][w2][w3] = 0;
  p[w1][w2][w3]++;
}

// 辞書を元に作文を行う ---- (※3)
function makeSentence(dic) {
  for (var i = 0; i < SENTENCE_COUNT; i++) {
    var ret = [];
    var top = dic["@"];
    if (!top) continue;
    var w1 = choiceWord(top);
    var w2 = choiceWord(top[w1]);
    ret.push(w1);
    ret.push(w2);
    for (;;) {
      var w3 = choiceWord(dic[w1][w2]);
      ret.push(w3);
      if (w3 == "。") break;
      w1 = w2, w2 = w3;
    }
    console.log(ret.join(""));
  }
}
// キーの一覧を作成
function objKeys(obj) {
  var r = [];
  for (var i in obj) {
    r.push(i);
  }
  return r;
}
// キーの一覧から適当なものを選ぶ
function choiceWord(obj) {
  var ks = objKeys(obj);
  var i = rnd(ks.length);
  return ks[i];
}
function rnd(num) {
  return Math.floor(Math.random() * num);
}
