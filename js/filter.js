// http://www.html5rocks.com/en/tutorials/getusermedia/intro/
// http://davidwalsh.name/browser-camera

// declare our variables
var seriously, // the main object that holds the entire composition
	gUM, // will reference getUserMedia or whatever browser-prefixed version we can find
	URL, // will reference window.URL or whatever browser-prefixed version we can find
	video, // video element
	source, // wrapper object for source video
	flip, // flip effect
	effect, // edge detection effect
	target; // a wrapper object for our target canvas


var localMediaStream = null;

window.onload = function() {

	// check for Geolocation support
	if (navigator.geolocation) {
		console.log('Geolocation is supported!');
	}
	else {
		console.log('Geolocation is not supported for this Browser/OS version yet.');
	}
	function geo_success(position) {
		initializeMaps(position.coords.latitude, position.coords.longitude);
	}

	function geo_error(error) {
		console.log('ERROR(' + error.code + '): ' + error.message);
	}

	var wpid = navigator.geolocation.getCurrentPosition(geo_success, geo_error);

	
		// detect browser-prefixed getUserMedia
		gUM = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

		// detect browser-prefixed window.URL
		URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

		// grab the video element
		video = document.getElementById('source');

		// construct our seriously object
		seriously = new Seriously();

		// grab the video stream
		if (gUM) {
			gUM.call(navigator,
				{video: true},
				// success callback
				function(stream){
					// check for firefox
					if (video.mozCaptureStream) {
						video.mozSrcObject = stream;
					} else {
						video.src = (URL && URL.createObjectURL(stream)) || stream;
					}
					video.play();
				},
				// error callback
				function(error){
					console.log('An error occurred: ' + (error.message || error.name));
				}
				);
		}

		// wait until video is ready
		video.addEventListener('canplay', function(){

			applyFilter("");
		});

	// Trigger photo take
	document.getElementById("snap").addEventListener("click", function() {
		seriously.stop();
	});
	document.getElementById('dl').addEventListener('click', function() {
		seriously.stop();
		downloadCanvas(this, 'target', 'image.png');
	}, false);
	document.getElementById('replay').addEventListener('click', function() {
		seriously.go();
	}, false);
	
	document.getElementById('EffectEdge').addEventListener('click', function() {
		applyFilter("edge");
	}, false);	
	document.getElementById('EffectMirror').addEventListener('click', function() {
		applyFilter("mirror");
	}, false);
	document.getElementById('EffectNone').addEventListener('click', function() {
		applyFilter("");
	}, false);
	document.getElementById('EffectInvert').addEventListener('click', function() {
		applyFilter("invert");
	}, false);
	document.getElementById('EffectTvGlitch').addEventListener('click', function() {
		applyFilter("tvglitch");
	}, false);
	document.getElementById('EffectNightVision').addEventListener('click', function() {
		applyFilter("nightvision");
	}, false);
	document.getElementById('EffectAscii').addEventListener('click', function() {
		applyFilter("ascii");
	}, false);
	document.getElementById('Effectfilmgrain').addEventListener('click', function() {
		applyFilter("filmgrain");
	}, false);
	document.getElementById('Effecthex').addEventListener('click', function() {
		applyFilter("hex");
	}, false);
	document.getElementById('EffectPixelate').addEventListener('click', function() {
		applyFilter("pixelate");
	}, false);
	document.getElementById('EffectKaleidoscope').addEventListener('click', function() {
		applyFilter("kaleidoscope");
	}, false);
};

function applyFilter(filter){

	// time to get serious
	source = seriously.source(video);
	target = seriously.target('#target');
	flip = seriously.transform('flip');
	flip.direction = 'horizontal';
    flip.source = video; // implicitly create a hidden source node

    if (filter.length !== 0) {
    	effect = seriously.effect(filter);
			// connect all our nodes in the right order
			effect.source = flip;
			target.source = effect;
		}else{
			target.source = flip;
		};
		seriously.go();
	}

// http://leafletjs.com/examples/quick-start.html
function initializeMaps(lat,longi) {


	var map = L.map('map').setView([lat, longi], 13);
	L.marker([lat, longi]).addTo(map)
	.bindPopup(lat + "º " + longi +"º").openPopup();
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

function downloadCanvas(link, canvasId, filename) {
	link.href = document.getElementById(canvasId).toDataURL();
	link.download = filename;
}
