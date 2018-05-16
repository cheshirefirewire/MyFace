//if user clicks on blog
router.renderPage('blog');

//if user clicks on gallery
// router.renderPage('gallery');


$('#blog').click(function(){
  router.renderPage('blog');
});

$('#gallery').click(function(){
  router.renderPage('gallery');
});
