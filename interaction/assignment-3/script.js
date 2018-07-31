$(document).ready(function () {
	$('.goodbye').hide();
	$('.loader').delay(5000).fadeOut(3000);

	var audio = $('audio')[0];
	var video = $('video')[0];

	//perspective controls

	$('.perspective').on('mousedown', function () {
		$(this).toggleClass('off on');
		$('main').toggleClass('off on');
	});

	// audio controls

	$('.control').on('mousedown', function () {
		$(this).toggleClass('pause play');
		if (audio.paused == false) {
			audio.pause();
		} else {
			audio.play();
		}
	});

	// jumping into the hyperspace

	$('.jump').click(function () {
		$('header').fadeOut(1000);
		$('main').fadeOut(1000);
		audio.pause();
		video.play();
		$('.goodbye').delay(5000).fadeIn(2000);
		$('.back').delay(15000).slideDown(500);
	});
	// getting out of the hyperspace

	$('.back').click(function () {
		$('header').fadeIn(1000);
		window.location.reload();
	});



});

// extra audio control with the spacebar

$(document).on('keyup', function (e) {
	if (e.which == 32) {
		$('.control').toggleClass('pause play');
		if (audio.paused == false) {
			audio.pause();
		} else {
			audio.play();
		}
	}
});
