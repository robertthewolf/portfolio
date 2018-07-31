const introVid = document.getElementById("introVid");
const journeyVid = document.getElementById("journeyVid");
const murderVid = document.getElementById("murderVid");


introVid.play();


introVid.addEventListener("timeupdate", function () {
    if(this.currentTime >= 3.8) {
        this.currentTime = 0.15;
    }
});

journeyVid.addEventListener("timeupdate", function () {
    if(this.currentTime >= 25) {
        map.setStyle('mapbox://styles/wolfrob35/cjfmwo2i31dyk2ro03s9ps7le');
        map.setZoom(10);
        map.setCenter([15.2,45]);
    }
});

journeyVid.addEventListener('ended', function(){
    this.style.display = 'none';
    setTimeout(function(){

        let firstTime = true;
        window.addEventListener('mousemove', function() {
            if (firstTime) {
                murderVid.style.display = 'block';
                murderVid.play();
                firstTime = false;

          
            } 
        });
    }, 2000);

}, false);

murderVid.addEventListener('ended', function(){
    map.remove();
    this.remove();
    document.body.classList.add('final');
});


mapboxgl.accessToken = 'pk.eyJ1Ijoid29sZnJvYjM1IiwiYSI6ImNqZm1heW95bTB4NTYycXA4N2tydXN3bzAifQ.WDSXylFRU1cxNoQHixRbLg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/wolfrob35/cjfmb6e4c0ry82slmkyk2gvn4',
    center: [29, 41.1],
    zoom: 9
});

// Create a GeoJSON source with an empty lineString.
var geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [29, 41.1]
            ]
        }
    }]
};

var speedFactor = 30; // number of frames per longitude degree
var animation; // to store and cancel the animation
var startTime = 0;
var progress = 0; // progress = timestamp - startTime
var resetTime = false; // indicator of whether time reset is needed for the animation
var pauseButton = document.getElementById('pause');

map.on('load', function() {

    // add the line which will be modified in the animation
    map.addLayer({
        'id': 'line-animation',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': geojson
        },
        'layout': {
            'line-cap': 'round',
            'line-join': 'round'
        },
        'paint': {
            'line-color': '#F33061',
            'line-width': 10,
            'line-opacity': 1
        }
    });

});

// animated in a circle as a sine wave along the map.
function animateLine(timestamp) {
    if (resetTime) {
        // resume previous progress
        startTime = performance.now() - progress;
        resetTime = false;
    } else {
        progress = timestamp - startTime;
    }

    // restart if it finishes a loop
    if (progress > speedFactor * 400) {
        startTime = timestamp;
        geojson.features[0].geometry.coordinates = [];
    } else {
        //calculate new coordinates
        var x = geojson.features[0].geometry.coordinates.slice(-1)[0][0] - .026;
        var y = geojson.features[0].geometry.coordinates.slice(-1)[0][1] + .0092;
        // append new coordinates to the lineString
        geojson.features[0].geometry.coordinates.push([x, y]);
        // then update the map
        map.getSource('line-animation').setData(geojson);
    }
    // Request the next frame of the animation.
    animation = requestAnimationFrame(animateLine);
}

document.getElementById('fly').addEventListener('click', function () {
    // Fly to a random location by offsetting the point -74.50, 40
    // by up to 5 degrees.
    map.flyTo({
        center: [17, 45],
        zoom: 4,
    });
    map.fire('flystart');

    document.body.classList.add('journey');
    introVid.pause();
    journeyVid.play();
});

let flying = false;
let flyingDone = false;

map.on('flystart', function(){
    flying = true;
});
map.on('flyend', function(){
    flying = false;
});

map.on('moveend', function(e){
	if(flying) {
        startTime = performance.now();
        animateLine();
        map.fire('flyend');
    }
});