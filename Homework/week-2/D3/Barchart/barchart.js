/**

barchart.js

Computer Science 50
Barchart

JavaScript D3 for showing a barchart

Sanne Strikkers
11170816

*/

var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("weather_schiphol.tsv", type, function (error, data) {
    if (error) throw error;

    x.domain(data.map(function (d) {
        var year = d.date.substring(0, 4);
        year += "/"
        var month = d.date.substring(4, 6);
        month += "/"
        var day = d.date.substring(6, 8);
        d.date = year + month + day;
        d.date = new Date(d.date);
        console.log(d.date);
        return d.date;
    }));

    y.domain([0, d3.max(data, function (d) {
        return d.temp;
    })]);

    // x-axis
//    svg.append("g")
//        .attr("class", "x axis")
//        .attr("transform", "translate(0," + height + ")")
//        .call(xAxis);

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temperature");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.date);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return y(d.temp);
        })
        .attr("height", function (d) {
            return height - y(d.temp);
        });
});

function type(d) {
    d.temp = +d.temp;
    return d;
}