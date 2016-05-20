/**

D3LinkedViews.js

Computer Science
Data Processing

JavaScript D3LinkedViews to create a map and fill it with colors

Sanne Strikkers
11170816

*/

// setting up the map
var map = new Datamap({
    element: document.getElementById('container1'),
    scope: 'world',
    fills: {
        defaultFill: '#B8B8B8',
        h10: '#67000d',
        h9: '#a50f15',
        h8: '#cb181d',
        m7: '#ef3b2c',
        m6: '#fb6a4a',
        m5: '#fc9272',
        l4: '#fcbba1',
        l3: '#fee0d2',
        l2: '#fff5f0',
        no: "#B8B8B8",
        wb_good: "#91cf60",
        wb_middle: "#ffffd4",
        wb_poor: "#fc8d59",
        ef_good: "#1a9641",
        ef_middle: "#a6d96a",
        ef_poor: "#fdae61",
        ef_deep_red: "#d7191c",
        lf_good: "#91cf60",
        lf_middle: "#ffffd4",
        lf_poor: "#fc8d59",
    },
    geographyConfig: {
        borderColor: '#4d4d4d',
        borderWidth: 0.5,
        highlightBorderWidth: 2.5,
        highlightBorderColor: '#D8D8D8',
        highlightFillColor: '#525252',
        popupTemplate: function (geo, data) {
            return ['<div class="popup-tool">',
                    'Country: <strong>' + geo.properties.name,
                    '</strong><br>Population: <strong>' + data.population,
                    '</strong></div>'].join('');
        }
    },
    done: function (datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
            //alert(geography.properties.name);
            getData(geography.id);
        });
    }
});

updateMap("World Population");

function getData(countryAdd) {
    // get data from json file and update the map with these values
    d3.json("data/D3LinkedViews.json", function (error, data) {
        if (error) {
            console.log("We cannot retrieve the data.");
            alert("We cannot retrieve the data.");
            throw error;
        };

        var china, netherlands, usa, countryNew = {};
        var countries = [];

        for (i in map.options.data) {
            if (map.options.data[i].country == "China") {
                china = map.options.data[i];
            } else if (map.options.data[i].country == "Netherlands") {
                netherlands = map.options.data[i];
            } else if (map.options.data[i].country == "United States") {
                usa = map.options.data[i];
            }

            if (i = countryAdd) {
                countryNew = map.options.data[i];
            }
        }
        
        countries.push(china, netherlands, usa, countryNew);

        //        d3.keys(map.options.data).forEach(function (key) {
        //            if (key = countryAdd){
        //                    countryNew = map.options.data[key];
        //            }     
        //        });

        createBarchart(createData("Ecological Footprint", countries), "chart1");
        createBarchart(createData("Well-being", countries), "chart2");
        createBarchart(createData("Life Expectancy", countries), "chart3");

        d3.select("#title-hpi")
            .text("Happy Life Index");

        d3.select("#under-hpi")
            .text(countryNew.country + ": " + countryNew.hpi);

    });
}

function createBarchart(data1, selection) {
    // sizing the bar chart
    var chartWidth = 300,
        barHeight = 20,
        groupHeight = barHeight * data1.series.length,
        gapBetweenGroups = 10,
        spaceForLabels = 150,
        spaceForLegend = 150;

    // Zip the series data together (first values, second values, etc.)
    var zippedData = [];
    for (var i = 0; i < data1.labels.length; i++) {
        for (var j = 0; j < data1.series.length; j++) {
            zippedData.push(data1.series[j].values[i]);
        }
    }

    // set up the colors for several lines
    var color = d3.scale.ordinal().range(["#8dd3c7", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd"]);

    var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data1.labels.length;

    // x-axis
    var x = d3.scale.linear()
        .domain([0, d3.max(zippedData)])
        .range([0, chartWidth]);

    // y -axis
    var y = d3.scale.linear()
        .range([chartHeight + gapBetweenGroups, 0]);
    var yAxis = d3.svg.axis()
        .scale(y)
        .tickFormat('')
        .tickSize(0)
        .orient("left");

    // Specify the chart area and dimensions
    var chart = d3.select("." + selection)
        .attr("width", spaceForLabels + chartWidth + spaceForLegend)
        .attr("height", chartHeight);

    // Create bars
    var bar = chart.selectAll("g")
        .data(zippedData);

    var barEnter = bar
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data1.series.length))) + ")";
        });

    // Create rectangles of the correct width
    barEnter.append("rect")
        .attr("fill", function (d, i) {
            return color(i % data1.series.length);
        })
        .attr("class", "bar")
        .attr("width", x)
        .attr("height", barHeight - 1);

    // Add text label in bar
    barEnter.append("text")
        .attr("x", function (d) {
            return x(d) - 3;
        })
        .attr("y", barHeight / 2)
        .attr("fill", "red")
        .attr("dy", ".35em")
        .text(function (d) {
            return d;
        });

    // Draw labels
    barEnter.append("text")
        .attr("class", "label")
        .attr("x", function (d) {
            return -10;
        })
        .attr("y", groupHeight / 2)
        .attr("dy", ".35em")
        .text(function (d, i) {
            if (i % data1.series.length === 0)
                return data1.labels[Math.floor(i / data1.series.length)];
            else
                return ""
        });

    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups / 2 + ")")
        .call(yAxis);

    // UPDATE PART
    barUpdate = d3.transition(bar);

    barUpdate.select('rect')
        .transition().duration(600)
        .attr("fill", function (d, i) {
            return color(i % data1.series.length);
        })
        .attr("width", x)
        .attr("height", barHeight - 1);

    barUpdate.select('text')
        .transition().duration(600)
        .attr("x", function (d) {
            return x(d) - 3;
        })
        .attr("y", barHeight / 2)
        .attr("fill", "red")
        .attr("dy", ".35em")
        .text(function (d) {
            return d;
        });

    bar.exit().remove();

    // Draw legend
    var legendRectSize = 18,
        legendSpacing = 4;

    var legend = chart.selectAll('.legend')
        .data(data1.series)
        .enter()
        .append('g')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = -gapBetweenGroups / 2;
            var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function (d, i) {
            return color(i);
        })
        .style('stroke', function (d, i) {
            return color(i);
        });

    legend.append('text')
        .attr('class', 'legend')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) {
            return d.label;
        });

}

// selecting a city will update the chart 
d3.selectAll("select")
    .on("change", function () {
        // update world map
        var value = d3.select(this).property('value');
        updateMap(value);
    });


function updateMap(subject) {
    var jsonFile = "data/D3LinkedViews_pop.json";

    if (subject == "Life Expectancy") {
        jsonFile = "data/D3LinkedViews_lf.json";
        d3.select("#map-title")
            .text(subject + " in 2011");
    } else if (subject == "Well-being") {
        jsonFile = "data/D3LinkedViews_wb.json";
        d3.select("#map-title")
            .text(subject + " in 2012");
    } else if (subject == "Ecological Footprint") {
        jsonFile = "data/D3LinkedViews_ef.json";
        d3.select("#map-title")
            .text(subject + " in 2008");
    } else if (subject == "World Population") {
        jsonFile = "data/D3LinkedViews_pop.json";
        d3.select("#map-title")
            .text(subject + " in 2010");
    }

    // get data from json file and update the map with these values
    d3.json(jsonFile, function (error, data) {
        if (error) {
            console.log("We cannot retrieve the data.");
            alert("We cannot retrieve the data.");
            throw error;
        };

        data.forEach(function (d) {
            map.updateChoropleth(d);
        });
    });
}

function createData(subject, countries) {
    var data = {};

    if (subject == "Life Expectancy") {
        data = {
            labels: [subject],
            series: [{
                label: countries[0].country,
                values: [parseFloat(countries[0].lifeExpectancy)]
            }, {
                label: countries[1].country,
                values: [parseFloat(countries[1].lifeExpectancy)]
            }, {
                label: countries[2].country,
                values: [parseFloat(countries[2].lifeExpectancy)]
            }, {
                label: countries[3].country,
                values: [parseFloat(countries[3].lifeExpectancy)]
            }]
        };
    } else if (subject == "Well-being") {
        data = {
            labels: [subject],
            series: [{
                label: countries[0].country,
                values: [parseFloat(countries[0].wellBeing)]
            }, {
                label: countries[1].country,
                values: [parseFloat(countries[1].wellBeing)]
            }, {
                label: countries[2].country,
                values: [parseFloat(countries[2].wellBeing)]
            }, {
                label: countries[3].country,
                values: [parseFloat(countries[3].wellBeing)]
            }]
        };
    } else if (subject == "Ecological Footprint") {
        data = {
            labels: [subject],
            series: [{
                label: countries[0].country,
                values: [parseFloat(countries[0].ecologicalFootprint)]
            }, {
                label: countries[1].country,
                values: [parseFloat(countries[1].ecologicalFootprint)]
            }, {
                label: countries[2].country,
                values: [parseFloat(countries[2].ecologicalFootprint)]
            }, {
                label: countries[3].country,
                values: [parseFloat(countries[3].ecologicalFootprint)]
            }]
        };
    }
    return data;
}