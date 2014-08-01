/// <reference path="../../js/d3.d.ts" />
/// <reference path="../infrastructure.ts" />

class D3TextPageDisplay implements InfoNodePageDisplay {
    svg: D3.Selection;

    private getSVG(): D3.Selection {
        var width, height: number;

        if (this.svg != undefined)
            return this.svg;

        width = 320; height = 240;
        this.svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        return this.svg;
    }

    DrawPage(names: InfoNode[]) {
        var svg = this.getSVG();
        var width = +svg.attr('width');
        var height = +svg.attr('height');

        svg.selectAll('text').
            data(names).
            enter().
            append('text').
            attr('x', function (n) { return Math.round(Math.random() * (width - 1)) }).
            attr('y', function (n) { return Math.round(Math.random() * (height - 1)) }).
            text(function (d: InfoNode) { return d.Name; });
    }

    RefreshPage(names: InfoNode[]) {
        var svg = this.getSVG();
        var width = +svg.attr('width');
        var height = +svg.attr('height');

        svg.selectAll('text').
            data(names).
            attr('x', function (n) { return Math.round(Math.random() * (width - 1)) }).
            attr('y', function (n) { return Math.round(Math.random() * (height - 1)) }).
            text(function (d: InfoNode) { return d.Name; });
    }
}
