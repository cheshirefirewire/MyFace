/*var myData = $.ajax({
    method: "GET",
    url: "http://localhost:3000/user",
    dataType: "jsonp"
    success: function (data) {

        myDate = date;
    }
}).then(function (data) {
    myTemplateFunction(Mydata[0]);
    addEventListener();
});*/



// ProfileImg
(function profileImg(){
var source = document.getElementById("profileImg").innerHTML;
var template = Handlebars.compile(source);

var context = {profile_img: "image/profile.png" };

var htmlTemplate = template(context);

var profileImg = document.getElementById("profile-holder");
profileImg.innerHTML = htmlTemplate;

// // Nav
var source = document.getElementById("asideNav").innerHTML;
var template = Handlebars.compile(source);

var context = { 
    Name: "Tshe", 
    Location: "Blouder Creek", 
    Birthday: "03/02/1990", 
    Occupation: "Thinking", 
    Relationship: "Single", 
    InterestedIn: "None" };

var html = template(context);


var placeholder = document.getElementById("navHolder");
placeholder.innerHTML = html;
})();
/*
$(document).ready(function){
    var aboutMylist = document.querySelector('ul');
    aboutMylist.addEventListener('event', function ($event) {
        if ($($event.targe).hasClass('fieldEditor')) {
            var fieldToEdit = $($event.target).parent('li').find('input')[0];
            $(fieldEditor).removeAttr('readonly');
            document.addEventListener('click', function ($event) {
                $(fieldEditor).attr('readonly', 'true');
            });
        }
    });
}
*/