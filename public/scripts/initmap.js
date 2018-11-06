//Use data received from Open Notify to initialize the map
const pos = document.getElementsByClassName('data');
function initMap() {
  // Map options
  const options = {
    center: {lat: parseFloat(pos[0].innerHTML), lng: parseFloat(pos[1].innerHTML)},
    zoom: 4
  };
  //New Map
  const map =  new google.maps.Map(document.getElementById('map'), options);
  //Add marker
  const marker= new google.maps.Marker({
    position: options.center,
    map:map,
  });
}
