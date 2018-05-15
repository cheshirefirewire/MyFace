

var myData = function(){
  var myData = $.ajax({
    method:"GET",
    dataType:"json",
    url:"http://localhost:3000/users/",
    success: function(data){
      init(data);
    },
    error: function(error){
      console.log("error is ", error);
    }
  });
}

var init = function(data){
  entryTemplate(data[0]);
  addEventListeners();
}

var entryTemplate = function(data){
  var source   = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);
  var html    = template(data);
  var placeholder = document.getElementById("main");
  placeholder.innerHTML = html;
}

var addEventListeners = function(){
  var editBuffer = {};
  var aboutList = document.querySelector('ul.list-about');


  // edit functionality for about section
  aboutList.addEventListener('click', function(e){
    if(e.target.tagName === 'SPAN') {
      var userid = $(e.target).parents('ul').find('li input[name="userid"]').val();
      console.log(userid);
      var fieldToEdit = $(e.target).parent('li').find('input')[0];
      if (fieldToEdit.hasAttribute('readonly')){
        editBuffer[fieldToEdit.name]=fieldToEdit.value;
        fieldToEdit.removeAttribute('readonly');
      } else {
        fieldToEdit.setAttribute('readonly', true);
        var key = fieldToEdit.name;
        var newValue = fieldToEdit.value;
        var oldValue = editBuffer[key];
        if (newValue.trim() !== oldValue.trim()){
          var user = {};
          user[key]=newValue.trim();
          sendData(user, userid);
        }
      }
    }
  });


}

var sendData = function(data, userid){
  var address = "http://localhost:3000/users/"+userid;
  var xhr = $.ajax({
    method:'PATCH',
    data: JSON.stringify(data),
    dataType: 'json',
    headers: { 'content-type' : 'application/json'},
    url:address,
    success: function(data){
      console.log('ajax call returns ', data);
    },
    error: function(error){
      console.log("error is ", error);
    }
  });


}

$(document).ready(function(){
   myData();
});
