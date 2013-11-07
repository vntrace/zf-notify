define([
	'cookie'
], function(cookie){
	var FeedItemView = Backbone.View.extend({
		template: _.template($('#feed-item').html()),
		tagName: 'article',
		className: 'feed-item',
		initialize: function() {
			
		},
		render: function() {
			this.$el.append(this.template(this.model.toJSON()));
			return this;
		},
		events: {
			"click .btn-like": "likeFeed"
		},
		likeFeed: function(event) {
			event.preventDefault();

			$(event.target).text('liked');
			
			var baseUrl = '/feed/set-like';
			$.get(baseUrl, {
				ownerId: this.model.get('userId'),
				actorId: cookie.getItem('uid'),
				objectId: this.model.get('id'),
				objectContent: this.model.get('message')
			}, function(rs){
				
			});
		}
	});

    return FeedItemView;
});