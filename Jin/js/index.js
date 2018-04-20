var myData = $.ajax({
	method: 'GET',
	url : 'http://localhost:3000/user',
	dataType: 'jsonp',
	success: function(data){
		myData = data;
	}
}).then(function(data){
	coverImgTemplate(data[0].backgroundImage);
	profileImgTemplate(data[0].profileImage);
	populateUserInfo(data[0]);
	document.getElementById('user-data-head').addEventListener('click', moveInfo);
	document.getElementById('user-data-holder').addEventListener('click', editUserInfo);
});

function coverImgTemplate(url){
	var source   = document.getElementById("cover-img").innerHTML;
	var template = Handlebars.compile(source);

	var trueSrc = 'assets/'+url;
	var context = {src: trueSrc};
	var html    = template(context);

	var placeholder = document.getElementById('background-outer');
	placeholder.innerHTML = html;
}

function profileImgTemplate(url){
	var source   = document.getElementById("profile-img").innerHTML;
	var template = Handlebars.compile(source);

	var trueSrc = 'assets/'+url;
	var context = {profileImg: trueSrc};
	var html    = template(context);

	var placeholder = document.getElementById('profile-outer');
	placeholder.innerHTML = html;
}

function populateUserInfo(userData){
	var source   = document.getElementById("user-data").innerHTML;
	var template = Handlebars.compile(source);

	var context = {
		name: userData.name,
		location: userData.location,
		birthday: userData.birthday,
		occupation: userData.occupation,
		relationship: userData.relationshipStatus,
		interest: userData.interestedIn
	};
	var html = template(context);

	var placeholder = document.getElementById('box-body');
	placeholder.innerHTML = html;
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
			saveNewInfo(fieldToEdit.val());
			fieldToEdit.removeClass('editing');
			fieldToEdit.attr('readonly', 'true');
		});
	}
}

function saveNewInfo(data){
	console.log(data);
	//This would be a PUT request if the server worked.
}