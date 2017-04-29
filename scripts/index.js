$(function() {

    "use strict";

    var count = 0; // to make shure there are no multiply erors

    weather.call($("#vietnamTemp"), "Vietnam", "Hanoi");
    weather.call($("#thailandTemp"), "Thailand", "Bangkok");
    weather.call($("#cambodiaTemp"), "Cambodia", "Phnom Penh");
    weather.call($("#laosTemp"), "Laos", "Vientiane");
    weather.call($("#georgiaTemp"), "Georgia", "Tbilisi");
    weather.call($("#creteTemp"), "Greece", "Crete");
    weather.call($("#anatalyaTemp"), "Turkey", "anatalya");
    weather.call($("#bulgariaTemp"), "Bulgaria", "Sofia");

    function weather(country, city) {
        var $self = this;
        $.ajax({
            type: "GET",

            url: 'https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + ', ' + country + '")&format=json',

            error: function(err) {
                if (!count) {
                    $('#errorModal').modal();
                    count++;
                }
                console.log("Error in city " + city + ", country: " + country + ", error message: " + err.statusText + ", error status: " + err.status);
                $self.html("temperature: unknown");
            },

            success: function(result) {
                var temperature = '',
                    text = '';
                // there are a lot of unknown server errors from this weather server that could do some problems, therefore:
                try {
                    var condition = result.query.results.channel.item.condition;
                    temperature = condition.temp;
                    text = condition.text;
                } catch (e) {
                    console.log("Error in city " + city + ", country: " + country + ", error message: " + e.message);
                    if (!count) {
                        $('#errorModal').modal();
                        count++;
                    }
                    temperature = "unknown";
                } finally {
                    $self.html("temperature: " + temperature + (text ? "<br/>" + text : ''));
                }
            }
        });
    }
});
