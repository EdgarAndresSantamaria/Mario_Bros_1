import {Matrix} from './math.js';

export default class Level {
    constructor() {
        this.tiles = new Matrix();
        this.background = null;
    }

    draw(context, offset){
       // Ejercicio 10. Tema 5: Canvas
        // dibujar en el contexto la imagen de background con el
        // desplazamiento indicado en el parámetro offset
        // (recuerda que el contexto tiene unas dimensiones de 300x300)
        context.drawImage(this.background,0+offset,0+offset)
    }
}

