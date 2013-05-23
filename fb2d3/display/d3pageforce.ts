/// <reference path="../../js/d3.d.ts" />
/// <reference path="../infrastructure.ts" />


class D3ForcePageDisplay implements InfoNodePageDisplay {
    svg: ID3Selection;
    frc: ID3ForceLayout;

    private getSVG(): ID3Selection {
        var width, height: number;

        if (this.svg != undefined)
            return this.svg;

        width = 320; height = 240;
        this.svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        return this.svg;
    }

    private getForceLayout() : ID3ForceLayout {
        if (this.frc != undefined)
            return this.frc;

        this.frc = d3.layout.force()
            .charge(-120)
            .linkDistance(30);
        return this.frc;
    }

    DrawPage(names: InfoNode[]) {
        var svg = this.getSVG();
        var force = this.getForceLayout();

        force.size(
            [+this.svg.attr('width'), +this.svg.attr('height')]);

        var node = svg.selectAll(".node")
            .data(names)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", function (d) { return d.Id / 100000; })
            .style("fill", function (d) { return d.Id; })
            .call(force.drag);

        force.nodes(names).start();
        node.append("title")
            .text(function(d: InfoNode) { return d.Name + " [" + d.TextLocation + "]"; });
        force.on("tick", function() {
            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });

        console.log('Force-directed graph end');
    }

    RefreshPage(names: InfoNode[]) {
        var svg = this.getSVG();
        var force = this.getForceLayout();

        var node = svg.selectAll(".node")
            .data(names)
            .attr("class", "node")
            .attr("r", function (d: InfoNode) { return d.Id / 100000; })
            .style("fill", function (d: InfoNode) { return d.Id; })
            .call(force.drag);

        force.nodes(names).start();
        node.selectAll("title").remove();
        node.append("title").text(function(d) { return d.name; });

        console.log('Force-directed graph end');
    }
}
