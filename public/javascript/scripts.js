$(function () {
    $('[data-toggle="popover"]').popover()
})

$(document).on("click", ".walmart-output", function(){
    $(function () {
        $('.walmart-output').popover()
    })    
})

function truncate(string, x) {
  if (string.length > x) {
    y = string.substring(0, x)
    return y + " (. . .) "
  }
  else {return string}

}

function prettyU(string) {
  if (string === undefined) {
    console.log("prettyU fired!")
    return "No Item Summary"
  }

  else {return string}
}

var searchTerm = ""
function walmartSearch() {
    var queryURL = "https://api.walmartlabs.com/v1/search?apiKey=d7hjdvye4sky5cdwmmmtf3bf&query=" + searchTerm   

    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: 'JSONP',
    }).then(function(response) {
        console.log(response)

        
        for (i=0; i<response.items.length; i++) {
            var trunD = prettyU(response.items[i].shortDescription)
            console.log("prettyU check:  " + trunD)
            var newDiv = $("<a>")
            newDiv.html(response.items[i].name)
            newDiv.attr("class", "col-12 walmart-output")
            newDiv.attr("data-content", "<a> Price:  $"+ response.items[i].salePrice + "</a> <br> <a>" + truncate(trunD, 180) + "</a> <br> <img height='250px' width='250'px src="+ response.items[i].largeImage + ">")
            newDiv.attr("data-toggle", "popover")
            newDiv.attr("data-placement", "right")
            newDiv.attr("data-trigger", "focus")
            newDiv.attr("tabindex", 0)
            newDiv.attr("title", response.items[i].name)
            newDiv.attr("data-html", "true")
            newDiv.appendTo("#outputrow")
        }
    })
}

$("#searchBTN").click(function(event){
    event.preventDefault();
    searchTerm = $("#input").val()
    walmartSearch()
})
