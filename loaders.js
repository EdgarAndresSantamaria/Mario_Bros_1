import Level from './Level.js';
import SpriteSheet from './SpriteSheet.js'
import {createBackgroundLayer} from './layers.js';

export function loadImage(url){
    return new Promise (resolve => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.src=url;
    });
}

function loadJSON(url){
  return fetch(url).then((response)=>response.json());
}

function createTiles(level, backgrounds){
  let background
  for (var i=0;i<backgrounds.length;i++){
    background = backgrounds[i];
    var blocks= background.ranges
    for(var j=0;j<blocks.length;j++){
      var blockAct = blocks[j] ;
      var x=blockAct[0];
      var y=blockAct[2];
      for(var w=0;w<blockAct[1];w++){
        for(var z=0;z<blockAct[3];z++){
          level.tiles.set(x+w, y+z, {
          name: background.tile,
        });
       }
     }
    } 
  }
}

function loadSpriteSheet(){
       loadJSON('/sprites/sprites.json').then(sheetSpec => Promise.all([
       sheetSpec, 
       loadImage('/img/tiles.png')]))
       .then(([sheetSpec, image]) => {
       const sprites = new SpriteSheet(image,16,16);
       sheetSpec.tiles.forEach(element => {
         sprites.defineTile(element.name,element.index[0],element.index[1]);
       });
       return sprites;
    });
  }


export function loadLevel(){
    return loadJSON('/levels/level.json') // qué tiles hay que poner y dónde dentro de este nivel
    .then(levelSpec => Promise.all([
        levelSpec, 
        loadSpriteSheet(), // cargar imágenes de un spritesheet como sprites 
      ]))
        .then(([levelSpec, backgroundSprites]) => {
            const level = new Level();
            createTiles(level, levelSpec.backgrounds); // desplegar tiles en la estrucura Matrix

            const backgroundLayer = createBackgroundLayer(level, backgroundSprites); // cargar canvas
            level.background = backgroundLayer; // canvas buffer 

            return level;
    });
    
}
