// あるユーザーの作品をすべてお気に入りに for CasperJS

// --- 設定 ---
// 作詞掲示場のユーザー名とパスワード
var BBS_USER = "JS-TESTER";
var BBS_PASS = "ipCU12ySxI";

// どのユーザーIDを対象にするか(デフォルト指定)
var DEFAULT_USER_ID = 1;
var target_user_id = DEFAULT_USER_ID;

// CasperJSを作成
var casper = require('casper').create();
var utils = require('utils');

// コマンドライン引数を取得(どのユーザーを対象にするか?)
var args = casper.cli.args;
if (args.length >= 1) {
  target_user_id = parseInt(args[0]);
  if (target_user_id == 0) target_user_id = DEFAULT_USER_ID;
}
casper.echo("target_user_id=" + target_user_id);
casper.start();

// まずログインする ---- (※1)
casper.open("http://uta.pw/sakusibbs/users.php?action=login");
casper.then(function(){
  // フォームにユーザー名とパスワードを設定して送信
  this.fill("form", {
    username_mmlbbs6: BBS_USER,
    password_mmlbbs6: BBS_PASS
  }, true);
});

// 指定ユーザーのページを開く --- (※2)
casper.thenOpen(
  "http://uta.pw/sakusibbs/users.php?user_id=" +
  target_user_id);

// 作品一覧を取得する ---- (※3)
casper.then(function (){
  // ページ内で実行する関数を定義
  var getList = function () {
    var links = [];
    var list = document.querySelectorAll("ul#mmlist a");
    for (var i = 0; i < list.length; i++) {
      var a = list[i];
      // 作品ページへのリンクかどうかを確認
      if (a.href.indexOf('post.php') > 0) {
        links.push(a.href);
      }
    }
    return links;
  };
  // ページ内で関数を実行し作品一覧を列挙 --- (※4)
  var links = this.evaluate(getList);
  utils.dump(links);
  // 各リンクをすべて処理する
  casper.each(links, function(self, link){
    // 作品ページを開く --- (※5)
    self.thenOpen(link, function(){
      // お気に入りに追加ボタンがあればクリック
      if (this.exists('#fav_add_btn')) {
        this.mouseEvent('click', '#fav_add_btn');
        this.echo('- click:' + link);
      } else {
        this.echo('- already:' + link);
      }
    });
  });
});
// 最後にメッセージを表示
casper.then(function(){
  this.echo('ok');
});
casper.run();
