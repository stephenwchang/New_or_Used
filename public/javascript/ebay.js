$.backstretch("../images/background.gif");

$(function () {
    $('[data-toggle="popover"]').popover()
})

$(document).on("click", ".ebay-output", function(){
    $(function () {
        $('.ebay-output').popover()
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
function ebaySearch() {
    var queryURL = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.13.0&SECURITY-APPNAME=RyanChes-EbaySear-PRD-d13d69895-95fa1322&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + searchTerm

    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: 'JSONP',
    }).then(function(response) {
        console.log(response.findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus.currentPrice)
        console.log(response.findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL)
        console.log(response.findItemsByKeywordsResponse[0].searchResult[0].item[0].title)

        for (i=0; i<response.findItemsByKeywordsResponse[0].searchResult[0].item.length; i++) {

            var newDiv = $("<div>")
            newDiv.html(response.findItemsByKeywordsResponse[0].searchResult[0].item[i].title)
            newDiv.attr("class", "col-8 ebay-output")
            newDiv.attr("data-content", "<a> Price:  $"+ response.findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__ + "</a> <br> <img height='140px' src="+ response.findItemsByKeywordsResponse[0].searchResult[0].item[i].galleryURL + ">")
            newDiv.attr("data-toggle", "popover")
            newDiv.attr("data-trigger", "focus")
            newDiv.attr("data-placement", "right")
            newDiv.attr("tabindex", 0)
            newDiv.attr("title", response.findItemsByKeywordsResponse[0].searchResult[0].item[i].title)
            newDiv.attr("data-html", "true")
            newDiv.appendTo("#outputrow")
        }
    })
}

$("#searchBTN").click(function(event){
    event.preventDefault();
    $("#outputrow").empty()
    searchTerm = $("#input").val()
    ebaySearch()
})

$("#input").keypress(function(){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
    event.preventDefault();
    $("#outputrow").empty()
    searchTerm = $("#input").val()
    ebaySearch()
  }
})
