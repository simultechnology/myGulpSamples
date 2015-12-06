// モジュールの読込
var request = require('request');
var fs = require('fs');

// URLの指定
var url = "http://kujirahand.com/";
var savepath = "test.html";

// ダウンロード
request(url).pipe(fs.createWriteStream(savepath));

