"use strict";

var aboutMeData = $.ajax({
  method: "GET",
  url: "http://localhost:3000/user/1",
  dataType: "jsonp",
  success: function (data) {
        // Send data back to the locale variable
        aboutMeData = data;
  }
}).then(function(data){
  console.log('data',data);
  myTemplateFunction(data);
  profilePic(data);
  backgroundImage(data)
  addEventListenersToSideNav();
});


//no IIFE for myTemplateFunction because it's being called within AJAX .then annonymous function
function myTemplateFunction(templateData) {
	var source = document.getElementById("side-nav-template").innerHTML;
	var sideNavTemplate = Handlebars.compile(source);
	var templateHTML = sideNavTemplate(templateData);
	var sideNavPlaceHolder = document.getElementById("side-nav-placeHolder-div");
	sideNavPlaceHolder.innerHTML = templateHTML;
}


//Function to populate html profile pic
function profilePic(profilePicData) {
	var source = document.getElementById("profile-pic-template").innerHTML;
	var profilePicTemplate = Handlebars.compile(source);

	//var context = {profilePic: "images/profile.png"};
	var profilePic = profilePicTemplate(profilePicData);

	var profilePicPlaceHolder = document.getElementById("profile-pic-placeHolder-div");
	profilePicPlaceHolder.innerHTML = profilePic;
};

//Function to populate html background image
function backgroundImage(backgroundImageData) {
	var source = document.getElementById("background-pic-template").innerHTML;
	var backgroundPicTemplate = Handlebars.compile(source);

	//var context = {backgroundPic: "images/nature.jpg"};
	var backgroundPic = backgroundPicTemplate(backgroundImageData);

	var backgroundPicPlaceHolder = document.getElementById("background-pic-placeHolder-div");
	backgroundPicPlaceHolder.innerHTML = backgroundPic;
}

//Function to toggle side nav vertically up and down
function toggleVerticalNavUpDown(elem) {
	var target = document.getElementById(elem);
	var maxHeight = "auto";
	if(target.style.height === maxHeight) {
		document.getElementById("arrow").classList.toggle("fa-arrow-circle-down");
		target.style.height = "0px";
		target.style.overflow = "hidden";
	} else {
		target.style.height = maxHeight;
	}
}

//Function to allow user to enter new values into input fields and send new data to DB
function addEventListenersToSideNav() {
	var aboutMeList = document.querySelector('#verticalSide-nav-ul');
	aboutMeList.addEventListener('click', function(event) {
		event.stopPropagation();
		if(event.target.className === 'fieldEditor') {
			var fieldToEdit = event.target.previousElementSibling;
			fieldToEdit.removeAttribute('readonly');
			var fieldCurrentText = fieldToEdit.value;
			//console.log("focusin successful");

			fieldToEdit.addEventListener('focusout', function(event) {
				fieldToEdit.readonly = true;
				//console.log("focusout successful");
				if(fieldCurrentText != fieldToEdit.value) {
					updateUserObject($(fieldToEdit).attr('model'), fieldToEdit.value, aboutMeData);
					//console.log("new value entered!");
				}
			});
		}
	});
}


/*
var addEventListeners = function(){
  var aboutMeList = document.querySelector('ul');
  aboutMeList.addEventListener('click', function($event){
    $event.stopPropagation();
    if($($event.target).hasClass('fieldEditor')){
    	console.log("testing!!");
      var fieldToEdit = $($event.target).parent('li').find('input')[0];
      var fieldCurrentText = fieldToEdit.value;
      $(fieldToEdit).removeAttr('readonly');

      fieldToEdit.addEventListener('focusout', function($event){
        $(fieldToEdit).prop('readonly', true);
        if(fieldCurrentText !== fieldToEdit.value){
          updateUserObject($(fieldToEdit).attr('model'), fieldToEdit.value, aboutMeData);
        }
      });
    }
  });
}
*/

var updateUserObject = function(model, value, aboutMeData){
  var dataForPassing = {model:value};
  $.ajax({
    method: "PUT",
    url: "http://localhost:3000/user/1",
    dataType: "jsonp",
    data: dataForPassing,
    contentType: 'application/json',
    success: function(msg){
      console.log('dataForPassing', dataForPassing);
      console.log('msg',msg);
    }
  })
}


