var dataSource = new FBFilteredSource();
var geocoder = new GMapGeocoder();
var pageDisplay = new D3WorldMapPageDisplay();
function FullTest() {
    dataSource.GetInfoNodes(function (names) {
        pageDisplay.DrawPage(names);
    });
}
function FirstPage() {
    dataSource.GetFirstInfoNodePage(function (names) {
        var newNames = geocoder.Transform(names);
        pageDisplay.DrawPage(newNames);
    });
}
function NextPage() {
    dataSource.GetNextInfoNodePage(function (names) {
        var newNames = geocoder.Transform(names);
        pageDisplay.RefreshPage(newNames);
    });
}
var Chainable = function Chainable() {
    return {
        chain: function (next) {
            var newDef = $.Deferred();
            this.done(function (a) {
                next(a || null).done(newDef.resolve);
            });
            return newDef.promise(Chainable());
        }
    };
};
//@ sourceMappingURL=fb2d3chainable.js.map
