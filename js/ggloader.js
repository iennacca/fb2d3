/**
 * Created with JetBrains WebStorm.
 * User: Jerry
 * Date: 4/16/13
 * Time: 11:43 PM
 * To change this template use File | Settings | File Templates.
 */

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
}

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBcYQqTed3NJrqrbDKjCpYpLxBAPcDo9CI&sensor=false&callback=initialize";
    document.body.appendChild(script);
}

window.onload = loadScript;
