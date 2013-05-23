var OfflineDataSource = (function () {
    function OfflineDataSource() { }
    OfflineDataSource.prototype.GetInfoNodes = function (reply) {
        var numNodes = 10;
        var nodeArray = [];
        for(var i = 0; i < numNodes; i++) {
            nodeArray[i] = new GenericInfoNode();
            nodeArray[i].Name = "Name" + i;
            nodeArray[i].Id = i * 10000;
        }
        reply(nodeArray);
    };
    OfflineDataSource.prototype.GetFirstInfoNodePageAsync = function () {
        var numNodes = 10;
        var nodeArray = [];
        var def = $.Deferred();
        for(var i = 0; i < numNodes; i++) {
            nodeArray[0] = new GenericInfoNode();
            nodeArray[0].Name = "Name" + i;
            nodeArray[0].Id = i * 10000;
            def.resolve(nodeArray);
        }
        return def.promise();
    };
    OfflineDataSource.prototype.GetNextInfoNodePageAsync = function () {
        var numNodes = 10;
        var nodeArray = [];
        var def = $.Deferred();
        for(var i = 0; i < numNodes; i++) {
            nodeArray[0] = new GenericInfoNode();
            nodeArray[0].Name = "Name" + i;
            nodeArray[0].Id = i * 10000;
            def.resolve(nodeArray);
        }
        return def.promise();
    };
    return OfflineDataSource;
})();
//@ sourceMappingURL=odapi.js.map
