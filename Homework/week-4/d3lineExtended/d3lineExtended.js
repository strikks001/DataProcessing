/**

d3line.js

Computer Science 50
D3line

JavaScript D3 for showing a linechart

Sanne Strikkers
11170816

*/

// sizing the graph
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// convert to JavaScript Date object
var formatDate = d3.time.format("%Y-%m-%d").parse;

// x-axis
var x = d3.time.scale()
    .range([0, width]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// y-axis
var y = d3.scale.linear()
    .range([height, 0]);
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// set up the colors for several lines
var color = d3.scale.category10();

// different lines for the chart
var line = d3.svg.line()
    .interpolate("basis")
    .x(function (d) {
        return x(d.date);
    })
    .y(function (d) {
        return y(d.temperature);
    });

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "graph")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// recieve data
d3.json("data/d3lineBilt1995.json", function (error, data) {
    if (error) {
        console.log("We cannot retrieve the data.");
        alert("We cannot retrieve the data.");
        throw error;
    };

    // filter out the city and date, the won't be seen in the chart
    color.domain(d3.keys(data[0]).filter(function (key) {
        return key !== "date" && key !== "city";
    }));

    // getting each data and format
    data.forEach(function (d) {
        d.date = formatDate(d.date);
    });

    // setting up the different lines with different temperature values
    var temperatures = color.domain().map(function (name) {
        return {
            name: name,
            values: data.map(function (d) {
                return {
                    date: d.date,
                    temperature: +d[name]
                };
            })
        };
    });

    // x domain
    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));

    // y domain with minimal and maximal temperature values
    y.domain([
    d3.min(temperatures, function (c) {
            return d3.min(c.values, function (v) {
                return v.temperature;
            });
        }),
    d3.max(temperatures, function (c) {
            return d3.max(c.values, function (v) {
                return v.temperature;
            });
        })
  ]);

    // the line with data for x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // the line with data for y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temperature (in 0.1 Celcius)");

    // adding the different lines
    var temperature = svg.selectAll(".temperature")
        .data(temperatures)
        .enter().append("g")
        .attr("class", "temperature");

    temperature.append("path")
        .attr("class", "line")
        .attr("d", function (d) {
            return line(d.values);
        })
        .style("stroke", function (d) {
            return color(d.name);
        });

});