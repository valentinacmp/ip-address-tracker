
const map = L.map('mapid').setView([10.66663, -71.61245], 15);
const ip_Address = "186.148.194.0";

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	accessToken: 'pk.eyJ1IjoidmFsZW5jaWJlbCIsImEiOiJja284dnpyc24wZnJxMnFxaHpvanJvbDA4In0.PQb6OYFmOMlVzY0l2zE9xA'
}).addTo(map);

L.control.scale().addTo(map);
const marker = L.marker([10.66663, -71.61245]).addTo(map);

this.getIpAdress(ip_Address);

function getClass(className, text) {
	let class_Name = document.getElementsByClassName(`${className}`);
    return class_Name[0].innerHTML = text;
}

function getIpAdress(ipAddress) {
	fetch(`https://geo.ipify.org/api/v1?apiKey=at_y8mBaCz2aW7KY1HlTYvz2zKuyBKE3&ipAddress=${ipAddress}`)
    .then(response => response.json())
    .then(json => {
    	// console.log(json);
    	// console.log(json.location, ipAddress);

    	let lat = json.location.lat;
    	let lng = json.location.lng;
    	let city = json.location.city;
    	let country = json.location.country;
    	let postalCode = json.location.postalCode;
    	let timezone = json.location.timezone;
    	let isp = json.isp;

    	map.flyTo(new L.LatLng(lat,lng), 15);
    	L.marker([lat,lng]).addTo(map);

    	this.getClass('ip-adress', `${ipAddress}`);
    	this.getClass('location', `${city}, ${country}, </br> ${postalCode}`);
    	this.getClass('time-zone', `${timezone}`);
    	this.getClass('isp', `${isp}`);

    })
    .catch(err => console.error(err));
}

function getInputText(){
	return input = document.getElementById("input-search").value;
}

function searchLocation(){
	console.log('searching...', this.getInputText());
	this.getIpAdress(this.getInputText());
}

