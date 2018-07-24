var gameStatus = false;
window.onload = function() {
    startGame();
    endGame();
}

function startGame() {
    document.getElementById("start").onmouseover = function() {
        eraseHint();
        gameStatus = true;
        mouseOverTheWall();
        cheatJudge();
    }
}

function endGame() {
    document.getElementById("end").onmouseover = function() {
        if (gameStatus == true) {
            successHint();
            gameStatus = false;
            eraseCheatJudge();
            eraseMouseOverTheWall();
        }
    }
}

function mouseOverTheWall() {
    if (gameStatus == true) {
        for (var i = 0; i < document.getElementsByClassName("wall").length; i++) {
            document.getElementsByClassName("wall")[i].onmouseover = function() {
                if (this.className.indexOf('changed') < 0) {
                    this.className += 'changed';
                }
                failedHint();
                gameStatus = false;
                eraseCheatJudge();
            }
            document.getElementsByClassName("wall")[i].onmouseout = function() {
                if (this.className.indexOf('changed') >= 0) {
                    this.className = this.className.substring(0, this.className.indexOf('changed'));
                }
                eraseMouseOverTheWall();
            }
        }
    }
}

function eraseMouseOverTheWall() {
    for (var i = 0; i < document.getElementsByClassName("wall").length; i++) {
        document.getElementsByClassName("wall")[i].onmouseover = function() {}
        document.getElementsByClassName("wall")[i].onmouseout = function() {}
    }
}

function cheatJudge() {
    if (gameStatus == true) {
        document.getElementById('cheatJudgeBox').onmouseover = function() {
            eraseMouseOverTheWall();
            cheatHint();
            gameStatus = false;
            eraseCheatJudge();
        }
    }
}

function eraseCheatJudge() {
    document.getElementById('cheatJudgeBox').onmouseover = function() {}
}

//game hint
function failedHint() {
    var hintbox = document.getElementById('hint');
    fHint = document.createElement('p');
    var newText = document.createTextNode("You Lose!");
    fHint.className = "hint-text";
    fHint.appendChild(newText);
    if (hintbox.childNodes.length == 3) {
        hintbox.replaceChild(fHint, hintbox.childNodes[1]);
    }
    setTimeout(function() {fHint.className = "hint-text1";}, 100);
}

function successHint() {
    var hintbox = document.getElementById('hint');
    fHint = document.createElement('p');
    var newText = document.createTextNode("You win!");
    fHint.className = "hint-text";
    fHint.appendChild(newText);
    if (hintbox.childNodes.length == 3) {
        hintbox.replaceChild(fHint, hintbox.childNodes[1]);
    }
    setTimeout(function() {fHint.className = "hint-text1";}, 100);
}

function cheatHint() {
    var hintbox = document.getElementById('hint');
    fHint = document.createElement('p');
    var newText = document.createTextNode("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
    fHint.className = "hint-text";
    fHint.appendChild(newText);
    if (hintbox.childNodes.length == 3) {
        hintbox.replaceChild(fHint, hintbox.childNodes[1]);
    }
    setTimeout(function() {fHint.className = "hint-text1";}, 100);
}

function eraseHint() {
    var hintbox = document.getElementById('hint');
    fHint = document.createElement('p');
    var newText = document.createTextNode(" ");
    fHint.className = "hint-text";
    fHint.appendChild(newText);
    if (hintbox.childNodes.length == 3) {
        hintbox.replaceChild(fHint, hintbox.childNodes[1]);
    }
}