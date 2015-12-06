// モジュールの取り込み
var parseString = require('xml2js').parseString;

// テスト用のXMLデータ
var xml = 
  "<items>" +
  "<item><name>Banana</name><price>130</price></item>" +
  "<item><name>Apple</name><price>300</price></item>" +
  "<item><name>Pear</name><price>250</price></item>" +
  "</items>";

// XMLをパースする
parseString(xml, function (err, r) {
  console.log(JSON.stringify(r));
  // 各要素の取り出し
  console.log("---");
  console.log(r.items.item[0].name[0]);
  console.log(r.items.item[0].price[0]);
});


