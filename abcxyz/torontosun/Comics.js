var Comics = {};
Comics.log = function (msg) {
    if ( Comics.DEBUG && typeof window.console !== 'undefined'){
        console.log(msg);
    }
};



Comics.RSS_URL = 'http://cartoonistgroup.com/templates/rsswpwg.php?id=';
Comics.RSS_IDS = [
	{
	  'name' : 'Pickles',
	  'id' : 94
	},
    { 
      'name' : 'Barney and Clyde',
      'id'   : '155'
    },
    { 
      'name' : 'Candorville',
      'id'   : '83'
    },
    { 
      'name' : 'Watch Your Head',
      'id'   : '106'
    },
    {   
      'name' : 'Home and Away',
      'id'   : '103'
    },
    { 
      'name' : 'Mike du Jour',
      'id'   : '171'
    },
    { 
      'name' : 'Little Dog Lost',
      'id'   : '102'
    },
    { 
      'name' : 'Fort Knox',
      'id'   : '154'
    },
    { 
      'name' : 'Reply All',
      'id'   : '157'
    }

    
    // { 
    //   'name' : 'Nick Anderson',
    //   'id'   : '71'
    // },
    // { 
    //   'name' : 'Clay Bennett',
    //   'id'   : '111'
    // },
    // { 
    //   'name' : 'Lisa Benson',
    //   'id'   : '92'
    // },
    // { 
    //   'name' : 'Mike Lester',
    //   'id'   : '166'
    // },
    // {  
    //   'name' : 'Signe Wilkinson',
    //   'id'   : '58'
    // }
];
Comics.RSS_CURRENT_FEED = null;
Comics.DEBUG = true;
Comics.CURRENT_COMIC_ID = 0;
Comics.CURRENT_Z = 0;
Comics.CURRENT_COMIC = 0;
Comics.NUM_ENTRIES = 7;
Comics.TOUCH_START = undefined;
Comics.LAST_TAP = null;
Comics.IS_DOUBLE_TAP = null;
Comics.INSPECTING = false;
Comics.IS_MOVING = false;
Comics.VIEWPORT_WIDTH = $(window).width();
Comics.VIEWPORT_HEIGHT = $(window).height() - $('header').height();
Comics.FETCH_COMIC = 0;
Comics.FETCH_DAY = 0;

Comics.initialize = function () {

    var a = Comics.RSS_IDS, 
        i = 0, 
        l = a.length;

  Comics.log("WIDTH: " + Comics.VIEWPORT_WIDTH);
  $('.main').width(Comics.VIEWPORT_WIDTH * Comics.NUM_ENTRIES);
  $('.comic.list').height(Comics.VIEWPORT_HEIGHT);

	new Comic(a[Comics.FETCH_COMIC].id, a[Comics.FETCH_COMIC].name);

  

  Comics.log(ComicsCollection.length + 'Comics initialized'); 

  $('body').on('touchstart', '.comic.list', Comics.StripEventHandlers.touchStart)
           .on('touchmove', '.comic.list', Comics.StripEventHandlers.touchMove)
           .on('touchend', '.comic.list', Comics.StripEventHandlers.touchEnd)
           .on('gestureend', '.strip', Comics.StripEventHandlers.gestureEndHandler)
           .on('touchstart', '.view-by-comic', Comics.showPullDown);


};

Comics.showPullDown = function () {
  $('.pull-down-wrapper, .heading-wrapper h1').toggleClass('active');

};


Comics.setupDate = function (date) {
  var today   = date,
      dEnum   = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      mEnum   = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      fmtDate = dEnum[today.getDay()] + ', ' + mEnum[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear(),
      $headingWrapper = $('.heading-wrapper h1');

  if (date.getDate() !== (new Date()).getDate()) {
    $headingWrapper.html(fmtDate);
  } else {
    $headingWrapper.html('Today\'s Comics');
  }

};

Comics.getNextComic = function () {
	Comics.FETCH_COMIC += 1;

	if (Comics.RSS_IDS[Comics.FETCH_COMIC]) {
		var comic = Comics.RSS_IDS[Comics.FETCH_COMIC]
		new Comic(comic.id, comic.name);
	}
};


Comics.nextInDeck = function ($strip, isGoingUp) {
  var $parent = $strip.parent();
      $this = $parent.find('.strip.active'),
      $next = isGoingUp ? $this.next() : $this.prev(),
      direction = isGoingUp ? 'fromBelow' : 'fromAbove',
      awayDirection = isGoingUp ? 'awayUp' : 'awayDown';

  Comics.IS_MOVING = true;
  if ( $next.length > 0 ) {
    $next.addClass('active ' + direction);
  } else {
    if ( isGoingUp ) {
      $parent.children().first().addClass('active ' + direction);
    } else {
      $parent.children().last().addClass('active ' + direction);
    }
  }
  $this.removeClass('active fromBelow fromAbove').addClass(awayDirection);
  
  setTimeout(function () {
    $('.' + awayDirection).removeClass(awayDirection);
    Comics.IS_MOVING = false;
    Comics.TOUCH_END = undefined;
    Comics.TOUCH_START = undefined;
  }, 300)
};



Comics.setupTopNav = function () {
	 var $header = $('body > header'),
	     $pulldown = $('.pull-down'),
	     $navLi = $pulldown.find('li');

 	$pulldown.css('width', $navLi.length * $navLi.width() + 250 );  

	if ( $header.scrollTop() === 0) {
		$header.animate({'scrollTop' : $header.height() * 1}, 1);
	} 	
 	$pulldown.addClass('ready');  

 	$pulldown.find('li').on('click', function () {
 		var $this = $(this);

 		$this.parent().find('li').removeClass('active');
 	    $this.addClass('active');
 	    Comics.goToComicByClassName($this.find('span').text().replace(/(\s+|'|\&)/g, '_').replace(/_+/, '_').toLowerCase());
 	});
};


Comics.touchHandler = function (e) {
	// console.log(e);
	// if ( e.originalEvents.touches.length >= 1 ) { // TODO:i need a better place for this
	   event.preventDefault(); 
	// }
};


Comics.goToComicByClassName = function (desiredComic) {

	Comics.log(desiredComic);
	Comics.goToComic($('.comic.list').index($('.' + desiredComic)));
};


Comics.goToComic = function (desiredDay) {

	var tMatrix, date;

	if (desiredDay >= Comics.NUM_ENTRIES) {
		desiredDay = 0;
	} else if ( desiredDay < 0) {
		desiredDay = Comics.NUM_ENTRIES - 1;
	}

  date = new Date();
  date.setDate(date.getDate() - desiredDay);
  Comics.setupDate(date);
	Comics.CURRENT_COMIC = desiredDay;

  if ( $('.comic.list.t-' + desiredDay + ' > li').length === 0 ) {
    Comics.FETCH_COMIC = 0;
    new Comic(Comics.RSS_IDS[Comics.FETCH_COMIC].id, Comics.RSS_IDS[Comics.FETCH_COMIC].name);   
  }

  tMatrix = Comics.translate(-Comics.VIEWPORT_WIDTH * Comics.CURRENT_COMIC);
  Comics.IS_MOVING = true;
  Comics.log('going to - ' + desiredDay);
  $('.main').css({'transform' : tMatrix});
  $('.comic.list').removeClass('active');
  $('.comic.list.t-' + desiredDay).addClass('active');



  
  setTimeout(function () {
    Comics.IS_MOVING = false;  
  }, 300);
  
  //$($('.pull-down li').removeClass('active')[desiredDay]).addClass('active'); // hehe cool!
};

Comics.MatrixFromString = function (s)
 {
    var t = /^matrix\((\S*), (\S*), (\S*), (\S*), (\S*), (\S*)\)$/g.exec(s),
        a = parseFloat(!t ? 1 : t[1]),
        b = parseFloat(!t ? 0 : t[2]),
        c = parseFloat(!t ? 0 : t[3]),
        d = parseFloat(!t ? 1 : t[4]),
        e = parseFloat(!t ? 0 : t[5]),
        f = parseFloat(!t ? 0 : t[6]);
 
    return $M([
      [a, c, e],
      [b, d, f],
      [0, 0, 1]
    ]);
 };

 Comics.buildTranslateMatrix = function (x, y)
 {
    var e = x || 0,
        f = y || 0;

    return $M([
      [0, 0, e],
      [0, 0, f],
      [0, 0, 0]
    ]);
 };

Comics.MatrixToString = function(m) {
	var s = 'matrix(',
		r, c, num;

	for(c = 1; c <= 3; c++) {
		for(r = 1; r <= 2; r++) {
			num = m.e(r, c);
			s += num + ',';

		}
	}

	s = s.substr(0, s.length - 2) + ')';

	return s;
};