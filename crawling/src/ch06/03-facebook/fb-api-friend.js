// Facebookを使う for Node.js

// モジュールの取り込み
var FB = require('fb');
// 以下、設定を書き換えること ------ (※1)
FB.setAccessToken('CAAIZBtT5klAsBAIvKUGp8qQengmKs6Ch2f9K58ZA3mJs0pNBfftOttZAZBCcVEkdSFOLuChmEa4P7bHWAm2eE3sJRMHgQQ5fVQD7NeusibRDri8LBBe5GwAZCvxZCZAnOVpCUVP6Qh2DZCZBHlW8JyqSL6pFmz6ovv3DZB0wQ3gFMmF75tVW21gWFG4VZCjzxcXuLZBkcuo3nlELMlJeExLvJIkc');

// 友人の人数を調べる（詳細は得られない) ------- (※2)
var msg = "APIを使ってメッセージを投稿するテストです。";
FB.api('me/friends', 'get', {}, function(e) {
  if (!e) {
    console.log("error"); return;
  }
  console.log(e);
});
