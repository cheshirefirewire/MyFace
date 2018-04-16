
var profile = {
    picture: "img/profile.png",
    background: "'img/arrietty.jpg'",
    name: "Arrietty",
    location: "under the floor beneath a grandfather clock",
    birthday: "1952",
    occupation: "Borrower",
    relationship: "complicated",
    interest: "humane objects"
};

var source = document.getElementById('profile-template').innerHTML;
var template = Handlebars.compile(source);
var html = template(profile);
document.getElementById("about-placeholder").innerHTML = html;

var picSource = document.getElementById('profile-pic-template').innerHTML;
var picTemplate = Handlebars.compile(picSource);
var picHtml = picTemplate(profile);
document.getElementById("profile-pic-placeholder").innerHTML = picHtml;

var bGsource = document.getElementById('bg-template').innerHTML;
var bGtemplate = Handlebars.compile(bGsource);
var bGhtml = bGtemplate(profile);
document.getElementById("bg-placeholder").innerHTML = bGhtml;
