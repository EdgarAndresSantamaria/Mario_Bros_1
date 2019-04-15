//clase publica 
export default class SpriteSheet {
    /**
     * Esta clase permite la gestión de componentes gráficos y su posterior impresion a modo de paleta de colores 
     * texturas, etc.El formato de texturas se define mediante un fichero JSON con el mapeado de cada tipo de textura
     * con su apariencia asociada en una hoja de Sprites como imagenes (16*16 px) para poder gestionar el diccionario virtual
     * de las mismas 'paleta de color'
     */

    /**
     * Constructora de la hoja de texturas 'SpriteSheet'
     * @param {*} image 
     * @param {*} width 
     * @param {*} height 
     */
    constructor(image, width, height){
        //imagen almacenada como objeto que contiene el archivo de las texturas 'SpriteSheet'
        this.image = image;
        //anchura y altura de larejilla de texturas 'Sprite Grid'
        this.width = width;
        this.height = height;
        //diccionario de texturas según tipo [ground,sky]
        this.tiles = new Map();
    }

    /**
     * Método que registra la textura (x,y,xOffset,yOffset) de la hoja de texturas (Sprites) 
     * registrada por esta clase 'this.image'
     * @param {*} name 
     * @param {*} x 
     * @param {*} y 
     * @param {*} xOffset 
     * @param {*} yOffset 
     */
    define(name, x, y, xOffset, yOffset){
        // crear contenedor canvas para la textula
        const buffer = document.createElement('canvas');
        // preparar contexto de la textura (papel)
        var ctx = buffer.getContext("2d");
        // definir margenes del contexto
        buffer.width = xOffset;
        buffer.height = yOffset;
        // Ejercicio 8 (Tema: Canvas)
        // pintar en el buffer el tile situado en x,y dentro de la hoja de sprites this.image
        // dibujar textura del sprite correspondiente al tipo de bloque (name)
        ctx.drawImage(this.image,x,y, this.width, this.height,0,0,this.width,this.height)
        // registrar las texturaas en el diccionario
        this.tiles.set(name, buffer);
    }

    /**
     * Método parametrizado de 'define', para gestionar el registro de texturas.
     * @param {*} name 
     * @param {*} x 
     * @param {*} y 
     */
    defineTile(name, x, y){
        // definir textura de nombre: name, cuya ubicación en 'this.image' es (x,y).
        this.define(name, x*this.width, y*this.height , this.width, this.height);
    }

    /**
     * Método para dibujar una textura (16*16 px) denominada 'name' en (x,y) dentro del contexto dado 'hoja de papel'
     * @param {M} name 
     * @param {*} context 
     * @param {*} x 
     * @param {*} y 
     */
    draw(name, context, x, y){
        //recoger la textura por nombre en el diccionario
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    /**
     * Método parametrizado para gestionar el dibujado de una textura 'name' en la coord.(x,y) de un contexto dado 
     * @param {*} name 
     * @param {*} context 
     * @param {*} x 
     * @param {*} y 
     */
    drawTile(name, context, x, y) {
        //dibujar la textura 'name' en el contexto 'hoja de papel en la posición (x,y)
        this.draw(name, context, x*this.width, y*this.height);
    }
}