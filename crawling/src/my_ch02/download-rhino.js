
var url = "http://www.goal.com/jp";
var savepath = "test3.html";

var aUrl = new java.net.URL(url);
var conn = aUrl.openConnection();
var inputStream = conn.getInputStream();

var file = new java.io.File(savepath);
var outputStream = new java.io.FileOutputStream(file);

var b;
while ((b = inputStream.read()) != -1) {
    outputStream.write(b);
}

outputStream.close();
inputStream.close();