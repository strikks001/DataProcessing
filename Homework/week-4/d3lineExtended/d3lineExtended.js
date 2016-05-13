/**

d3lineExtended.js

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

// first showing information
var city = "Schiphol"
var year = "1995"

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

// setting up the whole chart
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

// define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// define the crosshair for the graph
var bisectDate = d3.bisector(function (d) {
    return d.date;
}).left;

// set up the legend with the right colors.
var color_legend = {
    0: ["Average Temperature", "#1f77b4"],
    1: ["Maximum Temperature", "#2ca02c"],
    2: ["Minimum Temperature", "#ff7f0e"]
};
var legend = svg.append("g")
    .attr("class", "legend")
    .attr("x", width - (margin.right + 100) - 65)
    .attr("y", 25)
    .attr("height", 100)
    .attr("width", 100);

// when you first see the page
update(year);

// clicking on a year will update the chart 
d3.selectAll(".menu")
    .on("click", function () {
        var date = d3.select(this).attr("id");
        year = date;
        // change title
        d3.select(".year-title")
            .text("Year: " + year);
        // update chart
        update();
    });

// selecting a city will update the chart 
d3.selectAll("select")
    .on("change", function () {
        var cit = d3.select(this).property('value');
        // change title
        city = cit;
        d3.select(".city-title")
            .text("Temperature in " + city);
        // update chart
        update();
    });

// draw and redraw chart
function update() {
    // recieve data
    d3.json("data/d3line" + city + year + ".json", function (error, data) {
        if (error) {
            console.log("We cannot retrieve the data.");
            alert("We cannot retrieve the data.");
            throw error;
        };

        // filter out the city and date, this won't be seen in the chart
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

        // showing the legend at the right top of the chart
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
                    .style("fill", color_legend[String(i)][1]);

                g.append("text")
                    .attr("x", width - margin.right - 105)
                    .attr("y", i * 25 + 20)
                    .attr("height", 30)
                    .attr("width", 100)
                    .style("fill", color_legend[String(i)][1])
                    .text(color_legend[String(i)][0]);
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

        // creating all the lines
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

        // transition by selecting 'temperature'
        temperatureUpdate = d3.transition(temperature);

        // and each path within
        temperatureUpdate.select('path')
            .transition().duration(600)
            .attr("d", function (d) {
                return line(d.values);
            });

        temperature.exit().remove();

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

        // focus circle
        focus.append('circle')
            .attr('id', 'focusCircle')
            .attr('r', 5)
            .attr('class', 'circle focusCircle');

        // focus graph
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

        /*
        Showing the crosshair on mousemove and update data for the tooltip
        */
        function mousemove() {
            // format the date 
            var dateOutput = d3.time.format("%Y-%m-%d");

            // getting specific data
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.avgTemp) + ")");

            // add tooltip with text
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("Avg. Temp.: <strong>" + d.avgTemp + "</strong></br>Date: <strong>" + dateOutput(d.date) + "</strong>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", "250px");
        }


    });
}