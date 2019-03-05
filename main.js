import {loadLevel} from './loaders.js';


const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

let offset = 0;
loadLevel().
    then( level => {
            level.draw(context, 0);
            level.tiles.forEach(console.log);
            // código del ejercicio 6 
        
            var fps=60;
            //lamar periodicamente a draw
            var reloj = setInterval(level.draw,1000/fps);
        
        // código del ejercicio 11
        // Añadir el código necesario para desplazar (scroll) el background del nivel 
        // hacia la izquierda. Se puede hacer en una sóla línea
        // Piensa cómo llamar periódicamente al método level.draw y con qué parámetros...
        //
        //
        //
        // código del ejercicio 12
        // COMENTA el código del ejercicio 11. A continuación indica aquí
        // el código que permite desplazar el background hacia la izquierda o hacia 
        // la derecha pulsando las teclas flecha izquierda y flecha derecha.
       });


