//Blogs Code
var getBlogData = function(){
  return $.ajax({
    method: "GET",
    url: "http://localhost:3000/blogs/",
    dataType: "json"
  });
};

var getSpecificBlogData = function(id){
  return $.ajax({
    method: "GET",
    url: "http://localhost:3000/blogs/" + id,
    dataType: "json"
  });
};

var updateBlogData = function(){
  getBlogData().then(function(data){
    blogsTemplateCompile(data);
  });
}

var blogsTemplateCompile = function(templateData){
  utility.templateCompiler(templateData, "blog-template", "blog-placeholder");
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
      dataForPassing['comments'] = [];
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
      var comment = $("input#comment").val();
      var id = 1;
      var commentData = {};
      commentData['comment'] = comment;
      getSpecificBlogData(id).then(function(data){
        data.comments.push(commentData);
        var dataForPassing = data;
        $.ajax({
          method: "PUT",
          url: "http://localhost:3000/blogs/"+ id,
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
