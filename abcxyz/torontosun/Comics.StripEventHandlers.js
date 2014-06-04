
Comics.StripEventHandlers = {};


Comics.StripEventHandlers.touchStart = function(event) {
	var e = event.originalEvent,
	    touch = e.touches[0];

	Comics.log(((new Date()).getTime() - Comics.LAST_TAP));

	// if (!Comics.IS_MOVING && Comics.LAST_TAP && (new Date()).getTime() - Comics.LAST_TAP < 400) {
	// 	Comics.IS_DOUBLE_TAP = true;
	// 	Comics.LAST_TAP = null;
	// } else {
	// 	Comics.LAST_TAP = (new Date()).getTime();
	// }

	Comics.TOUCH_START = { 'x': touch.pageX, 'y' : touch.pageY };
	Comics.log("Touchstart x:" + touch.pageX + ", y:" + touch.pageY);
};

Comics.StripEventHandlers.touchMove = function (event) {
        
    var $this = $(this),
    	$main = $('.main'),
    	e = event.originalEvent,
        touch = e.touches[0],
        oMatrix = Comics.MatrixFromString($this.css('transform')),
        tMatrix,
        mMatrix = Comics.MatrixFromString($('.main').css('transform')),
        yDelta, xDelta,
        moveRate = Comics.INSPECTING ? 20 : 4;

    if (e.touches.length > 1 || typeof Comics.TOUCH_START === 'undefined') {
    	return;
    }

    Comics.TOUCH_END = { 'x': touch.pageX, 'y' : touch.pageY };
    yDelta = Comics.TOUCH_START.y - Comics.TOUCH_END.y;
    xDelta = Comics.TOUCH_START.x - Comics.TOUCH_END.x;

    // if ( !Comics.IS_MOVING ) {

        if ( Math.abs(xDelta) > Math.abs(yDelta) ) { 
        	event.preventDefault();
        		// tMatrix = Comics.buildTranslateMatrix(-xDelta/moveRate, 0);
        		// $this.parents('.main').css({'transform' : Comics.MatrixToString(oMatrix.add(tMatrix)) });
        		// // $this.parents('.main').css({'transform' : Comics.translate(xDelta/moveRate, 0, 0)});
        }
     //}
};

Comics.StripEventHandlers.touchEnd = function(event) {

	if (Comics.IS_DOUBLE_TAP) {
		Comics.StripEventHandlers.doubleTap(this, event.originalEvent);
		return;
	} else if (typeof Comics.TOUCH_END === 'undefined') { // no move info
	  return;
	} 

	var $this = $(this),
		xDelta = Comics.TOUCH_START.x - Comics.TOUCH_END.x,
	    yDelta = Comics.TOUCH_START.y - Comics.TOUCH_END.y,
	    xDeltaAbs = Math.abs(xDelta),
	    yDeltaAbs = Math.abs(yDelta),
	    oMatrix = Comics.MatrixFromString($('.main').css('transform')),
	    tMatrix;

	Comics.log('xDelta: ' + xDelta + ', ' + yDelta);

	if ( !Comics.IS_MOVING && (xDeltaAbs > Comics.VIEWPORT_WIDTH / 10 )) {

        if (xDelta > 0) {
            Comics.log('x going left');
            
            Comics.goToComic(Comics.CURRENT_COMIC + 1);

        } else {
        	Comics.log('x going right');
        	Comics.goToComic(Comics.CURRENT_COMIC - 1);
        }
	}	

	setTimeout(function () {
	  Comics.IS_MOVING = false;
  	  Comics.TOUCH_END = undefined;
  	  Comics.TOUCH_START = undefined;
	}, 300);
};

Comics.StripEventHandlers.gestureEndHandler = function (event) {
	var e = event.originalEvent;
	
	if ( e.scale > 1.0 || e.scale < 1.0 ) {
		Comics.StripEventHandlers.doubleTap(this, e);
		return;
	}
};

Comics.StripEventHandlers.doubleTap = function (el, ev) {
	//TODO: goes to different view (single comic view)


	// var $el = $(el);

	// Comics.IS_DOUBLE_TAP = null;
	// Comics.LAST_TAP = null;
	// Comics.INSPECTING = !Comics.INSPECTING;

	// if (Comics.INSPECTING) {
	// 	$('body').append($el.clone().css('transform', '').addClass('inspect'));
	// 	$('.main-wrapper').hide();
	// 	// $('meta[name=viewport]').attr('content', 'user-scalable=1');
		
	// } else {
	// 	$el.detach();
	// 	$('.main-wrapper').show();
	// }
};

Comics.translate = function (x, y, z, el) {
	x = x || 0;
	y = y || 0;
	z = z || 0;

	if ( typeof el === 'undefined' ) {
		return 'translate3D(' + x + 'px, ' + y + 'px , ' + z + 'px)';
	} else if (typeof jQuery !== 'undefined') {
		return jQuery(el).css('transform', 'translate3D(' + x + 'px, ' + y + 'px , ' + z + 'px)');
	} else {
		var s = el.style
		s.transform = s.MozTransform = s.webkitTransform = 'translate3D(' + x + 'px, ' + y + 'px , ' + z + 'px)';
		return el;
	}
}


// function k(e) {
// 	var t, n, r = c.style;
// 	if(e.touches.length > 1 || e.scale && e.scale !== 1) return;
// 	pagex = e.touches[0].pageX,
// 	pagey = e.touches[0].pageY,
// 	y = pagex - touchstartX,
// 	typeof w == "undefined" && (w = !! (w || Math.abs(y) < Math.abs(pagey - g))),
// 	w || (e.preventDefault(),
// 	y /= !a && y > 0 || a == o - 1 && y < 0 ? Math.abs(y) / s + 1 : 1,
// 	r.MozTransform = r.webkitTransform = "translate3d(" + (deltax - a * s) + "px,0,0)")
// }


// function S() {
//        l.addEventListener("touchstart", C, !1), l.addEventListener("touchmove", k, !1), l.addEventListener("touchend", L, !1), h && p && (h.addEventListener("click", function(t) {
//            t.preventDefault(), e.prev()
//        }, !1), p.addEventListener("click", function(t) {
//            t.preventDefault(), e.next()
//        }, !1)), c.addEventListener("webkitTransitionEnd", A, !1), c.addEventListener("msTransitionEnd", A, !1), c.addEventListener("oTransitionEnd", A, !1), c.addEventListener("transitionend", A, !1), window.addEventListener("resize", T, !1), window.addEventListener("onorientationchange", T, !1)
//    }



