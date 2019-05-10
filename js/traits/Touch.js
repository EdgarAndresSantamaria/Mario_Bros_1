import {Trait} from '../Entity.js';

export default class Touch extends Trait {
    constructor() {
        super('touch');
        this.obstructs = true;
    }

    onTouch(item) {
       
    }
}