var t;
var c = 30;
var mole;


window.onload = function() {
    appendRadioButton();
    for (var i = 0; i < document.getElementsByClassName("radio").length; i++) {
        document.getElementsByClassName("radio")[i].disabled = true;
    }
    document.getElementById("statusbar").value = "Game Over";
    document.getElementById("startButton").onclick = function() {
        mole = generateMole();
        startGame();
    }
}

function appendRadioButton() {
    var num = 0;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 10; j++) {
            var appendArea = document.getElementById("playArea");
            var node = document.createElement("input");
            node.type = "radio";
            node.checked = false;
            node.className = "radio";
            node.name = "button";
            node.id = "" + num;
            num++;
            appendArea.appendChild(node);
        }
    }
}

function generateMole() {
    var randomNum = Math.floor(Math.random() * 60);
    document.getElementById("" + randomNum).checked = true;
    return randomNum;
}

function hitMole() {
    for (var i = 0; i < document.getElementsByClassName("radio").length; i++) {
        document.getElementsByClassName("radio")[i].onclick = function() {
            if (this.id == "" + mole) {
                document.getElementById("scorer").value = parseInt(document.getElementById("scorer").value) + 1;
                this.checked = false;
                mole = generateMole();
            } else if (this.id != "" + mole) {
                document.getElementById("scorer").value = parseInt(document.getElementById("scorer").value) - 1;
                this.checked = false;
                document.getElementById(""+ mole).checked = true;
            }
        }
    }
}

function startGame() {
    for (var i = 0; i < document.getElementsByClassName("radio").length; i++) {
        document.getElementsByClassName("radio")[i].disabled = false;
    }
    document.getElementById("scorer").value = 0;
    timeCounter1();
    hitMole();
    document.getElementById("statusbar").value = "Playing";
    document.getElementById("startButton").onclick = function() {
        stopGame();
    }

}

function stopGame() {
    for (var i = 0; i < document.getElementsByClassName("radio").length; i++) {
        document.getElementsByClassName("radio")[i].disabled = true;
    }
    clearTimeout(t);
    document.getElementById("statusbar").value = "Pausing";
    document.getElementById("startButton").onclick = function() {
        startGame();
    }
}

function timeCounter1() {
    if (c >= 0) {
        document.getElementById("timer").value = c;
        c--;
        t = setTimeout("timeCounter1()", 1000);
    } else {
        alert("Time is up!\nYour Score is:" + document.getElementById("scorer").value);
        document.getElementById("statusbar").value = "Game Over";
        c = 30;
        for (var i = 0; i < document.getElementsByClassName("radio").length; i++) {
            document.getElementsByClassName("radio")[i].disabled = true;
        }

        document.getElementById("startButton").onclick = function() {
            startGame();
        }
    }
}