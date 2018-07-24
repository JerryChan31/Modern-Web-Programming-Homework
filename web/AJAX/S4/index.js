var clicked = [];
var order = ['buttonA', 'buttonB', 'buttonC', 'buttonD', 'buttonE'];
order = _.shuffle(order)
var unclicked = order.slice(0);
console.log("order: " + order);
var sum = 0;
var leftStatus = 0;

window.onload = function() {
    $('.unread').hide();
    showRandomNumberWhenClicked();
    $('.apb').click(function() {
        $('#' + unclicked[0]).trigger('click');
    });
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
                leftStatus = 0;
                calculate(data);
                disableClicked();
                showRandomNumberWhenClicked();
                if (unclicked.length != 0 && leftStatus != 1) {
                    $('#' + unclicked[0]).trigger('click');
                } else if (leftStatus == 1) {
                    for (var i = 0; i < unclicked.length; i++) {
                        $('#' + unclicked[i]).unbind();
                    }
                    showRandomNumberWhenClicked();
                }
            });
        });
    }
}

function hideWhenMouseout() {
    $('#button').mouseleave(function() {
        setTimeout("$('.unread').hide()", 1000);
        clicked = [];
        console.log("hide");
        console.log(order);
        order = _.shuffle(order);
        unclicked = order.slice(0);
        //alert("hide when mouseout");
        sum = 0;
        leftStatus = 1;
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
            //console.log("cal-order:");
            //console.log(order);
            order = _.shuffle(order);
            unclicked = order.slice(0);
            for (var i = 0; i < unclicked.length; i++) {
                $('#' + unclicked[i]).unbind();
            }
            showRandomNumberWhenClicked();
        });
        leftStatus = 1;
        $('#info-bar').trigger('click');
    } else {
        sum += _.toNumber(data);
        console.log(data);
        console.log(sum);
        console.log("during" + order);
        callback = 0;
    }
}