var Comic = function (id, name) {
	    Comics.log('created comic with ID = ' + id);
	    this.URL = Comics.RSS_URL + id;
	    this.ID = id;
	    this.NAME = name;
	    this.getFeed(Comics.NUM_ENTRIES);
	},
	ComicsCollection = []; // array of Comics;

Comic.prototype.ID = null;
Comic.prototype.NAME = null;
Comic.prototype.URL = null;
Comic.prototype.FEED = null;
Comic.prototype.HEADER = null; // can't get this w/ google feeds.....

Comic.prototype.getFeed = function() {

    var feed = new google.feeds.Feed(this.URL),
        that = this;
    
    feed.setNumEntries(Comics.NUM_ENTRIES);
    feed.load(function(result) {
        if(!result.error) {
            that.FEED = result;
            that.NAME = result.feed.title;
            that.render();
        } else {
            Comics.log('error');
        }
        Comics.getNextComic();
    });
};


/*

{
    't-0' : [{'img': '<url>', 'title': 'titlestring'}, {'img': '<url>', 'title': 'titlestring'}, ... ],
    't-1' : [{'img': '<url>', 'title': 'titlestring'}, {'img': '<url>', 'title': 'titlestring'}, ... ],
    't-2' : [{'img': '<url>', 'title': 'titlestring'}, {'img': '<url>', 'title': 'titlestring'}, ... ],
    't-3' : [{'img': '<url>', 'title': 'titlestring'}, {'img': '<url>', 'title': 'titlestring'}, ... ],
    't-4' : [{'img': '<url>', 'title': 'titlestring'}, {'img': '<url>', 'title': 'titlestring'}, ... ],
    't-5' : [{'img': '<url>', 'title': 'titlestring'}, {'img': '<url>', 'title': 'titlestring'}, ... ],
    't-6' : [{'img': '<url>', 'title': 'titlestring'}, {'img': '<url>', 'title': 'titlestring'}, ... ]
}

why not just use the comic object? or comic collection.. will use this json structure for now to store things.


*/


Comic.prototype.render = function () {
    var result = this.FEED,
        entry = null,
        className = this.NAME.replace(/(\s+|'|\&)/g, '_').toLowerCase(),
        $strip = null,
        $main = $('body .main');


    Comics.CURRENT_Z += 60;

    for(var i = 0; i < result.feed.entries.length; i++) {
        entry = result.feed.entries[i];
        $strip = $(entry.content);

        if ( i === Comics.CURRENT_COMIC ) {
            $('<li>').append($strip)
                     .append('<div class="title">' + result.feed.title + '</div>')
                     .append('<div class="view-more title">view more ' + result.feed.title + '</div>')
                     .addClass(className + ' strip strip' + i + ' ' + (i===0 ? 'active' :  ''))
                     .width(Comics.VIEWPORT_WIDTH)
                     .appendTo('.comic.list.t-' + i);
        }

        $('.comic.list').width(Comics.VIEWPORT_WIDTH);
    }
};

// This is the main driver;
Comic.prototype.initialize = function (id) {
    Comic.getFeed(id);
}

Comic.prototype.initializeBanner = function () {

};