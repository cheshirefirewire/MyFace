
(function aboutTemplate(){
  var source   = document.getElementById("about-template").innerHTML;
  var template = Handlebars.compile(source);
  var context = {
    title: "about",
    name: "Tao",
    location: 'Earth',
    birthday: 'May 5',
    occupation: 'web developer',
    relationshipStatus: 'divine',
    interestedIn: 'enlightenment'};
  var html    = template(context);
  var placeholder = document.getElementById("aboutBox");
  placeholder.innerHTML = html;
})();


(function profileImage(){
  var source   = document.getElementById("profile-template").innerHTML;
  var template = Handlebars.compile(source);
  var context = {
    src: "./images/profile-sq.png"
  }
  var html    = template(context);
  var placeholder = document.getElementById("profileImage");
  placeholder.innerHTML = html;
})();


(function bannerImage(){
  var source   = document.getElementById("banner-template").innerHTML;
  console.log('source is ', source);
  var template = Handlebars.compile(source);
  console.log('template is ', template);
  var context = { myBanner: "url(./images/cover.jpg)" };
  console.log('context is ', context);
  var html    = template(context);
  console.log('html is ', html);
  // var placeholder = document.createElement('div');
  // console.log('placeholder is ', placeholder);
  // placeholder.innerHTML = html;
  // console.log('placeholder is now ', placeholder);
  // var bannerdiv = placeholder.lastChild;
  // console.log('bannerdiv is ', bannerdiv);
  var header = document.getElementById("header");
  console.log('header is ', header);
  header.insertAdjacentHTML('afterbegin', html);
  console.log('header is now ', header);
})();
