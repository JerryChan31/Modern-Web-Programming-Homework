var clicked = [];
var unclicked = ['buttonA', 'buttonB', 'buttonC', 'buttonD', 'buttonE'];
var sum = 0;

window.onload = function() {
    $('.unread').hide();
    showRandomNumberWhenClicked();
    hideWhenMouseout();
}

function showRandomNumberWhenClicked() {
    for (var i = 0; i < unclicked.length; i++) {
        $("#" + unclicked[i]).removeClass('disabled');
        $('#' + unclicked[i]).click(function() {
            $(this).unbind();
            var tempid = $(this).attr('id');
            var temp = $("#" + tempid + " .unread");
            updateArr(tempid);
            showWaiting(temp);
            disableUnclicked();
            $.get("/randomnum", function(data, status) {
                temp.html(data);
                calculate(data);
                disableClicked();
                showRandomNumberWhenClicked();
            });
        });
    }
}

function hideWhenMouseout() {
    $('#button').mouseleave(function() {
        setTimeout("$('.unread').hide()", 1000);
        clicked = [];
        unclicked = ['buttonA', 'buttonB', 'buttonC', 'buttonD', 'buttonE'];
        sum = 0;
        setTimeout("$('#sum').html(sum)", 1000);
        for (var i = 0; i < unclicked.length; i++) {
            $('#' + unclicked[i]).unbind();
        }
        if ($('#info-bar').attr('class').indexOf("disabled") === -1) {
            $('#info-bar').addClass('disabled');
        }
        showRandomNumberWhenClicked();
    });
}

function showWaiting(jqobj) {
    jqobj.show();
    jqobj.html("...");
}

function updateArr(tempid) {
    clicked.push(tempid);
    _.remove(unclicked, function(n) {
        return n === tempid;
    });
    console.log(clicked);
    console.log(unclicked);
}

function disableUnclicked() {
    for (var i = 0; i < unclicked.length; i++) {
        $("#" + unclicked[i]).unbind();
        $("#" + unclicked[i]).addClass('disabled');
    }
}

function disableClicked() {
    for (var i = 0; i < clicked.length; i++) {
        $("#" + clicked[i]).unbind();
        $("#" + clicked[i]).addClass('disabled');
    }
}

function calculate(data) {
    if (unclicked.length === 0) {
        $('#info-bar').unbind();
        $('#info-bar').removeClass('disabled');
        $('#info-bar').click(function() {
            $('#sum').html(sum + _.toNumber(data));
            $('#info-bar').addClass('disabled');
            $('#info-bar').unbind();
            sum = 0;
            clicked = [];
            unclicked = ['buttonA', 'buttonB', 'buttonC', 'buttonD', 'buttonE'];
            for (var i = 0; i < unclicked.length; i++) {
                $('#' + unclicked[i]).unbind();
            }
            showRandomNumberWhenClicked();
        });
    } else {
        sum += _.toNumber(data);
        console.log(data);
        console.log(sum);
    }
}