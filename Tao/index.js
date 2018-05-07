
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
  var template = Handlebars.compile(source);
  var context = { myBanner: "url(./images/cover.jpg)" };
  var html    = template(context);
  var header = document.getElementById("header");
  header.insertAdjacentHTML('afterbegin', html);
})();
