// PDFKitでグラフを描画 for Node.js

// モジュールの読み込み
var PDFDocument = require('pdfkit');
var fs = require('fs');

// 描画するデータ
var data = [
  { label: '国語', value: 76 },
  { label: '数学', value: 48 },
  { label: '理科', value: 89 },
  { label: '社会', value: 68 },
  { label: '音楽', value: 55 },
  { label: '英語', value: 73 },
  { label: '技術', value: 92 },
  { label: '芸術', value: 58 },
  { label: '選択', value: 79 }
];

// ドキュメントを作る --- (※1)
var doc = new PDFDocument();
var page_w = doc.page.width;
var page_h = doc.page.height;

// 出力ファイルを設定する --- (※2)
doc.pipe(fs.createWriteStream('output-graph.pdf'));

// フォントを埋め込む --- (※3)
doc.font('sazanami-gothic.ttf');

// タイトルを表示する --- (※4)
doc.fontSize(30)
   .text('成績グラフ', 20, 20);

// グラフを描画する --- (※5)
var margin = 20;
var g_w = page_w - margin * 2 - 50;
var g_x = margin + 50;
var y = 80;
var wpx = g_w / 100;
for (var i = 0; i < data.length; i++) {
  var value = data[i].value;
  var label = data[i].label;
  doc.save()
     .rect(g_x, y, wpx * value, 20)
     .fill( (i % 2) ? 'blue':'red');
  doc.fontSize(10)
     .fillColor("black")
     .text(label, 30, y + 5)
     .text(value, g_x + 5, y + 5);
  y += 20 + 5;
}

// 描画を終了する --- (※6)
doc.end();
