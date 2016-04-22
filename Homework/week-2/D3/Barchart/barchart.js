/**

barchart.js

Computer Science 50
Barchart

JavaScript D3 for showing a barchart

Sanne Strikkers
11170816

*/

d3.tsv("weather_schiphol.tsv", function(data) {
    json_result = JSON.stringify(data);
    json_object = JSON.parse(json_result);
    
    for(var i = 0; i < json_object.length; i++){
        console.log(json_object[i]);
    }
});

