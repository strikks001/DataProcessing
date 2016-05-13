<!DOCTYPE html>
<html>
<meta charset="utf-8">
<style>
  svg {
    font: 10px sans-serif;
  }
  
  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }
  
  .x.axis path {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }
  
  .line {
    fill: none;
    stroke-width: 1.5px;
  }
</style>

<body>
  <p id="menu"><b>Test</b>
    <br>Select Store:
    <select>
      <option value="London">London</option>
      <option value="Glasgow">Glasgow</option>
    </select>
  </p>
  <script src="http://d3js.org/d3.v3.js"></script>
  <script>
    var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
      },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // construct a linear scale for x axis
    var x = d3.scale.linear()
      .range([0, width]);

    // construct a linear scale for y axis
    var y = d3.scale.linear()
      .range([height, 0]);

    // use the default line colours (see http://stackoverflow.com/questions/21208031/how-to-customize-the-color-scale-in-a-d3-line-chart for info on setting colours per line)
    var color = d3.scale.category10();

    // create the x axis and orient of ticks and labels at the bottom
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    // create the y axis and orient of ticks and labels on the left
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    // line generator function
    var line = d3.svg.line()
      //.interpolate("basis")
      .x(function(d) {
        return x(d.Month);
      })
      .y(function(d) {
        return y(d.Sold);
      });

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")");

    svg.append("g")
      .attr("class", "y axis");

    var salesDataByStoreProduct = null;
    d3.csv("data.csv", function(error, data) {

      color.domain(d3.keys(data[0]).filter(function(key) {
        return key == "Product";
      }));

      // first we need to corerce the data into the right formats
      // map the data from the CSV file
      data = data.map(function(d) {
        return {
          Store: d.Store,
          Product: d.Product,
          Month: +d.Month,
          Sold: +d.Sold
        };
      });

      // nest the data by regime and then CI
      salesDataByStoreProduct = d3.nest()
        .key(function(d) {
          return d.Store;
        })
        .key(function(d) {
          return d.Product;
        })
        .entries(data);

      draw("London");

    });

    function draw(which) {

      // get the first regime's nest
      var salesData = null;
      salesDataByStoreProduct.forEach(function(d) {
        if (d.key === which) {
          salesData = d.values;
        }
      });

      x.domain([d3.min(salesData, function(d) {
          return d3.min(d.values, function(d) {
            return d.Month;
          });
        }),
        d3.max(salesData, function(d) {
          return d3.max(d.values, function(d) {
            return d.Month;
          });
        })
      ]);
      y.domain([0, d3.max(salesData, function(d) {
        return d3.max(d.values, function(d) {
          return d.Sold;
        });
      })]);

      svg.select(".x.axis").call(xAxis);

      svg.select(".y.axis").call(yAxis);

      var Products = svg.selectAll(".Product")
        .data(salesData, function(d) {
          return d.key;
        });

      Products
        .enter().append("g")
        .attr("class", "Product")
        .append("path");

      Products.selectAll("path")
        .attr("class", "line")
        .attr("d", function(d) {
          return line(d.values);
        })
        .style("stroke", function(d) {
          return color(d.key);
        });
    }

    var menu = d3.select("#menu select")
      .on("change", change);

    function change() {
      draw(this.options[this.selectedIndex].value);
    }
  </script>
</body>

</html>