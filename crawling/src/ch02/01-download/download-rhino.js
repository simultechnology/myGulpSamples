// urlにあるファイルをsavepathにダウンロードする
var url = "http://kujirahand.com/";
var savepath = "test.html";

// ダウンロード
var aUrl = new java.net.URL(url);
var conn = aUrl.openConnection(); // URLに接続する      | --- (※1) 
var ins = conn.getInputStream();  // 入力ストリームを得る |
var file = new java.io.File(savepath);        // |出力ストリームを得る--- (※2)
var out = new java.io.FileOutputStream(file); // |
// 読み込んで書き込む ---- (※3)
var b;
while ((b = ins.read()) != -1) {
  out.write(b);
}
out.close(); // 出力ストリームを閉じる --- (※4)
ins.close(); // 入力ストリームを閉じる

