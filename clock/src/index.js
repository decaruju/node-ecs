import ecs from 'ecs';

import './entities.js';
import './components.js';

import KeyboardListener from './listeners/keyboard_listener.js';
import GameOverListener from './listeners/game_over_listener.js';
import PointListener from './listeners/point_listener.js';

const game = new ecs.Ecs(
    [
        new ecs.systems.RigidBodySystem(),
        new ecs.systems.CanvasClearWebgl(),
        new ecs.systems.CanvasDrawQuadWebgl(),
        new ecs.systems.AnimationSystem(),
        new ecs.systems.FallSystem(),
    ],
    [
        new KeyboardListener(),
        new GameOverListener(),
        new PointListener(),
    ],
    {
        gl: ecs.initWebGl2D("#webglcanvas"),
    },
);

game.buildEntity("Ground");
game.buildEntity("Sun");

console.log(game);


function runOnce() {
    game.tick()
    if (!game.running) return;
    setTimeout(runOnce, 15);
}


runOnce();
