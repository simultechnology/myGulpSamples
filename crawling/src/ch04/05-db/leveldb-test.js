// LevelDBの利用例 for Node.js

// モジュールの取り込みとDBを開く --- (※1)
var levelup = require('level');
var db = levelup('./testdb');

// 値を設定 ---- (※2)
db.put('Apple', 'red', function (err) {
  if (err) { console.log('Error', err); return; }
  testGet();
});

// 値を取得 ---- (※3)
function testGet() {
  db.get('Apple', function (err, value) {
    if (err) { console.log('Error', err); return; }
    console.log('Apple=' + value);
    testBatch();
  });
}

// 一括設定 ---- (※4)
function testBatch() {
  db.batch()
    .put('Mango', 'yellow')
    .put('Banana', 'yellow')
    .put('Kiwi', 'green')
    .write(function(){ testGet2(); });
}

