"use strict";

////////////////////////////////////////////////////

function init(initialData) {
	console.log('initialData',initialData);
	populateSideNavContent(initialData);
	populateProfilePicContent(initialData);
	populateBackgroundImageContent(initialData);
	populateBlogOutputContent(initialData);
	addEventListenersToSideNav();
	//blogInit();
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

function populateBlogOutputContent(blogOutputData) {
	creatingHandlebarsTemplate("blog-output-template", blogOutputData, "blog-output-placeHolder-div");
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
			updateSideNavAboutMeUserObject($(fieldToEdit).attr('model'), fieldToEdit.value, aboutMeData);
		}
	});
}

////////////////////////////////////////////////////

var updateSideNavAboutMeUserObject = function(model, value){
  var dataForPassing = {};
  dataForPassing[model] = value;
  $.ajax({
    method: "PATCH",
    url: "http://localhost:3000/user/1",
    dataType: "json",
    //JSON.stringify() method converts a JavaScript value to a JSON string
    data: JSON.stringify(dataForPassing),
    contentType: 'application/json',
    success: function(data){
      console.log('dataForPassing success', dataForPassing);
      console.log('data',data);
    },
    error: function(error){
      console.log('dataForPassing error', dataForPassing);
      console.log('error',error);
    }
  })
}
