$(document).ready(function(){
	
	
	//continue button
	
	$('#continue').click(function(){
		$('.slide').fadeOut(300);
	});
	
	// hide info by clicking on overlay
	$(".overlay").click(function() {
		$('.overlay').delay(200).fadeOut(200);
		$('.modal').slideUp(200);
	});
	
	// hide info by clicking on spaces around the modal
	$(".modal").click(function(){
		$('.overlay').delay(200).fadeOut(200);
		$('.modal').slideUp(200);
}).children().click(function(e) {
   e.stopPropagation();
});
});


// google map

function initMap() {


	// map settings


	var map = new google.maps.Map(document.getElementById('map1'), {
		zoom: 18,
		center: {
			lat: 56.152421,
			lng: 10.192887
		},
		zoomControl: true,
		streetViewControl: false,
		fullscreenControl: false,
		scrollwheel: true,
		mapTypeId: 'satellite',
		mapTypeControl: false,
          tilt: 45
	});
	 // Define the LatLng coordinates for the polygon's  outer path.
        var outerCoords = [
          {lat: 56.047655, lng: 10.299622},
          {lat: 56.155934, lng: 10.024948},
          {lat: 56.238735, lng: 10.377688}
        ];

        // Define the LatLng coordinates for the polygon's inner path.
        var innerCoords = [
          {lat: 56.151511, lng: 10.192791},
          {lat: 56.153742, lng: 10.196178},
          {lat: 56.154798, lng: 10.193750},
          {lat: 56.152297, lng: 10.189616},
          {lat: 56.149499, lng: 10.184138},
          {lat: 56.148825, lng: 10.184543},
          {lat: 56.151511, lng: 10.192791}
        ];

        // Construct the polygon.
        var bermudaTriangle = new google.maps.Polygon({
          paths: [outerCoords, innerCoords],
          strokeColor: '#111111',
          strokeOpacity: 1,
          strokeWeight: 5,
          fillColor: '#111111',
          fillOpacity: 0.4
        });
        bermudaTriangle.setMap(map);


	// markers  

	var institutforx = new google.maps.Marker({
		position: {
			lat: 56.152345,
			lng: 10.191892
		},
		map: map,
		icon: 'img/map/institutforx.svg'
	});
	var plantecafeen = new google.maps.Marker({
		position: {
			lat: 56.152863,
			lng: 10.192742
		},
		map: map,
		icon: 'img/map/plantecafeen.svg'
	});
	var learngraffitiinaarhus = new google.maps.Marker({
		position: {
			lat: 56.152609,
			lng: 10.192241
		},
		map: map,
		icon: 'img/map/learngraffitiinaarhus.svg'
	});
	var godsbanen = new google.maps.Marker({
		position: {
			lat: 56.154165,
			lng: 10.194989
		},
		map: map,
		icon: 'img/map/godsbanen.svg'
	});
	var njakhaas = new google.maps.Marker({
		position: {
			lat: 56.151852,
			lng: 10.191934
		},
		map: map,
		icon: 'img/map/njakhaas.svg'
	});
	var thisreddoor = new google.maps.Marker({
		position: {
			lat: 56.152466,
			lng: 10.192150
		},
		map: map,
		icon: 'img/map/thereddoor.svg'
	});
	var thefireplace = new google.maps.Marker({
		position: {
			lat: 56.152247,
			lng: 10.192254
		},
		map: map,
		icon: 'img/map/thefireplace.svg'
	});

	// marker actions  

	institutforx.addListener('click', function () {
		$('.overlay').fadeIn(500);
		$('#x').delay(200).slideDown(1000);
	});
	plantecafeen.addListener('click', function () {
		$('.overlay').fadeIn(500);
		$('#plantecafeen').delay(200).slideDown(1000);
	});
	learngraffitiinaarhus.addListener('click', function () {
		$('.overlay').fadeIn(500);
		$('#learngraffitiinaarhus').delay(200).slideDown(1000);
	});
	godsbanen.addListener('click', function () {
		$('.overlay').fadeIn(500);
		$('#godsbanen').delay(200).slideDown(1000);
	});
	njakhaas.addListener('click', function () {
		$('.overlay').fadeIn(500);
		$('#njakhaas').delay(200).slideDown(1000);
	});
	thisreddoor.addListener('click', function () {
		$('.overlay').fadeIn(500);
		$('#thisreddoor').delay(200).slideDown(1000);
	});
	thefireplace.addListener('click', function () {
		$('.overlay').fadeIn(500);
		$('#thefireplace').delay(200).slideDown(1000);
	});

}
