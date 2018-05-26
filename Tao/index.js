var index = (function(){

  getMyData = () => {
    utility.apiGetData("users", this.initAbout, this.consoleError);
  };


  getBlogData = () => {
    utility.apiGetData("blogs", this.initBlog, this.consoleError);
  };

  getGalleryData = () => {

  };

  initAbout = (data) => {
    utility.templateCompiler(data[0], "entry-template", "main");
    this.attachNavLinks();
    this.addAboutListeners();
  };

  initBlog = (data) => {
    utility.templateCompiler(data[0], "blog-template", "blogBox");
  };

  attachNavLinks = () => {
    $('li.link-blog').click(this.getBlogData);
    $('li.link-gallery').click(this.getGalleryData);
  };

  addAboutListeners = () => {
    var editBuffer = {};

    document.querySelector('ul.list-about').addEventListener('click', function(e){
      
      var li = $(e.target).parent('li');
      var fieldToEdit = $(li).find('input')[0];
      var userid = $(li).parent('ul').find('li input[name="userid"]').val();

      if($(e.target).hasClass('edit-about')) {
        editBuffer[fieldToEdit.name]=fieldToEdit.value;
        fieldToEdit.removeAttribute('readonly');
        $(li).find(' span.edit-about').hide();
        $(li).find(' span.save-about').show();

      } else if ($(e.target).hasClass('save-about')) {
        fieldToEdit.setAttribute('readonly', true);
        $(li).find(' span.save-about').hide();
        $(li).find(' span.edit-about').show();
        
        var key = fieldToEdit.name;
        var newValue = fieldToEdit.value;
        var oldValue = editBuffer[key];

        if (newValue.trim() !== oldValue.trim()){
          var user = {};
          user[key]=newValue.trim();
          index.updateAbout(userid, user);
        }
      } else {
        return false;
      }
    });
  };

  updateAbout = (userid, data) => {
    utility.apiPatchData("users", userid, data, consoleSuccess, consoleError)
  };

  consoleSuccess = (data) => {
    console.log('successful call returns ', data);
  };

  consoleError = (data) => {
    console.log("error is ", error);
  };

  // initialize page
  $(document).ready(() => {
    this.getMyData();
  });
    
})();




