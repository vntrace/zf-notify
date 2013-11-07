// boot the project
require.config({
    baseUrl: "/js/",
    paths: {
        jQuery: "libs/jquery/jquery-1.8.3.min",
        Underscore: "libs/underscore/underscore-min",
        Backbone: "libs/backbone/backbone.min",
        Bootstrap: "libs/bootstrap/bootstrap.min",
        text: "libs/require/text-2.0.10",
        uuid: "libs/utils/uuid",
        uid: "libs/utils/uid",
        cookie: "libs/utils/cookie",
        io: "libs/utils/socket.io.min",
        NProcess: "nprocess",
        codemirror: "libs/codemirror/lib/codemirror",
        codemirror_mode: "libs/codemirror/mode/javascript/javascript",
        pnotify: "libs/pnotify/jquery.pnotify.min"
    },
    shim: {
        "jQuery": {
            exports: "$"
        },
        "Underscore": {
            exports: "_",
            init: function() {
                _.templateSettings = {
                    interpolate : /\{\{(.+?)\}\}/g,
                    evaluate: /\[\[(.+?)\]\]/g
                };

                return this._;
            }
        },
        "Backbone": {
            deps: ["Underscore", "jQuery"],
            exports: "Backbone"
        },
        "NProcess": {
            deps: ["jQuery"],
            exports: "NProgress"
        },
        "Bootstrap": {
            deps: ["jQuery"],
            exports: "Bootstrap"
        },
        "codemirror_mode": {
            deps: ['codemirror']
        },
        "pnotify": {
            deps: ['jQuery']
        }
    }
});

// Init UserID
require(['uid', 'cookie'], function(uid, cookie){
	// Check for cookie existed
	if(!cookie.hasItem('uid')) {
		cookie.setItem('uid', uid());
	}
});

require(["NProcess", "Backbone", "Underscore"], function(NProgress, Backbone, _, Spinner){
    Dispatcher = _.extend({}, Backbone.Events);

    Dispatcher.on('render:before', function(options){
        NProgress.start();
        // Show loader
    });

    Dispatcher.on('render:end', function(options){
        NProgress.done();
        // Hide loader
    });
});