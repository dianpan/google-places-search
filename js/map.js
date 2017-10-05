var map, places, searchBox, infoWindow
var markers = [];

function initMap() {
  var input = document.getElementById('pac-input');
  var SAN_FRANCISCO_COORDINATES = {lat: 37.7827, lng: -122.4149}
  map = new google.maps.Map(document.getElementById('map'), {
    center: SAN_FRANCISCO_COORDINATES,
    zoom: 12
  });

  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });

	places = new google.maps.places.PlacesService(map);
	searchBox = new google.maps.places.SearchBox(input);
  onPlaceChanged();

  document.getElementById('submit-button').onclick = function () {
    google.maps.event.trigger(input, 'focus')
    google.maps.event.trigger(input, 'keydown', { keyCode: 13 });
  };
}

function onPlaceChanged() {
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener('places_changed', function() {
    var locations = searchBox.getPlaces();
    if (locations.length == 0) { return; }
    search(locations);
    toggleHeader();
  });
}

function toggleHeader() {
  var headerTag = document.querySelector('header');
  var list = headerTag.classList
  if (list.contains('collapse')) {
    return;
  } else {
    $('.expand').toggleClass('collapse');
  }
}

function search(locations) {
  var bounds = new google.maps.LatLngBounds();

  locations.forEach(function(place) {
    clearResults();
    clearMarkers();

    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(18);
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
      console.log("Returned place contains no geometry");
      return;
    }

    for (var i = 0; i < locations.length; i++) {
      markers[i] = new google.maps.Marker({
        position: locations[i].geometry.location,
        animation: google.maps.Animation.DROP
      });
      markers[i].placeResult = locations[i];
      google.maps.event.addListener(markers[i], 'click', showInfoWindow);
      markers[i].setMap(map);
      addResult(locations[i], i);
    }
  });
  map.fitBounds(bounds);
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }
  markers = [];
}

function addResult(result, i) {
  var table = document.getElementById('resultsTable')
  var results = document.getElementById('results');
  var tr = document.createElement('tr');
  tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');

  tr.onclick = function() {
    google.maps.event.trigger(markers[i], 'click');
  };

  var iconTd = document.createElement('td');
  var nameTd = document.createElement('td');
  var icon = document.createElement('div');
  icon.setAttribute('class', 'placeIcon');
  icon.setAttribute('className', 'placeIcon');
  var name = document.createTextNode(result.name);
  iconTd.appendChild(icon);
  nameTd.appendChild(name);
  tr.appendChild(iconTd);
  tr.appendChild(nameTd);
  results.appendChild(tr);
}

function clearResults() {
  var results = document.getElementById('results');
  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}

function showInfoWindow() {
  var marker = this;

  places.getDetails({placeId: marker.placeResult.place_id},
      function(place, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        infoWindow.open(map, marker);
        buildIWContent(place);
      });
}

function buildIWContent(place) {
  var hostnameRegexp = new RegExp('^https?://.+?/');

  document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
      'src="' + place.icon + '"/>';
  document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
      '">' + place.name + '</a></b>';
  document.getElementById('iw-address').textContent = place.vicinity;

  if (place.formatted_phone_number) {
    document.getElementById('iw-phone-row').style.display = '';
    document.getElementById('iw-phone').textContent =
        place.formatted_phone_number;
  } else {
    document.getElementById('iw-phone-row').style.display = 'none';
  }

  if (place.rating) {
    var ratingHtml = '';
    for (var i = 0; i < 5; i++) {
      if (place.rating < (i + 0.5)) {
        ratingHtml += '&#10025;';
      } else {
        ratingHtml += '&#10029;';
      }
    document.getElementById('iw-rating-row').style.display = '';
    document.getElementById('iw-rating').innerHTML = ratingHtml;
    }
  } else {
    document.getElementById('iw-rating-row').style.display = 'none';
  }

  if (place.website) {
    var fullUrl = place.website;
    var website = hostnameRegexp.exec(place.website);
    if (website === null) {
      website = 'http://' + place.website + '/';
      fullUrl = website;
    }
    document.getElementById('iw-website-row').style.display = '';
    document.getElementById('iw-website').textContent = website;
  } else {
    document.getElementById('iw-website-row').style.display = 'none';
  }
}
