/**

main2.js

Computer Science
Data Processing Part 2

JavaScript to create a map and fill it with colors

Sanne Strikkers
11170816

*/

var colors = ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'];

/* use this to test out your function */
window.onload = function () {
    setup();
}

/* ChangeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
    document.getElementById(id).style.fill = color;
}

/* Load the json file into and get a response (text) */
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

/* Search for the countrycode by countryname*/
function getCountryCode(country) {
    country = country.replace(/\s+/g, '').toLowerCase();
    for (var i = 0; i < country_codes.length; i++) {
        if (country_codes[i][2].replace(/\s+/g, '').toLowerCase() == country) {
            return country_codes[i][0];
        }
    }
}

/* Set up the world map by giving them a color*/
function setup() {
    // Call to function with anonymous callback
    loadJSON(function (response) {
        // parse response to a JSON object
        jsonresponse = JSON.parse(response);
        
        // adding colors by given data
        for (var i = 0; i < jsonresponse.length; i++) {
            if (jsonresponse[i].data >= 1000000000) {
                country = getCountryCode(jsonresponse[i].country)
                changeColor(country, colors[8]);
            }
            if (jsonresponse[i].data >= 200000000 && jsonresponse[i].data < 1000000000) {
                country = getCountryCode(jsonresponse[i].country)
                if (country != null) {
                    changeColor(country, colors[7]);
                }
            } else if (jsonresponse[i].data >= 100000000 && jsonresponse[i].data < 200000000) {
                country = getCountryCode(jsonresponse[i].country)
                if (country != null) {
                    changeColor(country, colors[6]);
                }
            } else if (jsonresponse[i].data >= 75000000 && jsonresponse[i].data < 100000000) {
                country = getCountryCode(jsonresponse[i].country)
                if (country != null) {
                    changeColor(country, colors[5]);
                }
            } else if (jsonresponse[i].data >= 50000000 && jsonresponse[i].data < 75000000) {
                country = getCountryCode(jsonresponse[i].country)
                if (country != null) {
                    changeColor(country, colors[4]);
                }
            } else if (jsonresponse[i].data >= 2500000 && jsonresponse[i].data < 50000000) {
                country = getCountryCode(jsonresponse[i].country)
                if (country != null) {
                    changeColor(country, colors[3]);
                }
            } else if (jsonresponse[i].data >= 1000000 && jsonresponse[i].data < 2500000) {
                country = getCountryCode(jsonresponse[i].country)
                if (country != null) {
                    changeColor(country, colors[2]);
                }
            } else if (jsonresponse[i].data >= 500000 && jsonresponse[i].data < 1000000) {
                country = getCountryCode(jsonresponse[i].country)
                if (country != null) {
                    changeColor(country, colors[1]);
                }
            } else if (jsonresponse[i].data < 500000) {
                country = getCountryCode(jsonresponse[i].country)
                if (country != null) {
                    changeColor(country, colors[0]);
                }
            } else {
                changeColor(country_codes[i][0], "grey");
            }
        }
    });
}