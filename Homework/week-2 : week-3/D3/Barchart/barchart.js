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
    width = 7000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.scale.ordinal()
        .domain([1, 2, 3])
        .rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
.ticks(10)
    .tickFormat(d3.time.format("%Y-%m-%d"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(15);

var svg = d3.select("body").append("svg")
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

    x.domain(data.map(function (d) {
        return d.date;
    }));
    y.domain([-40, d3.max(data, function (d) {
        return d.temp;
    })]);

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
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return y(d.temp);
        })
        .attr("height", function (d) {
            return height - y(d.temp);
        })
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d.temp)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 30) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        })

});