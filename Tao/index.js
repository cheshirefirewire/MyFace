var source   = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);
var context = {
  title: "Posting! Posting! Is this thing on?",
  name: "Tao",
  location: 'Earth',
  birthday: 'May 5',
  occupation: 'web developer',
  relationshipStatus: 'divine',
  interestedIn: 'enlightenment'};
var html    = template(context);
var placeholder = document.getElementById("placeholder");
placeholder.innerHTML = html;
