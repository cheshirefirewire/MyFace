////////////////////////////////////////////////////

var aboutMeData = $.ajax({
	method: "GET",
  	url: "http://localhost:3000/user/1",
  	dataType: "json"
});

aboutMeData.done(function(data) {
	console.log("data: " + data);
	// Send data back to the locale variable
    aboutMeData = data;
    init(data);
});

aboutMeData.fail(function(xhr, status, errorThrown) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
 });