var locations = [
//     // ['Brewery Name', 'Address, City, State', 'Zip', 'description', 'image'],
    // ['Tylers Brewery', '10261 Macedonia St., Longmont, CO', '80503', 'Very nice and neat brewery'],
    ];

// console.log(locations);
// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('breweries', function(table) {
//     table.increments();
//     table.string('name');
//     table.string('address');
//     table.string('city');
//     table.string('state');
//     table.integer('zip');
//     table.integer('beer_id');
//     table.string('description');
//     table.string('image');
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//   });
// };
var styles = [{
  featureType: 'all',
  elementType: 'labels',
  stylers: [
  { visibility: 'on' }  
  ]
}, {
  featureType: 'water',
  elementType: 'geometry',
  stylers: [
  { color: '#4a6eff',
  visibility: 'on' }  
  ]
}, {
  featureType: 'landscape',
  elementType: 'geometry',
  stylers: [
  { color: '#c7c7c7',
  visibility: 'on' }  
  ]
}, {
  featureType: 'poi',
  elementType: 'geometry',
  stylers: [
  { color: '#a6a6a6',
  visibility: 'on' }  
  ]
}, {
  featureType: 'transit',
  elementType: 'geometry', 
  stylers: [
  { color: '#a6a6a6',
  visibility: 'on' }  
  ]
}, {
  featureType: 'road.highway',
  elementType: 'geometry',
  stylers: [
  { color: '#404040',
  visibility: 'on' }  
  ]
}, {
  featureType: 'road.arterial',
  elementType: 'geometry',
  stylers: [
  { color: '#ecf0f1',
  visibility: 'on' }  
  ]
}];   
  var geocoder;
  var map;
  var bounds = new google.maps.LatLngBounds();
function init() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(
    document.getElementById("map"), {
      center: new google.maps.LatLng(39.7392, -104.9903),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styles
    });
  directionsDisplay.setMap(map);

  if ( window.usersPosition && window.endDestination ) {
    calculateAndDisplayRoute(directionsService, directionsDisplay);  
  }


  geocoder = new google.maps.Geocoder();
  if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            window.usersPosition = pos;
            var yourlocation;
            var marker = new google.maps.Marker({
              icon: 'http://maps.google.com/mapfiles/ms/icons/red.png',
              map: map,
              position: pos,
              content: yourlocation,
              animation: google.maps.Animation.DROP,
            });
            yourlocationinfoWindow(marker, map, yourlocation);

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
  for (i = 0; i < locations.length; i++) {
    geocodeAddress(locations, i);
  }
}

google.maps.event.addDomListener(window, "load", init);
function geocodeAddress(locations, i) {
  var title = locations[i].name;
  var address = locations[i].address;
  var description = locations[i].description;
  var page = locations[i][4];
  geocoder.geocode({
    'address': locations[i].address
  },
  function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var marker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
        map: map,
        position: results[0].geometry.location,
        title: title,
        animation: google.maps.Animation.DROP,
        address: address,
        description: description,
        page: page
      });
      infoWindow(marker, map, title, address, description, page);
      bounds.extend(marker.getPosition());
      map.fitBounds(bounds);
    } else {
      alert("geocode of " + address + " failed:" + status);
    }
  });
}
function infoWindow(marker, map, title, address, description, page) {
  google.maps.event.addListener(marker, 'click', function () {
    var html = "<div><h3>" + title + "</h3><p>" + address + "<br><br>" + description + "<br></div><a href='" + page + "'>View Brewery Info</a></p></div>";
    iw = new google.maps.InfoWindow({
      content: html,
      maxWidth: 400
    });
    iw.open(map, marker);
  });
}
function yourlocationinfoWindow(marker, map, title, address, description, page) {
  google.maps.event.addListener(marker, 'click', function () {
    var html = "<div><h4>Your are here.</h4></div>";
    iw = new google.maps.InfoWindow({
      content: html,
      maxWidth: 400
    });
    iw.open(map, marker);
  });
}
function createMarker(results) {
  var marker = new google.maps.Marker({
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
    map: map,
    position: results[0].geometry.location,
    title: title,
    animation: google.maps.Animation.DROP,
    address: address,
    description: description,
    image: image
  });
  bounds.extend(marker.getPosition());
  map.fitBounds(bounds);
  infoWindow(marker, map, title, address, url);
  return marker;
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: window.usersPosition,
          destination: window.endDestination,
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

$(document).ready(function () {
  var numBreweries = $('.brewpub').length;

  $('.brewery').each(function () {
    $(this).on('click', function () {
      var breweryPin = {
        name: $(this).parent().children('.name').text(),
        address: $(this).parent().children('.address').text(),
        zip: $(this).parent().children('.zip').text(),
        description: $(this).parent().children('.description').text()
      };

      window.endDestination = breweryPin.address;
      locations.push(breweryPin);
      init();
    });
  });
  $('.removebrewery').each(function () {
    $(this).on('click', function () {
      window.endDestination = '';
      var theName = $(this).parent().children('.name').text();
      for (var i = 0; i < locations.length; i++) {
        if (locations[i].name === theName) {
          locations.splice(i, 1);
          init();
          return;
        }
      }
    });
  });
});

