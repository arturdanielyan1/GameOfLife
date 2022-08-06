var LivingCreature = require("./LivingCreature");

module.exports = class Gishatich extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 5;
    }
    //vorpes method
   /* getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }*/

    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character);
      /*  var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;*/
    }
    //qayluma
    move() {

        //yntruma vandak

        var cells = this.chooseCell(Math.floor(Math.random() * 2));
        var randomIndex = Math.floor(Math.random() * cells.length);
        var newCell = cells[randomIndex];

        //var newCell = random(this.chooseCell(Math.round(random(1))));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            if(newCell == 1){ 
                matrix[this.y][this.x] = 1;
                //var newGrass = new Grass(this.x, this.y, 1);
                //grassArr.push(newGrass);
            }
            else {
                matrix[this.y][this.x] = 0;
            }
            
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    eat() {


        var cells = this.chooseCell(2);
        var randomIndex = Math.floor(Math.random() * cells.length);
        var newCell = cells[randomIndex];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;

        }
    }
    mul() {

        var cells = this.chooseCell(0);
        var randomIndex = Math.floor(Math.random() * cells.length);
        var newCell = cells[randomIndex];

        if (this.energy >= 8 && newCell) {
            var newGishatich = new Gishatich(newCell[0], newCell[1], this.index);
            gishatichArr.push(newGishatich);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in gishatichArr) {
                if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
        }

    }
}