var getAboutMeData = function(){
	return $.ajax({
	method: 'GET',
	url : 'http://localhost:3000/user',
	dataType: 'json',
	});
}

function addEventListeners(){
	document.getElementById('user-data-head').addEventListener('click', moveInfo);
	document.getElementById('user-data-holder').addEventListener('click', editUserInfo);

	$('#render-blog-btn').click(function(){
		router.renderPage('blog');
	});

	$('#render-gallery-btn').click(function(){
		router.renderPage('gallery');
	})
}

function coverImgTemplate(url){
	$('#background-outer').html('');
	utility.templateCompiler({src: 'assets/'+url}, 'cover-img', 'background-outer');
}

function profileImgTemplate(url){
	$('#profile-outer').html('');
	utility.templateCompiler({profileImg: 'assets/'+url}, 'profile-img', 'profile-outer');
}

function populateUserInfo(userData){
	var context = {
		name: userData.name,
		location: userData.location,
		birthday: userData.birthday,
		occupation: userData.occupation,
		relationship: userData.relationshipStatus,
		interest: userData.interestedIn
	};
	utility.templateCompiler(context, 'user-data', 'about-holder');
}

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

function editUserInfo(){
	var target = $(event.target) || $(target);
	if(target.hasClass('fa-edit')){
		var fieldToEdit = $(target.parent().siblings('input'));
		var val = fieldToEdit.val();
		fieldToEdit.removeAttr('readonly');
		fieldToEdit.val('');
		fieldToEdit.addClass('editing');
		fieldToEdit.focus();
		fieldToEdit.val(val);
		fieldToEdit.blur(function(){
			if(val != fieldToEdit.val()){
				saveNewInfo(fieldToEdit.val(), fieldToEdit.attr('model'));
				fieldToEdit.removeClass('editing');
				fieldToEdit.attr('readonly', 'true');
			}
		});
	}
}

function saveNewInfo(newVal, model){
	var passedData = {};
	passedData[model] = newVal;
	
	$.ajax({
		method: "PATCH",
		url: "http://localhost:3000/user/1",
		dataType: "json",
		data: JSON.stringify(passedData),
		contentType: 'application/json',
		success: function(){
		  console.log(model + " was updated to " + newVal);
		},
		error: function(){
		  console.log('error');
		}
	  });
}

function initAboutMe(){
    getAboutMeData().then(function(data){
		coverImgTemplate(data[0].backgroundImage);
        profileImgTemplate(data[0].profileImage);
        populateUserInfo(data[0]);
        addEventListeners();
    });
}

router.registerInitHandler('blog', initAboutMe);
router.registerInitHandler('gallery', initAboutMe);

