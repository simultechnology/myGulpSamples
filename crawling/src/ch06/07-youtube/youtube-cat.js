// YouTubeを検索する for Node.js

var Youtube = require('youtube-node');
var youtube = new Youtube();

// APIキーを設定する (以下を書き換え) --- (※1)
youtube.setKey('AIzaSyBSAwRxvrqIBRscyapCMY9CSYU5uObdIMI');

// 検索を実行 
var keyword = 'cat';
var limit = 5;
// オプションを指定 ----- (※2)
youtube.addParam('order', 'rating'); // 評価順に検索
youtube.addParam('type', 'video');
youtube.addParam('videoLicense', 'creativeCommon'); // クリエイティブコモンズ
youtube.search(keyword, limit, function(err, result) {
  if (err) { console.log(err); return; }
  // 動画のURLを表示する -------- (※3)
  var items = result["items"];
  for (var i in items) {
    var it = items[i];
    var title = it["snippet"]["title"];
    var video_id = it["id"]["videoId"];
    var url = "https://www.youtube.com/watch?v=" + video_id;
    console.log("+ " + title);
    console.log("| " + url);
    console.log("----------------");
  }
});




