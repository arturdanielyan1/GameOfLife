var LivingCreature = require("./LivingCreature");
var Grass = require("./Grass");

module.exports = class Fermer extends LivingCreature{
   /* constructor(x, y, index) {
        // this.x = x;
        // this.y = y;
        // this.index = index;
        super(x, y, index);// aranc super chashxatec
    }*/
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
    //getNewCoordinates-y jarangum a

    chooseCell(character) {
        super.getNewCoordinates();  
        return super.chooseCell(character);
    }
    move() {  //qayluma
        var cells = this.chooseCell(0);
        var randomIndex = Math.floor(Math.random() * cells.length);
        var newCell = cells[randomIndex];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 1;
            var newGrass = new Grass(this.x, this.y, 1);
            grassArr.push(newGrass);
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
        }
    }
    killMol(){
        var cells = this.chooseCell(5);
        var randomIndex = Math.floor(Math.random() * cells.length);
        var newCell = cells[randomIndex];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in molakhotArr) {
                if (newX == molakhotArr[i].x && newY == molakhotArr[i].y) {
                    molakhotArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
        }
    }
}