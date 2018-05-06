//Blogs Code
var blogs = [];
var getBlogData = function(){
  return $.ajax({
    method: "GET",
    url: "http://localhost:3000/blogs/",
    dataType: "json"
  });
};

var updateBlogData = function(){
  getBlogData().then(function(data){
    blogsTemplateCompile
  });
}

var blogsTemplateCompile = function(templateData){
  var source   = document.getElementById("blog-template").innerHTML;
  var template = Handlebars.compile(source);

  var html = template(templateData);

  var placeholder = document.getElementById("blog-placeholder");
  placeholder.innerHTML = html;
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
      $.ajax({
        method: "POST",
        url: "http://localhost:3000/blogs/",
        dataType: "json",
        data: JSON.stringify(dataForPassing),
        contentType: 'application/json',
        success: function(data){
          updateBlogData();
        },
        error: function(error){
          console.log('dataForPassing error', dataForPassing);
          console.log('error',error);
        }
      });
  });
}

var blogInit = function(){
  getBlogData().then(function(data){
    blogs = data;
    console.log('data in success', data);
    console.log('blogs in success', blogs);
    blogsTemplateCompile(blogs);
    bindBlogEventHandlers();
  });
};

routingMethod.registerInitHandler(blogInit, 'blog');
