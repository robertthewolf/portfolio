// mobile menu

$(document).ready(function () {
	$('#toggler').on('click', function () {
		$('body').toggleClass('menu-open');
	})
});

// hiding bottom bar

var iScrollPos = 0;
$(window).scroll(function () {
	var iCurScrollPos = $(this).scrollTop();
	if (iCurScrollPos > iScrollPos) {

		$('body').addClass('scroll-down');

	} else {

		$('body').removeClass('scroll-down');

	}

	iScrollPos = iCurScrollPos;

});

// intro overlay

var fadeUntil = $("body>header").height() - 64;

$(window).scroll(function () {
	var offset = $(document).scrollTop(),
		opacity = 0;
		move = 0;
	if (offset <= 0) {
		opacity = 1;
		move = 0;
	} else if (offset <= fadeUntil) {
		opacity = 1 - offset / fadeUntil;
		move = offset / fadeUntil * 25;
		$('header>div').removeClass('fixed'); //unfix navbar
	} else if (offset > fadeUntil) {
		$('header>div').addClass('fixed'); // fix navbar
	}
	$('body>header h1').css({
		'opacity': opacity,
		'transform': 'translateY('+move+'%)'
	});
});
