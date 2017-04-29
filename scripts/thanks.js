$(function() {
    "use strict";

    var nameSpan = document.getElementById("nameSpan");
    var emailSpan = document.getElementById("emailSpan");
    var flightDateSpan = document.getElementById("flightDateSpan");
    var messageSpan = document.getElementById("messageSpan");

    var queryString = decodeURIComponent(location.search.substr(1));
    var pairs = queryString.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var onePair = pairs[i].split("=");
        var qsName = onePair[0];
        var qsValue = onePair[1];
        if (qsName == "date") {
            if (qsValue == "") {
                flightDateSpan.innerHTML = "You didn't enter a flight date";
            } else {
                var dateSplit = qsValue.split("/"); //date repair
                var mm = dateSplit[0];
                var dd = dateSplit[1];
                var yy = dateSplit[2];
                flightDateSpan.innerHTML = dd + "-" + mm + "-" + yy;
            }
        } else if (qsName == "fullName") {
            //one option to replace "+"
            if (qsValue.indexOf("+") > -1) {
                var pairName = qsValue.split("+");
                var qsNameValue = {
                    qsFirstName: pairName[0],
                    qsLastName: pairName[1]
                }
                nameSpan.innerHTML = qsNameValue.qsFirstName + " " + qsNameValue.qsLastName;
            } else {
                nameSpan.innerHTML = qsValue;
            }
        } else if (qsName == "message") {
            //second option to replace "+"
            var cleanMessage = qsValue.replace(/\+/g, ' '); // "/" - starting regex, "\+" - using plain + , "/" - ending regex, "g" - global = all occurences
            //of the regex pattern in the text
            messageSpan.innerHTML = cleanMessage;
        } else if (qsName == "email") {
            emailSpan.innerHTML = qsValue;

        }
    }
});
