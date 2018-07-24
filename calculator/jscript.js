window.onload = function() {
    document.getElementById('output').value = 0;
    var n = 0;
    //binding onclick function for every number button
    for (var i = 0; i < document.getElementsByClassName('nbutton').length; i++) {
        document.getElementsByClassName('nbutton')[i].onclick = function() {
            if (document.getElementById('output').value != "0") {
                var origin = document.getElementById('output').value;
                var appends = origin + this.value;
                document.getElementById('output').value = appends;
            } else {
                var appends = this.value;
                document.getElementById('output').value = appends;
            }
        }
    }
    //obutton
    for (var i = 0; i < document.getElementsByClassName('obutton').length; i++) {
        document.getElementsByClassName('obutton')[i].onclick = function() {
            var origin = "" + document.getElementById('output').value;
            if (isNaN(parseInt(origin.charAt(origin.length - 1))) && this.value != "(" && origin.charAt(origin.length - 1) != ")" && origin.charAt(origin.length - 1) != "(") {} else {
                var appends = origin + this.value;
                document.getElementById('output').value = appends;
            }
        }
    }

    //CE
    document.getElementById('clearall').onclick = function() {
        document.getElementById('output').value = 0;
    }

    //backspace
    document.getElementById('obsp').onclick = function() {
        var origin = "" + document.getElementById('output').value;
        if (origin.length != 1) {
            var result = origin.substring(0, origin.length - 1);
            document.getElementById('output').value = result;
        } else {
            document.getElementById('output').value = 0;
        }
    }

    //equal
    document.getElementById('oequal').onclick = function() {
        try {
            var result = eval(document.getElementById('output').value);
        } catch (err) {
            alert("Wrong Expression!");
            return;
        }
        var validation = "" + parseInt(result);
        if (result == "Infinity") {
            alert("Error:Divisor is zero!");
        } else {
            if (String(result).lastIndexOf(".") != -1 && String(result).length - String(result).lastIndexOf(".") >= 9) {
                document.getElementById('output').value = result.toFixed(8);  
            } else {
                document.getElementById('output').value = result;
            }            
        }
    }
}