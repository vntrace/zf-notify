define([
	'collections/feed',
	'views/feed-item',
	'models/feed'
], function(FeedCollection, FeedItemView, FeedModel){

	var FeedView = Backbone.View.extend({
		render: function() {
			FeedCollection.forEach(function(item){
				var feedItemView = new FeedItemView({model: item});
				$('#feed').append(feedItemView.render().$el.fadeIn());
			});
		},
		addOne: function(feed) {
			var feed = new FeedModel(feed);
			var feedItemView = new FeedItemView({model: feed});
			$('#feed').prepend(feedItemView.render().$el.fadeIn());
		}
	});

    return FeedView;
});