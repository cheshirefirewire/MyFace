//Gallery Code
var getGalleryData = function(){
  return $.ajax({
    method: "GET",
    url: "http://localhost:3000/user/1",
    dataType: "json"
  });
}

var galleryTemplate = function(data){
  utility.templateCompiler(data, "gallery-template", "gallery-placeholder");
}

var renderModal = function(imageUrl){
  $('.modal-image').css({
      'background-image':"url("+imageUrl+")",
      'background-repeat': "no-repeat",
      'background-position': "center",
      'background-size': 'contain',
      'height':'33%',
      'width':'33%',
      'display':'table-cell',
      'vertical-align':'middle',
      'background-color':'black'
  });
  $('.gallery-modal').fadeIn();
};

var listenToImageClicks = function(){
  var galleryContainer = document.querySelector('.gallery-container');
  galleryContainer.addEventListener('click', function($event){
    console.log('$event.target', $event.target);
    if(event.target.tagName.toLowerCase() === 'img'){
      console.log('$event.target.src', $event.target.src);
      renderModal($event.target.src);

    }
  });
}

var galleryInit = function(){
  getGalleryData().then(function(data){
    galleryTemplate(data);
    listenToImageClicks();
  });
};

router.registerInitHandler('gallery', galleryInit);
