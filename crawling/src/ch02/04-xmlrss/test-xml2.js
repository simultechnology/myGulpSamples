// モジュールの取り込み
var parseString = require('xml2js').parseString;

// テスト用のXMLデータ
var xml = "<fruits shop='AAA'>" +
  "<item price='140'>Banana</item>" +
  "<item price='200'>Apple</item>" +
  "</fruits>";

// XMLをパースする
parseString(xml, function (err, result) {
  // console.log(JSON.stringify(result)); // --- (※1)
  // フルーツを提供するお店の名前
  var shop = result.fruits.$.shop;
  console.log("shop=" + shop);
  // フルーツの名前と値段を表示
  var items = result.fruits.item;
  for (var i in items) {
    var item = items[i];
    console.log("-- name=" + item._);
    console.log("   price=" + item.$.price);
  }
});


