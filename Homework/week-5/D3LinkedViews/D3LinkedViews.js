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
        no: "#B8B8B8"
    },
    geographyConfig: {
        borderColor: '#FAFAFA',
        borderWidth: 1,
        highlightBorderWidth: 1.5,
        highlightBorderColor: '#D8D8D8',
        highlightFillColor: '#C41E4A',
        popupTemplate: function (geo, data) {
            return ['<div class="popup-tool">',
                    'Country: <strong>' + geo.properties.name,
                    '</strong><br>Population: <strong>' + data.population,
                    '</strong></div>'].join('');
        }
    }
});

// legenda for the map
map.legend({
    legendTitle: "World Population in 2010",
    labels: {
        h10: '1.000.000.000 >',
        h9: '200.000.000 - 1.000.000.000',
        h8: '100.000.000 - 200.000.000',
        m7: '75.000.000 - 100.000.000',
        m6: '50.000.000 - 75.000.000',
        m5: '2.500.000 - 50.000.000',
        l4: '1.000.000 - 2.500.000',
        l3: '500.000 - 1.000.000',
        l2: '< 500.000',
        no: "No data available"
    }
});

// get data from json file and update the map with these values
d3.json("data/D3LinkedViews.json", function (error, data) {
    if (error) {
        console.log("We cannot retrieve the data.");
        alert("We cannot retrieve the data.");
        throw error;
    };

    data.forEach(function (d) {
        map.updateChoropleth(d);
    });

    for (i in map.options.data) {
        if (map.options.data[i].population >= 1000000000) {
            var fillKey = {};
            var data = {};
            fillKey["fillKey"] = "h10";
            data[i] = fillKey;
            map.updateChoropleth(data);
        }
        if (map.options.data[i].population >= 200000000 && map.options.data[i].population < 1000000000) {
            var fillKey = {};
            var data = {};
            fillKey["fillKey"] = "h9";
            data[i] = fillKey;
            map.updateChoropleth(data);

        } else if (map.options.data[i].population >= 100000000 && map.options.data[i].population < 200000000) {
            var fillKey = {};
            var data = {};
            fillKey["fillKey"] = "h8";
            data[i] = fillKey;
            map.updateChoropleth(data);

        } else if (map.options.data[i].population >= 75000000 && map.options.data[i].population < 100000000) {
            var fillKey = {};
            var data = {};
            fillKey["fillKey"] = "m7";
            data[i] = fillKey;
            map.updateChoropleth(data);

        } else if (map.options.data[i].population >= 50000000 && map.options.data[i].population < 75000000) {
            var fillKey = {};
            var data = {};
            fillKey["fillKey"] = "m6";
            data[i] = fillKey;
            map.updateChoropleth(data);

        } else if (map.options.data[i].population >= 2500000 && map.options.data[i].population < 50000000) {
            var fillKey = {};
            var data = {};
            fillKey["fillKey"] = "m5";
            data[i] = fillKey;
            map.updateChoropleth(data);

        } else if (map.options.data[i].population >= 1000000 && map.options.data[i].population < 2500000) {
            var fillKey = {};
            var data = {};
            fillKey["fillKey"] = "l4";
            data[i] = fillKey;
            map.updateChoropleth(data);

        } else if (map.options.data[i].population >= 500000 && map.options.data[i].population < 1000000) {
            var fillKey = {};
            var data = {};
            fillKey["fillKey"] = "l3";
            data[i] = fillKey;
            map.updateChoropleth(data);

        } else if (map.options.data[i].population < 500000) {
            var fillKey = {};
            var data = {};
            fillKey["fillKey"] = "l2";
            data[i] = fillKey;
            map.updateChoropleth(data);
        }
    }

});

/*
BarChart
*/

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/D3LinkedViews.json", function(error, data) {
  if (error) throw error;

  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "State"; });

  data.forEach(function(d) {
    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { return d.State; }));
  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

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
      .text("Population");

  var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "state")
      .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(ageNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
});