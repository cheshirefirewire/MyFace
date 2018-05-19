$(document).ready(function(){

var navbar = document.querySelector('.nav');
navbar.addEventListener('click', navToggle);

function navToggle(e){
	if(e.target.tagName === 'A'){
		console.log('li found')
		if(e.target.innerHTML === 'blog'){
			console.log('blog clicked');
			router.renderPage('blog');
		}
		if(e.target.innerHTML === 'gallery'){
			router.renderPage('gallery');
			console.log('gallery clicked');
		}
	}
}

router.renderPage('blog');


});

