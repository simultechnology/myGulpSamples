// Excelファイルを書き出す for Rhino + Apache POI

// 今回Excelに書き込むデータ
var list = [
  ["商品名", "値段"],
  ["バナナ", 210],
  ["ミカン", 980],
  ["ジャガイモ", 80]
];

// Javaのクラスを宣言
var XSSFWorkbook = org.apache.poi.xssf.usermodel.XSSFWorkbook;
var XSSFCellStyle = org.apache.poi.xssf.usermodel.XSSFCellStyle;
var FileOutputStream = java.io.FileOutputStream;

// ワークブックを作成
var wb = new XSSFWorkbook();
// ワークシートを作成
var sheet = wb.createSheet("sheet-test");
// セルスタイルの作成
var style_u = wb.createCellStyle();
style_u.setBorderBottom(XSSFCellStyle.BORDER_THIN);
var style_head = wb.createCellStyle();
style_head.setBorderBottom(XSSFCellStyle.BORDER_DOUBLE);

// セルに値を設定
for (var i = 0; i < list.length; i++) {
  var row = sheet.createRow(i);
  var c1 = row.createCell(0);
  var c2 = row.createCell(1);
  c1.setCellValue(list[i][0]);
  c2.setCellValue(list[i][1]);
  var style = (i == 0) ? style_head : style_u;
  c1.setCellStyle(style);
  c2.setCellStyle(style);
}

// 値を出力
var out = new FileOutputStream("test.xlsx");
wb.write(out);


