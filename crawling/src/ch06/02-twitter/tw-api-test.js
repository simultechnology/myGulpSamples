// Twitterを使うテスト for Node.js
var Twit = require('twit');

// 以下、正しいキーを設定してください★----- (※1)
var T = new Twit({
  consumer_key: '051dEbfwOFYrQwTaifmeB3AVP',
  consumer_secret: 'ARcMIhyRM8ToY5uRllRVQsOE3TwZoG6lvDxOEeLWzq8HaCn1t6',
  access_token: '6739522-zNRepPfpLdXt7BVr7e6SnRYPolOxS8WTZ8GJWRCkNu',
  access_token_secret:'ikXZFHUY2nOsCXVlQemo4htdvEUaExWfwgMhReNEe0QX6'
});

// JavaScriptに関するつぶやきを表示する ---- (※2)
var stream = T.stream('statuses/filter', {track: 'JavaScript'} );
// つぶやきがあったときに呼ばれるイベントを設定 --- (※3)
stream.on('tweet', function (tw) {
  var text = tw.text;
  var user_name = tw.user.name;
  console.log(user_name + "> " + text);
});

