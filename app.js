var fs = require('fs');
var path = require('path');

//获取当前目录下的所有文件列表数组
function prepare(callback) {
    fs.readdir(__dirname, function (err, list) {
        var files = [];
        if (err) {
            callback(files);
        } else {
            list.forEach(function (item, index) {
                var tmp = __dirname + '/' + item;
                if (fs.statSync(tmp).isDirectory()) {
                    //跳过目录
                    return;
                }
                files.push(item);
            });
            callback(files);
        }
    });
}

//根据文件名获取演唱者
function getArtist(file, reg) {
    var artist;
    var match = file.match(reg);
    var path = __dirname + '/';
    if (match) {
        artist = match[0];
    }
    return artist;
}

function classify(file) {
    var artist = getArtist(file);
    var dir = __dirname + "/" + artist;
    fs.mkdir(dir, function (err) {
        if (err && err.code !== 'EEXIST') {
            console.log('[MKDIR_ERROR] CODE=%S', err.code);
            return;
        }


    })
}

//匹配演唱者，格式必须是 [音轨.]演唱者 - 歌曲名[其他].*
var regArtist = /(?!\s)(\w|[\u4e00-\u9fa5]|\s)*?(?=\s*[-&])/;
prepare(function (files) {
    files.forEach(function (file) {
        handler(file, regArtist);
    })
})
