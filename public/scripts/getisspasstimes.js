//Get passtimes from Open Notify and display them in a table.
const placeData = document.getElementsByClassName('data');
const table = document.getElementsByClassName("passtimestable")[0]; 
const passTimesExtras = document.getElementsByClassName('pastimesextras')[0];
const searchTextBox = document.getElementById('srch');

//Use JSONP data to get the next 5 Iss pass-times and add them to a table. The timezone is the default OS timezone.
$.getJSON(`http://api.open-notify.org/iss-pass.json?lat=${placeData[1].innerHTML}&lon=${placeData[2].innerHTML}&n=5&callback=?`, function(data) {
    const loader = document.getElementById("loader");
    loader.innerHTML = `The table below shows the next 5 ISS pass times for ${placeData[3].innerHTML} <i>[ ${placeData[0].innerHTML} ]</i>`
    table.style.visibility = 'visible';
    passTimesExtras.style.visibility = 'visible';
    data['response'].forEach(function (d) {
        const date = new Date(d['risetime']*1000);
        const duration = d['duration']
        let datarow = table.insertRow(1);
        let dateCell = datarow.insertCell(0);
        let durationCell = datarow.insertCell(1);
        dateCell.innerHTML = date.toString();
        durationCell.innerHTML = duration;
    });
});
