//importar método de carga de nivel de la clase loaders.s
import {loadLevel} from './loaders.js';
import Timer from './Timer.js';
import {createMario} from './entities.js';
import {setupKeyboard} from './input.js';
import Camera from './Camera.js';
import {setupMouseControl} from './debug.js';
import {createCameraLayer} from './layers.js';

// declaración lienzo de pintura junro contexto de dibujado '2d'
// sobre ellos se dibujará el juego con resolución (300*300 px)  
// a 60 FPS 'frames per second' constantes.
const canvas = document.getElementById("Screen");
const context = canvas.getContext("2d");
context.scale(2,2)

//cargar nivel mediante la clase 'loaders' la cual devolvera el 'level' de juego cargado   
Promise.all([loadLevel('1-1'),createMario()]).then( ([level,mario]) => {

        mario.pos.set(64, 64);
        const camera = new Camera();
        window.camera = camera;

        level.entities.add(mario);
        const input = setupKeyboard(mario);
        input.listenTo(window);

        const input1 = setupMouseControl(canvas, mario, camera);
        input1.listenTo(window);
        
        level.comp.layers.push(createCameraLayer(camera));

        const timer = new Timer(1/60);
        timer.update = function update(deltaTime) {
                level.comp.draw(context,camera);
                level.update(deltaTime);
        }

        timer.start();
      
});




