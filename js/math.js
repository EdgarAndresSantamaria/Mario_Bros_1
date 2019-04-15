//clase publica Matrix dentro de librerias math.js
export class Matrix {
    /**
     * constructora del array n-bidimensional que almacenara el anidado de otro array (matriz)
     */
    constructor(){
        //matriz
        this.grid = [];
    }

    /**
     * Método que aplica una función dada 'callBack' a todos los puntos de la matriz, 
     * ideal para extraer la información
     * @param {*} callback 
     */
    forEach(callback){
        //Por cada fila 'row' x' recorre todas sus posiciones 'value' 'y', envia cada valor y sus corrdenadas a la funcion 'callback'
        this.grid.forEach((row, x) => row.forEach((value, y) => callback(value, x, y)))
    }

    /**
     * Metodo para recoger el valor de la posición (x,y) de la matriz
     * @param {*} x 
     * @param {*} y 
     */
    get (x,y){
        //recoger fila x
        const row = this.grid[x]
        if (row) {
            // en caso de existir recoger valor y-esimo
            return row[y];
        }
        //de no existir devolver 'underfined'
        return undefined;
    }

    /**
     * Método para añadir valor 'value' a la posicion (x,y) de la matriz
     * @param {*} x 
     * @param {*} y 
     * @param {*} value 
     */
    set(x,y, value){
        //si no existe fila 'x' inicializarla
        if (!this.grid[x]) {
            this.grid[x] = [];
        }
        //asignar 'value' a la posición y-esima de la fila x 
        this.grid[x][y] = value;
    }

}

export class Vec2 {
    constructor(x, y) {
        this.set(x, y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}