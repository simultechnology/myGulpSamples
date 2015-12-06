// 簡単な文章の分類分け for Node.js

// モジュールの取り込み
var bayes = require('bayes');
var Mecab = require('mecab-lite'),
    mecab = new Mecab();

// サンプルのテキスト
var t_soseki = '夏目漱石は、日本の小説家、評論家、英文学者。江戸の牛込馬場下横町出身。大学時代に正岡子規と出会い、俳句を学ぶ。帝国大学英文科卒業後、松山で愛媛県尋常中学校教師、熊本で第五高等学校教授などを務めた後、イギリスへ留学。帰国後、東京帝国大学講師として英文学を講じながら、「吾輩は猫である」を雑誌『ホトトギス』に発表。これが評判になり「坊っちゃん」「倫敦塔」などを書く。';
var t_nobunaga = '織田信長は、戦国時代から安土桃山時代にかけての武将・戦国大名。三英傑の一人。尾張国（現在の愛知県）の古渡城主・織田信秀の嫡男。尾張守護代の織田氏の中でも庶流・弾正忠家の生まれであったが、父の代から主家や尾張守護の斯波家をも凌ぐ力をつけ、家督争いの混乱を収めて尾張を統一し、桶狭間の戦いで今川義元を討ち取ると、婚姻による同盟策などを駆使しながら領土を拡大した。';

// テキストの分割方法を設定 ---- (※1)
var classifier = bayes({
  tokenizer: function (text) { 
    return mecab.wakatigakiSync(text);
  }
});

// テキストを学習させる --- (※2)
classifier.learn(t_soseki, '夏目漱石');
classifier.learn(t_nobunaga, '織田信長');

// いざ、判定させよう！ --- (※3)
categorize('明治の人気小説家。猫に関する物語でも有名。');
categorize('尾張の戦国武将。');
categorize('戦国時代に領土を広げた。');

// カテゴリ分けした上で結果を分かりやすく表示 ---- (※4)
function categorize(text) {
  var r = classifier.categorize(text);
  console.log("カテゴリ=[" + r + "] - " + text);
}


