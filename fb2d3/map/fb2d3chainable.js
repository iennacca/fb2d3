/**
* Created with JetBrains WebStorm.
* User: Jerry
* Date: 5/6/13
* Time: 9:28 PM
* To change this template use File | Settings | File Templates.
*/
/// <reference path="../infrastructure.ts" />
/// <reference path="../data/fbfilteredsource.ts" />
/// <reference path="../display/d3api.ts" />
/// <reference path="../display/d3pageorthoclip.ts" />
/// <reference path="../geocoder/gmapgeocoder.ts" />
// All nodes test ----------------
var dataSource = new FBFilteredSource();
var geocoder = new GMapGeocoder();
var pageDisplay = new D3OrthoClipPageDisplay();

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

var Chainable = function Chainable() {
    return {
        chain: function (next) {
            var newDef = $.Deferred();

            //next line: call next with a||null for method-tolerance
            this.done(function (a) {
                next(a || null).done(newDef.resolve);
            });
            return newDef.promise(Chainable());
        }
    };
};
//# sourceMappingURL=fb2d3chainable.js.map
