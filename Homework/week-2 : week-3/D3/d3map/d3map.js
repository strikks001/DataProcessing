/**

d3map.js

Computer Science
Data Processing Part 2

JavaScript D3 Datamap to create a map and fill it with colors

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
        l2: '#fff5f0'
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
                    '</strong><br>Population (x 1.000): <strong>' + data.population,
                    '</strong></div>'].join('');
        }
    }
});

// legenda for the map
map.legend({
    legendTitle: "World Population x 1.000",
    labels: {
        h10: '1.000.000 >',
        h9: '200.000 - 1.000.000',
        h8: '100.000 - 200.000',
        m7: '75.000 - 100.000',
        m6: '50.000 - 75.000',
        m5: '2.500 - 50.000',
        l4: '1.000 - 2.500',
        l3: '500 - 1.000',
        l2: '< 500'
    }
});

// get data from json file
d3.json("data.json", function (error, data) {
    if (error) throw error;
    data.forEach(function (d) {
        map.updateChoropleth(d);
    });
});