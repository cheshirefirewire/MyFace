// var source   = document.getElementById("entry-template").innerHTML;
// var template = Handlebars.compile(source);
//
// var context = {title: "My New Post", body: "This is my first post!"};
// var html = template(context);
//
// var placeHolder = document.getElementById("placeHolder");
// placeHolder.innerHTML = html;


var source   = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);

var context = {name: "Jose", location: "New York", birthday: "12/24/1992", occupation: "programmer", relationshipStatus:"single", interestedIn:"meditation"};
var context2 = {name: "Bob", location: "Japan", birthday: "12/24/1992", occupation: "programmer", relationshipStatus:"single", interestedIn:"meditation"};

var html = template(context2);

var placeHolder = document.getElementById("placeHolder");
placeHolder.innerHTML = html;
