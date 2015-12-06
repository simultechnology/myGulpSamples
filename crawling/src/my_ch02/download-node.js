/**
 * Created by t_ishikawa on 2015/11/15.
 */

var url = "http://www.goal.com/jp";

var savepath = 'test2.html';

var http = require('http');
var fs = require('fs');

var outfile = fs.createWriteStream(savepath);

http.get(url, function(res) {
    //console.log(res);
    res.pipe(outfile);
    res.on('end', function () {
        outfile.close();
        console.log('OK!');
    });
});