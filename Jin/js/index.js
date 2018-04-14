(function profileImgTemplate(){
	var source   = document.getElementById("cover-img").innerHTML;
	var template = Handlebars.compile(source);

	var context = {src: "assets/cover.jpg"};
	var html    = template(context);

	var placeholder = document.getElementById('background-outer');
	placeholder.innerHTML = html;
})();

(function profileImgTemplate(){
	var source   = document.getElementById("profile-img").innerHTML;
	var template = Handlebars.compile(source);

	var context = {profileImg: "assets/profile.png"};
	var html    = template(context);

	var placeholder = document.getElementById('profile-outer');
	placeholder.innerHTML = html;
})();

(function populateUserInfo(){
	var source   = document.getElementById("user-data").innerHTML;
	var template = Handlebars.compile(source);

	var context = {
		name: "Gerhard Spitzer",
		location: "München, Germany",
		birthday: "04/13/1985",
		occupation: "Pilot",
		relationship: "Divorced",
		interest: "Bier, sausage und cars"
	};
	var html = template(context);

	var placeholder = document.getElementById('box-body');
	placeholder.innerHTML = html;
})();

document.getElementById('user-data-head').addEventListener("click", moveInfo);

function moveInfo(){
	var target = event.target || target;
	var box = document.getElementById('box-body');
	if(box.className === 'box-body'){
		box.classList += ' open';
	}
	else{
		box.classList.remove('open');
	}
}