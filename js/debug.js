import Keyboard from './KeyboardState.js';

export function setupMouseControl(canvas, entity, camera) {
    let lastEvent;
    const input = new Keyboard();
    let shift ;

    input.addMapping('ShiftLeft', keyState => {
        shift=keyState;
        console.log(shift);
    });

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if ((event.buttons === 1 && shift)
            && lastEvent && (lastEvent.buttons === 1 && shift)
            && lastEvent.type === 'mousemove') {

                camera.pos.x -= event.offsetX - lastEvent.offsetX;
            }else  if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(
                    event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y);
            }
            lastEvent = event;
        });
    });

     input.addMapping('ArrowRight', keyState => {
        entity.go.dir = keyState;
    });

    canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    return input;
}
