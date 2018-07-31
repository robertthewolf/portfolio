$(document).ready(function () {
	// hide all articles
	$('article').addClass('closed');

	$('.closed').on('click', function () { // on clicking an article:
		$('article').addClass('closed'); // hide all articles
		$(this).removeClass('closed'); // open this one
		$(this).prependTo('main'); // put this article on top of the page
		$('#all').show(); // show the see all button
		$('header img').hide(); // hide the logo
		$('html, body').animate({ //scroll to top
			scrollTop: '0px'
		}, 300);
	});

	$('#all').on('click', function () { // on clicking the see all:
		$('article').addClass('closed'); // hide all articles
		$('#all').hide(); // hide the see all button
		$('header img').show(); // show the logo
		$('html, body').animate({ // scroll to top
			scrollTop: '0px'
		}, 300);
	});
});
