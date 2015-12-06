// CSVを元に、SVM学習データ(SVM)を生成

var fs = require('fs');

// 二種類のデータを処理
csv2svm('train-mini.csv');
csv2svm('train.csv');
csv2svm('t10k-mini.csv');
csv2svm('t10k.csv');
console.log("ok");

// CSVファイルからSVMファイルを作成
function csv2svm(file_csv) {
  // ファイル名を決定
  var file_svm = file_csv.replace(/\.csv$/, "") + ".svm";
  console.log("[I N] " + file_csv);
  console.log("[OUT] " + file_svm);
  console.log(file_svm);

  // 保存用ファイルを開く
  var f_svm = fs.openSync(file_svm, "w");

  // 読込
  var csv = fs.readFileSync(file_csv, "utf-8");
  var lines = csv.split("\n");

  // データを作成
  for (var i in lines) {
    // 経過報告
    if (i % 1000 == 0) console.log(i + "/" + lines.length);

    // 一行を処理
    var line = lines[i];
    var cells = line.split(",");
    var no = cells.shift();
    var vals = [];
    for (var j = 0; j < cells.length; j++) {
      var index = j + 1;
      var v = cells[j];
      if (v == 0) continue; // 0のデータは省略できる
      var value = v / 255;     // データをスケーリング
      vals.push(index + ":" + value);
    }
    if (vals.length == 0) continue;
    var v_str = no + " " + vals.join(" ");
    var dat = v_str + "\n";
    // 書込 
    fs.writeSync(f_svm, dat, null, "utf-8");
  }
  console.log("saved = " + file_svm);
}





