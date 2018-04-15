$(document).ready(function(){

	(function coverImgTemp() {
		var source   = document.getElementById('cover-img-template').innerHTML;
		var template = Handlebars.compile(source);

		var context = {coverImg: 'images/cover.jpg'};
		var templateHtml = template(context);

		var placeholder = document.getElementById('coverOuter');
		placeholder.innerHTML = templateHtml;
	})();

	(function profImgTemp() {
		var source   = document.getElementById('profile-img-template').innerHTML;
		var template = Handlebars.compile(source);

		var context = {profileImg: 'images/profile.png'};
		var templateHtml = template(context);

		var placeholder = document.getElementById('profileOuter');
		placeholder.innerHTML = templateHtml;
	})();

	(function aboutTemp(){
		var source   = document.getElementById('about-template').innerHTML;
		var template = Handlebars.compile(source);

		var context = {"name":"Jose", "location": "New York", "birthday": "12/24/1992", "occupation": "programmer", "relationshipStatus":"single", "interestedIn":"meditation"};
		var templateHtml = template(context);
		console.log('template: ', template)

		var placeholder = document.getElementById('about');
		placeholder.innerHTML = templateHtml;
	})();

	$("#aboutHeader").click(function(){
	    $("#aboutList").toggle();
	});

});

// $.ajax({
// 	method: "POST",
// 	url: "data.json",
// 	data: {}
// })
// .done(function( data ));