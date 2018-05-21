var router = (function(){
    var appTemplateCompiler = function(location){
        var source   = document.getElementById(location + "-placeholder").innerHTML;
        var template = Handlebars.compile(source);
    
        var html = template();
    
        var placeholder = document.getElementById('app-placeholder');
        placeholder.innerHTML = html;
    }

    var setLocation = function(location){
        location = '#' + location;
        if(history.pushState) {
            history.pushState(null, null, location);
        }
        else {
            location.hash = location;
        }
    }

    var templates = {
        blog: [],
        gallery: []
    }

    var initRelevantTemplates = function(location){
        var pageInitMethods = templates[location];
        for(var i = 0; i < pageInitMethods.length; i++){
            pageInitMethods[i]();
        }
    }
    
    return {
        renderPage: function(location){
            setLocation(location);
            appTemplateCompiler(location);
            initRelevantTemplates(location);
        },

        registerInitHandler: function(relevantPage, initMethod){
            var pageInitMethods = templates[relevantPage];
            pageInitMethods.push(initMethod);
        }
    }

})();