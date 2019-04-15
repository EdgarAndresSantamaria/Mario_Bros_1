import {Matrix} from './math.js';
import Compositor from './Compositor.js';
import TileCollider from './TileCollider.js';

// clase 'level'
export default class Level {
    constructor() {
        // generar mapeado de los bloques del mapa 'tiles' 'matrix'
        this.tiles = new Matrix();
    	this.gravity = 2000;
        this.comp = new Compositor();
        this.entities = new Set();
     	this.tileCollider = new TileCollider(this.tiles);
    }

      update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;
        });
    }
}
