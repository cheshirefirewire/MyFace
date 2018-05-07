"use strict";

////////////////////////////////////////////////////

var aboutMeData = $.ajax({
	method: "GET",
  	url: "http://localhost:3000/user/1",
  	dataType: "jsonp"
});

aboutMeData.done(function(data) {
	// Send data back to the locale variable
    aboutMeData = data;
    init(data);
});

aboutMeData.fail(function(xhr, status, errorThrown) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
 });

////////////////////////////////////////////////////

function init(initialData) {
	console.log('initialData',initialData);
	populateSideNavContent(initialData);
	populateProfilePicContent(initialData);
	populateBackgroundImageContent(initialData)
	addEventListenersToSideNav();
}

////////////////////////////////////////////////////

function creatingHandlebarsTemplate(targetHandlebarsScriptElement, data, handlebarsPlaceHolderDiv) {
	var handlebarsScriptSource = document.getElementById(targetHandlebarsScriptElement).innerHTML;
	var handlebarsTemplateToRender = Handlebars.compile(handlebarsScriptSource);
	var finalContentToRender = handlebarsTemplateToRender(data);
	var finalContentToRenderPlaceHolder = document.getElementById(handlebarsPlaceHolderDiv);
	finalContentToRenderPlaceHolder.innerHTML = finalContentToRender;
}

////////////////////////////////////////////////////

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

////////////////////////////////////////////////////

function populateSideNavContent(sideNavData) {
	creatingHandlebarsTemplate("side-nav-template", sideNavData, "side-nav-placeHolder-div");
}

////////////////////////////////////////////////////

function populateProfilePicContent(profilePicData) {
	creatingHandlebarsTemplate("profile-pic-template", profilePicData, "profile-pic-placeHolder-div");
}

////////////////////////////////////////////////////

function populateBackgroundImageContent(backgroundImageData) {
	creatingHandlebarsTemplate("background-pic-template", backgroundImageData, "background-pic-placeHolder-div");
}

////////////////////////////////////////////////////

function addEventListenersToSideNav() {
	var aboutMeList = document.querySelector('#verticalSide-nav-ul');
	aboutMeList.addEventListener('click', function(event) {
		event.stopPropagation();
		if(event.target.className === 'fieldEditor') {
			var fieldToEdit = event.target.previousElementSibling;
			fieldToEdit.removeAttribute('readonly');
			var currentTextInField = fieldToEdit.value;
			editSideNavInputField(fieldToEdit, currentTextInField);
		}
	});
}

////////////////////////////////////////////////////

function editSideNavInputField(fieldToEdit, currentTextInField) {
	fieldToEdit.addEventListener('focusout', function(event) {
		fieldToEdit.readonly = true;
		if(currentTextInField != fieldToEdit.value) {
			updateUserObject($(fieldToEdit).attr('model'), fieldToEdit.value, aboutMeData);
		}
	});
}

////////////////////////////////////////////////////

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


