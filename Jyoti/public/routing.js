//if url === /gallery
//run gallery init
//if url === /blog
//run blog init

var routingMethod = (function(){
  var setLocation = function(location){
    location = '#' + location;
    if(history.pushState) {
        history.pushState(null, null, location);
    }
    else {
        location.hash = location;
    }
  }
  var appTemplateCompile = function(location){
    var source   = document.getElementById(""+ location + "-page").innerHTML;
    var template = Handlebars.compile(source);
    var html = template();
    var placeholder = document.getElementById("app-placeholder");
    placeholder.innerHTML = html;
  }
  var templates = {
    blog: [],
    gallery: []
  };
  var initRelevantTemplates = function(location){
    var pageInitMethods = templates[""+ location + ""];
    for(var i=0; i<pageInitMethods.length; i++){
      pageInitMethods[i]();
    }
  }
  return {
    renderPage: function(location){
      setLocation(location);
      appTemplateCompile(location);
      initRelevantTemplates(location);
    },
    registerInitHandler: function(initMethod, relevantPage){
      var pageInitMethods = templates[relevantPage];
      pageInitMethods[pageInitMethods.length] = initMethod; //add init method to end of page array
    }
  };
})();
