import Ball from './entities/ball.js';
import Brick from './entities/brick.js';
import Wall from './entities/wall.js';
import Platform from './entities/platform.js';

import KeyboardMovement from './systems/keyboard_movement.js';
import CollisionSystem from '../shared/systems/collision_system.js';
import RigidBodySystem from '../shared/systems/rigid_body_system.js';
import CanvasClearWebgl from '../shared/systems/canvas_clear_webgl.js';
import CanvasDrawQuadWebgl from '../shared/systems/canvas_draw_quad_webgl.js';

import CircleCollider from '../shared/colliders/circle_collider.js';
import RectangleCollider from '../shared/colliders/rectangle_collider.js';
import PlatformCollider from './colliders/platform_collider.js';

import BreakOnCollisionListener from './listeners/break_on_collision_listener.js';

const canvas = document.body.appendChild(document.createElement('canvas'));

canvas.setAttribute('id', "webglcanvas");
canvas.setAttribute('height', 1000);
canvas.setAttribute('width', 1000);

const ecs = new Ecs(
    [
        new CollisionSystem(),
        new RigidBodySystem(),
        new CanvasClearWebgl(),
        new CanvasDrawQuadWebgl(),
        new KeyboardMovement(),
    ],
    [
        new BreakOnCollisionListener(),
    ],
    {
        gl: initWebGL2D("#webglcanvas"),
    },
);
ecs.addEntity(Ball, {Collider: {collider: new CircleCollider(5)}, Transform: {position: [150, 150]}, RigidBody: { speed: [3, 4]}, Sprite: {size: [10, 10], src: "../shared/resources/orb_blue.png"}})
ecs.addEntity(Platform, {Collider: {collider: new PlatformCollider(100, 20)}, Transform: {position: [100, 100]}, Sprite: {size: [100, 20], src: "../shared/resources/platform.png"}})
for (let i = 0; i < 50; i++) {
    ecs.addEntity(Wall, {Collider: {collider: new RectangleCollider(20, 20)}, Transform: {position: [10, i*20+10]}, Sprite: {size: [20, 20], src: "../shared/resources/wall.png" }});
    ecs.addEntity(Wall, {Collider: {collider: new RectangleCollider(20, 20)}, Transform: {position: [990, i*20+10]}, Sprite: {size: [20, 20], src: "../shared/resources/wall.png" }});
    ecs.addEntity(Wall, {Collider: {collider: new RectangleCollider(20, 20)}, Transform: {position: [i*20+10, 990]}, Sprite: {size: [20, 20], src: "../shared/resources/wall.png" }});
}
for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
        ecs.addEntity(Brick, {Collider: {collider: new RectangleCollider(40, 20)}, Transform: {position: [i*40+100+20*(j%2), 900-j*20]}, Sprite: {size: [38, 18], src: "../shared/resources/brick.png" }, CircleCollider: {radius: 30}});
    }
}

function runOnce() {
    ecs.tick()
    if (!ecs.running) return;
   setTimeout(runOnce, 15);
}

console.log(ecs)

runOnce();
