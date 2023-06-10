function initMap() {
    var coordinates = { lat: -18.866575228199927, lng: -41.9597687698001 };

    var map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: 15 
    });

    var marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        title: "Loja"
    });
}