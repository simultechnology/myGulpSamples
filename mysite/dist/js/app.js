var myName;
var currentRoomName;
var dataStore;

$(function() {
    console.log('start!!!');
    // アプリケーション用のデータストアの参照を取得
    dataStore = new Firebase('https://incandescent-heat-946.firebaseio.com/');

    // メッセージ投稿
    $('#message').keypress(function(e) {
        if (e.keyCode == 13) {
            var message = $('#message').val();
            if( message == '' ) return;
            dataStore.child(currentRoomName + '/messages').push({
                'name': myName,
                'message': message
            });
            $('#message').val('');
        }
    });

    // チャットルーム作成
    $('#create-room').on('click', createRoom);

    // チャットルーム選択
    $('#rooms').on('click', '.room', function(e) {
        var roomName = $(e.currentTarget).children('a').text();
        joinRoom(roomName);
    });

    // チャットルーム選択リスト
    dataStore.on('child_added', function (dataSnapshot) {
        var key = dataSnapshot.key();
        var li = $('<li class="room">').append($('<a/>').text(key));
        $('#rooms .divider').before(li);
    });

    $(window).on('unload', leaveRoom);
});

function joinRoom(roomName) {
    myName = myName ? myName : prompt('あなたの名前は？');
    if( !myName ) return;

    if( currentRoomName ) leaveRoom();

    currentRoomName = roomName;
    $('#select-room').text(roomName);

    $('#messages').empty();

    var messages = dataStore.child(roomName + '/messages');
    messages.push({
        'message': myName + 'が入室しました'
    });

    messages.on('child_added', function(dataSnapshot) {
        var data = dataSnapshot.val();
        $('<div/>').html( (data.name ? data.name+' : ' : '') + data.message).appendTo('#messages');
        $('#scroller').scrollTop($('#messages').height());
    });
}

function createRoom() {
    var roomName = prompt('ルーム名は？');
    if( roomName && roomName != '' )
        joinRoom(roomName);
}

function leaveRoom() {
    if( currentRoomName ) {
        dataStore.child(currentRoomName + '/messages').push({
            'message': myName + 'が退室しました'
        });
    }
}