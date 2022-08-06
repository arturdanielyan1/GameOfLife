var LivingCreature = require("./LivingCreature");

module.exports = class Grass extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
    }

    //yntruma shrjaka 8 vandakner
   /* chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }*/

    // bazmanuma azat vandakneri himan vra
    mul() {
        this.multiply++;
        var cells = this.chooseCell(0);
        var randomIndex = Math.floor(Math.random() * cells.length);
        var newCell = cells[randomIndex];

        if (this.multiply >= 2 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}