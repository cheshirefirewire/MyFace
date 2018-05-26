var utility = (function(){

  apiUrl = "http://localhost:3000";

  return {
    templateCompiler: function(templateData, componentTemplate, templatePlaceholder){
      var source   = document.getElementById(componentTemplate).innerHTML;
      var template = Handlebars.compile(source);
      var html = template(templateData);
      var placeholder = document.getElementById(templatePlaceholder);
      placeholder.innerHTML = html;
    },

    apiGetData : (directory, successFunction, failFunction) => {
      var jqXHR = $.get(apiUrl+"/"+directory+"/");
      jqXHR.done(successFunction);
      jqXHR.fail(failFunction);
    },

    apiPatchData : (directory, id, data, successFunction, failFunction) => {
      var jqXHR = $.ajax({
        method:'PATCH',
        data: JSON.stringify(data),
        headers: {'content-type' : 'application/json'},
        url:apiUrl+"/"+directory+"/"+id
      });
        
      jqXHR.done(successFunction);
      jqXHR.fail(failFunction);
    }

  };
})();
