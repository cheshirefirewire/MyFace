var router = (function(){

		var appTemplateCompiler = function(location){
			var source   = document.getElementById(location + '-page').innerHTML;
			var template = Handlebars.compile(source);

			var templateHtml = template();

			var placeholder = document.getElementById('app-placeholder');
			placeholder.innerHTML = templateHtml;
		};

		var setLocation = function(location){
			location = '#' + location;
			if(history.pushState) {
		        history.pushState(null, null, location);
		    }
		    else {
		        location.hash = location;
		    }
		};

		var templates = {
			blog: [], //blogInit methods
			gallery: [] //gallery init methods
		};
		var initRelevantTemplates = function(location){
			var pageInitMethod = templates[location];
			for (var i = 0; i < pageInitMethod.length; i++){
				pageInitMethod[i]();
			}
		}

		return {
			renderPage: function(location){
				setLocation(location);
				appTemplateCompiler(location);
				initRelevantTemplates(location);
			},
			registerInitHandler: function(relevantPage, initMethod){
				console.log('register init handler')
				var pageInitMethod = templates[relevantPage];
				pageInitMethod.push(initMethod);
			}
	};
})();

