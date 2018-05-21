
// Blogs Code

	var getBlogData = function(){
		return $.ajax({
		method: 'GET',
		url: 'http://localhost:3000/blogs/',
		dataType: 'json'
		});
	};
	var updateBlogData = function(){
		getBlogData().then(function(data){
			blogsTempCompile(data);
		});		
	};
	var blogsTempCompile = function(templateData){
		var source   = document.getElementById('blog-template').innerHTML;
		var template = Handlebars.compile(source);

		var templateHtml = template(templateData);

		var placeholder = document.getElementById('blog-placeholder');
		placeholder.innerHTML = templateHtml;
	};

	var bindBlogEventHandlers = function(){

		$('#blogForm button').click(function(e){
			e.preventDefault();
			console.log('bindBlogEventHandlers fired');
			var title = $('input#title').val();
			var content = $('textarea#content').val();
		
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
					console.log('dataForPassing', dataForPassing);
					console.log('data', data);
				}
			})
		})
	};

	var blogInit = function(){
	  getBlogData().then(function(data){
	    blogsTempCompile(data);
	    bindBlogEventHandlers();

	  });
	};

	router.registerInitHandler('blog', blogInit);



