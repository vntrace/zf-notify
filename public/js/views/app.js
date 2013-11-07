define([
    'cookie'
], function(cookie){

    var AppView = Backbone.View.extend({
    	template: _.template('<h1>Welcome Guest #{{uid}}</h1>'),
        render: function() {
    		this.$el.append(this.template({uid: cookie.getItem('uid')}));
        }
    });

    return AppView;
});