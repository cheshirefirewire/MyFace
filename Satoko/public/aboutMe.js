$(document).ready(function(){

	// var myData = $.ajax({
	// 	method: 'GET',
	// 	url: 'http://localhost:3000/user',
	// 	dataType: 'json',
	// 	success: function (data) {
	// 		myData = data;
	// 	}
	// }).then(function(data){
	// 	init();
	// });

	// var init = function() {
	// 	userInfoTemp(myData[0]);
	// 	profImgTemp(myData[0].profileImage);
	// 	coverImgTemp(myData[0].backgroundImage)
	// 	addEventListeners();
	// };

	var getAboutMeData = function() {
		return $.ajax({
		method: 'GET',
		url: 'http://localhost:3000/user',
		dataType: 'json'
		})
	};

	var coverImgTemp = function(coverImgData) {
		var source   = document.getElementById('cover-img-template').innerHTML;
		var template = Handlebars.compile(source);

		var context = {coverImg: 'images/' + coverImgData};
		var templateHtml = template(context);

		var placeholder = document.getElementById('coverOuter');
		placeholder.innerHTML = templateHtml;
	};

	var profImgTemp = function(profImgData) {
		var source   = document.getElementById('profile-img-template').innerHTML;
		var template = Handlebars.compile(source);

		var context = {profileImg: 'images/' + profImgData};
		var templateHtml = template(context);

		var placeholder = document.getElementById('profileOuter');
		placeholder.innerHTML = templateHtml;
	};

	var userInfoTemp = function(templateData){
		var source   = document.getElementById('about-template').innerHTML;
		var template = Handlebars.compile(source);

		var templateHtml = template(templateData);

		var placeholder = document.getElementById('about-placeholder');
		placeholder.innerHTML = templateHtml;
	};

	$("#aboutHeader").click(function(){
	    $("#aboutList").toggle();
	});

	var addEventListeners = function(){
		var aboutMeList = document.getElementById('aboutList');
		aboutMeList.addEventListener('click', function(event){

			if($(event.target).hasClass('pencil')){

				var fieldToEdit = $(event.target).prev();
				var fieldInputValue = fieldToEdit.val();

				fieldToEdit.removeAttr('readonly');
				fieldToEdit.on('focusout', function(event){
					fieldToEdit.attr('readonly', 'true');
					// console.log('fieldToEdit value', fieldToEdit.val());
					// console.log('fieldInputValue', fieldInputValue);
					if(fieldToEdit.val() !== fieldInputValue){
						console.log('updateUserObject');
        				updateUserObject(fieldToEdit.attr('label'), fieldToEdit.val());
					}
				});
			};
		});
	};

	var updateUserObject = function(label, value){
	  var dataForPassing = {};
	  dataForPassing[label] = value;
	  $.ajax({
	    method: "PATCH",
	    url: "http://localhost:3000/user/1",
	    dataType: "json",
	    data: JSON.stringify(dataForPassing),
	    contentType: 'application/json',
	    success: function(data){
	      console.log('dataForPassing', dataForPassing);
	      console.log('data',data);
	    },
	    error: function(error){
	      console.log('dataForPassing error', dataForPassing);
	      console.log('error', error);
	    }
	  })
	};

	var aboutMeInit = function() {
		getAboutMeData().then(function(data){
			userInfoTemp(data[0]);
			profImgTemp(data[0].profileImage);
			coverImgTemp(data[0].backgroundImage)
			addEventListeners();
		})

	};


router.registerInitHandler('blog', aboutMeInit);
router.registerInitHandler('gallery', aboutMeInit);


});

