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
	url: "http://localhost:3000/users/2",
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

	var templateHtml = template(templateData);

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
			var fieldCurrentData = fieldToEdit.value;
			$(fieldToEdit).attr("readonly", false);

			fieldToEdit.addEventListener("focusout", function($event){
				$(fieldToEdit).attr("readonly", true);
				if(fieldCurrentData !== fieldToEdit.value) {
					var fieldName = $(fieldToEdit).attr("name");
					updateUserObject(fieldName, fieldToEdit.value);
				}
			});
		}
	});
};

var updateUserObject = function(prop, value){
	var dataForPassing = {};
	dataForPassing[prop] = value;

	$.ajax({
		method: "PATCH",
		url: "http://localhost:3000/users/2",
		dataType: "json",
		data: JSON.stringify(dataForPassing),
		contentType: "application/json",
		success: function(data){
			console.log("dataForPassing success: ", dataForPassing);
			console.log("data", data);
		},
		error: function(error){
			console.log("dataForPassing error: ", dataForPassing);
			console.log("error", error);
		}
	});
}

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
