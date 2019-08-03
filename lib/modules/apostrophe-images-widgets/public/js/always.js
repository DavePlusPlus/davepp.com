// example of a widget manager with a play method.
// You don't need this file at all if you
// don't need a player.

apos.define('apostrophe-images-widgets', {
	extend: 'apostrophe-pieces-widgets',
	construct: function(self, options) {
		self.play = function($widget, data, options) {
			options = {
				delay: 5000,
				pauseOnClick: false,
				responsiveHeight: true,
				currentClass: 'apos-current',
				nextClass: 'apos-next',
				previousClass: 'apos-previous',
				otherClass: 'apos-other',
				noHeight: false,
				noNextAndPreviousClasses: false,
				resizeTimeout: 100
			};
			$widget.projector(options);
		};
	}
});
