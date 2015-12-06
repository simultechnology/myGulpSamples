// YouTubeを検索する for Node.js

var Youtube = require('youtube-node');
var youtube = new Youtube();

// APIキーを設定する (以下を書き換え) --- (※1)
youtube.setKey('AIzaSyBSAwRxvrqIBRscyapCMY9CSYU5uObdIMI');

// 検索を実行 ----- (※2)
var keyword = 'ネコ';
var limit = 3;
youtube.search(keyword, limit, function(err, result) {
  if (err) { console.log(err); return; }
  // 結果を表示
  console.log(JSON.stringify(result, null, 2));
});


