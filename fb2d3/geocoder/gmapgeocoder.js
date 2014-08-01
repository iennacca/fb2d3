/**
* Created with JetBrains WebStorm.
* User: Jerry
* Date: 5/2/13
* Time: 10:56 PM
* To change this template use File | Settings | File Templates.
*/
/// <reference path="../infrastructure.ts" />
/// <reference path="../../js/google.maps.d.ts" />
var GoogleGeocodedInfoNode = (function () {
    function GoogleGeocodedInfoNode(sourceNode) {
        this.Name = sourceNode.Name;
        this.id = sourceNode.id;
        this.TextLocation = sourceNode.TextLocation;
        this.Latitude = 0;
        this.Longitude = 0;
    }
    GoogleGeocodedInfoNode.prototype.GeocodeAddress = function () {
        var geocoder = new google.maps.Geocoder();
        var address = this.TextLocation;
        var def = $.Deferred();
        var self = this;

        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results[0].geometry.location);
                self.Latitude = results[0].geometry.location.lat();
                self.Longitude = results[0].geometry.location.lng();
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
            def.resolve();
        });
        return def.promise();
    };
    return GoogleGeocodedInfoNode;
})();

var GMapGeocoder = (function () {
    function GMapGeocoder() {
    }
    GMapGeocoder.prototype.Transform = function (nodes) {
        var geocodedNodes = [];

        for (var i = 0; i < nodes.length; i++) {
            geocodedNodes[i] = new GoogleGeocodedInfoNode(nodes[i]);
        }
        return geocodedNodes;
    };

    GMapGeocoder.prototype.TransformAsync = function (nodes) {
        var def = $.Deferred();
        var geocodedNodes = [];
        var promises = [];

        for (var i = 0; i < nodes.length; i++) {
            geocodedNodes[i] = new GoogleGeocodedInfoNode(nodes[i]);
            promises.push(geocodedNodes[i].GeocodeAddress());
        }
        $.when.apply($, promises).done(function (n) {
            def.resolve(geocodedNodes);
        });
        return def.promise();
    };
    return GMapGeocoder;
})();
//# sourceMappingURL=gmapgeocoder.js.map
