var fs = require('fs');
var sep = require('path').sep;

//获取当前目录下的所有文件列表数组
function prepare(callback) {
    fs.readdir(__dirname, function (err, list) {
        var files = [];
        if (err) {
            callback(files);
        } else {
            list.forEach(function (item, index) {
                var tmp = __dirname + sep + item;
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
    var artist = '';
    var match = file.match(reg);
    if (match) {
        artist = match[0];
    }
    return artist;
}

function classify(file, reg, stat) {
    var artist = getArtist(file, reg);
    var dir = __dirname + sep + artist;
    if (artist) {
        fs.mkdir(dir, function (err) {
            if (err && err.code !== 'EEXIST') {
                stat.fail();
                console.log('[ERROR] mkdir "%s" error', artist, err);
                return;
            }

            var olddir = __dirname + sep + file;
            var newdir = dir + sep + file;
            fs.rename(olddir, newdir, function (err) {
                if (err) {
                    stat.fail();
                    console.log('[ERROR] move file "%s" error', file, err);
                    return;
                }

                stat.success();
            });
        });
    } else {
        stat.pass();
    }
}

//统计成功失败
function statistics(total) {
    var _this = this;
    var result = { total: total, success: 0, fail: 0, pass: 0 };
    function success() {
        result.success++;
        isDone();
    }
    function fail() {
        result.fail++;
        isDone();
    }
    function pass() {
        result.pass++;
        isDone();
    }
    function done(callback) {
        _this.callback = callback || function () { };
    }
    function isDone() {
        var total = result.success + result.fail + result.pass;
        if (total >= result.total) {
            _this.callback(result);
        }
    }

    return {
        success: success,
        fail: fail,
        pass: pass,
        done: done
    }
}

//匹配演唱者，格式必须是 [音轨.]演唱者 - 歌曲名[其他].*
var regArtist = /(?!\s)(\w|[\u4e00-\u9fa5]|\s)*?(?=\s*[-&])/;
prepare(function (files) {
    var stat = new statistics(files.length);
    stat.done(function (data) {
        var result =
                '\x1b[0mSuccess：\x1b[32m%s\r\n' +
                '\x1b[0mFailure：\x1b[31m%s\r\n' +
                '\x1b[0mPass   ：%s';
        console.log(result, data.success, data.fail, data.pass);
    });

    files.forEach(function (file) {
        classify(file, regArtist, stat);
    });
});
