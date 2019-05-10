export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }

    toIndexRange(pos1, pos2) {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < pMax);
        return range;
    }

    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);
        if (tile) {
            const x1 = indexX * this.tileSize;
            const x2 = x1 + this.tileSize;
            const y1 = indexY * this.tileSize;
            const y2 = y1 + this.tileSize;
            return {
                tile,
                x1,
                x2,
                y1,
                y2,
            };
        }
    }

    searchByPosition(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY));
    }

    searchByRange(x1, x2, y1, y2) {
        const matches = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) {
                    matches.push(match);
                }
            });
        });
        return matches;
    }

    addCoin(x1,y1){
        x1 = x1 / this.tileSize;
        y1 = y1 / this.tileSize;
        this.matrix.grid[x1][y1] = {name: 'chance-3', type : 'ground'};
        this.matrix.grid[x1][y1-1] = {name: 'coin', type : 'prize'};
    }

    delete(x1, y1){
        x1 = x1 / this.tileSize;
        y1 = y1 / this.tileSize;
        delete this.matrix.grid[x1][y1];
    }

    getMatrix(){
        return this.matrix;
    }
}
