var getBlogData = function(){
  return $.ajax({
    method: "GET",
    url: "http://localhost:3000/blogs/1",
    dataType: "json"
  });
};

var updateBlogData = function(){
  getBlogData().then(function(data){
  	console.log('getBlogData: ' + data);
    populateBlogOutputContent(data);
  });
}

function submitForm() {
	$('#form1Button').click(function(event) {
		//to prevent full page refresh
		event.preventDefault();
		var title = $('#title').val();
		var content = $('#content').val();
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

(function blogInit() {
	getBlogData().then(function(data) {
		populateBlogOutputContent(data);
		submitForm();
	});
})();

////////////////////////////////////////////////////