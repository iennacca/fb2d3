/**
 * Created with JetBrains WebStorm.
 * User: Jerry
 * Date: 4/19/13
 * Time: 4:54 PM
 * To change this template use File | Settings | File Templates.
 */
/// <reference path="../infrastructure.ts" />

class NullInfoNode implements MappedInfoNode {
    constructor(sourceNode: InfoNode) {
        this.Name = sourceNode.Name;
        this.id = sourceNode.id;
        this.TextLocation = sourceNode.TextLocation;
        this.Latitude = 0;
        this.Longitude = 0;
    }

    Name: string;
    id: number;
    TextLocation: string;
    Latitude: number;
    Longitude: number;

    public GeocodeAddress(): JQueryPromise<InfoNode> {
        var def = $.Deferred();
        var self = this;

        setTimeout(function() {
            console.log(self.TextLocation);
            self.Latitude = 0.2;
            self.Longitude = 0.4;
            def.resolve(self);
        }, 5000);
        return def.promise();
    }
}

class NullGeocoder implements InfoNodeTransformer {
    Transform(nodes: InfoNode[]): InfoNode[] {
        var geocodedNodes: MappedInfoNode[] = [];

        for (var i = 0; i < nodes.length; i++) {
            geocodedNodes[i] = new NullInfoNode(nodes[i]);
        }
        return geocodedNodes;
    }

    TransformAsync(nodes: InfoNode[]): JQueryPromise<InfoNode[]> {
        var def: JQueryDeferred<InfoNode[]> = $.Deferred();
        var geocodedNodes: NullInfoNode[] = [];
        var promises = [];

        for (var i = 0; i < nodes.length; i++) {
            geocodedNodes[i] = new NullInfoNode(nodes[i]);
            promises.push(geocodedNodes[i].GeocodeAddress());
        }
        $.when.apply($, promises).done(function(m) { def.resolve(m); });
        return def.promise();
    }
}