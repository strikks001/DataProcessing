/**

barchart.js

Computer Science 50
Barchart

JavaScript D3 for showing a barchart

Sanne Strikkers
11170816

*/

// marigin values for the chart
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

// x coordinates
var x = d3.time.scale()
    .range([0, width]);

// y coorditnates
var y = d3.scale.linear()
    .range([height, 0]);

// setting up the x axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y-%m-%d"));

// setting up the y axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(15);

// setting up the chart
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

// open the data from the local tsv file
d3.tsv("weather_schiphol.tsv", function (error, data) {
    if (error) throw error;

    // convert the date to specific format and get temperature
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

    // minimum temperature
    var min = d3.min(data.map(function (d) {
        return d.date;
    }));
    // maximum temperature
    var max = d3.max(data.map(function (d) {
        return d.date;
    }));

    // set the range for the x and y axis
    x.domain([min, max]);
    y.domain([-40, d3.max(data, function (d) {
        return d.temp;
    })]);

    // making the bars better by adding a space between them
    var fakeXScale = d3.scale.ordinal()
        .domain(data.map(function (d) {
            return d.date;
        }))
        .rangeBands([0, width], 0.4, 0);

    // add the x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)");

    // add the y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temperature");

    // add the bars and toolbars
    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.date);
        })
        .attr("width", function () {
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