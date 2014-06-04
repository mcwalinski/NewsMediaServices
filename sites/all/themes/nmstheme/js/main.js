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

(function ($) { 
    $(document).ready(function() {
	
		$(".emails").each(function() {
			var text = $(this).html();
			var email = text.replace("&amp;","@");
			var email = email.replace("&amp;","@");
			var email = email.replace("&","@");
			$(this).html(email);
		}
		);
	
        $('#hero-carousel').carousel();

        if ($('#catalog-menu')) {
            $('#catalog-menu').scrollspy()
        }
	
        $("img.lazy").show().lazyload({
            //effect: 'fadeIn',
            threshold: '500'
        });
	
        // var offset = $('#hero-container').height();
        // console.log('offset: ' + offset);
        // $('.catchme').css('top', offset);

        $('#newsletter :input').focus(function() {
            $('#newsletter .options').slideDown();
        });

        // window.onscroll = function () {
        //     var offsetY = window.pageYOffset;
        //     var speed = 2;
        //     var heroHeight = $('#hero-container').height();

        //     $('.parallax').css('top', heroHeight);
        //     $('#hero-container').css('position', 'fixed').css('top', -offsetY/speed);

        //     if ($('#catalog-menu').hasClass('affix')) {
        //         $('#catalog-menu').css('top', $('#header').height());
        //         $('.region-nms-content').css('padding-top', $('#header').height() )
        //     }
        //     else {
        //         $('.region-nms-content').css('padding-top', 0 )
        //     }
        // }

        // $('#catalog-menu.affix').css('top', $('#header').height())




        var affixCatalog = function () {
            $('#catalog-menu').affix({
                offset: {
                    top: ($('#catalog-menu').offset().top - $('#header').height())
                }
            })
            $('#catalog-menu').css('top', $('#header').height())

            if ($('#catalog-menu').hasClass('affix')) {
                $('.region-nms-content').css('padding-top', $('#catalog-menu').height() )
            }
		
        };

        affixCatalog();
        window.onresize = affixCatalog;







    });
	


	
})(jQuery);

var count = 0;
function smoothScroll(id){
    jQuery('html,body').animate({scrollTop: jQuery('#' + id.id).offset().top-300}, 1000); 
    if(count < 2)
    {
        //alert("test1")
        count++;
        setTimeout(smoothScroll(id), 1500);
    }
    else
    {
        count = 0;
        //alert("test2");
    }
}