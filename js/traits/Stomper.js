import {Sides, Trait} from '../Entity.js';
import {STATE_PANIC} from '../entities/Koopa.js';

export default class Stomper extends Trait {
    constructor() {
        super('stomper');
        this.bounceSpeed = 400;

        this.onStomp = function() {
        }

        this.onDrop = function() {
        
        }
    }

    bounce(us, them) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    collides(us, them) {
        
        if (!them.killable || them.killable.dead) {
            return;
        }

        if(them.behavior.state === STATE_PANIC){
            them.onDrop = (us,them) => this.onDrop(us,them);  
        }
       
        if (us.vel.y > them.vel.y) {
            this.bounce(us, them);
            this.onStomp(us, them);
        }
    }
}
