define(['models/feed'], function(FeedModel){
	var FeedCollection = Backbone.Collection.extend({
		model: FeedModel
	});

	return new FeedCollection([
		new FeedModel({
			id: '1000',
			username: "Paul Van Dyk",
			userId: 11111,
			email: "clgt@clgt.vn",
			avatar: "http://www.gravatar.com/avatar/00000000001?d=identicon&f=y&s=40",
			message: "Vote for Delerium Featuring Stef Lang 'Chrysalis Heart' (Stereojackers vs Mark Loverush Remix) written by Mike James"
		}),
		new FeedModel({
			id: '1001',
			userId: 11112,
			username: "Martin Fourcade",
			email: "johndoe@clgt.vn",
			avatar: "http://www.gravatar.com/avatar/00000000002?d=identicon&f=y&s=40",
			message: "We need history to write future! At D-100 a wonderful movie to dream about Sochi!"
		}),
		new FeedModel({
			id: '1002',
			userId: 11113,
			username: "Mark Loverush",
			email: "johndoe@clgt.vn",
			avatar: "http://www.gravatar.com/avatar/00000000003?d=identicon&f=y&s=40",
			message: "Vote for Delerium Featuring Stef Lang (Stereojackers vs Mark Loverush Remix) written by Mike James"
		})
	]);
});