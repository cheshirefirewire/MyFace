//Blogs Code
var getBlogData = function(){
  return $.ajax({
    method: "GET",
    url: "http://localhost:3000/blogs/",
    dataType: "json"
  });
};

var updateBlogData = function(){
  getBlogData().then(function(data){
    blogsTemplateCompile(data);
  });
}

var blogsTemplateCompile = function(data){
  utility.templateCompiler(data, "blog-template", "blog-placeholder");
};

var bindBlogEventHandlers = function(){
  $("#blogForm button").click(function(e) {
       // validate and process form here
      e.preventDefault();
      var title = $("input#title").val();
      var content = $("input#content").val();
      var dataForPassing = {};
      dataForPassing['title'] = title;
      dataForPassing['content'] = content;
      dataForPassing['comment'] = [];
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

var bindCommentEventHandlers = function(){
  $(".commentForm button").click(function(e) {
       // validate and process form here
      e.preventDefault();
      var comment = $("input#commentBody").val();
      var dataForPassing = {};
      dataForPassing['comment'] = comment;
      console.log('comment dataForPassing', dataForPassing);
      $.ajax({
        method: "PUT",
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

var blogInit = function(){
  getBlogData().then(function(data){
    blogsTemplateCompile(data);
    bindBlogEventHandlers();
    bindCommentEventHandlers();
  });
};

router.registerInitHandler('blog', blogInit);
