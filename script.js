const map = L.map('map').setView([37.0902, -95.7129], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const markers = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

function addMarkers() {
    const markerInfoDiv = document.getElementById('markerInfo');
    markers.forEach((marker, index) => {
        const mapMarker = L.marker([marker.lat, marker.lng]).addTo(map);

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${marker.lat}&longitude=${marker.lng}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                const locality = data.locality || 'Unknown location';
                
                const markerInfo = document.createElement('p');
                markerInfo.innerHTML = `<strong>Marker ${index + 1}: Latitude: ${marker.lat}, Longitude: ${marker.lng}</strong><br><b>Locality: ${locality}</b>`;
                markerInfoDiv.appendChild(markerInfo);
                
                mapMarker.bindPopup(`<b>Marker ${index + 1}</b><br>Locality: ${locality}`).openPopup();
            })
            .catch(error => {
                console.error('Error fetching locality:', error);
            });
    });
}

window.onload = addMarkers;