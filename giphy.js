var apiKey = "eiinnu4DHoCE1CyfhStRagE1zztqB0XS";
var topics = ["baseball","football","basketball","soccer","tennis","golf",];

makeThoseButtons = function(){

    for (i=0; i < topics.length; i++){

        var buttonDiv = $("<div>");

        var buttons = $("<button>" + topics[i] + "</button>");

        buttons.attr("value",topics[i]);

        buttonDiv.append(buttons);

        $("#button-div").append(buttonDiv);
    
    }


    $("button").on("click", function(event) {
        event.preventDefault();
        $("#gif-div").empty();

        var sport = $(this).attr("value");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&limit=10&api_key=" + apiKey;

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifsDiv = $("<div>");
                var ratings = $("<p>").text("Rating: " + results[i].rating);
                var animateImage = results[i].images.fixed_height.url;
                var stillImage = results[i].images.fixed_height_still.url;
                var sportImage = $("<img>");
                sportImage.attr({
                    src: stillImage,
                    class: "still",
                    data: "still",
                    dataStill: stillImage,
                    dataAnimate: animateImage,
                });
                gifsDiv.append(sportImage);
                gifsDiv.append(ratings);
                $("#gif-div").prepend(gifsDiv);
            }

            $(".still").on("click", function() {

                var current = $(this).attr("data");
    
                if (current === "still") {
                    $(this).attr("src", $(this).attr("dataAnimate"));
                    $(this).attr("data", "animate");
                } else {
                    $(this).attr("src", $(this).attr("still"));
                    $(this).attr("data", "still");
                }
    
                if (current === "animate") {
                    $(this).attr("src", $(this).attr("dataStill"));
                    $(this).attr("data", "still");
                } else {
                    $(this).attr("src", $(this).attr("animate"));
                    $(this).attr("data", "animate");
                    }
    
            });
    
        });

    });

};

makeThoseButtons();



    makeThoseNewButtons = function(){
       
        var add = $("#inputText").val().trim();

        var addButtons = $("<button>" + add + "</button>");

        addButtons.attr("value", add);

        $("#button-div").append(addButtons);
    
    }

    $("#inputButton").on("click", function(event) {
        
        event.preventDefault();
        makeThoseNewButtons();
        makeThoseButtons();
     
 
     });

        


