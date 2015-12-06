// モジュールの取り込み
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var Builder = xml2js.Builder;

// テスト用のXMLデータ
var xml = "<fruits shop='AAA'>" +
  "<item price='140'>Banana</item>" +
  "<item price='200'>Apple</item>" +
  "</fruits>";

// XMLをパースする
parseString(xml, function (err, r) {
  // JavaScriptのオブジェクトを表示
  console.log(JSON.stringify(r));
  // パースしたものをXMLに変換
  var xml = new Builder().buildObject(r);
  console.log(xml);
});
