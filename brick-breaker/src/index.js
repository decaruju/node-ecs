import ecs from 'ecs';

import Ball from './entities/ball.js';
import Brick from './entities/brick.js';
import Wall from './entities/wall.js';
import Platform from './entities/platform.js';

import KeyboardMovement from './systems/keyboard_movement.js';

import BreakOnCollisionListener from './listeners/break_on_collision_listener.js';

const game = new ecs.Ecs(
    [
        new ecs.systems.CollisionSystem(),
        new ecs.systems.RigidBodySystem(),
        new ecs.systems.CanvasClearWebgl(),
        new ecs.systems.CanvasDrawQuadWebgl(),
        new KeyboardMovement(),
    ],
    [
        new BreakOnCollisionListener(),
    ],
    {
        gl: ecs.initWebGl2D("#webglcanvas"),
    },
);

game.addEntity(Ball)
game.addEntity(Platform)
for (let i = 0; i < 50; i++) {
    game.addEntity(Wall, {Transform: {position: [10, i*20+10]}});
    game.addEntity(Wall, {Transform: {position: [990, i*20+10]}});
    game.addEntity(Wall, {Transform: {position: [i*20+10, 990]}});
}
for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
        game.addEntity(Brick, {Transform: {position: [i*40+100+20*(j%2), 900-j*20]} });
    }
}

function runOnce() {
    game.tick()
    if (!game.running) return;
   setTimeout(runOnce, 15);
}

runOnce();
