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

// AJAX CALLS START HERE

// GET JSON DATA, USE IT IN THE ABOUT TEMPLATE
var aboutMeData = $.ajax({
	method: "GET",
	url: "http://localhost:3000/users",
	dataType: "json",
	success: function(data){
		// Send data back to the locale variable
		aboutMeData = data;	
	} //success
}).then(function(){
	aboutMeTemplateFunction(aboutMeData);
	listenToAboutMeFieldChanges();
});

var aboutMeTemplateFunction = function(templateData){
	var source   = document.getElementById("about-template").innerHTML;
	var template = Handlebars.compile(source);

	var templateHtml = template(templateData[1]);

	var placeHolder = document.getElementById("about");
	placeHolder.innerHTML = templateHtml;
};// GET JSON DATA, USE IT IN THE ABOUT TEMPLATE - ends here

// MAKE ABOUT ME LIST EDITABLE

var listenToAboutMeFieldChanges = function(){
	var aboutMeList = document.querySelector("#about ul");
	aboutMeList.addEventListener("click", function($event){
		$event.stopPropagation();
		var target = $event.target;
		if($(target).hasClass("glyphicon-pencil")){
			var fieldToEdit = $(target).closest("li").find("input")[0];
			var fieldCurrentText = fieldToEdit.value;
			$(fieldToEdit).attr("readonly", false);

			fieldToEdit.addEventListener("focusout", function($event){
				$(fieldToEdit).attr("readonly", true);
			});
		}
	});
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
