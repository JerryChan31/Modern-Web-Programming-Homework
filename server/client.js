function submitTest() {
    var uname = $('#username').val();
    var id = $('#identity').val();
    var pnum = $('#phoneNum').val();
    var email = $('#email').val();
    if ((judgeIfEmpty(uname, id, pnum, email)) && (judgeUname(uname)) && (judgeID(id)) && (judgePhoneNum(pnum))) {
        return true;
    } else {
        return false;
    }
}

function judgeIfEmpty(uname, id, pnum, email) {
    if (uname.length == 0 || id.length == 0 || pnum.length == 0 || email.length == 0) {
        alert("请填入完整信息");
        return false;
    } else {
        return true;
    }
}

function judgeUname(uname) {
    if (uname.length < 6 || uname.length > 18) {
        alert("用户名长度为6-18位");
        return false;
    }
    if (uname.match(/^([A-Za-z])[a-zA-Z_\d]*$/) === null) {
        alert("用户名应由字母、数字、下划线组成，且开头必须为字母");
        return false;
    }
    return true;
}

function judgeID(id) {
    if (id.match(/^[1-9]\d{7}$/) === null) {
        alert("学号8位数字，不能以0开头");
        return false;
    }
    return true;
}

function judgePhoneNum(pNum) {
    if (pNum.match(/^[1-9]\d{10}$/) === null) {
        alert("电话11位数字，不能以0开头");
        return false;
    }
    return true;
}
