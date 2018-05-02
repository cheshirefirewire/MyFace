
//About Me Code
var aboutMeData = $.ajax({
  method: "GET",
  url: "http://localhost:3000/user/1",
  dataType: "json",
  success: function (data) {
        // Send data back to the locale variable
        aboutMeData = data;
  }
}).then(function(data){
  console.log('data',data);
  aboutMeTemplate(data);
  listenToAboutMeFieldChanges();
});

var aboutMeTemplate = function(templateData){
  var source   = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);

  var html = template(templateData);

  var placeHolder = document.getElementById("placeHolder");
  placeHolder.innerHTML = html;
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
          updateUserObject($(fieldToEdit).attr('model'), fieldToEdit.value, aboutMeData);
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


//Blogs Code
var blogs = [];
var getBlogData = function(){
  return $.ajax({
    method: "GET",
    url: "http://localhost:3000/blogs/",
    dataType: "json",
    success: function (data) {
          // Send data back to the locale variable
          console.log('data in success', data);
          console.log('blogs in success', blogs);
    }
  });
};

var updateBlogData = function(){
  getBlogData().then(function(data){
    blogs = data;
    blogsTemplateCompile(blogs);
  });
}

var blogsTemplateCompile = function(templateData){
  var source   = document.getElementById("blog-template").innerHTML;
  var template = Handlebars.compile(source);

  var html = template(templateData);

  var placeHolder = document.getElementById("blog-placeHolder");
  placeHolder.innerHTML = html;
};

var bindBlogEventHandlers = function(){
  $("#form1 button").click(function(e) {
       // validate and process form here
      e.preventDefault();
      var title = $("input#title").val();
      var content = $("input#content").val();
      var dataForPassing = {};
      dataForPassing['title'] = title;
      dataForPassing['content'] = content;
      console.log('blog dataForPassing', dataForPassing);
      $.ajax({
        method: "POST",
        url: "http://localhost:3000/blogs/",
        dataType: "json",
        data: JSON.stringify(dataForPassing),
        contentType: 'application/json',
        success: function(data){
          console.log('dataForPassing success', dataForPassing);
          console.log('data',data);
          updateBlogData();
        },
        error: function(error){
          console.log('dataForPassing error', dataForPassing);
          console.log('error',error);
        }
      });
  });
}

var blogInit = (function(){
  getBlogData().then(function(data){
    blogs = data;
    blogsTemplateCompile(blogs);
    bindBlogEventHandlers();
  });
})();
