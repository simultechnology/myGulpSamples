// YouTubeを検索する for Node.js

// モジュールの取り込み
var exec = require('child_process').exec;
var Youtube = require('youtube-node');
var youtube = new Youtube();

// APIキーを設定する (以下を書き換え) --- (※1)
youtube.setKey('AIzaSyBSAwRxvrqIBRscyapCMY9CSYU5uObdIMI');

// 検索を実行
var keyword = 'ネコ';
var limit = 2;
// オプションを指定 ----- (※2)
youtube.addParam('order', 'viewCount'); // ダウンロード順に
youtube.addParam('type', 'video');
youtube.addParam('videoLicense', 'creativeCommon'); // クリエイティブコモンズ
youtube.addParam('videoDuration', 'short'); // 短い動画で
youtube.search(keyword, limit, function(err, result) {
  if (err) { console.log(err); return; }
  // 動画のURLを表示する
  var items = result["items"];
  for (var i in items) {
    var it = items[i];
    var title = it["snippet"]["title"];
    var video_id = it["id"]["videoId"];
    console.log(title, video_id);
    // ダウンロード実行
    downloadVideo(video_id);
  }
});

// youtube-dlを使ってダウンロード ------ (※3)
function downloadVideo(video_id) {
  var url = "https://www.youtube.com/watch?v=" + video_id;
  exec('youtube-dl ' + url, function(err, stdout, stderr) {
    if (err) { console.log(err); return; }
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
  });
}


