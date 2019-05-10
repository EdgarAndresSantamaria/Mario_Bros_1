export default class Compositor {
    constructor() {
        this.layers = [];
        this.resolvers = [];
    }

    draw(context, camera) {
        this.layers.forEach(layer => {
            layer(context, camera);
        });
    }
}
