d3.tsv("weather_schiphol.tsv", function(error, data) {
    json_result = JSON.stringify(data);
    json_object = JSON.parse(json_result);
    
    for(var i = 0; i < json_object.length; i++){
        console.log(json_object[i]);
    }
});

