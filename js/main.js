"use strict";

// Materialize auto initilizer
M.AutoInit();

var selectedMarker = [];


var selectedAvgRating;
var selectedNumRatings;
var selectedPosition;
var pos;
var distance;
var distanceCheck;
var selectedAddress;
var selectedBaby, selectedDisabled, selectedFree;

// Loader Edward
$(window).load(function() { //Do the code in the {}s when the window has loaded
  $(".preloader-background").fadeOut("fast");
  $(".preloader-wrapper").fadeOut("fast"); //Fade out the #loader div
});


//Acessing user location
var map;

function initMap() {
  //Jozsef


  infoWindow = new google.maps.InfoWindow;


  //Jozsef
  // Try HTML5 geolocation.
  //Checks if the browser has access tot the user location
  //if yes it puts the coordinates into (global) variables
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };


      //centers the map to the user location
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });

  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}
console.log(pos);

function handleLocationError(browserHasGeolocation, infoWindow) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// Directions function
//Ignas, Edward

function calculateAndDisplayRoute(directionsService, directionsRenderer, pos, pinLocation) {

  directionsService.route({
      origin: pos,
      destination: pinLocation,
      travelMode: 'WALKING'
    },
    function(response, status) {
      if (status === 'OK') {

        directionsRenderer.setDirections(response);
        distance = response.routes[0].legs[0].distance.text;
        distanceCheck = response.routes[0].legs[0].distance.value;





        //Information filterModal
        let htmlTemplate = `
      <div class="filterModal">
      <a class="btn-floating btn-small waves-effect waves-light blue close" onclick="closeFilterModal()"><i class="material-icons">close</i></a>
          <p id = "navP"> <strong> ${selectedAddress} </strong> <br> ${distance} Away</p>
          <ul>
          <li id="baby"><img src="../img/baby.svg" alt="baby"></li>
          <li id="disabled"><img src="../img/disabled.svg" alt="disabled"></li>
          <li id="free"><img src="../img/free.svg" alt="free"></li>
          </ul>

          <button id="up" class="modal-close waves-effect waves-light btn" onclick="calculateAndDisplayRoute(directionsService,directionsRenderer,pos,selectedPosition)">Navigate</button>
          </div>
      `;


  //Information filterModal
  let htmlTemplate2 = `
<div class="filterModal">
<a class="btn-floating btn-small waves-effect waves-light blue close" onclick="closeFilterModal()"><i class="material-icons">close</i></a>
    <p id = "navP"> <strong> ${selectedAddress} </strong> <br> ${distance} Away</p>
    <ul>
    <li id="baby"><img src="../img/baby.svg" alt="baby"></li>
    <li id="disabled"><img src="../img/disabled.svg" alt="disabled"></li>
    <li id="free"><img src="../img/free.svg" alt="free"></li>
    </ul>
    <p id="up">Too far away for navigation</p>

    </div>
`;
if (distanceCheck > 3000) {

document.querySelector("#filters").innerHTML = htmlTemplate2;
directionsRenderer.setMap(null);
}
else {
  document.querySelector("#filters").innerHTML = htmlTemplate;
  directionsRenderer.setMap(map);


}

        //Hides filter icons
        //Ignas
        if (selectedBaby) {
          document.querySelector("#baby").style.display = "block";
        } else {
          document.querySelector("#baby").style.display = "none";
        }

        if (selectedDisabled) {
          document.querySelector("#disabled").style.display = "block";
        } else {
          document.querySelector("#disabled").style.display = "none";
        }

        if (selectedFree) {
          document.querySelector("#free").style.display = "block";
        } else {
          document.querySelector("#free").style.display = "none";
        }



      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}


//Kornelia, Jozsef
var mapStyling = [{
    "elementType": "geometry",
    "stylers": [{
      "color": "#f5f5f5"
    }]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "off"
    }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#616161"
    }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#f5f5f5"
    }]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#bdbdbd"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "color": "#eeeeee"
    }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#757575"
    }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e5e5e5"
    }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9e9e9e"
    }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "color": "#ffffff"
    }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#757575"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
      "color": "#dadada"
    }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#616161"
    }]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9e9e9e"
    }]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e5e5e5"
    }]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{
      "color": "#eeeeee"
    }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
      "color": "#c9c9c9"
    }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#9e9e9e"
    }]
  }
]

//All team members
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB04QXJ9nEQdJa9AWTqF_GmR8SOr_KvF7c",
  authDomain: "public-toilet-finder-4e2f0.firebaseapp.com",
  databaseURL: "https://public-toilet-finder-4e2f0.firebaseio.com",
  projectId: "public-toilet-finder-4e2f0",
  storageBucket: "",
  messagingSenderId: "509217784069",
  appId: "1:509217784069:web:3a19197f49947c53f7f76c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const bathroomRef = db.collection("locations");

//Ignas
function createBathroom() {
  let addressInput = document.querySelector('#address');
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    let instance = M.FormSelect.getInstance(elem);
    console.log(instance.getSelectedValues());



    let newBathroom = {
      lat: pos.lat,
      lng: pos.lng,
      disabled: instance.getSelectedValues().includes("disabled"),
      baby: instance.getSelectedValues().includes("baby"),
      free: instance.getSelectedValues().includes("free"),
      address: document.getElementById("address").value
    };
    bathroomRef.add(newBathroom);
  })

}

//Acessing user location
var map, infoWindow;
var pos;
var directionsService;
var directionsRenderer;

function initMap() {
  //Ignas, Jozsef
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 56.1629,
      lng: 10.2039
    },
    zoom: 15,
    disableDefaultUI: true,
    styles: mapStyling
  });
  //Ignas
  directionsRenderer.setMap(map);
  directionsRenderer.setOptions({
    suppressMarkers: true
  });

  infoWindow = new google.maps.InfoWindow;

  //Blue ring is put to user location
  //Ignas
  (function() {
    'use strict';

    var geolocation_options = {
      enableHighAccuracy: false,
      timeout: 8000,
      maximumAge: 3000
    };

    function LocationError(code, reason) {
      var self = this;
      self.code = code;
      self.reason = reason instanceof Error ? reason : null;
      self.message = reason instanceof Error ? reason.message : reason;
      self.stack = (new Error()).stack;
    }
    LocationError.prototype = Object.create(Error.prototype);
    LocationError.prototype.constructor = LocationError;

    window.BlueDot = function(map, options) {
      var self = this;

      options = options || {};
      options.icon = options.icon || '../img/location.svg'
      options.on = options.on || {};
      options.on.geolocationError = options.on.geolocationError || function(error) {};
      options.on.firstGeolocationUpdate = options.on.firestgeolocationUpdate || function(newLocation) {};
      options.on.geolocationUpdate = options.on.geolocationUpdate || function(newLocation) {};

      self.options = options;

      self.marker = null;

      self.updateLocation = function(pos) {
        var coordinates = pos.coords;
        var position = {
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        };

        if (self.marker === null) {
          self.marker = new google.maps.Marker({
            map: map,
            position: position,
            icon: options.icon
          });

          map.setCenter(position);
          options.on.firstGeolocationUpdate(pos);
        } else {
          self.marker.setPosition(position);
          options.on.geolocationUpdate(pos);
        }
      };

      self.error = function(error) {
        options.on.geolocationError(new LocationError(error.code, error));
      };

      if (!navigator.geolocation) {
        options.on.geolocationError(new LocationError(101, 'Geolocation is not supported on this browser'));
      } else {
        navigator.geolocation.watchPosition(self.updateLocation, self.error, geolocation_options);
      }
    };
  })();
  new BlueDot(map);


  // Try HTML5 geolocation.
  //Checks if the browser has access tot the user location
  //if yes it puts the coordinates into (global) variables
  //Ignas
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //Ignas, Edward
      //geocoding

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyA3bB16-ieel0BRSzYUmRwqS7gYzXkFkJk`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          // Work with JSON data here
          console.log(data);
          document.getElementById("address").value = data.results[0].formatted_address;

        })

      //Ignas
      //centers the map to the user location
      //creates a div with a class centerMe and appends it too the map section

      let img = document.createElement("img");
      img.setAttribute('class', 'centerMe');
      img.src = 'img/locate.svg';
      document.querySelector('#map').appendChild(img);

      //Ignas
      //Adds an event listener to the div that centers the map to the users location
      document.querySelector(".centerMe").addEventListener('click', function() {
        map.setCenter(pos);
      });
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}

//Ignas
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}





//All team members
// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  setActiveTab(pageId);
  if (pageId === "map") {
    document.getElementById("filters").style.display = "flex";
  } else {
    document.getElementById("filters").style.display = "none";
  }
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

// set default page
function setDefaultPage() {
  let page = "map";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();

console.log(pos);


// Your web app's Firebase configuration

const locationRef = db.collection("locations");
const tipsRef = db.collection("posts");

let markers = [];


locationRef.onSnapshot(function(snapshotData) {
  let locations = snapshotData.docs;
  appendLocations(locations);
  console.log(locations);
});

tipsRef.onSnapshot(function(snapshotData) {
  let posts = snapshotData.docs;
  appendTips(posts);
});


//SafetyTips page

function appendTips(posts) {
  let htmlTemplate = "";
  for (let post of posts) {
    console.log(post);
    htmlTemplate += `
      <li>${post.data().post}</li>
    `;
  }
  // document.querySelector("#safetyTipsContent").innerHTML += htmlTemplate;


}




var Safety = [];

function appendTips(posts) {
  let htmlTemplate = "";
  for (let post of posts) {
    console.log(post);
    htmlTemplate += `
      <li>${post.data().post}</li>
    `;
    Safety.push(post);
  }

  console.log(Safety); };


//Jozsef
// append locations to the DOM
function appendLocations(locations) {

  for (let location of locations) {
    console.log(location.id);
    //  console.log(location.data().location);
    let latitude = location.data().lat;
    console.log(latitude);

    let longtitude = location.data().lng;
    console.log(longtitude);

    let baby = location.data().baby;
    let disabled = location.data().disabled;
    let free = location.data().free;
    let address = location.data().address;


    let myLatLng = {
      lat: latitude,
      lng: longtitude
    };

    console.log(myLatLng);
    var iconBase = '../img/pin.png';
    var newMarker = new google.maps.Marker({
      position: myLatLng,
      address: address,
      map: map,
      icon: iconBase,
      baby: baby,
      disabled: disabled,
      free: free,

    });

    markers.push(newMarker);
    console.log(markers);

    //Listens if a pin is clicked
    //Edward, Jozsef
    newMarker.addListener('click', function() {
      selectedPosition = this.position;
      selectedAddress = this.address.toString();
      selectedBaby = this.baby;
      selectedDisabled = this.disabled;
      selectedFree = this.free;
      //Looping through all the pins and
      //changing all of them back to the default icon
      for (let changedPin of markers) {
        var iconBase = "../img/pin.png";

        changedPin.setIcon(iconBase);
      };

      var iconBase1 = '../img/selectedPin.png';
      this.setIcon(iconBase1);

      selectedMarker.push(markers);



      //Edward, Jozsef
      let htmlTemplate = `
      <div class="filterModal">
      <a class="btn-floating btn-small waves-effect waves-light blue close" onclick="closeFilterModal(),clearRoute()"><i class="material-icons">close</i></a>
          <p id = "navP"> <strong>${selectedAddress}</strong></p>
          <ul>
          <li id="baby"><img src="../img/baby.svg" alt="baby"></li>
          <li id="disabled"><img src="../img/disabled.svg" alt="disabled"></li>
          <li id="free"><img src="../img/free.svg" alt="free"></li>
          </ul>


          <button id="up" class="modal-close waves-effect waves-light btn" onclick="calculateAndDisplayRoute(directionsService,directionsRenderer,pos,selectedPosition)">Navigate</button>
          </div>
      `;


      //Displays the filter icons on the information filterModal
      //Kornelia, Jozsef
      document.querySelector("#filters").innerHTML = htmlTemplate;
      if (selectedBaby) {
        document.querySelector("#baby").style.display = "block";
      } else {
        document.querySelector("#baby").style.display = "none";
      }

      if (selectedDisabled) {
        document.querySelector("#disabled").style.display = "block";
      } else {
        document.querySelector("#disabled").style.display = "none";
      }

      if (selectedFree) {
        document.querySelector("#free").style.display = "block";
      } else {
        document.querySelector("#free").style.display = "none";
      }

      console.log(selectedPosition);




    });
  };

}



//Edward, Jozsef
function closeFilterModal() {
  document.querySelector("#filters").innerHTML = `
         <img id="disabledIcon" src="img/disabled.svg" alt="disabled" onclick="disabledOnClick()">
         <img id="babyIcon" src="img/baby.svg" alt="baby" onclick="babyOnClick()">
         <img id="freeIcon" src="img/free.svg" alt="free" onclick="freeOnClick()">
         `;

  //Clears path from map
  //Ignas
  directionsRenderer.setMap(null);

  //Looping through all the pins and
  //changing all of them back to the default icon
  //Jozsef
  for (let changedPin of markers) {
    var iconBase = "../img/pin.png";

    changedPin.setIcon(iconBase);
  }
};

//filtering
//Jozsef
let babyFilter = false;
let disabledFilter = false;
let freeFilter = false;

function babyOnClick() {
  if (babyFilter) {
    babyFilter = false;
    document.querySelector("#babyIcon").style.opacity = ".4";
    document.querySelector("#babyIcon").style.height = "30px";

    for (let searched of markers) {
      if (searched.baby) {} else {
        searched.setVisible(true);

      }
    }
  } else {
    babyFilter = true;
    document.querySelector("#babyIcon").style.opacity = "1";
    document.querySelector("#babyIcon").style.height = "40px";

    for (let searched of markers) {
      if (searched.baby) {} else {
        searched.setVisible(false);
      }
    }
  }
};

function freeOnClick() {
  if (freeFilter) {
    freeFilter = false;
    document.querySelector("#freeIcon").style.opacity = ".4";
    document.querySelector("#freeIcon").style.height = "30px";
    for (let searched of markers) {
      if (searched.free) {} else {
        searched.setVisible(true);

      }
    }
  } else {
    freeFilter = true;
    document.querySelector("#freeIcon").style.opacity = "1";
    document.querySelector("#freeIcon").style.height = "40px";
    for (let searched of markers) {
      if (searched.free) {} else {
        searched.setVisible(false);

      }
    }
  }
};

function disabledOnClick() {
  if (disabledFilter) {
    disabledFilter = false;
    document.querySelector("#disabledIcon").style.opacity = ".4";
    document.querySelector("#disabledIcon").style.height = "30px";

    for (let searched of markers) {
      if (searched.disabled) {} else {
        searched.setVisible(true);

      }
    }
  } else {
    disabledFilter = true;
    document.querySelector("#disabledIcon").style.opacity = "1";
    document.querySelector("#disabledIcon").style.height = "40px";

    for (let searched of markers) {
      if (searched.disabled) {} else {
        searched.setVisible(false);
      }
    }
  }
};

//Kornelia, Ignas
document.getElementById("tip1").addEventListener('click', function() {

  document.getElementById("tip2").style.visibility = "visible";
  document.getElementById("tip2").style.height = "235px";
});

document.getElementById("tip2").addEventListener('click', function() {

  document.getElementById("tip3").style.visibility = "visible";
  document.getElementById("tip3").style.height = "235px";
});
document.getElementById("tip3").addEventListener('click', function() {

  document.getElementById("tip4").style.visibility = "visible";
  document.getElementById("tip4").style.height = "235px";
});
document.getElementById("tip4").addEventListener('click', function() {

  document.getElementById("tip5").style.visibility = "visible";
  document.getElementById("tip5").style.height = "235px";
});

//Ignas
// if (window.innerWidth > 480) {
//   document.getElementById("body").innerHTML = "hello, this is a web app, open with your phone :)"
//}
