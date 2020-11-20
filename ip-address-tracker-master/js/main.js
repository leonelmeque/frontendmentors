import {IP_LOCATOR_ULR, IP_LOCATOR_KEY,MAPBOX_KEY} from './constants.js';
let mymap;
let marker;

const initMap = () =>{
     mymap = L.map('mapid').setView([51.5, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: MAPBOX_KEY
    }).addTo(mymap);
     marker = L.marker([51.5, -0.09]).addTo(mymap);
}

const fetchIpLocation = async()=>{
    const formData = new FormData(document.querySelector('form'));
    const _ipAddress = formData.get('search');
    const res = await fetch(`${IP_LOCATOR_ULR}${IP_LOCATOR_KEY}&ipAddress=${_ipAddress}`)
    const {ip,location: { country, region, timezone, lat, lng, geonameId}, isp} = await res.json();
    
    updateUIData(ip,(region +', '+country+', '+geonameId), `UTC ${timezone}` , isp);
    changeLocation(lat,lng);
}


const changeLocation = (lat, lon)=>{
    const newLatLng = new L.LatLng(lat, lon);
    mymap.panTo(newLatLng);
    marker.setLatLng(newLatLng).update();
    console.log(marker)
}

const updateUIData = (ip, location, timezone, isp) => {
    const _ipAddress = document.querySelector('.ip-address');
    const _location = document.querySelector('.location');
    const _timezone = document.querySelector('.timezone');
    const _isp = document.querySelector('.isp');
    
    _ipAddress.innerHTML = ip;
    _location.innerHTML = location;
    _timezone.innerHTML = timezone;
    _isp.innerHTML = isp;
}


window.fetchIpLocation = fetchIpLocation;
initMap();
fetchIpLocation()