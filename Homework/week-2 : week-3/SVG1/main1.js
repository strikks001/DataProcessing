/**

main1.js

Computer Science
Data Processing Part 2

JavaScript to change colors

Sanne Strikkers
11170816

*/

/* use this to test out your function */
window.onload = function () {
    changeColor("fin", "#F39F0F");
    changeColor("cz", "pink");
    changeColor("gre", "#0FF379");
    changeColor("hu", "yellow");
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
    document.getElementById(id).style.fill = color;
}