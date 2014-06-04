// require.config({
//   shim: {
//   },

//   paths: {
//     hm: 'vendor/hm',
//     esprima: 'vendor/esprima',
//     jquery: 'vendor/jquery.min'
//   }
// });
 
// require(['app'], function(app) {
//   // use app here
//   console.log(app);
// });


$(document).ready(function() {
	
	$('#hero-carousel').carousel();
	$("img.lazy").show().lazyload({
		effect: 'fadeIn',
		threshold: '-100'
	});

	// var offset = $('#hero-container').height();
	// console.log('offset: ' + offset);
	// $('.catchme').css('top', offset);



	$(window).resize(function() {
  		var posY = $('#hero-container').height();
  		console.log($(window).width());
  		console.log('posy: ' + posY);
  		$('#hero-container').css('position', 'fixed');
  	
		$('.catchme').css('top', posY);
	});

	var $heroContainer = $('#hero-container');



	window.onscroll = function () {
		var y = window.pageYOffset;
		var s = 2;
		$('#hero-unit').css('bottom', y/1.5);
		$('#hero-unit').css('opacity', 1-(y/250));

		$heroContainer.css('position', 'fixed');
		$heroContainer.css('top', -y/s);




		// $('#hero-carousel').css('opacity', 1-(y/650))
		// $('#hero-unit').css('bottom', -y/3)
		// $('#hero-container').css('position', 'absolute');
		// $('hero-container').css('top', '60px');
		var posY = $('#hero-container').height();
		$('.catchme').css('top', posY);
		
		$('.carousel-caption').css('bottom', y/5 );

		// var fixHeader = $('#hero-container').outerHeight() + $('#highlight').outerHeight();
		// console.log('fixHeader: ' + fixHeader);
		// if (fixHeader < y) {
		// 	$('#header').addClass('fix-header');
		// }
		// else {
		// 	$('#header').removeClass('fix-header');
		// }

		if ($(document).scrollTop() > $('#catalog-menu').offset()['top']) {
			$('#catalog-menu').addClass('fixed');
		}
		else {
			// $('#catalog-menu').removeClass('fixed');

		}



	}

	$('#newsletter :input').focus(function() {
		$('#newsletter .options').slideDown();
	});

});
