/* eslint-disable */

$.backstretch("../images/background.gif");

$(function () {
  $('[data-toggle="popover"]').popover()
})


$(document).on("click", ".walmart-output", function () {
  $(function () {
    $('.walmart-output').popover()
  })
})

function truncate(string, x) {
  if (string.length > x) {
    y = string.substring(0, x)
    return y + " (. . .) "
  } else {
    return string
  }
}

function prettyU(string) {
  if (string === undefined) {
    console.log("prettyU fired!")
    return "No Item Summary"
  } else {
    return string
  }
}

var searchTerm = ""

function walmartSearch() {

  var queryURL = "https://api.walmartlabs.com/v1/search?apiKey=d7hjdvye4sky5cdwmmmtf3bf&query=" + searchTerm

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: 'JSONP',
  }).then(function (response) {
    console.log(response)



        for (i=0; i<response.items.length; i++) {
          (function(i){

            var trunD = prettyU(response.items[i].shortDescription)
            console.log("prettyU check:  " + trunD)
            var newDiv = []
            newDiv[i] = $("<div>")
            newDiv[i].html(response.items[i].name)
            newDiv[i].attr("class", "col-8 walmart-output")
            newDiv[i].attr("data-content", "<a> Price:  $"+ response.items[i].salePrice + "</a> <br> <a>" + truncate(trunD, 180) + "</a> <br> <img height='250px' width='250'px src="+ response.items[i].largeImage + ">")
            newDiv[i].attr("data-toggle", "popover")
            newDiv[i].attr("data-placement", "right")
            newDiv[i].attr("data-trigger", "focus")
            newDiv[i].attr("tabindex", 0)
            newDiv[i].attr("title", response.items[i].name)
            newDiv[i].attr("data-html", "true")
            newDiv[i].appendTo("#outputrow")

            var upcNumber = response.items[i].upc
            var currentDataContent = newDiv[i].attr("data-content")
            var ebayQueryURL = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.13.0&SECURITY-APPNAME=RyanChes-EbaySear-PRD-d13d69895-95fa1322&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + upcNumber

            $.ajax({
              url: ebayQueryURL,
              method: "GET",
              dataType: 'JSONP',
              }).then(function(ebayResponse) {
                newDiv[i].attr("data-content", currentDataContent + ebayResponse.findItemsByKeywordsResponse[0].searchResult[0].item[0].title + "<a> Ebay Current Bid:  $" + ebayResponse.findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__ + "</a> <br> <img height='140px' src="+ ebayResponse.findItemsByKeywordsResponse[0].searchResult[0].item[i].galleryURL + ">")
              })

          })(i)

        }
    })

}

$("#searchBTN").click(function (event) {
  event.preventDefault();
  $("#outputrow").empty()
  searchTerm = $("#input").val()
  walmartSearch()
})

$("#input").keypress(function () {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    event.preventDefault();
    $("#outputrow").empty()
    searchTerm = $("#input").val()
    walmartSearch()
  }
})
