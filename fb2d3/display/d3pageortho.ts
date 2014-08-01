/**
 * Created with JetBrains WebStorm.
 * User: Jerry
 * Date: 5/24/13
 * Time: 6:52 AM
 * To change this template use File | Settings | File Templates.
 */
/// <reference path="../../js/d3.d.ts" />
/// <reference path="../infrastructure.ts" />
/// <reference path="../../js/topojson.d.ts" />

class D3OrthogonalPageDisplay implements InfoNodePageDisplay {
    static mapDataFile = "fb2d3/map/world-110m2.json";
    svg: D3.Selection;
    prj: D3.Geo.Projection;
    width: number;
    height: number;

    constructor() {
        this.width = 800; this.height = 480;
    }

    private getSVG(): D3.Selection {
        if (this.svg != undefined)
            return this.svg;

        this.svg = d3.select("body").append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
        return this.svg;
    }

    private getProjection() : D3.Geo.Projection {
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
        d3.json(D3OrthogonalPageDisplay.mapDataFile, function(error, topology) {

            // display the world
            g.selectAll("path")
                .data(topojson.object(topology, topology.objects.countries).geometries)
                .enter()
                .append("path")
                .attr("d", path);

            // display the cities
            g.selectAll("circle")
                .data(nodes, function(node:MappedInfoNode){ return node.Name; })
                .enter()
                .append("circle")
                .attr("cx", function(d:MappedInfoNode) {
                    return projection([d.Longitude, d.Latitude])[0];
                })
                .attr("cy", function(d:MappedInfoNode) {
                    return projection([d.Longitude, d.Latitude])[1];
                })
                .attr("r", 5)
                .style("fill", "red")
                .append("title").text(function(d:MappedInfoNode) { return d.Name; });
        });

        // rotate the map
        var rotation: boolean;

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

        var g = svg.selectAll("g");

        // display the cities
        g.selectAll("circle")
            .data(nodes, function(node:MappedInfoNode){ return node.Name; })
            .enter()
            .append("circle")
            .attr("cx", function(d:MappedInfoNode) {
                return projection([d.Longitude, d.Latitude])[0];
            })
            .attr("cy", function(d:MappedInfoNode) {
                return projection([d.Longitude, d.Latitude])[1];
            })
            .attr("r", 5)
            .style("fill", "red")
            .append("title").text(function(d:MappedInfoNode) { return d.Name; });

    }
}
