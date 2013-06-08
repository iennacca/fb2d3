/**
 * Created with JetBrains WebStorm.
 * User: Jerry
 * Date: 4/10/13
 * Time: 7:56 PM
 * To change this template use File | Settings | File Templates.
 */
/// <reference path="../../js/d3.d.ts" />
/// <reference path="../infrastructure.ts" />
/// <reference path="../../js/topojson.d.ts" />


class D3WorldMapPageDisplay implements InfoNodePageDisplay {
    static mapDataFile = "fb2d3/map/world-110m2.json";
    svg: ID3Selection;
    prj: ID3Projection;

    private getSVG(): ID3Selection {
        var width, height: number;

        if (this.svg != undefined)
            return this.svg;

        width = 800; height = 480;
        this.svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        return this.svg;
    }

    private getProjection() : ID3Projection {
        if (this.prj != undefined)
            return this.prj;

        this.prj = d3.geo.mercator()
            .center([0, 5])
            .scale(200)
            .rotate([-180,0]);

        return this.prj;
    }

    DrawPage(nodes: MappedInfoNode[]) {
        var svg = this.getSVG();
        var projection = this.getProjection();

        var path = d3.geo.path()
            .projection(projection);

        var g = svg.append("g");

        // load the world
        d3.json(D3WorldMapPageDisplay.mapDataFile, function(error, topology) {

            // display the world
            g.selectAll("path")
                .data(topojson.object(topology, topology.objects.countries).geometries)
                .enter()
                .append("path")
                .attr("d", path);

            // display the nodes
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

        // zoom and pan the map
        var zoom = d3.behavior.zoom()
            .on("zoom",function() {
                g.attr("transform","translate("+
                    d3.event.translate.join(",")+")scale("+d3.event.scale+")");
                g.selectAll("path")
                    .attr("d", path.projection(projection));
                g.selectAll("circle")
                    .attr("d", path.projection(projection));
            });

        svg.call(zoom)
    }

    RefreshPage(nodes: InfoNode[]) {
        var svg = this.getSVG();
        var projection = this.getProjection();

        var g = svg.selectAll("g");

        // display the nodes
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
