d3.csv("population.csv", function (error, data) {
    if (error) throw error;

    var population = []
    data.forEach(function (d) {
        population = [d.Code, d.Country, d.Population];
    });
    
var map = new Datamap({
        element: document.getElementById('container1'),
        scope: 'world',
        fills: {
            defaultFill: '#B8B8B8'
        },
        data: {
   
        }
    });
});
