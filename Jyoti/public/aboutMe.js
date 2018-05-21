//About Me Code
var getAboutMeData = function(){
  return $.ajax({
    method: "GET",
    url: "http://localhost:3000/user/1",
    dataType: "json"
  });
}

var aboutMeTemplate = function(templateData){
  utility.templateCompiler(templateData, "about-me-template", "about-me-placeholder");
}

var listenToAboutMeFieldChanges = function(){
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
          updateUserObject($(fieldToEdit).attr('model'), fieldToEdit.value);
        }
      });
    }
  });
}

var updateUserObject = function(model, value){
  var dataForPassing = {};
  dataForPassing[model] = value;
  $.ajax({
    method: "PATCH",
    url: "http://localhost:3000/user/1",
    dataType: "json",
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

var aboutMeInit = function(){
  getAboutMeData().then(function(data){
    console.log('data',data);
    aboutMeTemplate(data);
    listenToAboutMeFieldChanges();
  });
};

router.registerInitHandler('gallery', aboutMeInit);
router.registerInitHandler('blog', aboutMeInit);
