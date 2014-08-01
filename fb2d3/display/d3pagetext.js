/// <reference path="../../js/d3.d.ts" />
/// <reference path="../infrastructure.ts" />
var D3TextPageDisplay = (function () {
    function D3TextPageDisplay() {
    }
    D3TextPageDisplay.prototype.getSVG = function () {
        var width, height;

        if (this.svg != undefined)
            return this.svg;

        width = 320;
        height = 240;
        this.svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
        return this.svg;
    };

    D3TextPageDisplay.prototype.DrawPage = function (names) {
        var svg = this.getSVG();
        var width = +svg.attr('width');
        var height = +svg.attr('height');

        svg.selectAll('text').data(names).enter().append('text').attr('x', function (n) {
            return Math.round(Math.random() * (width - 1));
        }).attr('y', function (n) {
            return Math.round(Math.random() * (height - 1));
        }).text(function (d) {
            return d.Name;
        });
    };

    D3TextPageDisplay.prototype.RefreshPage = function (names) {
        var svg = this.getSVG();
        var width = +svg.attr('width');
        var height = +svg.attr('height');

        svg.selectAll('text').data(names).attr('x', function (n) {
            return Math.round(Math.random() * (width - 1));
        }).attr('y', function (n) {
            return Math.round(Math.random() * (height - 1));
        }).text(function (d) {
            return d.Name;
        });
    };
    return D3TextPageDisplay;
})();
//# sourceMappingURL=d3pagetext.js.map
