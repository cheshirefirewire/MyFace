var source   = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);

var context = { Name: "Tshe", Location: "Blouder Creek", Birthday: "03/02/1990", Occupation: "Thinking", Relationship: "Single", InterestedIn: "None"};
var html    = template(context);


var placeholder = document.getElementById("placeholder");
placeholder.innerHTML = html;




var source   = document.getElementById("banner-img").innerHTML;
var template = Handlebars.compile(source);

var context1 = {profile_img: "./image/profile.png" };
var htmlTemplate   = template(context1);

var bannerImg = document.getElementById("banner-img");
bannerImg.innerHTML = htmlTemplate;