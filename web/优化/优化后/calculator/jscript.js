window.onload = function() {
    $('#output').val(0);
    var n = 0;
    for (var i = 0; i < $('.nbutton').length; i++) {
        $('.nbutton')[i].onclick = function() {
            if ($('#output').val() != "0") {
                var origin = $('#output').val();
                var appends = origin + this.value;
                $('#output').val(appends);
            } else {
                var appends = this.value;
                $('#output').val(appends);
            }
        }
    }
    for (var i = 0; i < $('.obutton').length; i++) {
        $('.obutton')[i].onclick = function() {
            var origin = "" + $('#output').val();
            if (isNaN(parseInt(origin.charAt(origin.length - 1))) && this.value != "(" && origin.charAt(origin.length - 1) != ")" && origin.charAt(origin.length - 1) != "(") {} else {
                var appends = origin + this.value;
                $('#output').val(appends);
            }
        }
    }
    $('#clearall').click(function() {
        $('#output').val(0);
    });
    $('#obsp').click(function() {
        var origin = "" + $('#output').val();
        if (origin.length != 1) {
            var result = origin.substring(0, origin.length - 1);
            $('#output').val(result);
        } else {
            $('#output').val(0);
        }
    });
    $('#oequal').click(function() {
        try {
            var result = eval($('#output').val());
        } catch (err) {
            alert("Wrong Expression!");
            return;
        }
        var validation = "" + parseInt(result);
        if (result == "Infinity") {
            alert("Error:Divisor is zero!");
        } else {
            if (String(result).lastIndexOf(".") != -1 && String(result).length - String(result).lastIndexOf(".") >= 9) {
                $('#output').val(result.toFixed(8));  
            } else {
                $('#output').val(result);
            }            
        }
    });
}