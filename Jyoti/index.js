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
  addEventListeners();
});


var myTemplateFunction = function(templateData){
  var source   = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);

  var html = template(templateData);

  var placeHolder = document.getElementById("placeHolder");
  placeHolder.innerHTML = html;
}

var addEventListeners = function(){
  var aboutMeList = document.querySelector('ul');
  aboutMeList.addEventListener('click', function($event){
    $event.stopPropagation();
    if($($event.target).hasClass('fieldEditor')){
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





// url: "http://localhost:3000/user/1?" + model + "=" + value,








// kjkj
