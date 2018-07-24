window.onload = function() {
    markEveryBox();
    headOnclick();
}

function markEveryBox() {
    var allForm = $("table");
    allForm.each(function() {
        var form = $(this);
        var tableHead = form.find("th");
        var tableContent = form.find("td");
        var columnAmount = tableHead.length;
        var row = 0,
            i = 0,
            j = 0;

        tableHead.each(function() {
            $(this).addClass("Hcol" + j);
            j++;
        });

        tableContent.each(function() {
            $(this).addClass("col" + i);
            i++;
            if (i == columnAmount) {
                i = 0;
                row++;
            }
        });
    });
}

function headOnclick() {
    var allForm = $("table");
    allForm.each(function() {
        var thisForm = $(this);
        thisForm.find("th").attr("name", "");
        thisForm.find("th").click(function() {
            //initialize
            var temp = $(this).attr("name");
            thisForm.find("th").attr("name", "");
            thisForm.find("th").removeClass("upSorted");
            thisForm.find("th").removeClass("downSorted");
            $(this).attr("name", temp);

            //get head class
            temp = $(this).attr("class");
            var colClass = temp.slice(temp.indexOf("Hcol")+1, temp.indexOf("Hcol")+5);

            //sort
            var sorted = toSort($("#" + thisForm.attr("id") + " ." + colClass));
            var newRow = new Array;
            for (var i = 0; i < sorted.length; i++) {
                newRow[i] = sorted[i].parentNode;
                var temp = newRow[i].className
                if (temp.indexOf("alternate") != -1) {
                    temp = temp.slice(0, temp.indexOf("alternate")) + temp.slice(temp.indexOf("alternate")+9, temp.length);
                    newRow[i].className = temp;
                }
                if (i % 2 == 1) {
                    newRow[i].className += " alternate";
                }
            }

            //exchange when different condition
            if ($(this).attr("name") == "") {
                for (var i = 0; i < newRow.length; i++) {
                    $("#" + thisForm.attr("id") + " tbody").append(newRow[i]);
                }
                $(this).addClass(" upSorted");
                $(this).attr("name", "up");
            } else if ($(this).attr("name") == "up") {
                for (var i = newRow.length - 1; i >= 0; i--) {
                    $("#" + thisForm.attr("id") + " tbody").append(newRow[i]);
                }
                $(this).addClass(" downSorted");
                $(this).attr("name", "");
            }
        });
    });
}


function toSort(toBeSorted) {
    return _.sortBy(toBeSorted, function(toBeSorted) {
        return toBeSorted.innerHTML;
    });
}