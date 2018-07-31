'use strict';

var main = $('#main');
var loadbox = $('#loadbox');
var work = $('#work');
var morework = $('#morework');

$(document).ready(function () {

	/* Close all sections */
	main.find('section').addClass('closed');

	/*Scroll reaveal */
	$('.closed').children().addClass('reveal');
	$('.closed').find('header').addClass('animated');

	/* hide more more, until the some work is seen */
	morework.hide();
	work.find('a[href^="#"]').on('click', function () {
		morework.show();
	});

	/* uncovering sections, smooth scroll */
	$('a[href^="#"]').on('click', function () {

		var target = $(this.hash);

		target.removeClass('closed');
		target.children().each(function (i) {
			var el = $(this);
			setTimeout(function () {
				el.addClass('animated');
			}, i * 500);
		});
		main.append($('.closed'));

		if (!work.next().is(morework)) {
			work.after(morework);
		}

		$('html, body').animate({
			scrollTop: target.offset().top
		}, 1000);

	});


	$('.action').find('a').on('click', function () {

		var target = $(this).attr('href');

		/*indentify element to animate */
		var project = $(this).parent().parent();
		var greybox = project.find('.greybox');
		var action = project.find('.action');

		loadbox.load(target + ' .subpage', function () {

			/*save current scroll */
			var scrollRemember = $(document).scrollTop();
			console.log(scrollRemember);

			/*save current position */
			project.css('height', project.height());
			project.css('width', project.width());

			greybox.css({
				'height': greybox.height(),
				'width': greybox.width()
			});
			action.css('top', action.position().top).css('left', action.position().left);

			/* animate! */
			project.addClass('clicked');
			project.siblings().hide();

			$('html, body').animate({
				scrollTop: $(project).offset().top
			}, 1000, function () {

				/* seamless transition */
				main.children().hide();
				loadbox.show().css('visibility', 'visible');
				$('html, body').scrollTop(0);

				/* cleaning up the frontpage, preparing it for returning */
				project.siblings().show();
				project.removeClass('clicked');

				window.history.pushState('', '', target);


				$('.back').on('click', function () {

					var target = $(this).attr('href');

					main.children().show();
					$(window).scrollTop(scrollRemember);
					loadbox.css('top', scrollRemember).animate({
						marginLeft: '100vw'
					}, 500, 'swing', function () {

						loadbox.css({
							'top': 0,
							'margin-left': 0
						}).hide().empty();
					});

					window.history.pushState('', '', target);

					return false;


				});

			});
		});

		return false;

	});


});


/* Cool mouse-move effects */
if (!is_touch_device()) {

	var centerX, centerY;

	$(document).on('scroll', function (ev) {
		centerX = $(window).width() / 2;
		centerY = $(window).scrollTop() + $(window).height() / 2;
	});


	$(document).on('mousemove', function (ev) {

		var mouseX = ev.originalEvent.pageX;
		var mouseY = ev.originalEvent.pageY;

		var diffX = mouseX - centerX;
		var diffY = mouseY - centerY;

		$('.mouseFollow').each(function () {

			$(this).css('transform', 'translate(' + diffX * -.01 + 'px, ' + diffY * .01 + 'px)');

		});

		$('.mouseOppose0').each(function () {

			$(this).css('transform', 'translate(' + diffX * .005 + 'px, ' + diffY * .005 + 'px)');

		});

		$('.mouseOppose').each(function () {

			$(this).css('transform', 'translate(' + diffX * .015 + 'px, ' + diffY * .015 + 'px)');

		});

		$('.mouseOppose2').each(function () {

			$(this).css('transform', 'translate(' + diffX * .035 + 'px, ' + diffY * .035 + 'px)');

		});

		$('.mouseGrow').each(function () {

			var windowHeight = $(window).height();

			var scaleY = 1.05 - (mouseY - centerY) / windowHeight / 5;

			$(this).css('transform', 'translateX(-50%) scale(' + scaleY + ')');

		});

	});
}



/* device detect */

function is_touch_device() {
	return (('ontouchstart' in window) ||
		(navigator.MaxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0));
}


/* chart.js */

var ctx = document.getElementById("demographics");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
        datasets: [{
            label: '% of Women',
            data: [39, 23, 4, 5, 2, .4],
            backgroundColor: '#8A9CC2',
            borderWidth: 0,
			stack: 'Stack 0'
        }, {
            label: '% of Men',
            data: [-14, -8, -1, -.6, -.9, -.2],
            backgroundColor: '#3D6397',
            borderWidth: 0,
			stack: 'Stack 0'
        }]
    }
});

var ctx = document.getElementById("values");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Organic", "Pagkage-free", "Local"],
        datasets: [{
            label: 'Values on the scale from 1 to 5',
            data: [3.2, 3.7, 4.2],
            backgroundColor: '#FCE6B0',
            borderWidth: 0,
			stack: 'Stack 0'
        }]
    }
});
