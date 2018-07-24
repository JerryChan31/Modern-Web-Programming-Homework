var stepCount = 0;
window.onload = function() {
    autoGeneratePuzzleDiv();
    startGameWhenButtonClicked();
    endGame();
    difficultyChoose();
}

function autoGeneratePuzzleDiv() {
    var puzzlebox = document.getElementById("puzzle-box");
    for (var i = 0; i < 16; i++) {
        var node = document.createElement('div');
        node.id = "pzz" + i;
        node.className = "pic1 puzzle-frame pos" + i;
        puzzlebox.appendChild(node);
    }
}

function startGameWhenButtonClicked() {
    var puzzle = document.getElementsByClassName("puzzle-frame");
    document.getElementById("start-button").onclick = function() {
        stepCount = 0;
        document.getElementById("stepCounter").value = 0;
        document.getElementById("start-button").value = "Restart!";
        var list = generatePzzQuere();
        for (var i = 0; i < 15; i++) {
            puzzle[i].id = "pzz" + list[i];
        }
        puzzle[15].id = "pzz15";
        pzzChangePositionWithBlank();
    }
}

function pzzChangePositionWithBlank() {
    var blank = document.getElementById("pzz15");
    var blankClass = blank.className;
    var blankPos = parseInt(blankClass.slice(21, blankClass.length));
    if (document.getElementsByClassName("pos" + (blankPos + 4)).length > 0) {
        var temp1 = document.getElementsByClassName("pos" + (blankPos + 4))[0].onclick = function() {
            exchangeIdWithBlank(document.getElementsByClassName("pos" + (blankPos + 4))[0]);
        }
    }
    if (document.getElementsByClassName("pos" + (blankPos + 1)).length > 0 && blankPos + 1 != 4 && blankPos + 1 != 8 && blankPos + 1 != 12) {
        var temp1 = document.getElementsByClassName("pos" + (blankPos + 1))[0].onclick = function() {
            exchangeIdWithBlank(document.getElementsByClassName("pos" + (blankPos + 1))[0]);
        }
    }
    if (document.getElementsByClassName("pos" + (blankPos - 1)).length > 0 && blankPos - 1 != 3 && blankPos - 1 != 7 && blankPos - 1 != 11) {
        var temp1 = document.getElementsByClassName("pos" + (blankPos - 1))[0].onclick = function() {
            exchangeIdWithBlank(document.getElementsByClassName("pos" + (blankPos - 1))[0]);
        }
    }
    if (document.getElementsByClassName("pos" + (blankPos - 4)).length > 0) {
        var temp1 = document.getElementsByClassName("pos" + (blankPos - 4))[0].onclick = function() {
            exchangeIdWithBlank(document.getElementsByClassName("pos" + (blankPos - 4))[0]);
        }
    }
}

function exchangeIdWithBlank(obj1) {
    var blank = document.getElementById("pzz15");
    var blankClass = blank.className;

    var temp = blank.id;
    blank.id = obj1.id;
    blank.className += " bigging";
    setTimeout(function() {
        blank.className = blank.className.slice(0, blank.className.indexOf(" bigging"))
    }, 250);
    //obj1.id = temp;
    obj1.className += " smalling";
    setTimeout(function() {
        obj1.className = obj1.className.slice(0, obj1.className.indexOf(" smalling"))
    }, 250);
    setTimeout(function() {
        obj1.id = temp;
    }, 250);
    obj1.id = temp;
    for (var i = 0; i < document.getElementsByClassName("puzzle-frame").length; i++) {
        document.getElementsByClassName("puzzle-frame")[i].onclick = function() {};
    }
    stepCount++;
    document.getElementById("stepCounter").value = stepCount;
    setTimeout("pzzChangePositionWithBlank()", 250);
    if (judgeIfWin() == true) {
        alert("You Win!\nStep:"+stepCount);
    }
}

function judgeIfWin() {
    var count = 0;
    var pzzArray = document.getElementsByClassName("puzzle-frame");
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
        list.sort(function() {
            return 0.5 - Math.random();
        });
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
    var puzzle = document.getElementsByClassName("puzzle-frame");
    document.getElementById("end-button").onclick = function() {
        for (var i = 0; i < 16; i++) {
            puzzle[i].id = "pzz" + i;
            puzzle[i].onclick = function(){};
        }
        alert("You Lose!");
        stepCount = 0;
        document.getElementById("stepCounter").value = 0;
        document.getElementById("start-button").value = "Start!"
    }
}

function difficultyChoose() {
    var picn = document.getElementsByClassName("puzzle-frame");
    document.getElementById("easy").onclick = function() {
        for (var i = 0; i < picn.length; i++) {
            picn[i].className = "pic1 " + picn[i].className.slice(picn[i].className.indexOf("puzzle-frame"), picn[i].className.length);
        }
        document.getElementsByClassName("origin-pic")[0].className = "origin-pic pic1";
    }
    document.getElementById("hard").onclick = function() {
        for (var i = 0; i < picn.length; i++) {
            picn[i].className = "pic2 " + picn[i].className.slice(picn[i].className.indexOf("puzzle-frame"), picn[i].className.length);
        }
        document.getElementsByClassName("origin-pic")[0].className = "origin-pic pic2";
    }
    document.getElementById("hell").onclick = function() {
        for (var i = 0; i < picn.length; i++) {
            picn[i].className = "pic3 " + picn[i].className.slice(picn[i].className.indexOf("puzzle-frame"), picn[i].className.length);
        }
        document.getElementsByClassName("origin-pic")[0].className = "origin-pic pic3";
    }
}