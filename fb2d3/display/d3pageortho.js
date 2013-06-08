var D3OrthogonalPageDisplay = (function () {
    function D3OrthogonalPageDisplay() {
        this.width = 800;
        this.height = 480;
    }
    D3OrthogonalPageDisplay.mapDataFile = "fb2d3/map/world-110m2.json";
    D3OrthogonalPageDisplay.prototype.getSVG = function () {
        if(this.svg != undefined) {
            return this.svg;
        }
        this.svg = d3.select("body").append("svg").attr("width", this.width).attr("height", this.height);
        return this.svg;
    };
    D3OrthogonalPageDisplay.prototype.getProjection = function () {
        if(this.prj != undefined) {
            return this.prj;
        }
        this.prj = d3.geo.orthographic().scale(250).translate([
            this.width / 2, 
            this.height / 2
        ]).clipAngle(90);
        return this.prj;
    };
    D3OrthogonalPageDisplay.prototype.DrawPage = function (nodes) {
        var svg = this.getSVG();
        var projection = this.getProjection();
        var path = d3.geo.path().projection(projection);
        var g = svg.append("g");
        var lambda = d3.scale.linear().domain([
            0, 
            this.width
        ]).range([
            -180, 
            180
        ]);
        var theta = d3.scale.linear().domain([
            0, 
            this.height
        ]).range([
            90, 
            -90
        ]);
        d3.json(D3OrthogonalPageDisplay.mapDataFile, function (error, topology) {
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
        var rotation;
        svg.on("mousedown", function () {
            rotation = true;
        });
        svg.on("mousemove", function () {
            if(!rotation) {
                return;
            }
            var p = d3.mouse(this);
            projection.rotate([
                lambda(p[0]), 
                theta(p[1])
            ]);
            g.selectAll("circle").attr("cx", function (d) {
                return projection([
                    d.Longitude, 
                    d.Latitude
                ])[0];
            }).attr("cy", function (d) {
                return projection([
                    d.Longitude, 
                    d.Latitude
                ])[1];
            });
            svg.selectAll("path").attr("d", path);
        });
        svg.on("mouseup", function () {
            rotation = false;
        });
    };
    D3OrthogonalPageDisplay.prototype.RefreshPage = function (nodes) {
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
    return D3OrthogonalPageDisplay;
})();
//@ sourceMappingURL=d3pageortho.js.map
