// Facebookを使う for Node.js

// モジュールの取り込み
var FB = require('fb');
// 以下、設定を書き換えること ------ (※1)
FB.setAccessToken('CAAN6eH01WZBgBAHCDgGAxkUFxXknVT5ZCGZA9nPZC9K9GBdOZBVxfTHZC9KdQdsnbFmjEUlebEdKJGvPi3qyFcvlwZCKCgE8EbUBjHaJIMCeZBl6mFQYgwZBhVs3plKUWVGL1NZASjCfMB8SfyZBLzD4ifg4RUfyQT4YLIukwI02ZBMkV6M5qo5CLr2rC0uyUcdFAFcKoHm1CY6fuMIRsUawdWQ1');

// 自分の投稿を取得して表示 ----- (※2)
FB.api('me/feed', 'get', {}, function(feed) {
  if (!feed) {
    console.log("error"); return;
  }
  var data = feed.data;
  for (var i in data) {
    var row = data[i];
    console.log(row);
    console.log("----------------");
  }
});
