// Facebookを使う for Node.js

// モジュールの取り込み
var FB = require('fb');
// 以下、設定を書き換えること ------ (※1)
FB.setAccessToken('CAAIZBtT5klAsBAIvKUGp8qQengmKs6Ch2f9K58ZA3mJs0pNBfftOttZAZBCcVEkdSFOLuChmEa4P7bHWAm2eE3sJRMHgQQ5fVQD7NeusibRDri8LBBe5GwAZCvxZCZAnOVpCUVP6Qh2DZCZBHlW8JyqSL6pFmz6ovv3DZB0wQ3gFMmF75tVW21gWFG4VZCjzxcXuLZBkcuo3nlELMlJeExLvJIkc');

// 任意のメッセージをポストする ------- (※2)
var msg = "APIを使ってメッセージを投稿するテストです。";
FB.api('me/feed', 'post', {message: msg}, function(res) {
  if (!res) {
    console.log("error"); return;
  }
  console.log(res);
});
