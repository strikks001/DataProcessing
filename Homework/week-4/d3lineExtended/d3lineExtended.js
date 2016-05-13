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
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// convert to JavaScript Date object
var formatDate = d3.time.format("%Y-%m-%d").parse;


var color_hash = {
    0: ["Average Temperature", "#1f77b4"],
    1: ["Maximum Temperature", "#2ca02c"],
    2: ["Minimum Temperature", "#ff7f0e"]

};

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
    .orient("left")
    .ticks(20);

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

// the line with data for x-axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

// the line with data for y-axis
svg.append("g")
    .attr("class", "y axis")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Temperature (in 0.1 Celcius)");

var legend = svg.append("g")
    .attr("class", "legend")
    .attr("x", width - (margin.right + 100) - 65)
    .attr("y", 25)
    .attr("height", 100)
    .attr("width", 100);

var city = "Schiphol"
var year = "1995"

update(year);

d3.selectAll(".menu")
    .on("click", function () {
        var date = d3.select(this).attr("id");
        year = date;
        d3.select(".year-title")
            .text("Year: " + year);
        update();
    });

d3.selectAll("select")
    .on("change", function () {
        var cit = d3.select(this).property('value');
        city = cit;
        d3.select(".city-title")
            .text("Temperature in " + city);
        update();
    });

// draw and redraw, calculate axes/domains, etc here
function update() {
    // recieve data
    d3.json("data/d3line" + city + year + ".json", function (error, data) {
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

        legend.selectAll("g").data(temperatures)
            .enter()
            .append('g')
            .each(function (d, i) {
                var g = d3.select(this);
                g.append("rect")
                    .attr("x", width - margin.right - 120)
                    .attr("y", i * 25 + 10)
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", color_hash[String(i)][1]);

                g.append("text")
                    .attr("x", width - margin.right - 105)
                    .attr("y", i * 25 + 20)
                    .attr("height", 30)
                    .attr("width", 100)
                    .style("fill", color_hash[String(i)][1])
                    .text(color_hash[String(i)][0]);
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


        // update axes
        d3.transition(svg).select('.y.axis')
            .call(yAxis);

        d3.transition(svg).select('.x.axis')
            .call(xAxis);


        var temperature = svg.selectAll(".temperature")
            .data(temperatures);

        var temperatureEnter = temperature.enter().append("g")
            .attr("class", "temperature");

        temperatureEnter.append("path")
            .attr("class", "line")
            .attr("d", function (d) {
                return line(d.values);
            })
            .style("stroke", function (d) {
                return color(d.name);
            });

        // transition by selecting 'city'...
        temperatureUpdate = d3.transition(temperature);

        // ... and each path within
        temperatureUpdate.select('path')
            .transition().duration(600)
            .attr("d", function (d) {
                return line(d.values);
            });

        temperature.exit().remove();


    });
}