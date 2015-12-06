// node-svm を使って認識

// 学習データ ---------- (※1)
var train_data = [
  // [[データ配列], クラス]
  [[0, 0], 0],
  [[0, 1], 1],
  [[1, 0], 1],
  [[1, 1], 0]
];

// モジュールの取り込み ---- (※2)
var svm = require('node-svm');

// オブジェクトの作成  ------ (※3)
var clf = new svm.CSVC();
clf.train(train_data)   // データの学習
   .done(doTest);       // テストを実行

function doTest() {
  // test1 --- (※4)
  var v = clf.predictSync([1, 0]);
  console.log("[1, 0] => " + v);
  
  // test2 --- (※5)
  clf.predict([1, 1]).then(function (predicted) {
        console.log("[1, 1] => " + predicted);
  });
}


