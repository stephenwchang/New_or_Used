/* eslint-disable */

$.backstretch("../images/background.gif");



$(function () {
  $('[data-toggle="popover"]').popover({
    container: 'body'
  })
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
    return "No Item Summary"
  } else {
    return string
  }
}

var searchTerm = ""
var upcObj = {}

function walmartSearch() {

  var queryURL = "https://api.walmartlabs.com/v1/search?apiKey=d7hjdvye4sky5cdwmmmtf3bf&query=" + searchTerm

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: 'JSONP',
  }).then(function (response) {



        for (i=0; i<response.items.length; i++) {
          (function(i){

            var trunD = prettyU(response.items[i].shortDescription)
            var newDiv = []
            newDiv[i] = $("<div>")
            newDiv[i].html(response.items[i].name)
            newDiv[i].attr("class", "col-8 walmart-output")
            newDiv[i].attr("data-content","<div class=\"container\"><div class=\"row\"> <div class=\"col-6\"> Price:  $"+ response.items[i].salePrice + "</a> <br> <a>" + truncate(trunD, 180) + "</a> <br> <img width='200px' max-height='200px' src="+ response.items[i].largeImage + "></div>")
            newDiv[i].attr("data-toggle", "popover")
            newDiv[i].attr("data-placement", "right")
            newDiv[i].attr("data-trigger", "focus")
            newDiv[i].attr("tabindex", 0)
            newDiv[i].attr("title", "<div class=\"container\"> <div class=\"row\"> <div class=\"col-6\"> <a href=" + response.items[i].productUrl + ">" + response.items[i].name + "</a> </div>")
            newDiv[i].attr("data-html", "true")
            newDiv[i].attr("upc-track", response.items[i].upc)
            newDiv[i].appendTo("#outputrow")

            var upcNumber = response.items[i].upc
            var currentTitleContent = newDiv[i].attr("title")
            var currentDataContent = newDiv[i].attr("data-content")
            var ebayQueryURL = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.13.0&SECURITY-APPNAME=RyanChes-EbaySear-PRD-d13d69895-95fa1322&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + upcNumber
            

            $.ajax({
              url: ebayQueryURL,
              method: "GET",
              dataType: 'JSONP',
              }).then(function(ebayResponse) {
                newDiv[i].attr("data-content", currentDataContent + "<div class=\"col-6\"> <a> Current Bid:  $" + ebayResponse.findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0].__value__ + "</a> <br>" + ebayResponse.findItemsByKeywordsResponse[0].searchResult[0].item[0].subtitle + "<br> <img width='200px' max-height='200px' src="+ ebayResponse.findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL + "></div></div></div>")
                newDiv[i].attr("title", currentTitleContent + "<div class=\"col-6\"> <a href =" + ebayResponse.findItemsByKeywordsResponse[0].searchResult[0].item[0].viewItemURL + ">" + ebayResponse.findItemsByKeywordsResponse[0].searchResult[0].item[0].title + "</a></div></div></div>")
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



//Grab graph data
var currentUPC = ""
var graphURL = ""
var currentTitle = ""
var chartData = {}
var graphResponse = {}
var dateArray = []
var priceArray = []
var finalArray = []

$(document).on("click", ".walmart-output", function () {
    currentUPC = $(this).attr("upc-track")
    currentTitle = $(this).html()
    graphURL = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.13.0&SECURITY-APPNAME=RyanChes-EbaySear-PRD-d13d69895-95fa1322&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords="+currentUPC +"&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true&sortOrder=EndTimeSoonest&paginationInput.entriesPerPage=100"
    console.log("currentUPC: " + currentUPC)
    console.log("currentTitle:  " + currentTitle)
})

function graph() {
    $.ajax({
      url: graphURL,
      method: "GET",
      dataType: 'JSONP',
      }).then(function(graphResponse) {
    console.log(graphResponse)
    for (i=0; i<graphResponse.findCompletedItemsResponse[0].searchResult[0].item.length; i++) {
      var soldDate = graphResponse.findCompletedItemsResponse[0].searchResult[0].item[i].listingInfo[0].endTime[0]
      var soldPrice = graphResponse.findCompletedItemsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__

      if (soldDate == null) {
        soldDate = "unknown"
      }

      if (soldPrice == null) {
        soldPrice = "unknown"
      }

      dateArray.push(moment(soldDate).unix()*1000)
      priceArray.push(parseInt(soldPrice))
      

      chartData[soldDate] = parseInt(soldPrice)

    }
    console.log("Chart Data!")
    console.log(chartData)
    
    finalArray = createDataArray(dateArray, priceArray)
      })
}

//create datapoint Array

function createDataArray(dateArray, priceArray) {
  var datapoints = []
  for (i=0; i<dateArray.length; i++){
    var pointObj = {
      x: dateArray[i],
      y: priceArray[i]
    }
    datapoints.push(pointObj)
  }
  return datapoints
}

//render chart

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Completed Auctions"
	},
	axisY:{
		includeZero: false
	},
	data: [{        
    type: "line",   
    xValueType: "dateTime",    
		dataPoints: finalArray
	}]
});


