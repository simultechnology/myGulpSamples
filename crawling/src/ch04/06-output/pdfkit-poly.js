// PDFKitを使うテスト for Node.js

// モジュールの読み込み
var PDFDocument = require('pdfkit');
var fs = require('fs');

var doc = new PDFDocument();
doc.pipe(fs.createWriteStream('output-poly.pdf'));
doc.font('sazanami-gothic.ttf');

// 図形を描画する
doc.polygon(
  [150, 50], [100, 150], [200, 150]);
doc.stroke();

doc.end();
