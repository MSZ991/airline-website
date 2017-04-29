$(document).ready(function() {
    "use strict";

    //datepicker
    $("#date").datepicker();


    //valitation
    $("#send").click(function() {
        var currentDate = new Date();
        var newDate = currentDate.toISOString();
        var flightDateInput = document.getElementById("date");
        var flightDateV = flightDateInput.value;

        if (flightDateV === "") {
            $(flightDateInput).css("background-color", "white");

        } else {
            var dateSplit = flightDateV.split("/");
            var mm = dateSplit[0];
            var dd = dateSplit[1];
            var yy = dateSplit[2];
            var mmMinus = --mm; // JavaScript months are zero indexed
            var d = new Date();
            var userPickDate = new Date();
            userPickDate.setFullYear(yy, mmMinus, dd);
        }
        if (userPickDate.getTime() < d.getTime()) { //display the number of milliseconds since midnight, January 1, 1970.
            $(flightDateInput).css("background-color", "pink");
            $('#errorDateModal').modal();

            //alert("please add a correct date")
            return false;
        } else {
            $(flightDateInput).css("background-color", "white");
        }
    });
});
