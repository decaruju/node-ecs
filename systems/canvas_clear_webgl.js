import System from './system.js';

export default class extends System {
    priority = 0;

    tick(ecs) {
        ecs.gl.clearCanvas()
    }
}
