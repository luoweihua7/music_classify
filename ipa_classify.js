let fs = require('fs');
let path = require('path');
let REGEX = /(.*?)\s(\d+\s)?([\d\.]*)?\.ipa/;

fs.readdir(__dirname, function(err, docs) {
    if (!err) {
        console.log('\033[31m' + err.message);
        return;
    }

    docs.forEach(function(fileName) {
        if (fs.statSync(fileName).isDirectory()) {
            return;
        }

        fileName.replace(REGEX, function(filename, appName, $2, version) {
            let newFileName = appName + ' ' + version + '.ipa';
            let resolvePath = path.join(appName, newFileName);
            let newfolder = path.join(__dirname, appName);

            fs.mkdir(newfolder, function(err) {
                let oldfile = path.join(__dirname, filename);
                let newfile = path.join(__dirname, resolvePath);
                
                fs.rename(oldfile, newfile, function(err) {
                    if (!err) {
                        console.log('\033[32m' + filename + '\033[39m \t\t\tmoved to \t' + '\033[32m' + resolvePath + '\033[39m');
                    } else {
                        console.log('\033[31m' + filename + '\033[39m move failure!\n');
                    }
                })
            })
        })
    });
})
