var isStreaming = false,
v = document.getElementById('video'),
c = document.getElementById('canvas'),
con = c.getContext('2d');
w = 640, 
h = 480;

(function() {

	window.addEventListener('DOMContentLoaded', function() {
		var isStreaming = false,
		v = document.getElementById('video'),
		c = document.getElementById('canvas'),
		con = c.getContext('2d');
		w = 640, 
		h = 480,


		// Cross browser
		navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
		if (navigator.getUserMedia) {
			// Request access to video only
			navigator.getUserMedia(
			{
				video:true,
				audio:false
			},		
			function(stream) {
					// Cross browser checks
					var url = window.URL || window.webkitURL;
					v.src = url ? url.createObjectURL(stream) : stream;
        			// Set the video to play
        			v.play();
        		},
        		function(error) {
        			alert('Something went wrong. (error code ' + error.code + ')');
        			return;
        		}
        		);
		}
		else {
			alert('Sorry, the browser you are using doesn\'t support getUserMedia');
			return;
		}

		// Wait until the video stream can play
		v.addEventListener('canplay', function(e) {
			if (!isStreaming) {
		    	// videoWidth isn't always set correctly in all browsers
		    	if (v.videoWidth > 0) h = v.videoHeight / (v.videoWidth / w);
		    	c.setAttribute('width', w);
		    	c.setAttribute('height', h);
				// Reverse the canvas image
				con.translate(w, 0);
				con.scale(-1, 1);
				isStreaming = true;
			}
		}, false);

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

		// Wait for the video to start to play
		v.addEventListener('play', function() {
			// Every 33 milliseconds copy the video image to the canvas
			setInterval(function() {

				con.fillRect(0, 0, w, h);
				con.drawImage(v, 0, 0, w, h);
				if (v.paused || v.ended) return;
				// draw cross
	            con.beginPath();
	            con.arc(320, 245, 45, 0, Math.PI * 2, true);
	            con.strokeStyle = "RED";
	            con.stroke();

	            //Shape1;
	            con.shadowColor = "rgba(0,0,0,0)";
	            con.strokeStyle = "RED";
	            con.lineWidth = 2;
	            con.lineCap = "butt";
	            con.lineJoin = "miter";
	            con.beginPath();
	            con.moveTo(275, 245);
	            con.lineTo(230, 245);
	            con.stroke();

	            //Shape2;
	            con.shadowColor = "rgba(0,0,0,0)";
	            con.strokeStyle = "RED";
	            con.lineWidth = 2;
	            con.lineCap = "butt";
	            con.lineJoin = "miter";
	            con.beginPath();
	            con.moveTo(365, 245);
	            con.lineTo(410, 245);
	            con.stroke();

	            //Shape3;
	            con.shadowColor = "rgba(0,0,0,0)";
	            con.strokeStyle = "RED";
	            con.lineWidth = 2;
	            con.lineCap = "butt";
	            con.lineJoin = "miter";
	            con.beginPath();
	            con.moveTo(320, 200);
	            con.lineTo(320, 155);
	            con.stroke();

	            //Shape4;
	            con.shadowColor = "rgba(0,0,0,0)";
	            con.strokeStyle = "RED";
	            con.lineWidth = 2;
	            con.lineCap = "butt";
	            con.lineJoin = "miter";
	            con.beginPath();
	            con.moveTo(320, 290);
	            con.lineTo(320, 335);
	            con.stroke();

			}, 33);
		}, false);
	})

	// Trigger photo take
	document.getElementById("snap").addEventListener("click", function() {
		v.pause();
	});
	document.getElementById('dl').addEventListener('click', function() {
		downloadCanvas(this, 'canvas', 'image.png');
	}, false);
	document.getElementById('replay').addEventListener('click', function() {
		v.play();
	}, false);

	function downloadCanvas(link, canvasId, filename) {
		link.href = document.getElementById(canvasId).toDataURL();
		link.download = filename;
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
})();

