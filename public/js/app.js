require([
	'Backbone', 
	'cookie', 
	'io', 
	'Bootstrap', 
	'codemirror', 
	'codemirror_mode',
	'pnotify'
], function(Backbone, cookie, io){
	
	window.userId = cookie.getItem('uid');

	var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
		mode: {name: "javascript", json: true},
	    lineNumbers: true,
	    styleActiveLine: true,
	    matchBrackets: true
  	});

  	window.editor = editor;

  	window.arrNotify = [];

  	var _notifyTemplate = $('#notify-like-template').html();

  	$('#build-notify').bind('click', function(){
  		// console.log(window.arrNotify);
  		for(var i in window.arrNotify) {
  			var notify = window.arrNotify[i];
  			var owner = notify.object.ownerId === window.userId ? 'your' : notify.object.ownerId;

  			// get last actor
  			var lastActor = _.filter(notify.lastActor, function(actor){
  				if(actor.id !== window.userId) return true;
  			});

  			var actor1 = lastActor[0];
  			var actor2 = typeof lastActor[1] !== "undefined" ? lastActor[1] : false;
  			var type = notify.object.type;
  			var content = notify.object.content;

  			var notifyBuilt = _.template(_notifyTemplate, {
  				owner: owner,
  				actor1: actor1,
  				actor2: actor2,
  				type: type,
  				content: content
  			});

  			$.pnotify({
		        text: notifyBuilt,
		        // hide: false,
		        addclass: "notfy-alert-warning",
		        closer: true
		    });
  		}
  	});

	require([
		'views/app',
		'views/feed',
		'views/post-feed',
		'views/notify'
	], function(AppView, FeedView, FormPostFeed, NotifyView){
		var appView = new AppView({el: '.page-header'});
			appView.render();

		var feedView = new FeedView();
			feedView.render();

		var formPostFeed = new FormPostFeed({el: '#post-feed'});
			formPostFeed.render();

		var notifyView = new NotifyView({model: {
			_m: 0,
			_r: 0,
			_n: 0
		}});

		notifyView.render();

		// Socket connection
		var socket = window.socket=  io.connect('http://localhost:5000');

		socket.on('join', function(data){
			$('#online-counter').html(data);
		});
		
		socket.on('connect', function(){
			socket.emit('addUser', cookie.getItem('uid'));
		});

		socket.on('newFeed', function(feed){
			// Render new feed
			feedView.addOne(feed);
		});

		socket.on('notify', function(data){
			console.log(data);
			notifyView.update(data);
		});

	});
});