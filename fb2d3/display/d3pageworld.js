var D3WorldMapPageDisplay = (function () {
    function D3WorldMapPageDisplay() { }
    D3WorldMapPageDisplay.mapDataFile = "fb2d3/map/world-110m2.json";
    D3WorldMapPageDisplay.locationsFile = "fb2d3/map/cities.csv";
    D3WorldMapPageDisplay.prototype.getSVG = function () {
        var width, height;
        if(this.svg != undefined) {
            return this.svg;
        }
        width = 640;
        height = 480;
        this.svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
        return this.svg;
    };
    D3WorldMapPageDisplay.prototype.getProjection = function () {
        if(this.prj != undefined) {
            return this.prj;
        }
        this.prj = d3.geo.mercator().center([
            0, 
            5
        ]).scale(200).rotate([
            -180, 
            0
        ]);
        return this.prj;
    };
    D3WorldMapPageDisplay.prototype.DrawPage = function (nodes) {
        var svg = this.getSVG();
        var projection = this.getProjection();
        var path = d3.geo.path().projection(projection);
        var g = svg.append("g");
        d3.json(D3WorldMapPageDisplay.mapDataFile, function (error, topology) {
            g.selectAll("path").data(topojson.object(topology, topology.objects.countries).geometries).enter().append("path").attr("d", path);
            g.selectAll("circle").data(nodes, function (node) {
                return node.Name;
            }).enter().append("circle").attr("cx", function (d) {
                return projection([
                    d.Longitude, 
                    d.Latitude
                ])[0];
            }).attr("cy", function (d) {
                return projection([
                    d.Longitude, 
                    d.Latitude
                ])[1];
            }).attr("r", 5).style("fill", "red").append("title").text(function (d) {
                return d.Name;
            });
        });
        var zoom = d3.behavior.zoom().on("zoom", function () {
            g.attr("transform", "translate(" + d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
            g.selectAll("path").attr("d", path.projection(projection));
            g.selectAll("circle").attr("d", path.projection(projection));
        });
        svg.call(zoom);
    };
    D3WorldMapPageDisplay.prototype.RefreshPage = function (nodes) {
        var svg = this.getSVG();
        var projection = this.getProjection();
        var g = svg.selectAll("g");
        g.selectAll("circle").data(nodes, function (node) {
            return node.Name;
        }).enter().append("circle").attr("cx", function (d) {
            return projection([
                d.Longitude, 
                d.Latitude
            ])[0];
        }).attr("cy", function (d) {
            return projection([
                d.Longitude, 
                d.Latitude
            ])[1];
        }).attr("r", 5).style("fill", "red").append("title").text(function (d) {
            return d.Name;
        });
    };
    D3WorldMapPageDisplay.prototype.drawTestPage = function (names) {
        var svg = this.getSVG();
        var projection = this.getProjection();
        var path = d3.geo.path().projection(projection);
        var g = svg.append("g");
        d3.json(D3WorldMapPageDisplay.mapDataFile, function (error, topology) {
            d3.csv(D3WorldMapPageDisplay.locationsFile, function (error, data) {
                g.selectAll("circle").data(data).enter().append("circle").attr("cx", function (d) {
                    return projection([
                        d.lon, 
                        d.lat
                    ])[0];
                }).attr("cy", function (d) {
                    return projection([
                        d.lon, 
                        d.lat
                    ])[1];
                }).attr("r", 5).style("fill", "red");
            });
            g.selectAll("path").data(topojson.object(topology, topology.objects.countries).geometries).enter().append("path").attr("d", path);
        });
        var zoom = d3.behavior.zoom().on("zoom", function () {
            g.attr("transform", "translate(" + d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
            g.selectAll("path").attr("d", path.projection(projection));
        });
        svg.call(zoom);
    };
    return D3WorldMapPageDisplay;
})();
//@ sourceMappingURL=d3pageworld.js.map
