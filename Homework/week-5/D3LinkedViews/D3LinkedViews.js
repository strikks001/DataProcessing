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
                    '</strong><br>Happy Life Index: <strong>' + data.hpi,
                    '</div>'].join('');
        }
    },
    done: function (datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
            getData(geography.id);
        });
    }
});

// setting up the first view
updateMap("World Population");

// when selecting another variable, the world map will be updated
d3.selectAll("select")
    .on("change", function () {
        // update world map
        var value = d3.select(this).property('value');
        updateMap(value);
    });

/*
    When clicked on a variable like Population then it will change
    to another world map with a different legend and data.
*/
function updateMap(subject) {
    // standard file
    var jsonFile = "data/D3LinkedViews_pop.json";

    // checks what is chosen and updates the title and legend
    if (subject == "Life Expectancy") {
        // change input file
        jsonFile = "data/D3LinkedViews_lf.json";
        // change title of the map
        d3.select("#map-title")
            .text(subject + " in 2011");
        // change the legend for the map
        d3.select(".legend-map")
            .html("<h5>Life expectancy (0 - 100)</h5><div class='row'><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #91cf60;'></div><div class='update-text text-center'>75 ></div></div></div><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #ffffd4;'></div><div class='update-text text-center'>60 - 75</div></div></div><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #fc8d59;'></div><div class='update-text text-center'>< 60</div></div></div><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #B8B8B8;'></div><div class='update-text text-center'>No data</div></div></div></div><h6>2011 data taken from UNDP Human Development Report 2011</h6>");
    } else if (subject == "Well-being") {
        // change input file
        jsonFile = "data/D3LinkedViews_wb.json";
        // change title of the map
        d3.select("#map-title")
            .text(subject + " in 2012");
        // change the legend for the map
        d3.select(".legend-map")
            .html("<h5>Experienced well-being score (0 - 10)</h5><div class='row'><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #91cf60;'></div><div class='update-text text-center'>6.2 ></div></div></div><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #ffffd4;'></div><div class='update-text text-center'>4.8 - 6.2</div></div></div><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #fc8d59;'></div><div class='update-text text-center'>< 4.8</div></div></div><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #B8B8B8;'></div><div class='update-text text-center'>No data</div></div></div></div><h6>Arithmetic mean of individual responses to the Ladder of Life question in the Gallup World Poll. Latest data for each country as at February 2012.</h6>");
    } else if (subject == "Ecological Footprint") {
        // change input file
        jsonFile = "data/D3LinkedViews_ef.json";
        // change title of the map
        d3.select("#map-title")
            .text(subject + " in 2008");
        // change the legend for the map
        d3.select(".legend-map")
            .html("<h5>Ecological Footprint (in global hectares per capita)</h5><div class='row'><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #1a9641;'></div><div class='update-text text-center'>< 1.78</div></div></div><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #a6d96a;'></div><div class='update-text text-center'>1.78 - 3.56</div></div></div><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #fdae61;'></div><div class='update-text text-center'>3.56 - 7.12</div></div></div><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #d7191c;'></div><div class='update-text text-center'>7.12 ></div></div></div><div class='col-md-1'><div class='update-nag'><div class='update-split' style='background: #B8B8B8;'></div><div class='update-text text-center'>No data</div></div></div></div><h6>2008 data taken from Global Footprint Network for 142 countries.</h6>");
    } else if (subject == "World Population") {
        // change input file
        jsonFile = "data/D3LinkedViews_pop.json";
        // change title of the map
        d3.select("#map-title")
            .text(subject + " in 2010");
        // change the legend for the map
        d3.select(".legend-map")
            .html("<h5>World Population (in millions)</h5><div class='row'><div class='col-md-2'><div class='update-nag pop-nag'><div class='update-split' style='background: #67000d;'></div><div class='update-text text-center'>1.000.000.000 ></div></div></div><div class='col-md-2'><div class='update-nag pop-nag'><div class='update-split' style='background: #a50f15;'></div><div class='update-text text-center'>200.000.000 - 1.000.000.000</div></div></div><div class='col-md-2'><div class='update-nag pop-nag'><div class='update-split' style='background: #cb181d;'></div><div class='update-text text-center'>100.000.000 - 200.000.000</div></div></div><div class='col-md-2'><div class='update-nag pop-nag'><div class='update-split' style='background: #ef3b2c;'></div><div class='update-text text-center'>75.000.000 - 100.000.000</div></div></div><div class='col-md-2'><div class='update-nag pop-nag'><div class='update-split' style='background: #fb6a4a;'></div><div class='update-text text-center'>50.000.000 - 75.000.000</div></div></div><div class='col-md-2'><div class='update-nag pop-nag'><div class='update-split' style='background: #fc9272;'></div><div class='update-text text-center'>2.500.000 - 50.000.000</div></div></div><div class='col-md-2'><div class='update-nag pop-nag'><div class='update-split' style='background: #fcbba1;'></div><div class='update-text text-center'>1.000.000 - 2.500.000</div></div></div><div class='col-md-2'><div class='update-nag pop-nag'><div class='update-split' style='background: #fee0d2;'></div><div class='update-text text-center'>500.000 - 1.000.000</div></div></div><div class='col-md-2'><div class='update-nag pop-nag'><div class='update-split' style='background: #fff5f0;'></div><div class='update-text text-center'>< 500.000</div></div></div><div class='col-md-1'><div class='update-nag '><div class='update-split' style='background: #B8B8B8;'></div><div class='update-text text-center'>No data</div></div></div></div><h6>2010 data sourced from World Bank World Development Indicators.</h6>");
    }

    // get data from json file and update the map with these values
    d3.json(jsonFile, function (error, data) {
        if (error) {
            console.log("We cannot retrieve the data.");
            alert("We cannot retrieve the data.");
            throw error;
        };
        // update map
        data.forEach(function (d) {
            map.updateChoropleth(d);
        });
    });
}

/*
    Getting data from a Json file and creates a horizontal barchart
*/
function getData(countryAdd) {
    // get data from json file and update the map with these values
    d3.json("data/D3LinkedViews_pop.json", function (error, data) {
        if (error) {
            console.log("We cannot retrieve the data.");
            alert("We cannot retrieve the data.");
            throw error;
        };

        var china, netherlands, usa, countryNew = {};
        var countries = [];

        // select three standard countries and one selected country
        for (i in map.options.data) {
            if (map.options.data[i].country == "China") {
                china = map.options.data[i];
            } else if (map.options.data[i].country == "Netherlands") {
                netherlands = map.options.data[i];
            } else if (map.options.data[i].country == "United States") {
                usa = map.options.data[i];
            }

            // selected country
            if (i = countryAdd) {
                countryNew = map.options.data[i];
            }
        }

        // checks if there is chosen for the three standard countries, 
        // if so then it will choose another country
        if (countryNew == china) {
            china = map.options.data["JPN"];
        } else if (countryNew == netherlands) {
            netherlands = map.options.data["BEL"];
        } else if (countryNew == usa) {
            usa = map.options.data["CAN"];
        }
        // push all the countries in one list
        countries.push(china, netherlands, usa, countryNew);

        // creates the barchart and will update it when you click another country
        createBarchart(createData("Ecological Footprint", countries), "chart1");
        createBarchart(createData("Well-being", countries), "chart2");
        createBarchart(createData("Life Expectancy", countries), "chart3");

        // changes the titles for the bar charts
        d3.select("#title-hpi")
            .text("Happy Life Index");

        d3.select("#under-hpi")
            .text(countryNew.country + ": " + countryNew.hpi);

    });
}

/*
    Creates horizontal barcharts with different subjects and countries
*/
function createBarchart(data1, selection) {
    // sizing the bar chart
    var chartWidth = 300,
        barHeight = 20,
        groupHeight = barHeight * data1.series.length,
        gapBetweenGroups = 10,
        spaceForLabels = 150,
        spaceForLegend = 150;

    // zip the series data together (first values, second values, etc.)
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

    // specify the chart area and dimensions
    var chart = d3.select("." + selection)
        .attr("width", spaceForLabels + chartWidth + spaceForLegend)
        .attr("height", chartHeight);

    // create bars
    var bar = chart.selectAll("g")
        .data(zippedData);

    // enter the bar
    var barEnter = bar
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data1.series.length))) + ")";
        });

    // creates rectangles with the correct width
    barEnter.append("rect")
        .attr("fill", function (d, i) {
            return color(i % data1.series.length);
        })
        .attr("class", "bar")
        .attr("width", x)
        .attr("height", barHeight - 1);

    // adds text label in bar
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

    // draws the labels
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

    // changes the y axis
    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups / 2 + ")")
        .call(yAxis);

    // UPDATE PART

    // set up for the transition
    barUpdate = d3.transition(bar);

    // updates the bar
    barUpdate.select('rect')
        .transition().duration(600)
        .attr("fill", function (d, i) {
            return color(i % data1.series.length);
        })
        .attr("width", x)
        .attr("height", barHeight - 1);

    // updates the bar text label
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

    // removes the previous one
    bar.exit().remove();

    // draws legend
    var legendRectSize = 18,
        legendSpacing = 4;

    // setting up the legend
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

    // adds color block for the legend
    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function (d, i) {
            return color(i);
        })
        .style('stroke', function (d, i) {
            return color(i);
        });

    // adds text after the color block
    legend.append('text')
        .attr('class', 'legend')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) {
            return d.label;
        });
}

/*
    Creating data for the barcharts
*/
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