// Flickr�Ō������X�N���[���V���b�g�B�� for CasperJS
// CasperJS�̃I�u�W�F�N�g���쐬
var casper = require('casper').create();

// CasperJS�̏������J�n���� ---- (��1)
casper.start();

// ��ʃT�C�Y���w�肷�� ---- (��2)
casper.viewport(1400, 800);

// UserAgent�̎w��
casper.userAgent('User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');

// Flickr�̃T�C�g�Ńl�R������ ---- (��3)
var text = encodeURIComponent("�l�R");
casper.open('https://www.flickr.com/search/?text=' + text);

// ���̌�A��ʂ��L���v�`��---- (��4)
casper.then(function(){
  this.capture('flickr-cat.png',{
    top:0, left:0, width: 1400, height: 800
  });
});

// ���s�J�n
casper.run();