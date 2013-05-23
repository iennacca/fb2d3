/// <reference path="infrastructure.ts" />
/// <reference path="data/fbapi.ts" />
/// <reference path="display/d3api.ts" />
/// <reference path="display/d3pageforce.ts" />
/// <reference path="geocoder/gmapgeocoder.ts" />

// All nodes test ----------------
var dataSource: InfoNodeSource = new FBFilteredSource();
var geocoder: InfoNodeTransformer = new GMapGeocoder();
var pageDisplay: InfoNodePageDisplay = new D3WorldMapPageDisplay();

function FullTest() {
    dataSource.GetInfoNodes(function (names) {
        pageDisplay.DrawPage(names);
    });
}

// Node paging test -------------------

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
    var gettingData:JQueryPromise = dataSource.GetFirstInfoNodePageAsync();

    gettingData.
        then(function(n) { return geocoder.TransformAsync(n); }).
        done(function(n) { pageDisplay.DrawPage(n); });
}

function NextPageAsync() {
    var gettingData:JQueryPromise = dataSource.GetNextInfoNodePageAsync();

    gettingData.
        then(function(n) { return geocoder.TransformAsync(n); }).
        done(function(n) { pageDisplay.RefreshPage(n); });
}