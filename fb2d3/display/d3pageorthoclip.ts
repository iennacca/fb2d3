/**
 * Created with JetBrains WebStorm.
 * User: Jerry
 * Date: 5/27/13
 * Time: 2:27 PM
 * To change this template use File | Settings | File Templates.
 */

/// <reference path="../../js/d3.d.ts" />
/// <reference path="../infrastructure.ts" />
/// <reference path="../../js/topojson.d.ts" />

class D3OrthoClipPageDisplay implements InfoNodePageDisplay {
    static mapDataFile = "fb2d3/map/world-110m2.json";
    svg: ID3Selection;
    prj: ID3Projection;
    width: number;
    height: number;

    constructor() {
        this.width = 800; this.height = 480;
    }

    private getSVG(): ID3Selection {
        if (this.svg != undefined)
            return this.svg;

        this.svg = d3.select("body").append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
        return this.svg;
    }

    private getProjection() : ID3Projection {
        if (this.prj != undefined)
            return this.prj;

        this.prj = d3.geo.orthographic()
            .scale(250)
            .translate([this.width / 2, this.height / 2])
            .clipAngle(90);

        return this.prj;
    }

    DrawPage(nodes: MappedInfoNode[]) {
        var svg = this.getSVG();
        var projection = this.getProjection();
        var path = d3.geo.path()
            .projection(projection);
        var g = svg.append("g");
        var lambda = d3.scale.linear()
            .domain([0, this.width])
            .range([-180, 180]);
        var theta = d3.scale.linear()
            .domain([0, this.height])
            .range([90, -90]);

        // load the world
        d3.json(D3OrthoClipPageDisplay.mapDataFile, function(error, topology) {

            // display the world
            g.selectAll("path")
                .data(topojson.object(topology, topology.objects.countries).geometries)
                .enter()
                .append("path")
                .attr("d", path);

            // display the cities
            g.selectAll("path")
                .data(nodes, function(node:MappedInfoNode){ return node.Name; })
                .enter()
                .append("path")
                .datum(function(d: MappedInfoNode) {
                    return {
                        type: "Point", coordinates: [d.Longitude, d.Latitude]
                    };
                })
                .attr("d", path.pointRadius(5))
                .attr("r", 5)
                .style("fill", "red")
                .append("title").text(function(d:MappedInfoNode) { return d.Name; });
        });

        // rotate the map
        var rotation: bool;

        svg.on("mousedown", function() { rotation = true; });
        svg.on("mousemove", function() {
            if (!rotation) return;
            var p = d3.mouse(this);
            projection.rotate([lambda(p[0]), theta(p[1])]);
            g.selectAll("circle")
                .attr("cx", function(d:MappedInfoNode) {
                    return projection([d.Longitude, d.Latitude])[0];
                })
                .attr("cy", function(d:MappedInfoNode) {
                    return projection([d.Longitude, d.Latitude])[1];
                });
            svg.selectAll("path").attr("d", path);
        });
        svg.on("mouseup", function() { rotation = false; });
    }

    RefreshPage(nodes: InfoNode[]) {
        var svg = this.getSVG();
        var projection = this.getProjection();
        var path = d3.geo.path()
            .projection(projection);

        var g = svg.selectAll("g");

        // display the cities
        g.selectAll("path")
            .data(nodes, function(node:MappedInfoNode){ return node.Name; })
            .enter()
            .append("path")
            .datum(function(d: MappedInfoNode) {
                return {
                    type: "Point", coordinates: [d.Longitude, d.Latitude]
                };
            })
            .attr("d", path.pointRadius(5))
            .attr("r", 5)
            .style("fill", "red")
            .append("title").text(function(d:MappedInfoNode) { return d.Name; });
    }
}
