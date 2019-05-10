import {Trait} from '../Entity.js';
import {Vec2} from '../math.js';

export default class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.player = null;
        this.score = 0;
        this.time = 300;
        this.coins = 0;
        this.lives = 3;
        this.level = "";
    }


    setPlayer(entity) {
        this.player = entity;

        this.player.stomper.onStomp = () => {
            this.score += 100;
        }

        this.player.stomper.onDrop = () => {
            this.score += 25;
        }

        this.player.touch.onTouch = () => {
            this.score += 100;
            this.coins +=1;
        }
        this.player.killable.killScore = () => {
            this.score -= 25;
            this.lives -=0.25;
        }
    }


    update(entity, deltaTime, level) {
        if (!level.entities.has(this.player)) {
            this.player.killable.revive();
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level.entities.add(this.player);
        } else {
            this.time -= deltaTime * 2;
        }
    }
}
