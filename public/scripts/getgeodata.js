//Get Geodata from Google Maps for a searched place and add it to url
const search = document.getElementsByClassName('search')[0];
const btn = document.getElementsByClassName('searchbtn')[0];
const apiKey = document.getElementsByClassName('key')[0];
btn.addEventListener('click', () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${search.value}&key=${apiKey.innerHTML}`)
        .then(response => {
            return response.json();
        }).then(data => {
            const latitude = data.results[0].geometry.location.lat;
            const longitude = data.results[0].geometry.location.lng;
            window.location.href = `/passtimes/?place=${search.value}&lat=${latitude}&long=${longitude}`;
        }).catch(err => {console.log(err)});
});
