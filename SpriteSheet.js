
export default class SpriteSheet {

    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    define(name, x, y, width, height){
        const buffer = document.createElement('canvas');
        var ctx = buffer.getContext("2d");
        buffer.width = width;
        buffer.height = height;
        // Ejercicio 8 (Tema: Canvas)
        // pintar en el buffer el tile situado en x,y dentro de la hoja de sprites this.image
        ctx.drawImage(this.image,x,y, this.width, this.width,0,0, this.width, this.width)
        this.tiles.set(name, buffer);
    }

    defineTile(name, x, y){
        this.define(name, x*this.width, y*this.height , this.width, this.height);
    }

    draw(name, context, x, y){
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x*this.width, y*this.height);
    }
}


