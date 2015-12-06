// お気に入りの作品を取り出す for CasperJS

// 作詞掲示場のユーザー名とパスワード
var BBS_USER = "JS-TESTER";
var BBS_PASS = "ipCU12ySxI";

// CasperJSを使えるようにする
var casper = require('casper').create();
casper.start();

// 作詞掲示板のログインページを開く ---- (※1)
casper.open("http://uta.pw/sakusibbs/users.php?action=login");

// ログインする ---- (※2)
casper.then(function(){
  // フォームにユーザー名とパスワードを設定して送信
  this.fill("form", {
    username_mmlbbs6: BBS_USER,
    password_mmlbbs6: BBS_PASS
  }, true);
});

// マイページを開く ----- (※3)
casper.then(function(){
  // マイページのURLを取得する関数を定義
  var getLink = function () {
    var q = document.querySelector('#header_menu_linkbar a');
    return q.href;
  };
  // ページ内で評価
  var mypage_url = this.evaluate(getLink);
  this.echo("mypage url=" + mypage_url);
  // マイページを開く
  this.open(mypage_url);
});

// マイページのお気に入りを抽出する ---- (※4)
casper.then(function(){
  // お気に入りの作品を取得する関数を定義
  var pickupFav = function () {
    var res = [];
    var q = document.querySelectorAll('#favlist li > a');
    for (var i = 0; i < q.length; i++) {
      var text = q[i].textContent;
      var href = q[i].href;
      res.push(text);
    }
    return res;
  };
  // ページ内で評価
  var res = this.evaluate(pickupFav);
  // 結果を出力する
  this.echo("--- favlist ---");
  for (var i = 0; i < res.length; i++) {
    this.echo("- " + res[i]);
  }
});

// 実行
casper.run();
