import Level from './Level.js';
import SpriteSheet from './SpriteSheet.js'
import {createBackgroundLayer,createCharacterLayer,createCollisionLayer} from './layers.js';

/**
 * Método  público para generar la promesa de cargar la imagen dado path relativo 'url'
 * @param {*} url 
 */
export function loadImage(url){
    //devolver la promesa asíncrona de que se cargará la imagen 'url' en el 'src' de 'image' y se devolverá este al terminar
    return new Promise (resolve => {
      //inicializar imagen
      const image = new Image();
      //devolver imagen al cargarla
      image.addEventListener('load', () => resolve(image));
      //cargar 'src' de la imagen 'url'
      image.src=url;
    });
}

/**
 * Método para devolver la promesa 'fetch' de recoger una archivo JSON deade su path relativo 'url'
 * @param {*} url 
 */
function loadJSON(url){
  // devolver la promesa de que se cargara el archivo 'url' y se analizara 'parse' a formato JSON, este se devolverá como objeto
  return fetch(url).then((response)=>response.json());
}

/**
 * Metodo para generar la matriz 'tiles' del mapa e inicializando cada casilla con el nombre que debería según 'background'
 * @param {*} level 
 * @param {*} backgrounds 
 */
function createTiles(level, backgrounds){
    function applyRange(background, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; ++x) {
            for (let y = yStart; y < yEnd; ++y) {
                level.tiles.set(x, y, {
                    name: background.tile,
                    type: background.type,
                });
            }
        }
    }

    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(background, xStart, xLen, yStart, yLen);

            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyRange(background, xStart, xLen, yStart, 1);

            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1);
            }
        });
    });
}

/**
 * Método para generar la promesa de cargar el objeto 'SpriteSheet' para pintar texturas del 'background' mapa
 */
function loadBackground(name){
    // cargar el mpaeado de Sprites 'sprites.json' y la imagen con los sprites 'tiles.png'
    return loadJSON(`/sprites/${name}.json`)
    .then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL),
    ]))
     .then(([sheetSpec, image]) => {
       // generar nueva paleta de texturas con imagen 'tiles.png' y resolución (16*16 px)
       const sprites = new SpriteSheet(image,sheetSpec.tileW,sheetSpec.tileH);
       // por cada textura definida en la especificacion, definirla en la paleta
       sheetSpec.tiles.forEach(element => sprites.defineTile(element.name,element.index[0],element.index[1]));
       // devolver paleta de texturas
       return sprites;
    });
}

/**
 * Método para generar la promesa de cargar el objeto 'SpriteSheet' para pintar texturas del 'background' mapa
 */
export function loadMario(){
  // cargar el mpaeado de Sprites 'sprites.json' y la imagen con los sprites 'tiles.png'
   return  Promise.all([loadImage('../img/characters.gif')])
   // cuando este lista 
   .then(([image]) => {
     // generar nueva paleta de texturas con imagen 'tiles.png' y resolución (16*16 px)
     const sprites = new SpriteSheet(image,16,16);
     // por cada textura definida en la especificacion, definirla en la paleta
     sprites.define('idle',276,44,16,16)
     // devolver paleta de texturas
     return sprites;
  });
}

export function loadLuigi(){
    // cargar el mpaeado de Sprites 'sprites.json' y la imagen con los sprites 'tiles.png'
     return  Promise.all([loadImage('../img/characters.gif')])
     // cuando este lista 
     .then(([image]) => {
       // generar nueva paleta de texturas con imagen 'tiles.png' y resolución (16*16 px)
       const sprites = new SpriteSheet(image,16,16);
       // por cada textura definida en la especificacion, definirla en la paleta
       sprites.define('idle',276,106,16,16)
       // devolver paleta de texturas
       return sprites;
    });
  }

/**
 * Método para cargar el nivel, internamente gestionara la carga de los distintos módulos de manera asíncrona 'promise'
 * se cargará el mapa 'level.json' , y los elementos necesarios para pintar sus texturas 'loadSpriteSheet'
 */
export function loadLevel(name){
    // devolver la promesa de cargar nivel y paleta de texturas
    return loadJSON(`../levels/${name}.json`)
    .then(levelSpec => Promise.all([
        levelSpec,
        loadBackground(levelSpec.spriteSheet),
    ]))
        .then(([levelSpec, SpriteBackground]) => {
            // generar nuevo objeto nivel
            const level = new Level();
    
            // marcar las casillas 'level.tiles' del nivel con su correspondiente tipo 'levelSpec.backgrounds'
            createTiles(level, levelSpec.backgrounds); 
            // recoger imagen del fondo 'backgroundLayer' ya texturizada 'SpriteBackground' como especifica 'level.tiles'
            // guardar la imagen de fondo en el propio nivel para poder mostrarla a conveniencia 'level.background'
            level.comp.layers.push(createBackgroundLayer(level, SpriteBackground)); 
            level.comp.layers.push(createCharacterLayer(level.entities)); 
            level.comp.layers.push(createCollisionLayer(level));
        
            // devolver 'level'
            return level;
    });
    
}
