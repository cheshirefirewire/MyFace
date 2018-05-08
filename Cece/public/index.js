(function entryTemplate (){
	var source   = document.getElementById("entry-template").innerHTML;
	var template = Handlebars.compile(source);

	var context = {title: "My New Post", body: "This is my first post!"};
	var templateHtml = template(context);

	var placeHolder = document.getElementById("place-holder");
	placeHolder.innerHTML = templateHtml;

})();


(function aboutTemplate (){
	var source   = document.getElementById("about-template").innerHTML;
	var template = Handlebars.compile(source);

	var context1 = { name: "Steven Paul Jobs", location: "Palo Alto, California", birthday: "02/24/1955", occupation: "entrepreneur", relationshipStatus: "married", interestedIn: "computer tech development" };
	var context2 = { name: "Bill Gates", location: "Medina, Washington", birthday: "10/28/1955", occupation: "founder, business man", relationshipStatus: "married", interestedIn: "computer technology" };

	var templateHtml = template(context1);

	var placeHolder2 = document.getElementById("place-holder2");
	placeHolder2.innerHTML = templateHtml;
})();


(function profileImgTemplate (){
	var source   = document.getElementById("profile-img-template").innerHTML;
	var template = Handlebars.compile(source);

	var context = { profileImgUrl: "assets/images/profile.png" };

	var profileImgUrl = template(context);

	var profileOuter = document.getElementById("profile-outer");
	profileOuter.innerHTML = profileImgUrl;
})();

(function coverImgTemplate (){
	var source   = document.getElementById("cover-img-template").innerHTML;
	var template = Handlebars.compile(source);

	var context = { coverImgUrl: "assets/images/cover.jpg" };

	var coverImgUrl = template(context);

	var cover = document.getElementById("cover");
	cover.innerHTML = coverImgUrl;
})();







