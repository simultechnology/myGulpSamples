// ダウンロード
download(
  "http://www.aozora.gr.jp/index_pages/person81.html",
  "miyazawakenji.html");
download(
  "http://www.aozora.gr.jp/index_pages/person148.html",
  "natumesoseki.html");
print("ok");

// urlをsavepathに保存する関数
function download(url, savepath) {
  var aUrl = new java.net.URL(url);
  try {
    var conn = aUrl.openConnection();
    var ins = conn.getInputStream();
    var file = new java.io.File(savepath);
    var out = new java.io.FileOutputStream(file);
    var b;
    while ((b = ins.read()) != -1) {
      out.write(b);
    }
    out.close(); // 出力ストリームを閉じる
    ins.close(); // 入力ストリームを閉じる
  } catch (e) {
    throw new Error(e);
  }
}
