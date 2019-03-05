//importar método de carga de nivel de la clase loaders.s
import {loadLevel} from './loaders.js';

// declaración lienzo de pintura junro contexto de dibujado '2d'
// sobre ellos se dibujará el juego con resolución (300*300 px)  
// a 60 FPS 'frames per second' constantes.
const canvas = document.getElementById("Screen");
const context = canvas.getContext("2d");
context.scale(2,2)
console.log(canvas.width)
console.log(canvas.length)
//iniciar offset 
let offset = 0;
//cargar nivel mediante la clase 'loaders' la cual devolvera el 'level' de juego cargado   
loadLevel().then( level => {
        var offset=0;
        // llamar periodicamente a 'level' draw' para mostrar el nivel a 60 fps
        var reloj = setInterval(function(){level.draw(context, offset)},1000/60);
        
        // código para:
        // desplazar mapa a la derecha
        // offset += 10  
        // desplazar mapa a la izquierda
        // offset -= 10  
       
        //gestor de input teclado, detecta cuando se presionan teclas y se gestionan sus funciones
        window.onkeyup = function(e) {
                var key = e.keyCode ? e.keyCode : e.which;
                /** (ke 'IDs')
                   Left: 37
                   Up: 38
                   Right: 39
                   Down: 40
                */
                if (key == 39) {
                        //mover mapa 'offset' derecha 'right' 'arrow'
                        offset += 10;
                }else if (key == 37) {
                        //mover mapa 'offset' izquierda 'left' 'arrow'
                        offset -= 10;
                }else if (key == 38) {
                        //saltar
                }else if (key == 37) {
                        //parar
                }
        }
});




