var D3NodeDisplay = (function () {
    function D3NodeDisplay() { }
    D3NodeDisplay.prototype.getSVG = function () {
        var width, height;
        if(this.svg != undefined) {
            return this.svg;
        }
        width = 320;
        height = 240;
        this.svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
        return this.svg;
    };
    D3NodeDisplay.prototype.getForceLayout = function () {
        if(this.frc != undefined) {
            return this.frc;
        }
        this.frc = d3.layout.force().charge(-120).linkDistance(30);
        return this.frc;
    };
    D3NodeDisplay.prototype.BySVGTextNode = function (names) {
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
    D3NodeDisplay.prototype.BySVGForceLayout = function (names) {
        var svg = this.getSVG();
        var force = this.getForceLayout();
        force.size([
            +this.svg.attr('width'), 
            +this.svg.attr('height')
        ]);
        var node = svg.selectAll(".node").data(names).enter().append("circle").attr("class", "node").attr("r", function (d) {
            return d.Id / 100000;
        }).style("fill", function (d) {
            return d.Id;
        }).call(force.drag);
        force.nodes(names).start();
        node.append("title").text(function (d) {
            return d.Name;
        });
        force.on("tick", function () {
            node.attr("cx", function (d) {
                return d.x;
            }).attr("cy", function (d) {
                return d.y;
            });
        });
        console.log('Force-directed graph end');
    };
    D3NodeDisplay.prototype.ByText = function (names) {
        d3.select('ul').selectAll('li').data(names).enter().append('li').text(function (d) {
            return d;
        });
    };
    return D3NodeDisplay;
})();
//@ sourceMappingURL=d3api.js.map
