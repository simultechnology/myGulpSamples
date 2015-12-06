// モジュールの取り込み
var parseString = require('xml2js').parseString;

// テスト用のXMLデータ
var xml = "<item>Banana</item>";

// XMLをパースする
parseString(xml, function (err, result) {
  console.log(result.item); // 結果: Banana
});


