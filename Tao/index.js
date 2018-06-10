var index = (function(){

  var currentblog = {};
  var currentgallery = {};
  var currentabout = {};

  getMyData = () => {
    utility.apiGetData("users", this.initAbout, this.consoleError);
  };


  getBlogData = () => {
    utility.apiGetData("blogs", this.initBlog, this.consoleError);
  };

  getGalleryData = () => {
    utility.apiGetData("users", this.initGallery, this.consoleError);
  };

  initAbout = (data) => {
    utility.templateCompiler(data[0], "entry-template", "main");
    currentabout = data;
    this.attachNavLinks();
    this.addAboutListeners();
  };

  initBlog = (data) => {
    $('#galleryBox').hide();
    utility.templateCompiler(data[0], "blog-template", "blogBox");
    $('#blogBox').show();
    currentblog = data;
    this.addBlogListeners();
  };

  initGallery = (data) => {
    $('#blogBox').hide();
    utility.templateCompiler(data[0], "gallery-template", "galleryBox");
    $('#galleryBox').show();
    this.addGalleryListeners();
  };

  // menu event functions
  attachNavLinks = () => {
    $('li.link-blog').click(this.getBlogData);
    $('li.link-gallery').click(this.getGalleryData);
  };

  // about event functions
  addAboutListeners = () => {
    var editBuffer = {};

    document.querySelector('ul.list-about').addEventListener('click', function(e){
      
      if(event.target.tagName.toLowerCase() !== 'span') {
        return false;
      }

      var li = $(e.target).parent('li');
      var userid = $(li).parent('ul').find('li input[name="userid"]').val();
      var fieldToEdit = $(li).find('input')[0];
      var fieldValue = fieldToEdit.value.trim();
      var key = fieldToEdit.name;
      var toggleAbout = () => {
        $(li).find(' span.edit-about').toggle();
        $(li).find(' span.save-about').toggle();
        $(fieldToEdit).prop('readonly', function(index, prop){
          return prop == true ? null : true;
        });
      }

      if($(e.target).hasClass('edit-about')) {
        editBuffer[key] = fieldValue;
        toggleAbout();

      } else if ($(e.target).hasClass('save-about')) {
        toggleAbout();

        if (fieldValue !== editBuffer[key]){
          var user = {};
          user[key]=fieldValue;
          updateAbout(userid, user);
        }
      } else {
        return false;
      }
    });
  };

  updateAbout = (userid, data) => {
    utility.apiPatchData("users", userid, data, consoleSuccess, consoleError);
  };


  // blog event functions
  addBlogListeners = () => {
    $('#savePost').click(this.savePost);
    $('.saveCommentBtn').click(this.saveComment);
  };

  createPost = (currentblog) => {
    var blogarray = currentblog[0].blog;
    // check if there are any posts first, because we might have to put the first one into the db.json
    var newpost = {
      'id' : blogarray[blogarray.length-1].id + 1,
      'subject' : $('li#new-post-subject .subject-post').val(),
      'date' : new Date().toLocaleString(),
      'body' : $('li#new-post-body .body-post').val(),
      'comments' : []
    };
    blogarray.push(newpost);
    return {"blog" : blogarray};
  };

  savePost = (data) => {
    utility.apiPatchData("blogs", utility.findUserId(), createPost(currentblog), this.getBlogData, consoleError);
  }

  saveComment = (e) => {

    var ul = $(e.target).parents('ul.blog-post-list');
    var postid = parseInt($(ul).attr('data-postid').trim());

    var currentdata = currentblog[0];
    var blogarray = currentdata.blog;
    var commentsarray=[];
    var postindex;
    
    blogarray.map((post, indx) => {
      if (post.id === postid) {
        postindex = indx;
        var temp = post.comments;
        temp.map(comment => {
          commentsarray.push(comment);
        });
       
      }
    });

    if (commentsarray.length > 0) {
      var newcommentid = commentsarray[commentsarray.length-1].id + 1;
    } else {
      var newcommentid = 1;
    }

    var newcomment = {
      "id": newcommentid,
      "userid" : 2, // don't know yet how we will do this - local storage?
      "body" : $(ul).find('li input[name="blog-comment-new"]').val()
    }

    commentsarray.push(newcomment);

    blogarray[postindex].comments = commentsarray;

    var patch = {
      "blog" : blogarray
    }

    utility.apiPatchComments("blogs", utility.findUserId(), patch, this.getBlogData, consoleError );

  };


  // gallery functions

  addGalleryListeners = function(){
    $('#gallery-container').on('click', 'img', function(e){
      renderModal($(e.target).attr('src'));
    });
  }

  var renderModal = function(imageUrl){
    $('.modal-image').css({
        'background':"url("+imageUrl+") no-repeat center",
    });
    $('.gallery-modal').fadeIn();
  };



  // generic standin callback functions

  consoleSuccess = (data) => {
    console.log('successful call returns ', data);
  };

  consoleError = (data) => {
    console.log("error is ", data);
  };

  // initialize page
  $(document).ready(() => {
    this.getMyData();
  });
    
})();




