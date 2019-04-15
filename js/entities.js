import Entity from './Entity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import {loadMario, loadLuigi} from './loaders.js';

export function createMario() {
    return loadMario()
    .then(sprite => {
        const mario = new Entity();
        mario.size.set(16, 16);
         
        mario.addTrait(new Jump());
        //mario.addTrait(new Velocity());
        
 	    mario.addTrait(new Go());

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, 0, 0);
        }

        return mario;
    });
}

export function createLuigi(){
    return loadLuigi()
    .then(sprite => {
        const mario = new Entity();
        mario.size.set(16, 16);
         
        mario.addTrait(new Jump());
        //mario.addTrait(new Velocity());
        
 	    mario.addTrait(new Go());

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, 0, 0);
        }

        return mario;
    });
}
