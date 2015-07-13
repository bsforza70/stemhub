/* var map;

 function initialize() {
     var myLatlng1 = new google.maps.LatLng(38.646369, -90.286470);
       var styles = [
				{
			        "featureType": "administrative",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "color": "#444444"
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "elementType": "all",
			        "stylers": [
			            {
			                "color": "#f2f2f2"
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "road",
			        "elementType": "all",
			        "stylers": [
			            {
			                "saturation": -100
			            },
			            {
			                "lightness": 45
			            }
			        ]
			    },
			    {
			        "featureType": "road",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "visibility": "on"
			            },
			            {
			                "color": "#000000"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "simplified"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "visibility": "on"
			            },
			            {
			                "color": "#2ecc71"
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#2ecc71"
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "color": "#ff0000"
			            },
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "labels.icon",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#2ecc71"
			            },
			            {
			                "visibility": "on"
			            },
			            {
			                "weight": "0.20"
			            }
			        ]
			    },
			    {
			        "featureType": "transit",
			        "elementType": "all",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "all",
			        "stylers": [
			            {
			                "color": "#2ecc71"
			            },
			            {
			                "visibility": "on"
			            }
			        ]
			    }
           ];
     var mapOptions = {
         zoom: 10,
         center: myLatlng1,
         styles: styles,
         scrollwheel: false,
	     navigationControl: false,
	     mapTypeControl: false,
	     scaleControl: false,
	     draggable: false,
         mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     var map = new google.maps.Map(document.getElementById('map'),
     mapOptions);

     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             map.setCenter(initialLocation);
         });
     }
  var myMarker2 = new google.maps.LatLng(38.631512, -90.193236);
  var myMarker3 = new google.maps.LatLng(38.648979, -90.310775);
  var myMarker4 = new google.maps.LatLng(38.635301, -90.251715);
  var myMarker5 = new google.maps.LatLng(38.512628, -90.673101);
  var marker = new google.maps.Marker({
      position: myMarker2,
      map: map,
      title: 'Global Hack IV'
  });
  var marker = new google.maps.Marker({
      position: myMarker3,
      map: map,
      title: 'Washington University'
  });
  var marker = new google.maps.Marker({
      position: myMarker4,
      map: map,
      title: 'Venture Cafe'
  });
  var marker = new google.maps.Marker({
      position: myMarker5,
      map: map,
      title: 'STEM Day at Six Flags'
  });
 }
 initialize();*/