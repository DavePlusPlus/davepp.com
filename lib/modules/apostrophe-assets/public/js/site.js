$(function() {
	
	console.log("Nosey little fucker, aren't you?");
	
	$('a, input.searchButton').click(function(){
		$('div.load-bar').css({'width': '0', 'background-color': 'lime'});
		$('div.load-bar').animate({width: '100%'}, 400);
	});
	
	if($('#back-to-top').length) {
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
	
	var isAlt = false;
	
	$(document).keyup(function(e) {
		if(e.keyCode == 18) {
			isAlt = false;
		}
	});

	$(document).keydown(function(e) {
		if(!apos.isDefined(apos.adminBar)) {
			if(e.keyCode == 18) {
				isAlt = true;
			}
			if(e.keyCode == 37) {
				if($('a#previous').length) {
					console.log("Going to previous article...");
					$('a#previous')[0].click();
				}
			} else if(e.keyCode == 39) {
				if($('a#next').length) {
					console.log("Going to next article...");
					$('a#next')[0].click();
				}
			} else if(e.keyCode == 76 && isAlt) {
				console.log("Entering Login...");
				var usr = prompt("Username:");
				var pss = prompt("Password:");
				if(usr.length > 0 && pss.length > 0) {
					apos.login(usr, pss);
				} else {
					console.log("Username and Password cannot be blank.");
				}
			}
		}
	});

});
