var getBlogData = function(){
    return $.ajax({
	method: 'GET',
	url : 'http://localhost:3000/blogs',
    dataType: 'json',
    });
}

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

var blogsTemplateCompile = function(data){
    $('#blog-holder').html('');
    utility.templateCompiler(data, 'blog-template', 'blog-holder');
}

var bindBlogEventHandlers = function(){
    
    $("#submit-post").click(function(e) {

        var title = $("#new-post-title").val();
        var content = $("#new-post-content").val();

        if(title && content){
            var dataForPassing = {};

            dataForPassing['title'] = title;
            dataForPassing['content'] = content;
            dataForPassing['comments'] = [];

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
                console.log(error);
            }
            });
        }
    });
  }
  
  var bindCommentEventHandlers = function(){
    $(".commentForm button").click(function(e) {

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
                    console.log(error);
                }
            });
        });
    });
  }

var initBlog = function(){
    getBlogData().then(function(data){
        blogsTemplateCompile(data);
        bindBlogEventHandlers();
        bindCommentEventHandlers();
    });
}

router.registerInitHandler('blog', initBlog);
