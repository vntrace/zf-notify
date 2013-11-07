define(function(){
	var NotifyView = Backbone.View.extend({
		tagName: 'ul',
		className: 'nav navbar-nav',
		template: $('#notify-template').html(),
		render: function() {
			this.$el.html(_.template(this.template, this.model)).appendTo($('#notify-bar'));
		},
		update: function(object) {
			var _label_message = this.$el.find('._m .label');
			var _label_request = this.$el.find('._r .label');
			var _label_noti = this.$el.find('._n .label');

			if(object._m > 0) {
				_label_message.html(object._m);
			} else {
				_label_message.empty();
			}

			if(object._r > 0) {
				_label_request.html(object._r);
			} else {
				_label_request.empty();
			}

			if(object._n > 0) {
				_label_noti.html(object._n);
			} else {
				_label_noti.empty();
			}			
		},
		events: {
			'click ._n': "showNotify"
		},
		showNotify: function(event) {

			var _label_noti = this.$el.find('._n .label').empty();

			$.get('/notify?userId=' + window.userId, function(response){
				if(response.status) {
					window.arrNotify = response.arrNotify;
					// Show list of notify as json in codemirror
					window.editor.setValue(JSON.stringify(response.arrNotify, null, '\t'));
				}
			});
		}
	});

	return NotifyView;
});