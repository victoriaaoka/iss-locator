//Get passtimes from Open Notify and display them in a table.
const placeData = document.getElementsByClassName('data');
const table = document.getElementsByClassName("passtimestable")[0];

function UnixTimestampConverter(unixTime){
    const date = new Date(unixTime*1000);
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = "0" + date.getMinutes();
    const second = "0" + date.getSeconds();
    const locale = "en-us";
    const month = date.toLocaleString(locale, {month: "long"});
    return `${day} ${month} ${year} ${hour}:${minute.substr(-2)}:${second.substr(-2)}`;  
}

fetch(`http://api.open-notify.org/iss-pass.json?lat=${placeData[1].innerHTML}&lon=${placeData[2].innerHTML}`)
    .then(res => {
        return res.json();
    })
    .then(data => { 
        const responses = data.response;  
        responses.forEach(response => {
            let datarow = table.insertRow(1);
            let dateCell = datarow.insertCell(0);
            let durationCell = datarow.insertCell(1);
            dateCell.innerHTML = UnixTimestampConverter(response.risetime);
            durationCell.innerHTML = response.duration;
        });
    })
    .catch(err => {console.log(err)});
    