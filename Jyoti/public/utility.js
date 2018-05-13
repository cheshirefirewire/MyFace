var utility = (function(){
  return{
    templateCompiler: function(templateData, template, placeholder){
      var source   = document.getElementById(template).innerHTML;
      var template = Handlebars.compile(source);
      var html = template(templateData);
      var placeholder = document.getElementById(placeholder);
      placeholder.innerHTML = html;
    }
  }
})();






// templateCompilerForClass: function(templateData, template, placeholder){
//   var source   = document.getElementById(template).innerHTML;
//   var template = Handlebars.compile(source);
//   var html = template(templateData);
//   var idPlaceholder = document.getElementById(placeholder);
//   var classPlaceholder = document.getElementsByClassName(placeholder)
//   if(idPlaceholder === null && classPlaceholder.length !== 0){
//     console.log('this one has a class', classPlaceholder);
//     for(var i=0; i<classPlaceholder.length; i++){
//
//       classPlaceholder[i].innerHTML = html;
//     }
//   }else if(idPlaceholder !== null && classPlaceholder.length === 0){
//     console.log('this one has an id', idPlaceholder);
//     idPlaceholder.innerHTML = html;
//   }
// }
