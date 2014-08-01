/// <reference path="../infrastructure.ts" />

class OfflineDataSource implements InfoNodeSource {
    GetFirstInfoNodePage(reply?: (nodes: InfoNode[]) => void) {

    }

    GetNextInfoNodePage(reply?: (nodes: InfoNode[]) => void) {

    }

    GetInfoNodes(reply?: (nodes: InfoNode[]) => void ) {
        var numNodes = 10;
        var nodeArray = [];

        for (var i = 0; i < numNodes; i++) {
            nodeArray[i] = new GenericInfoNode();
            nodeArray[i].Name = "Name" + i;
            nodeArray[i].Id = i * 10000;
        }
        reply(nodeArray);
    }

    GetFirstInfoNodePageAsync(): JQueryPromise<InfoNode[]> {
        var numNodes = 10;
        var nodeArray = [];
        var def = $.Deferred();

        for (var i = 0; i < numNodes; i++) {
            nodeArray[0] = new GenericInfoNode();
            nodeArray[0].Name = "Name" + i;
            nodeArray[0].Id = i * 10000;
            def.resolve(nodeArray);
        }
        return def.promise();
    }

    GetNextInfoNodePageAsync(): JQueryPromise<InfoNode[]> {
        var numNodes = 10;
        var nodeArray = [];
        var def = $.Deferred();

        for (var i = 0; i < numNodes; i++) {
            nodeArray[0] = new GenericInfoNode();
            nodeArray[0].Name = "Name" + i;
            nodeArray[0].Id = i * 10000;
            def.resolve(nodeArray);
        }
        return def.promise();
    }
}