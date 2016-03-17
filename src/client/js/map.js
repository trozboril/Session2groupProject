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
    map = new google.maps.Map(
    document.getElementById("map_canvas"), {
        center: new google.maps.LatLng(39.7392, -104.9903),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styles
    });
    geocoder = new google.maps.Geocoder();
    for (i = 0; i < locations.length; i++) {
        geocodeAddress(locations, i);
    }
}
google.maps.event.addDomListener(window, "load", init);
function geocodeAddress(locations, i) {
    var title = locations[i][0];
    var address = locations[i][1];
    var description = locations[i][3];
    var page = locations[i][4];
    geocoder.geocode({
        'address': locations[i][1]
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
            maxWidth: 350
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

$(document).ready(function () {
    var numBreweries = $('.brewpub').length;

    var breweryName;
    var breweryAddress;
    var breweryZip;
    var breweryDescription;
    var breweryLocation = [];

    $('#brewery').on('click', function () {
    var breweryName = $('p:eq(0)').text();
    var breweryAddress = $('p:eq(1)').text();
    var breweryZip = $('p:eq(2)').text();
    var breweryDescription = $('p:eq(3)').text();
    var breweryLocation = [breweryName, breweryAddress, breweryZip, breweryDescription];
    locations.push(breweryLocation);
    console.log(locations);
    init();
});
});