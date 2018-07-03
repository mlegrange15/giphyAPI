var apiKey = "eiinnu4DHoCE1CyfhStRagE1zztqB0XS";
var topics = ["baseball","football","basketball","soccer","tennis","golf",];


    for (i=0; i < topics.length; i++){

        var buttonDiv = $("<div>");

        var buttons = $("<button>" + topics[i] + "</button>");

        buttons.attr("value",topics[i]);

        buttonDiv.append(buttons);

        $("#button-div").append(buttonDiv);

        console.log(buttonDiv);
  
  }

  $("button").on("click", function() {

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
            var sportImage = $("<img>");
            sportImage.attr("src", results[i].images.fixed_height.url);
            gifsDiv.append(sportImage);
            gifsDiv.append(ratings);
            $("#gif-div").prepend(gifsDiv);


        }



      console.log(response);
    });

});

