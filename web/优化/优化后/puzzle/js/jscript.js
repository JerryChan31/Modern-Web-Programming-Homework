var stepCount = 0;
window.onload = function() {
    autoGeneratePuzzleDiv();
    startGameWhenButtonClicked();
    endGame();
    difficultyChoose();
}
function autoGeneratePuzzleDiv() {
    var puzzlebox = $('#puzzle-box');
    for (var i = 0; i < 16; i++) {
        var node = $("<div></div>").attr({
            id : "pzz" + i,
            class : "pic1 puzzle-frame pos" + i,
        });
        puzzlebox.append(node);
    }
}
function startGameWhenButtonClicked() {
    var puzzle = $(".puzzle-frame");
    $("#start-button").click(function() {
        stepCount = 0;
        $("#stepCounter").val(0);
        $("#start-button").val("Restart!");
        var list = generatePzzQuere();
        for (var i = 0; i < 15; i++) {
            puzzle[i].id = "pzz" + list[i];
        }
        puzzle[15].id = "pzz15";
        pzzChangePositionWithBlank();
    });
}
function pzzChangePositionWithBlank() {
    var blank = $("#pzz15");
    var blankClass = blank.attr('class');
    var blankPos = parseInt((_.slice(blankClass,21, blankClass.length)).toString().replace(',',''));
    if ($(".pos" + (blankPos + 4)).length > 0) {
        var temp1 = $(".pos" + (blankPos + 4))[0].onclick = function() {
            exchangeIdWithBlank($(".pos" + (blankPos + 4))[0]);
        }
    }
    if ($(".pos" + (blankPos + 1)).length > 0 && blankPos + 1 != 4 && blankPos + 1 != 8 && blankPos + 1 != 12) {
        var temp1 = $(".pos" + (blankPos + 1))[0].onclick = function() {
            exchangeIdWithBlank($(".pos" + (blankPos + 1))[0]);
        }
    }
    if ($(".pos" + (blankPos - 1)).length > 0 && blankPos - 1 != 3 && blankPos - 1 != 7 && blankPos - 1 != 11) {
        var temp1 = $(".pos" + (blankPos - 1))[0].onclick = function() {
            exchangeIdWithBlank($(".pos" + (blankPos - 1))[0]);
        }
    }
    if ((".pos" + (blankPos - 4)).length > 0) {
        var temp1 = $(".pos" + (blankPos - 4))[0].onclick = function() {
            exchangeIdWithBlank($(".pos" + (blankPos - 4))[0]);
        }
    }
}
function exchangeIdWithBlank(obj1) {
    var blank = $("#pzz15");
    var temp = blank.attr('id');
    blank.attr('id', obj1.id);
    blank.attr('class', blank.attr('class')+" bigging");
    setTimeout(function() {
        blank.attr('class', blank.attr('class').slice(0, blank.attr('class').indexOf(" bigging")));
    }, 250);
    obj1.className += " smalling";
    setTimeout(function() {
        obj1.className = obj1.className.slice(0, obj1.className.indexOf(" smalling"))
    }, 250);
    obj1.id = temp;
    for (var i = 0; i < $(".puzzle-frame").length; i++) {
        $(".puzzle-frame")[i].onclick = function() {};
    }
    stepCount++;
    $("#stepCounter").val(stepCount);
    setTimeout("pzzChangePositionWithBlank()", 250);
    if (judgeIfWin() == true) {
        alert("You Win!\nStep:"+stepCount);
    }
}
function judgeIfWin() {
    var count = 0;
    var pzzArray = $(".puzzle-frame");
    for (var i = 0; i < 16; i++) {
        var j = parseInt(pzzArray[i].className.slice(21, pzzArray[i].className.length));
        var k = parseInt(pzzArray[i].id.slice(3, pzzArray[i].id.length));
        if (j == k) {
            count += 1;
        }
    }
    if (count == 16) {
        return true;
    } else {
        return false;
    }
}
function generatePzzQuere() {
    var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    while (1) {
        list = _.shuffle(list);
        var num = 0;
        for (var i = 0; i < 15; i++) {
            for (var j = i + 1; j < 15; j++) {
                if (list[i] > list[j]) {
                    num++;
                }
            }
        }
        if (num % 2 == 0) {
            return list;
            break;
        }
    }
}
function endGame() {
    var puzzle = $(".puzzle-frame");
    $("#end-button").click(function() {
        for (var i = 0; i < 16; i++) {
            puzzle[i].id = "pzz" + i;
            puzzle[i].onclick = function(){};
        }
        alert("You Lose!");
        stepCount = 0;
        $("#stepCounter").val(0);
        $("#start-button").val("Start!");
    });
}
function difficultyChoose() {
    var picn = $(".puzzle-frame");
    $("#easy").click(function() {
        for (var i = 0; i < picn.length; i++) {
            picn[i].className = "pic1 " + picn[i].className.slice(picn[i].className.indexOf("puzzle-frame"), picn[i].className.length);
        }
        $(".origin-pic")[0].className = "origin-pic pic1";
    });
    $("#hard").click(function() {
        for (var i = 0; i < picn.length; i++) {
            picn[i].className = "pic2 " + picn[i].className.slice(picn[i].className.indexOf("puzzle-frame"), picn[i].className.length);
        }
        $(".origin-pic")[0].className = "origin-pic pic2";
    });
    $("#hell").click(function() {
        for (var i = 0; i < picn.length; i++) {
            picn[i].className = "pic3 " + picn[i].className.slice(picn[i].className.indexOf("puzzle-frame"), picn[i].className.length);
        }
        $(".origin-pic")[0].className = "origin-pic pic3";
    });
}