/**
 * Created with JetBrains WebStorm.
 * User: Jerry
 * Date: 5/2/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */
/// <reference path="../infrastructure.ts" />


class GoogleGeocodedInfoNode implements MappedInfoNode {
    constructor(sourceNode: InfoNode) {
        this.Name = sourceNode.Name;
        this.Id = sourceNode.Id;
        this.TextLocation = sourceNode.TextLocation;
        this.Latitude = 0;
        this.Longitude = 0;
    }

    Name: string;
    Id: number;
    TextLocation: string;
    Latitude: number;
    Longitude: number;

    public GeocodeAddress(): JQueryPromise {
        var geocoder = new google.maps.Geocoder();
        var address = this.TextLocation;
        var def = $.Deferred();
        var self = this;

        geocoder.geocode( { 'address': address}, function(results, status) {
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
    }
}

class GMapGeocoder implements InfoNodeTransformer {
    Transform(nodes: InfoNode[]): InfoNode[] {
        var geocodedNodes: MappedInfoNode[] = [];

        for (var i = 0; i < nodes.length; i++) {
            geocodedNodes[i] = new GoogleGeocodedInfoNode(nodes[i]);
        }
        return geocodedNodes;
    }

    TransformAsync(nodes: InfoNode[]): JQueryPromise {
        var def: JQueryDeferred = $.Deferred();
        var geocodedNodes: GoogleGeocodedInfoNode[] = [];
        var promises = [];

        for (var i = 0; i < nodes.length; i++) {
            geocodedNodes[i] = new GoogleGeocodedInfoNode(nodes[i]);
            promises.push(geocodedNodes[i].GeocodeAddress());
        }
        $.when.apply($, promises).done(function(n) {def.resolve(geocodedNodes);} );
        return def.promise();
    }
}