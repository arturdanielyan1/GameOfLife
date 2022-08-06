var Grass = require("./Grass");
var GrassEater = require("./GrassEater");
var Gishatich = require("./Gishatich");
var Fermer = require("./Fermer");
var Molakhot = require("./Molakhot");

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs")

app.use(express.static("."));


app.get('/', function (req, res) {
    res.redirect('index.html');
});


/////////////////////////////////////////////////////////////////////////////////////////////////////




server.listen(3000);

var fermerArr = [];


let rows = 35; // Տողերի քանակ
let columns = 35; // Սյուների քանակ

let weather = "SPRING";
let weatherinit = 1;





function startall() {

    weatherinit = 1
    weather = "SPRING"

    grassArr = [];
    grassEaterArr = [];
    gishatichArr = [];

    molakhotArr = [];




    matrix = []; // Մատրիցի ստեղծում



    for (let y = 0; y < rows; y++) {
        matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
        for (let x = 0; x < columns; x++) {
            let a = Math.floor(Math.random() * 100);
            if (a >= 50 && a < 55) {
                matrix[y][x] = 1;
            }
            else if (a >= 60 && a < 70) {
                matrix[y][x] = 2;
            }
            else if (a >= 70 && a < 80) {
                matrix[y][x] = 3;
            }
            else if (a >= 80 && a < 90) {
                matrix[y][x] = 4;
            }
            else if (a >= 90 && a < 100) {
                matrix[y][x] = 5;
            }
            else {
                matrix[y][x] = 0;
            }
        }

    }


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x, y, 2);
                grassEaterArr.push(et);

            }
            else if (matrix[y][x] == 3) {
                var gsho = new Gishatich(x, y, 3);
                gishatichArr.push(gsho);

            }
            else if (matrix[y][x] == 4) {
                var fermer = new Fermer(x, y, 4);
                fermerArr.push(fermer);
            }
            else if (matrix[y][x] == 5) {
                var mol = new Molakhot(x, y, 5);
                molakhotArr.push(mol);
            }
        }
    }
}


startall();
var obj = {}


function game() {
    obj = {
        m: matrix,
        w: weather
    }
    weatherinit++;
    console.log(weather);

    if (weatherinit == 1) {
        weather = "SPRING";
    }
    else if (weatherinit == 4) {
        weather = "SUMMER";
    }
    else if (weatherinit == 7) {
        weather = "AUTUMN";
    }
    else if (weatherinit == 10) {
        weather = "WINTER";
    }
    else if (weatherinit > 11) {
        weatherinit = 1
    }



    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();
    }

    for (var i in gishatichArr) {
        gishatichArr[i].move();
        gishatichArr[i].eat();
        gishatichArr[i].mul();
        gishatichArr[i].die();
    }

    for (var i in molakhotArr) {
        molakhotArr[i].mul();
        molakhotArr[i].mulOnGrass();
        molakhotArr[i].move();
    }

    for (var i in fermerArr) {
        fermerArr[i].move();
        fermerArr[i].killMol();
    }
    io.sockets.emit("sendMatrix", obj);
}

setInterval(game, 1000);



io.on('connection', function (socket) {
    socket.on("Explosion", function () {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (x < 12 && y < 12) {
                    if (matrix[y][x] = 1) {
                        for (let i in grassArr) {
                            if (grassArr[i].x == x && grassArr[i].y == y) {
                                grassArr.splice(i, 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 2) {
                        for (let i in grassEaterArr) {
                            if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                                grassEaterArr.splice(i, 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 3) {
                        for (let i in gishatichArr) {
                            if (gishatichArr[i].x == x && gishatichArr[i].y == y) {
                                gishatichArr.splice(i, 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 4) {
                        for (let i in fermerArr) {
                            if (fermerArr[i].x == x && fermerArr[i].y == y) {
                                fermerArr.splice(i, 1)
                            }
                        }
                    }
                    if (matrix[y][x] = 5) {
                        for (let i in molakhotArr) {
                            if (molakhotArr[i].x == x && molakhotArr[i].y == y) {
                                molakhotArr.splice(i, 1)
                            }
                        }
                    }
                    matrix[y][x] = 0;
                    
                }
            }
        }
        io.sockets.emit("sendMatrix", {m: matrix});
    });
    

    socket.on("Again", function () {
        startall();
    })
});



var object = {"info" : [] }

function main(){
    var file = "Statics.json";
    object.info.push({ "cnvac xoteri qanak " : grassArr.length});
    console.log(object);
    fs.writeFileSync(file, JSON.stringify(object, null, 3));
    console.log(JSON.stringify(object));
}

setInterval(main, 6000);

// var b = {
//     g: "gug"
// }

// console.log(JSON.stringify(b,null,3))
