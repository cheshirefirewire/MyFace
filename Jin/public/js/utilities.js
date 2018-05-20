var utility = (function(){
    return {
        templateCompiler: function (templateData, template, templatePlaceholder){
            var source   = document.getElementById(template).innerHTML;
            var template = Handlebars.compile(source);
            var html = template(templateData);
            var placeholder = document.getElementById(templatePlaceholder);
            placeholder.innerHTML += html;
        }
    };
})();

