/**

d3line.js

Computer Science 50
D3line

JavaScript D3 for showing a linechart

Sanne Strikkers
11170816

*/

var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var formatDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(20);

var line = d3.svg.line()
    .x(function (d) {
        return x(d.date);
    })
    .y(function (d) {
        return y(d.avgTemp);
    });

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var bisectDate = d3.bisector(function (d) {
    return d.date;
}).left;

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "graph")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("d3lineSchiphol.json", function (error, data) {
    if (error) throw error;

    data.forEach(function (d) {
        d.date = formatDate(d.date);
        d.avgTemp = +d.avgTemp;
    });

    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    y.domain(d3.extent(data, function (d) {
        return d.avgTemp;
    }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temperature (in 0.1 degrees)");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    // add cross hairs and floating value on axis
    var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    // horizontal crosshair	
    focus.append("line")
        .attr({
            "x1": -width,
            "y1": 0,
            "x2": width,
            "y2": 0
        });


    // vertical crosshair
    focus.append("line")
        .attr({
            "x1": 0,
            "y1": -height,
            "x2": 0,
            "y2": height
        });


    svg.append("rect")
        .attr({
            "class": "overlay",
            "width": width,
            "height": height
        })
        .on({
            "mouseover": function (d) {
                focus.style("display", null);
            },
            "mouseout": function (d) {
                focus.style("display", "none");
            },
            "mousemove": mousemove
        });

    function mousemove() {
        var dateOutput = d3.time.format("%Y-%m-%d");
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + x(d.date) + "," + y(d.avgTemp) + ")");
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div.html("Avg. Temp.: " + d.avgTemp + "</br>Date: " + dateOutput(d.date))
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    }
});