var apiKey = "eiinnu4DHoCE1CyfhStRagE1zztqB0XS";
var topics = ["baseball","football","basketball","soccer","tennis","golf"];

// Function that will create the buttons by looping through the topics array
makeThoseButtons = function(){

    // Empties the div before every new loop so its not doubling up on previous array items
    $("#button-div").empty();

    for (i=0; i < topics.length; i++){

        var buttonDiv = $("<div>");

        var buttons = $("<button class= mr-2>" + topics[i] + "</button>");

        buttons.attr("value",topics[i]);

        buttonDiv.append(buttons);

        $("#button-div").append(buttonDiv);
    
    }

    // on click of any button run this function that goes out to the giphy api and brings back the relevant data needed
    $("button").on("click", function(event) {
        event.preventDefault();
        
        $("#gif-div").empty();

        var sport = $(this).attr("value");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&limit=10&api_key=" + apiKey;
        // ajax call to the giphy api
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            var results = response.data;
            // loops through the data we get back from api and builds page with the data we need to show.
            for (var i = 0; i < results.length; i++) {

                var gifsDiv = $("<div class= border border-dark>");
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

            // if the class of the gif is "still" run this function
            $(".still").on("click", function() {
                // grabs data attribute for the clicked gif
                var current = $(this).attr("data");
                // takes the current data state and changes it to the opposite. If still then animate and if currenty animate change to still on this click
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

// call the make buttons function above to populate the initial page with preset buttons and sports options
makeThoseButtons();

    // on click of the submit form button this function takes the user input and adds it to the topics array then executes the function to create the buttons again and clears the text field. 
    $("#inputButton").on("click", function(event) {
        event.preventDefault();

       var add = $("#inputText").val().trim();
        topics.push(add);
        $("#inputText").val("")
        makeThoseButtons();
     
 
     });

        


