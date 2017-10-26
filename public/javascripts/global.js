function initializemap()
{
    var myLatLng = new google.maps.LatLng(30.107957850154172, 78.29738327536393);
    var map = new google.maps.Map(document.getElementById("map"),
        {
            zoom: 17,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

    var marker = new google.maps.Marker(
        {
            position: myLatLng,
            map: map,
            title: 'Dev Bhoomi Traders'
        });
}