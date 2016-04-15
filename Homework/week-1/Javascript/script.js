/**
* Reads input from the file
*/
function getFile() {
    var file = new XMLHttpRequest();
    file.open("GET", "weather.tsv", true);
    file.addEventListener('load', format);
    file.send();
}
var global = [];
/**
* Formats the input file's text and saves it in an array
*/
function format() {
    var text = this.responseText.split('\n');
    var output = [];
    
		for(var i = 0; i < text.length; i++) {
			var date = text[i].split(',');
			var temp = parseInt(date[1]);
            
            // convert weather date to yyyy/mm/dd format
            var year = date[0].substring(0, 4);
            year += "/"
            var month = date[0].substring(4,6);
            month += "/"
            var day = date[0].substring(6,8);
            date[0] = year + month + day;
			
            output.push([new Date(date[0]), temp]);
		}
    global = output;
    draw(output);
}

function createTransform(domain, range){
    // domain is a two-element array of the data bounds [domain_min, domain_max]
    // range is a two-element array of the screen bounds [range_min, range_max]
    // This gives you two equations to solve:
    // range_min = alpha * domain_min + beta
    // range_max = alpha * domain_max + beta
    // Implement your solution here:
    
    var domain_min = domain[0];
    var domain_max = domain[1];
    var range_min = range[0];
    var range_max = range[1];

    var beta = (range_max / domain_max - range_min / domain_min) * (domain_min * domain_max) / (domain_min - domain_max);

    var alpha = (range_min - beta) / domain_min;
	
	return function(x){
		return alpha * x + beta;
	};
}

function draw(data) {
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    
    // padding
    var xPadding = 30;
    var yPadding = 30;
    
    // get graph
    var transform = createTransform([-28, 270], [canvas.width, canvas.height]);
    // points
    var point = (canvas.width - xPadding) / data.length;

    
    // lines of the graph
    ctx.beginPath();
    ctx.moveTo(xPadding, 0);
    ctx.lineTo(xPadding, canvas.height - yPadding);
    ctx.lineTo(canvas.width, canvas.height - yPadding);
    ctx.stroke();
    
    // y-axis
    ctx.textAlign = "right"
    ctx.textBaseline = "middle";
    
    for(var i = -50; i < data.length; i += 10) {
        ctx.fillText(i, xPadding - 10, transform(i) - (canvas.height - 30));
        
        // line
        ctx.moveTo(25, transform(i) - (canvas.height - yPadding));
        ctx.lineTo(30, transform(i) - (canvas.height - yPadding));
        ctx.stroke();
    }
    
    // x-axis
    for(var i = 0; i < (data.length); i+= 31) {
        ctx.fillText(months[data[i][0].getMonth()], (xPadding + i * point) + xPadding, canvas.height - yPadding + 20);
    }
    
    ctx.strokeStyle = '#f00';
                
    // draw the line graph
    ctx.beginPath();
    ctx.moveTo(xPadding, transform(data[0][1]) - (canvas.height - yPadding));
    
    for(var i = 0; i < data.length; i++) {
        var y = transform(data[i][1]);
        ctx.lineTo((xPadding + i * point),  y - (canvas.height - yPadding));
        console.log("y: " + (y - (canvas.height - yPadding)));
    }
    ctx.stroke();
}

getFile();

// part 2
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var canvas = document.getElementById('cross-canvas');
var context = canvas.getContext('2d');

canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    context.clearRect(0,0,canvas.width,canvas.height);
    
    // get graph
    var transform = createTransform([-28, 270], [canvas.width, canvas.height]);
    var point = (canvas.width - 30) / global.length;
    var y = transform(mousePos.y);

    console.log("y2: " + y + ",  " + mousePos.y);
    
    // horizontal
    context.beginPath();
    context.moveTo(30, mousePos.y);
    context.lineTo(canvas.width, mousePos.y);
    context.stroke();

    // vertical
    context.beginPath();
    context.moveTo(mousePos.x, canvas.height - 30);
    context.lineTo(mousePos.x, 0);
    context.stroke();
    
    // circle
    var circle = new Path2D();
    circle.arc(mousePos.x, mousePos.y, 5, 0, 2 * Math.PI);
    context.fill(circle);
    
    
}, false);