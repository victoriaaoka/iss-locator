//Get ISS data from Open Notify and pass it to the url.
let button = document.getElementsByClassName('showbtn')[0];
  button.addEventListener('click', () => {
    fetch(`http://api.open-notify.org/iss-now.json`).then(response => {
        return response.json();
      }).then(data => {
        window.location.href = `/map/?lat=${data.iss_position.latitude}&long=${data.iss_position.longitude}`;
      }).catch(err => {console.log(err)});
  });