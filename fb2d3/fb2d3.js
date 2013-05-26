var dataSource = new FBFilteredSource();
var geocoder = new GMapGeocoder();
var pageDisplay = new D3OrthogonalPageDisplay();
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
function FirstPageAsync() {
    var gettingData = dataSource.GetFirstInfoNodePageAsync();
    gettingData.then(function (n) {
        return geocoder.TransformAsync(n);
    }).done(function (n) {
        pageDisplay.DrawPage(n);
    });
}
function NextPageAsync() {
    var gettingData = dataSource.GetNextInfoNodePageAsync();
    gettingData.then(function (n) {
        return geocoder.TransformAsync(n);
    }).done(function (n) {
        pageDisplay.RefreshPage(n);
    });
}
//@ sourceMappingURL=fb2d3.js.map
