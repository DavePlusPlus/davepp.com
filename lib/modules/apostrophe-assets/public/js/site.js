$(function() {
	console.log("Nosey little fucker, aren't you?");
	$('a, input.searchButton').click(function(){
		$('div.load-bar').css({'width': '0', 'background-color': 'lime'});
		$('div.load-bar').animate({width: '100%'}, 400);
	});
});

if ($('#back-to-top').length) {
	var scrollTrigger = 200,
	backToTop = function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > scrollTrigger) {
			$('#back-to-top').addClass('show');
		} else {
			$('#back-to-top').removeClass('show');
		}
	};
	backToTop();
	$(window).on('scroll', function() {
		backToTop();
	});
	$('#back-to-top').on('click', function(e) {
		e.preventDefault();
		$('html').animate({
			scrollTop: 0
		}, 400);
	});
}