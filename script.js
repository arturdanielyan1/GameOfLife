

var socket = io();
var side = 12;

function setup() {
    createCanvas(35 * side, 35 * side);
    background('#acacac');
    noStroke();
}




socket.on("sendMatrix", drawM);
function drawM(obj) {
    console.log(obj, "obj");
    matrix = obj.m
    weather = obj.w
    w.innerText = "WEATHER: " + weather;
    // console.log(weather);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (weather == "WINTER") {
                    fill("white")
                }
                else {
                    fill("green");
                }
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill(67, 60, 86);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

var p = document.getElementById("expbut");
p.addEventListener("click", Explosion);

function Explosion() {
    socket.emit("Explosion", null)
}


var p = document.getElementById("againbut");
p.addEventListener("click", Again);

function Again() {
    socket.emit("Again", null);
}

var w = document.getElementById("wh");




//socket.on("game", )

