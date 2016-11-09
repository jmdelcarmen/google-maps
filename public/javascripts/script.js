'use strict';

//initialize the map object
var map;
var service;


//service search callback function
var handleResults = (results, status) => {
  console.log(results);

  //creates a marker for each search object
  results.forEach((item) => {
    new google.maps.Marker({
      position: item.geometry.location,
      map: map
    });
  });
};






//serforms actual search
var performSearch = () => {
  var request = {
    //gets the  visible bounds of the map object we created.
    bounds: map.getBounds(),
    name: ``
  };

  service.nearbySearch(request, handleResults);
};




//callback function for getCurrentPosition
var initialize = (location) => {

  var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
  console.log(currentLocation);
  //options for the map object
  var mapOptions = {
    center: currentLocation,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  //actually create the map object
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  //create a marker based on currentLocation
  var marker = new google.maps.Marker({
    position: currentLocation,
    //refer to the element that contains the map which is named map
    map: map
  });
  //create the service inside the initialize function
  service = new google.maps.places.PlacesService(map);

  //this ensures we wait until the map bounds are in place before performing the search
  google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);

  $('#toggle-refresh').click(performSearch);

  


  var circleOptions = {
    strokeColor: "#0000ff",
    strokeOpacity: 0.8,
    strokeWeight: 1.5,
    fillColor: "#0000ff",
    fillOpacity: .35,
    map: map,
    center: currentLocation,
    radius: 1000
  };

  var circle = new google.maps.Circle(circleOptions);

};


$(document).ready(function () {
  console.log('hi')

  navigator.geolocation.getCurrentPosition(initialize);
});
