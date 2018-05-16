var utility = (function(){
  return {
    templateCompiler: function(templateData, componentTemplate, templatePlaceholder){
      var source   = document.getElementById(componentTemplate).innerHTML;
      var template = Handlebars.compile(source);
      var html = template(templateData);
      var placeholder = document.getElementById(templatePlaceholder);
      placeholder.innerHTML = html;
    }
  };
})();
