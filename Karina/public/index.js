// To start json server: json-server --watch db.json

var myData = $.ajax({
    method: "GET",
    url: "http://localhost:300/user",
    dataType: "json",
    success: function(data) {
        myData = data;
    }
}).then(function(data){
    aboutMeTemplate(myData[0]);
    addEventListeners();
});

var aboutMeTemplate = function(templateData) {
    var source   = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    
    var html = template(templateData);
    
    var placeholder = document.getElementById("about-placeholder");
    placeholder.innerHTML = html;
}

var listenToAboutMeFieldChanges = function() {
    var aboutMeList = document.querySelector('ul')
    .addEventListener('click', console.log('event ', $event));
};

var blogs = $.ajax({
    method: "GET",
    url: "http://localhost:300/blogs/1",
    dataType: "json",
    success: function(data) {
        blogs = data;
    }
}).then(function(data){
    console.log('data',data);
    aboutMeTemplate(data);
    listenToAboutMeFieldChanges();
}

var blogsTemplate = function(templateData) {
    var source   = document.getElementById("blog-template").innerHTML;
    var template = Handlebars.compile(source);
    
    var html = template(templateData);
    
    var placeholder = document.getElementById("blog-placeholder");
    placeholder.innerHTML = html;
}

$("#form1".submit(function(event) {

    event.preventDefault();

    var $form = $(this),
        title = $form.find("input[name='title']").val(),
        content = $form.find("input[name='content']".val(),
        url = $form.attr("action");
    
    var posting = $.post(url, {title: title, content: content});

    posting.done(function(data) {
        console.log(data);
    });
});

