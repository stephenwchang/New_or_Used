$.backstretch("../images/background.gif");

$(function () {
    $('[data-toggle="popover"]').popover()
})

$(document).on("click", ".walmart-output", function(){

  // on results link click, trigger ebay search of model number
  var modelNumber;
  var currentDataContent;
  var currentItem = $(this)

  modelNumber = currentItem.attr("data-model-number")
  currentDataContent = currentItem.attr("data-content")

  var queryURL = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.13.0&SECURITY-APPNAME=RyanChes-EbaySear-PRD-d13d69895-95fa1322&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + modelNumber


  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: 'JSONP',
  }).then(function(response) {
          currentItem.attr("data-content", currentDataContent + response.findItemsByKeywordsResponse[0].searchResult[0].item[0].title + "<br> <a> Ebay Current Bid:  $"+ response.findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__ + "</a> <br> <img height='140px' src="+ response.findItemsByKeywordsResponse[0].searchResult[0].item[i].galleryURL + ">")
      })


  console.log(currentDataContent);
  console.log(modelNumber);

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
            var newDiv = $("<div>")
            newDiv.html(response.items[i].name)
            newDiv.attr("class", "col-8 walmart-output")
            newDiv.attr("data-content", "<a> Price:  $"+ response.items[i].salePrice + "</a> <br> <a>" + truncate(trunD, 180) + "</a> <br> <img height='250px' width='250'px src="+ response.items[i].largeImage + ">")
            newDiv.attr("data-toggle", "popover")
            newDiv.attr("data-placement", "right")
            newDiv.attr("data-model-number", response.items[i].modelNumber)
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
    $("#outputrow").empty()
    searchTerm = $("#input").val()
    walmartSearch()
})

$("#input").keypress(function(){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
    event.preventDefault();
    $("#outputrow").empty()
    searchTerm = $("#input").val()
    walmartSearch()
  }
})
