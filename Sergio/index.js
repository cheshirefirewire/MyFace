(function aboutNavBarInfo() {
	var source = document.getElementById("side-nav-template").innerHTML;
	var sideNavTemplate = Handlebars.compile(source);

	var context = {name: "I AM GREAT", location: "San Fran baby", birthday: "March", occupation: "UI Dev", relationshipStatus: "with Light!", interested: "Spiritual Clarity"};
	var templateHTML = sideNavTemplate(context);

	var sideNavPlaceHolder = document.getElementById("side-nav-placeHolder-div");
	sideNavPlaceHolder.innerHTML = templateHTML;
})();

(function profilePic() {
	var source = document.getElementById("profile-pic-template").innerHTML;
	var profilePicTemplate = Handlebars.compile(source);

	var context = {profilePic: "images/profile.png"};
	var profilePic = profilePicTemplate(context);

	var profilePicPlaceHolder = document.getElementById("profile-pic-placeHolder-div");
	profilePicPlaceHolder.innerHTML = profilePic;
})();

(function backgroundImage() {
	var source = document.getElementById("background-pic-template").innerHTML;
	var backgroundPicTemplate = Handlebars.compile(source);

	var context = {backgroundPic: "images/nature.jpg"};
	var backgroundPic = backgroundPicTemplate(context);

	var backgroundPicPlaceHolder = document.getElementById("background-pic-placeHolder-div");
	backgroundPicPlaceHolder.innerHTML = backgroundPic;
})();

function toggleVerticalNavUpDown(elem) {

	var target = document.getElementById(elem);
	var maxHeight = "340px";

	if(target.style.height === maxHeight) {
		document.getElementById("arrow").classList.toggle("fa-arrow-circle-down");
		target.style.height = "0px";
		target.style.overflow = "hidden";
	} else {
		target.style.height = maxHeight;
	}
}