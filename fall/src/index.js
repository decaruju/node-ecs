import ecs from 'ecs';

import GameOverListener from './listeners/game_over_listener.js';
import PointListener from './listeners/point_listener.js';
import generateFunction from './level_generator.js';
import MovingSystem from './systems/moving_system.js';
import KeyboardSystem from './systems/keyboard_system.js';

const game = new ecs.Ecs(
    [
        new ecs.systems.CollisionSystem(),
        new ecs.systems.RigidBodySystem(),
        new ecs.systems.CanvasClearWebgl(),
        new ecs.systems.CanvasDrawQuadWebgl(),
        new ecs.systems.AnimationSystem(),
        new ecs.systems.FallSystem(),
        new MovingSystem(),
        new KeyboardSystem(),
    ],
    [
        new GameOverListener(),
        new PointListener(),
    ],
    {
        gl: ecs.initWebGl2D("#webglcanvas"),
        points: 0
    },
);

generateFunction(game);


function runOnce() {
    game.tick()
    if (!game.running) return;
    setTimeout(runOnce, 15);
    document.getElementById("score").innerText = game.points;
}


runOnce();
