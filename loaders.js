import Level from './Level.js';
import SpriteSheet from './SpriteSheet.js'
import {createBackgroundLayer} from './layers.js';

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
  // crear contenedor para el idcada tipo de textura
  let background
  // recorrer 'backgrounds' (sky,ground)
  for (var i=0;i<backgrounds.length;i++){
    // recoger el actual 
    background = backgrounds[i];
    // recoger distintas coordenadas 'background.ranges' a marcar con 'ID' 'background.tile'
    // la estructura se define en archivo 'levels.json'
    var blocks= background.ranges
    // recorrer las distintas áreas a marcar
    for(var j=0;j<blocks.length;j++){
      // recoger área actual
      var blockAct = blocks[j] ;
      // tomar coordenadas iniciales (x,y) del área 'blockAct[0]' 'blockAct[2]'
      var x=blockAct[0];
      var y=blockAct[2];
      // recorrer 'offset' (x,y) , es decir, hasta 'blockAct[1]' 'blockAct[3]'  
      for(var w=0;w<blockAct[1];w++){
        for(var z=0;z<blockAct[3];z++){
          // inicializar nombre a 'background.tile' para cada casilla (x0 + offsetx, y0 + offsety) 
          level.tiles.set(x+w, y+z, {name: background.tile});
       }
     }
    } 
  }
}

/**
 * Método para generar la promesa de cargar el objeto 'SpriteSheet' para pintar texturas del mapa
 */
function loadSpriteSheet(){
    // cargar el mpaeado de Sprites 'sprites.json' y la imagen con los sprites 'tiles.png'
     return  Promise.all([loadJSON('/sprites/sprites.json'), loadImage('/img/tiles.png')])
     // cuando este lista 
     .then(([sheetSpec, image]) => {
       // generar nueva paleta de texturas con imagen 'tiles.png' y resolución (16*16 px)
       const sprites = new SpriteSheet(image,16,16);
       // por cada textura definida en la especificacion, definirla en la paleta
       sheetSpec.tiles.forEach(element => sprites.defineTile(element.name,element.index[0],element.index[1]));
       // devolver paleta de texturas
       return sprites;
    });
}

/**
 * Método para cargar el nivel, internamente gestionara la carga de los distintos módulos de manera asíncrona 'promise'
 * se cargará el mapa 'level.json' , y los elementos necesarios para pintar sus texturas 'loadSpriteSheet'
 */
export function loadLevel(){
    // devolver la promesa de cargar nivel y paleta de texturas
    return Promise.all([loadJSON('/levels/level.json'), loadSpriteSheet()])
        // cuando esté cargada
        .then(([levelSpec, SpritePalette]) => {
            // generar nuevo objeto nivel
            const level = new Level();
            // marcar las casillas 'level.tiles' del nivel con su correspondiente tipo 'levelSpec.backgrounds'
            createTiles(level, levelSpec.backgrounds); 
            // recoger imagen del fondo 'backgroundLayer' ya texturizada 'SpritePalette' como especifica 'level.tiles'
            const backgroundLayer = createBackgroundLayer(level, SpritePalette); 
            // guardar la imagen de fondo en el propio nivel para poder mostrarla a conveniencia 'level.background'
            level.background = backgroundLayer;
            // devolver 'level'
            return level;
    });
    
}
