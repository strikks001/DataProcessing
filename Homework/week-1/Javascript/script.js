/**

script.js

Computer Science
Data Processing Part 2

JavaScript for showing the data in a line graph

Sanne Strikkers
11170816

*/


// Part 1: JavaScript


var global = [];
var xPadding = 30;
var yPadding = 30;

/**
* Reads input from a file
*/
function getFile() {
    var file = new XMLHttpRequest();
    file.open("GET", "weather.tsv", true);
    file.addEventListener('load', format);
    file.send();
}

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
			
            // add all the information in an array
            output.push([new Date(date[0]), temp]);
		}
    // set the array global
    global = output;
    draw();
}

/**
* The position encodings for this graph only need linear transforms, 
* one for the x-axis and one for the y-axis, of the following form: 
* xscreen = alpha * xdata + beta
*/
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

/**
* Draws the complete line graph on a canvas
*/
function draw() {
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    
    // get graph
    var transform = createTransform([-28, 270], [canvas.width, canvas.height]);
    // points
    var point = (canvas.width - xPadding) / global.length;

    
    // lines of the graph
    ctx.beginPath();
    ctx.moveTo(xPadding, 0);
    ctx.lineTo(xPadding, canvas.height - yPadding);
    ctx.lineTo(canvas.width, canvas.height - yPadding);
    ctx.stroke();
    
    // y-axis
    ctx.textAlign = "right"
    ctx.textBaseline = "middle";
    
    for(var i = -50; i < global.length; i += 10) {
        ctx.fillText(i, xPadding - 10, transform(i) - (canvas.height - 30));
        
        // line
        ctx.moveTo(25, transform(i) - (canvas.height - yPadding));
        ctx.lineTo(30, transform(i) - (canvas.height - yPadding));
        ctx.stroke();
    }
    
    // x-axis
    for(var i = 0; i < (global.length); i+= 31) {
        ctx.fillText(months[global[i][0].getMonth()], (xPadding + i * point) + xPadding, canvas.height - yPadding + 20);
    }
    
    // draw the line graph
    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(xPadding, transform(global[0][1]) - (canvas.height - yPadding));
    
    for(var i = 0; i < global.length; i++) {
        var y = transform(global[i][1]);
        ctx.lineTo((xPadding + i * point),  y - (canvas.height - yPadding));
        console.log("y: " + (y - (canvas.height - yPadding)));
    }
    ctx.stroke();
}

// draw the complete line graph on the canvas
getFile();


// Part 2: Interactivity in Javascript


/**
* Get the x and y from the cursor
*/
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// the canvas for drawing the lines on
var canvas = document.getElementById('cross-canvas');
var context = canvas.getContext('2d');

// listener to draw the vertical en horizontal lines
canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    
    // clear the previous line on the screen
    context.clearRect(0,0,canvas.width,canvas.height);
    
    // horizontal line
    context.beginPath();
    context.moveTo(30, mousePos.y);
    context.lineTo(canvas.width, mousePos.y);
    context.stroke();

    // vertical line
    context.beginPath();
    context.moveTo(mousePos.x, canvas.height - 30);
    context.lineTo(mousePos.x, 0);
    context.stroke();
    
    // circle
    var circle = new Path2D();
    circle.arc(mousePos.x, mousePos.y, 5, 0, 2 * Math.PI);
    context.fill(circle);
    
}, false);