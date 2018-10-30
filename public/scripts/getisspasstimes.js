//Get passtimes from Open Notify and display them in a table.
const placeData = document.getElementsByClassName('data');
const table = document.getElementsByClassName('passtimestable')[0]; 
const passTimesExtras = document.getElementsByClassName('pastimesextras')[0];
const loader = document.getElementById('loader');
const lat = placeData[1].innerHTML;
const long = placeData[2].innerHTML;

if(parseFloat(lat) === 0 && parseFloat(long) === 0){
	loader.innerHTML = `Passtimes for ${placeData[3].innerHTML} not found!`;
	// table.style.visibility = none;
	passTimesExtras.style.visibility = 'visible';
}else{
	//Use JSONP data to get the next 5 Iss pass-times and add them to a table. The timezone is the default OS timezone.
	$.getJSON(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}&n=5&callback=?`, data => {
		loader.innerHTML = `The table below shows the next 5 ISS pass times for ${placeData[3].innerHTML} <i>[ ${placeData[0].innerHTML} ]</i>`;
		table.style.display = 'table';
		passTimesExtras.style.visibility = 'visible';
		data['response'].forEach( d => {
			const date = new Date(d['risetime']*1000);
			const duration = d['duration'];
			const datarow = table.insertRow(1);
			const dateCell = datarow.insertCell(0);
			const durationCell = datarow.insertCell(1);
			dateCell.innerHTML = date.toString();
			durationCell.innerHTML = duration;
		});
	});
}
