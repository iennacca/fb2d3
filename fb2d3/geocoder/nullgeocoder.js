/**
* Created with JetBrains WebStorm.
* User: Jerry
* Date: 4/19/13
* Time: 4:54 PM
* To change this template use File | Settings | File Templates.
*/
/// <reference path="../infrastructure.ts" />
var NullInfoNode = (function () {
    function NullInfoNode(sourceNode) {
        this.Name = sourceNode.Name;
        this.id = sourceNode.id;
        this.TextLocation = sourceNode.TextLocation;
        this.Latitude = 0;
        this.Longitude = 0;
    }
    NullInfoNode.prototype.GeocodeAddress = function () {
        var def = $.Deferred();
        var self = this;

        setTimeout(function () {
            console.log(self.TextLocation);
            self.Latitude = 0.2;
            self.Longitude = 0.4;
            def.resolve(self);
        }, 5000);
        return def.promise();
    };
    return NullInfoNode;
})();

var NullGeocoder = (function () {
    function NullGeocoder() {
    }
    NullGeocoder.prototype.Transform = function (nodes) {
        var geocodedNodes = [];

        for (var i = 0; i < nodes.length; i++) {
            geocodedNodes[i] = new NullInfoNode(nodes[i]);
        }
        return geocodedNodes;
    };

    NullGeocoder.prototype.TransformAsync = function (nodes) {
        var def = $.Deferred();
        var geocodedNodes = [];
        var promises = [];

        for (var i = 0; i < nodes.length; i++) {
            geocodedNodes[i] = new NullInfoNode(nodes[i]);
            promises.push(geocodedNodes[i].GeocodeAddress());
        }
        $.when.apply($, promises).done(function (m) {
            def.resolve(m);
        });
        return def.promise();
    };
    return NullGeocoder;
})();
//# sourceMappingURL=nullgeocoder.js.map
