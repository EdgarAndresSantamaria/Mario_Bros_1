/**
 * Método público para dibujar el fondo de un nivel y devolverlo en un contenedor de texturas 'canvas' (lienzo)
 * @param {*} level 
 * @param {*} sprites 
 */
export function createBackgroundLayer(level, sprites){
    // crear lienzo contenedor de texturas
    const buffer = document.createElement('canvas');
    // determinar dimensiones del fondo (2048*240 px)
    buffer.width = 640;
    buffer.height = 640;
    //  recoger contexto de dibujo '2d'
    const context = buffer.getContext("2d");
    // Por cada 'tile'  del 'level' situado en (x,y)
    // dibujar dicho 'tile' (bloque del mapa) en el contexto de buffer, haciendo uso del método drawTile del objeto sprites 'SpriteSheet'   
    for(var x=0;x<level.tiles.grid.length;x++){
        for(var y=0;y<level.tiles.grid[x].length;y++){
            // dibujar bloque (x,y) del contexto con el nombre de dicho bloque según mapa de diseño del mapa 'level.tiles'
            sprites.drawTile(level.tiles.get(x,y).name,context,x,y)
        }
    }
    // devolver contenedor de texturas
    return buffer;
} 