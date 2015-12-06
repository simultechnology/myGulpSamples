// PDFKitを使うテスト for Node.js

// モジュールの読み込み
var PDFDocument = require('pdfkit');
var fs = require('fs');

// ドキュメントを作る --- (※1)
var doc = new PDFDocument();

// 出力ファイルを設定する --- (※2)
doc.pipe(fs.createWriteStream('output.pdf'));

// フォントを埋め込む --- (※3)
doc.font('sazanami-gothic.ttf');

// 文字を表示する --- (※4)
doc.fontSize(30)
   .text('今日の格言', 90, 100);
doc.fontSize(20)
   .text("求めつづけなさい。そうすれば与えられます。\n\n" +
         "探しつづけなさい。そうすれば見いだせます。\n\n" +
         "たたきつづけなさい。そうすれば開かれます。",
         100,180);

// 図形を描画する --- (※5)
doc.save()
   .moveTo(80, 80)
   .lineTo(250, 80)
   .lineTo(250, 150)
   .lineTo(80, 150)
   .lineTo(80, 80)
   .stroke('#0000FF');

// 改ページを行う --- (※6)
doc.addPage();

// 図形を描画する
doc.save()
   .moveTo(100, 150)
   .lineTo(100, 250)
   .lineTo(200, 250)
   .fill('#FF0000');

// 描画を終了する --- (※7)
doc.end();
