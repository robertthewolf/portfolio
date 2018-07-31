$(document).ready(function () {



	//check open hours

	var d = new Date(); //puts current date into a variable
	var date = d.getHours(); // what is the time?
	var day = d.getDay(); // what day is it?

	if (((date >= 16) && (date < 19) && (day == 3)) || ((date >= 11) && (date < 15) && (day == 7))) { // here's lies the opening hours
		$('#status').text("We're open!");
	} else {
		$('#status').text("Sorry, we're Closed.");
	}


	//opening a subpage
	$('nav a').on('click', function (event) {

		event.preventDefault(); // prevents linking to another website

		var target = $(this).attr('href').replace(".html", "");
		var offset = $(this).offset().top;

		$(this).addClass('clicked'); //marks the clicked menu item

		$('main').load(target + '.html', function () { // when finished, do this:

			$('article').css('margin-top', offset); // sets top margin of the subpage

			$('html, body').animate({ //scrolls to the subpage- especially important on phones
				scrollTop: offset
			}, 1000).bind("scroll mousedown DOMMouseScroll mousewheel keyup", function () {
				$('html, body').stop(); // stops the scrolling when user scrolls - for smoother experience
			});

			$('body').addClass('subpage'); //tells body that subpage article is open

			$('article').addClass('open'); //opens target subpage article



		});



	});


	//closing function
	function close() {
		$('nav a').removeClass('clicked'); // make sure that no link is marked as clicked
		$('article').removeClass('open'); //closes target subpage article
		$('main').html(''); //remove opened subpage
		$('body').removeClass('subpage'); //tells body that subpage article is closed
		$('body').removeClass('scrolled'); //removes the information that article was scrolled
	}

	//close subpage by:

	$('#close').on('click', close); //clicking the close button
	$('main').on('click', function (e) { // clicking the main element
		if (e.target !== this) // if anything in the article is clicked
			return; // don't do anythin

		close(); // but otherwise close
	});
});
