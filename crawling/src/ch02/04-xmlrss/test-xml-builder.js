// モジュールの取り込み
var xml2js = require('xml2js');

// 変換元オブジェクト
var obj = {
  item: {name:"Banana", price:150}
};
// XMLに変換
var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);
console.log(xml);
