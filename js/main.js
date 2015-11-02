// http://www.html5rocks.com/en/tutorials/getusermedia/intro/
// http://davidwalsh.name/browser-camera

var localMediaStream = null;
// check for Geolocation support
if (navigator.geolocation) {
	console.log('Geolocation is supported!');
}
else {
	console.log('Geolocation is not supported for this Browser/OS version yet.');
}

window.onload = function() {

	// Position's stuff
	var startPos;
	navigator.geolocation.getCurrentPosition(function(position) {
		startPos = position;
		document.getElementById('startLat').innerHTML = startPos.coords.latitude;
		document.getElementById('startLon').innerHTML = startPos.coords.longitude;
		initializeMaps(startPos.coords.latitude,startPos.coords.longitude);
	}, function(error) {
		alert('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from locaton provider)
    //   3: timed out
	});

	// Grab elements, create settings, etc.
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		video = document.getElementById("video"),
		videoObj = { "video": true },
		errBack = function(error) {
			console.log("Video capture error: ", error.code); 
		};

	// Put video listeners into place
	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, function(stream) {
			video.src = stream;
			video.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
	else if(navigator.mozGetUserMedia) { // Firefox-prefixed
		navigator.mozGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}

	// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 640, 480);
});

};


function initializeMaps(lat,long) {
  var mapProp = {
    center:new google.maps.LatLng(lat,long),
    zoom:10,
    mapTypeId:google.maps.MapTypeId.HYBRID
  };
  var marker=new google.maps.Marker({
  position:mapProp.center,
  });

  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  marker.setMap(map);
}
