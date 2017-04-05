;(function($) {
	var HorizontalList = function(element) {
		this.$element = element;
		this.$prev_button = $('<span class="fa fa-chevron-left"></span>');
		this.$next_button = $('<span class="fa fa-chevron-right"></span>');
		this.$list = this.$element.children('ul');
		this.$children = this.$element.find('li');
		this.count = this.$children.length;
		this.$element.addClass('horizontal-list-container');
		this.$list.addClass('horizontal-list');
		this.position = 0;
		var children_width = 0;
		this.$children.each(function() {
			children_width += $(this).width()
		});
		this.invisible_width = children_width - this.$element.width();
		if (children_width > this.$element.width()) {
			this.init();
			this.bindEvents();
		}

	};

	HorizontalList.prototype = {
		init: function() {
			this.$prev_button.addClass('horizontal-list-control');
			this.$next_button.addClass('horizontal-list-control');
			this.$prev_button.addClass('inactive');
			this.$element.before(this.$prev_button);
			this.$element.after(this.$next_button);
		},

		bindEvents: function() {
			this.$prev_button.on('click', this.onPrevButtonClick.bind(this));
			this.$next_button.on('click', this.onNextButtonClick.bind(this));
		},

		onPrevButtonClick: function() {
			if (!this.$prev_button.hasClass('inactive')) {
				var width = this.$children.first(':visible').width();
				this.position += width;
				this.$list.css('left', this.position);
				this.toggleControls();
			}
		},

		onNextButtonClick: function() {
			if (!this.$next_button.hasClass('inactive')) {
				var width = this.$children.last(':visible').width();
				this.position -= width;
				this.$list.css('left', this.position);
				this.toggleControls();
			}
		},

		toggleControls: function() {
			if (this.position >= 0) {
				this.$prev_button.addClass('inactive');
			}
			else {
				this.$prev_button.removeClass('inactive');
			}
			if (this.position <= -this.invisible_width) {
				this.$next_button.addClass('inactive');
			}
			else {
				this.$next_button.removeClass('inactive');
			}
		}
	};

	$.fn.horizontal_list = function() {
		new HorizontalList($(this))
	};
})(jQuery);