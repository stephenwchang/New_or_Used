$.backstretch('../images/background.gif');

let queryURL = '';

function ebaySearch() {
  $.ajax({
    url: queryURL,
    method: 'GET',
    dataType: 'JSONP',
  }).then((response) => {
    console.log(response);
  });
}

$('#searchBTN').click((event) => {
  event.preventDefault();
  queryURL = `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.13.0&SECURITY-APPNAME=RyanChes-EbaySear-PRD-d13d69895-95fa1322&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&productID.type=UPC&productID.value=${
    $('#input').val()
  }&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true&sortOrder=PricePlusShippingLowest`;
  console.log(queryURL);
  ebaySearch();
});

$('#input').keypress(() => {
  const keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    event.preventDefault();
    queryURL = `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.13.0&SECURITY-APPNAME=RyanChes-EbaySear-PRD-d13d69895-95fa1322&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&productID.type=UPC&productID.value=${
      $('#input').val()
    }&itemFilter(0).name=SoldItemsOnly&itemFilter(0).value=true&sortOrder=PricePlusShippingLowest`;
    console.log(queryURL);
    ebaySearch();
  }
});
