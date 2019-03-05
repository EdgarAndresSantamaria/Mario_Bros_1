import {Matrix} from './math.js';

// clase 'level'
export default class Level {
    constructor() {
        // generar mapeado de los bloques del mapa 'tiles' 'matrix'
        this.tiles = new Matrix();
        // imagen resultante del mapeado 'background' (2048*240 px)
        this.background = null;
    }

    draw(context, offset){
        // preguntar Juanan como hacer que se ajuste a pantallas
        // dibujar (300*240 px) 'background' en contexto (300*300 px)
         context.drawImage(this.background,0+offset,0,300,240,0,0,300,300)
    }
}