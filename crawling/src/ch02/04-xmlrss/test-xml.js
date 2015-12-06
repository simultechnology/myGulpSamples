// モジュールの取り込み
var parseString = require('xml2js').parseString;

// テスト用のXMLデータ
var xml = "<fruits shop='AAA'>" +
  "<item price='140'>Banana</item>" +
  "<item price='200'>Apple</item>" +
  "</fruits>";

// XMLをパースする
parseString(xml, function (err, result) {
  // パース完了したときの処理をここに記述
  console.log(JSON.stringify(result));
});



