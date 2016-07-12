
var fs = require('fs');
makeP('x/y/z/n');

function makeP(path) {
    var arr = path.split('/');
    var i = 0;
    var cur = arr.slice(0, i + 1).join('/');
    function createP() {
        var flag = 0;
        if (fs.exists(cur, function (err) {
            })) {
            if (!err) {
                flag++;
            }
        }
        ;
        if (!flag) {
            fs.mkdir(cur, function (e) {
                console.log(e);
                i++;
                cur = arr.slice(0, i + 1).join('/');
                if (i < arr.length) {
                    createP();
                }
            });
        }
    };
    createP();

}