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
        bottom: 70,
        left: 40
    },
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y-%m-%d"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(15);

var svg = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.tsv("weather_schiphol.tsv", function (error, data) {
    if (error) throw error;

    data.forEach(function (d) {
        var year = d.date.substring(0, 4);
        year += "-"
        var month = d.date.substring(4, 6);
        month += "-"
        var day = d.date.substring(6, 8);
        d.date = year + month + day;
        d.date = parseDate(d.date);
        d.temp = +d.temp;
    });


    var min = d3.min(data.map(function (d) {
        return d.date;
    }));
    var max = d3.max(data.map(function (d) {
        return d.date;
    }));
    
    x.domain([min, max]);
    
    y.domain([-40, d3.max(data, function (d) {
        return d.temp;
    })]);
    
    var fakeXScale = d3.scale.ordinal()
    .domain(data.map(function (d) {
        return d.date;
    }))
    .rangeBands([0, width], 0.4, 0);
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temperature");

    // bar
    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.date);
        })
        .attr("width", function() {
         return fakeXScale.rangeBand();
      })
        .attr("y", function (d) {
            return y(d.temp);
        })
        .attr("height", function (d) {
            return height - y(d.temp);
        })
        .on("mouseover", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("Temperature: <strong>" + d.temp + "</strong><br>Date: <strong>" + d.date.toDateString() + "</strong>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 30) + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })

});
