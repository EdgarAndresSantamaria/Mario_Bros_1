import TileResolver from './TileResolver.js';
import {Sides} from './Entity.js';

export default class TileCollider {
    constructor(tileMatrix, level) {
        this.tiles = new TileResolver(tileMatrix);
        this.level = level;
    }

    checkX(entity) {
        let x;
        if (entity.vel.x > 0) {
            x = entity.bounds.right;
        } else if (entity.vel.x < 0) {
            x = entity.bounds.left;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(
            x, x,
            entity.bounds.top, entity.bounds.bottom);

        matches.forEach(match => {
            if(match.tile.type !== 'ground'){
              
                if (match.tile.type == 'chance') {
                    this.tiles.addCoin( match.x1,  match.y1);
                    this.level.comp.resolvers[1].addCoin( match.x1,  match.y1);
                }else if(match.tile.type == 'prize'){
                    entity.touch.onTouch(match.tile.type);
                    this.tiles.delete( match.x1,  match.y1);
                    this.level.comp.resolvers[1].delete( match.x1,  match.y1);
                }else {
                    return;
                }
            }

            if (entity.vel.x > 0) {
                if (entity.bounds.right > match.x1) {
                    entity.obstruct(Sides.RIGHT, match);
                }
            } else if (entity.vel.x < 0) {
                if (entity.bounds.left < match.x2) {
                    entity.obstruct(Sides.LEFT, match);
                }
            }
        });
    }

    checkY(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.bounds.bottom;
        } else if (entity.vel.y < 0) {
            y = entity.bounds.top;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(
            entity.bounds.left, entity.bounds.right,
            y, y);

        matches.forEach(match => {
            if(match.tile.type !== 'ground'){
                  
                if (match.tile.type == 'chance') {
                    this.tiles.addCoin( match.x1,  match.y1);
                    this.level.comp.resolvers[1].addCoin( match.x1,  match.y1);
                }else if(match.tile.type == 'prize'){
                    entity.touch.onTouch(match.tile.type);
                    this.tiles.delete( match.x1,  match.y1);
                    this.level.comp.resolvers[1].delete( match.x1,  match.y1);
                }else{
                    return;
                }
            }


            if (entity.vel.y > 0) {
                if (entity.bounds.bottom > match.y1) {
                    entity.obstruct(Sides.BOTTOM, match);
                }
            } else if (entity.vel.y < 0) {
                if (entity.bounds.top < match.y2) {
                    entity.obstruct(Sides.TOP, match);
                }
            }
        });
    }

    getResolver(){
        return this.tiles;
    }
}
