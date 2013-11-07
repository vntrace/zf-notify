define([
	'cookie',
	'views/feed-item',
	'models/feed'
], function(cookie, FeedItemView, FeedModel){
	var FormPostFeed = Backbone.View.extend({
		template: $('#form-feed-template').html(),
		render: function() {
			this.$el.append(_.template(this.template, {
				avatar: 'http://www.gravatar.com/avatar/'+ cookie.getItem('uid') +'?d=identicon&f=y&s=40'
			}));
		},
		events: {
			'click .btn-post': "postFeed"
		},
		postFeed: function(event) {
			event.preventDefault();

			var message = this.$el.find('textarea[name=message]');

			var feed = new FeedModel({
				id: Date.now().toString(32),
				username: cookie.getItem('uid'),
				userId: cookie.getItem('uid'),
				email: "clgt@clgt.vn",
				avatar: "http://www.gravatar.com/avatar/"+ cookie.getItem('uid') +"?d=identicon&f=y&s=40",
				message: message.val()
			});

			var feedViewItem = new FeedItemView({
				model: feed 
			});

			$('#feed').prepend(feedViewItem.render().$el.fadeIn());

			window.socket.emit('newFeed', feed.toJSON());

			message.val('');
		}
	});

    return FormPostFeed;
});