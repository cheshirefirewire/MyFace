var getBlogData = function(){
    return $.ajax({
	method: 'GET',
	url : 'http://localhost:3000/blogs',
    dataType: 'json',
    });
}

function blogsTemplate(data){
	var source   = document.getElementById("blog-template").innerHTML;
    var template = Handlebars.compile(source);
    
    var html = template(data);

	var placeholder = document.getElementById('blog-holder');
	placeholder.innerHTML += html;
}

/*function newBlog(){
    var title = $('#new-post-title').val();
    var content = $('#new-post-content').val();
    if(title && content){
        var newPost = {
            title: title,
            content: content
        };

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/blogs/',
            data: JSON.stringify(newPost),
            dataType: 'json',
            contentType: 'application/json'
        });
    }
}*/

function initBlog(){
    getBlogData().then(function(data){
        blogsTemplate(data);
        $('#submit-post').click(function(){
            newBlog();
        });
    });
}

router.registerInitHandler('blog', initBlog);
