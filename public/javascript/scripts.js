
var config = {
    apiKey: "AIzaSyAqu9o7oWo8Zycr-T4lhoCn0tl_vhsnn2Q",
    authDomain: "api-price-comparison.firebaseapp.com",
    databaseURL: "https://api-price-comparison.firebaseio.com",
    projectId: "api-price-comparison",
    storageBucket: "",
    messagingSenderId: "970000015156"
  };
firebase.initializeApp(config);

var database = firebase.database();

var img = $('<img id="dynamic">');
img.attr('src', responseObject.imgurl);
img.appendTo('#imagediv');