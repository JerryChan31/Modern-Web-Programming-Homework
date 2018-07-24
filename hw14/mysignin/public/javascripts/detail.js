function delCookie(name) {
    var myDate = new Date();
    myDate.setTime(-1000); //设置时间    
    document.cookie = name + "=''; expires=" + myDate.toGMTString();
}

$(function() {
    $('#logout').click(function() {
        delCookie("user");
        location.href = '/';
    });
})