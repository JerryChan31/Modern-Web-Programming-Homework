var http = require("http");
var url = require("url");
var fs = require("fs");
var querystring = require("querystring");
var util = require('util');

allUser = [];

function loadAllUsers() {
    fs.readFile("./data.json", 'utf-8', function(err, data) {
        if (err) throw err;
        if (data.length != 0) {
            allUser = JSON.parse(data);
        }
    });
}

http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var suffix = pathname.match(/(\.[^.]+|)$/)[0];
    switch (suffix) {
        //loading stylesheet and client-side javascript
        case ".css":
        case ".js":
            fs.readFile('.' + request.url, 'utf-8', function(err, data) {
                if (err) throw err;
                response.writeHead(200, {
                    "Content-Type": {
                        ".css": "text/css",
                        ".js": "application/javascript",
                    }[suffix]
                });
                response.write(data);
                response.end();
            });
            break;
        case ".jpg":
            fs.readFile('.' + request.url, 'binary', function(err, data) {
                if (err) throw err;
                response.writeHead(200, {
                    "Content-Type": {
                        ".jpg": "image/jpg"
                    }
                });
                response.write(data, 'binary');
                response.end();
            });
            break;
        default:
            //load html and receive request
            accept(request, response, pathname);
            break;
    }
}).listen(8000);
loadAllUsers();

function accept(request, response, pathname) {
    //console.log(pathname);
    if (pathname === "/postlogin") {
        var tempstr = "";
        var check_result;
        request.addListener("data", function(postdata) {
            tempstr += postdata; //receive data
            var jsondata = querystring.parse(tempstr); // change into JSON data
            check_result = checkIfRepeat(jsondata);
            if (check_result == 0) {
                allUser.push(jsondata);
                fs.writeFile("./data.json", JSON.stringify(allUser, null, 2), 'utf8'); //write into JSON
            }
            var decodedata = decodeURIComponent(tempstr); // decode
            tempstr = decodedata;
        });
        request.addListener("end", function() {
            if (check_result == 0) {
                var arr = string2Array(tempstr);
                jumpToInfoPage(response, arr);
            } else {
                repeatedMethod(response, check_result);
            }
        });
    } else if (request.url.match(/^\/\?username=.+$/) != null) {
        tempName = request.url.slice(request.url.indexOf('=')+1, request.url.length);
        for (var i = 0; i < allUser.length; i++) {
            var a = JSON.stringify(allUser[i], ['username']);
            a = a.slice(a.indexOf(':')+2, a.length-2);
            if (a === tempName) {
                var b = JSON.stringify(allUser[i], ['identity']);
                b = b.slice(b.indexOf(':')+2, b.length-2);
                var c = JSON.stringify(allUser[i], ['phoneNum']);
                c = c.slice(c.indexOf(':')+2, c.length-2);
                var d = JSON.stringify(allUser[i], ['email']);
                d = d.slice(d.indexOf(':')+2, d.length-2)
                jumpToInfoPage(response, [a, b, c, d]);
            }
        }
    } else {
        fs.readFile('./index.html', 'utf-8', function(err, data) {
            if (err) throw err;
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            response.write(data);
            response.end();
        });
    }
}

function string2Array(str) {
    var pairArr = str.split('&');
    for (var i = 0; i < 4; i++) {
        pairArr[i] = pairArr[i].slice(pairArr[i].indexOf('=') + 1, pairArr[i].length);
    }
    return pairArr;
}

function jumpToInfoPage(response, arr) {
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    var newpage = fs.readFileSync("./index.html", 'utf-8');
    newpage = newpage.replace('id = "username" value = ""', 'id = "username" value = "' + arr[0] + '" disabled = true ');
    newpage = newpage.replace('id = "identity" value = ""', 'id = "identity" value = "' + arr[1] + '" disabled = true ');
    newpage = newpage.replace('id = "phoneNum" value = ""', 'id = "phoneNum" value = "' + arr[2] + '" disabled = true ');
    newpage = newpage.replace('id = "email" value = ""', 'id = "email" value = "' + arr[3] + '" disabled = true ');
    newpage = newpage.replace('<input type = "submit">', '');
    newpage = newpage.replace('<input type = "reset">', '');
    response.write(newpage);
    response.end();
}

function checkIfRepeat(jsondata) {
    for (var i = 0; i < allUser.length; i++) {
        if (JSON.stringify(allUser[i], ['username']) === JSON.stringify(jsondata, ['username'])) {
            console.log("existed username");
            return 1;
        }
        if (JSON.stringify(allUser[i], ['identity']) === JSON.stringify(jsondata, ['identity'])) {
            console.log("existed id");
            return 2;
        }
        if (JSON.stringify(allUser[i], ['phoneNum']) === JSON.stringify(jsondata, ['phoneNum'])) {
            console.log("existed phone number");
            return 3;
        }
        if (JSON.stringify(allUser[i], ['email']) === JSON.stringify(jsondata, ['email'])) {
            console.log("existed email");
            return 4;
        }
    }
    return 0;
}

function repeatedMethod(response, check_result) {
    var indexpage = fs.readFileSync("./index.html", 'utf-8');
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(indexpage);
    if (check_result == 1) {
        response.write('<script>alert("该用户名已被注册！请重新输入")</script>');
    } else if (check_result == 2) {
        response.write('<script>alert("该学号已被注册！请重新输入")</script>');
    } else if (check_result == 3) {
        response.write('<script>alert("该电话号码已被注册！请重新输入")</script>');
    } else if (check_result == 4) {
        response.write('<script>alert("该邮箱已被注册！请重新输入")</script>');
    }
    response.end();
}

console.log("Server is running.");