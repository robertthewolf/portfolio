//detecting article in view

(function ($, win) {
	$.fn.inViewport = function (cb) {
		return this.each(function (i, el) {
			function visPx() {
				var elH = $(el).outerHeight(),
					H = $(win).height(),
					r = el.getBoundingClientRect(),
					t = r.top,
					b = r.bottom;
				return cb.call(el, Math.max(0, t > 0 ? Math.min(elH, H - t) : (b < H ? b : H)));
			}
			visPx();
			$(win).on("resize scroll", visPx);
		});
	};
}(jQuery, window));



$("article").inViewport(function (px) {
	var h = $(this).height();
	var isHalfVisible = px >= h / 2;
	var name = $(this).attr("id");

	//togggle the title
	$("nav a[href='#" + name + "']").parent()
		.removeClass(isHalfVisible ? 'hidden' : 'shown')
		.addClass(isHalfVisible ? 'shown' : 'hidden');

	//change the number
	if (isHalfVisible == true) {
		$("#number").html("0" + name);
	}

	// always close menu while scrolling
	$("#toggle").removeClass("open");
	$(".bar li").removeClass("spaced");
});


$(document).ready(function () {

	var wideback = $(".bar").width();

	//smooth scroll

	$("header>a, nav>a").on("click", function (event) {
		event.preventDefault();

		$("html, body").animate({
			scrollTop: $($.attr(this, "href")).offset().top
		}, 500);
	});

	//toggle button
	$("#toggle").on("click", function () {

		if ($("body").hasClass("read") == false) { // menu view
			if ($(this).hasClass("open")) { //closing the overview
				$(this).removeClass("open");
				$("#number").html("00");
				$(".bar li").removeClass("spaced");



			} else { //opening the overview
				$(this).addClass("open");
				$("#number").html("#");
				$(".bar li").addClass("spaced");
			}
		} else { // closing the article


			// lower bar width back to normal
			$(".bar").animate({
				width: wideback
			}, 500);
			$("body").removeClass("read");
			$(".load>div").empty();
			$("article").removeClass("load");

			//scroll to last-opened article in menu

			var hash = window.location.hash;
			var hashTop = $(hash).offset().top;
			$(window).scrollTop(hashTop);

		}
	});

	//opening the article



	$(".bar a").on("click", function () {
		//extend bar wideness
		var widewide = $(window).width();
		$(".bar").animate({
			width: widewide - 32
		}, 500);

		$("body").addClass("read");
		$($(this).attr("href")).addClass("load");
		$(".load>div").load("article/" + $(this).attr("href").replace("#", "") + ".html");
	});




	// browser optimalization

	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.indexOf("safari") != -1) {
		if (userAgent.indexOf("chrome") > -1) {
			$("body").addClass("chrome");
		} else if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
			$("body").addClass("safari-mobile");
		} else {
			$("body").addClass("safari");
		}
	}


});

//switching the article

$(document).on("click", "aside > a[href*='#']", function () {
	$(".load>div").empty();
	$("article").removeClass("load");
	$($(this).attr("href")).addClass("load");
	$(".load>div").load("article/" + $(this).attr("href").replace("#", "") + ".html");
});

// logo effect

var hero = document.querySelector("header");
var text = hero.querySelector("h1");
var walk = 15; // px

function shadow(e) {
	var width = hero.offsetWidth;
	var height = hero.offsetHeight;
	var x = e.offsetX;
	var y = e.offsetY;

	if (this !== e.target) {
		x = x + e.target.offsetLeft;
		y = y + e.target.offsetTop;
	}

	var xWalk = Math.round(x / width * walk - walk / 2);
	var yWalk = Math.round(y / height * walk - walk / 2);

	text.style.textShadow = '\n      ' + xWalk + 'px ' + yWalk + 'px 0 rgba(255, 157, 84,0.7),\n      ' + xWalk * 2 + 'px ' + yWalk * 2 + 'px 0 rgba(255, 195, 84,0.7)\n    ';
}

hero.addEventListener("mousemove", shadow);


// progression bar

$(document).on('scroll', function () {


	var docHeight = $(document).height();
	var winHeight = $(window).height();
	var max = docHeight - winHeight * 2; // two times because of the footer
	var current = $(window).scrollTop();
	var offset = current / max * 100 + '%';

	$('#progress>span').css('width', offset);
});
