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



var myData = $.ajax({
	method: "GET",
	url: "http://localhost:3000/users",
	dataType: "jsonp",
	success: function(data){
		myData = data;	
	}
}).then(function(){
	myTemplateFunction(myData);
});

var myTemplateFunction = function(templateData){
	var source   = document.getElementById("about-template").innerHTML;
	var template = Handlebars.compile(source);

	var context1 = { name: "John Doe", location: "Palo Alto, CA", birthday: "01/01/1990", occupation: "web developer", relationshipStatus: "single", interestedIn: "computer technology" };
	var context2 = { name: "Jane Doe", location: "San Francisco, CA", birthday: "09/09/1999", occupation: "web developer", relationshipStatus: "single", interestedIn: "computer technology" };

	var templateHtml = template(templateData[1]);

	var placeHolder2 = document.getElementById("about");
	placeHolder2.innerHTML = templateHtml;
};

// var blogs = $ajax({
// 	method: "GET",
// 	url: "http://localhost/3000/blogs",
// 	dataType: "json",
// 	success: function (data) {
// 		// Send data back to the locale variable
// 		blogs = data;
// 	}
// }).then(function(data){
// 	console.log('data: ', data);
// 	blogsTemplate(data);
// });

// var blogsTemplate = function (templateData){

// };

// $("#form1").submit(function(event){
// 	event.preventDefault();

// 	// Get some values from elements on the page:
// 	var form = $(this);
// });



