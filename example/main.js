import Particle from './entities/particle.js';
import Blackhole from './entities/blackhole.js';
import HalfPlane from './entities/half_plane.js';

import CanvasClearSystem from './systems/canvas_clear_system.js';
import CircleCanvasSystem from './systems/circle_canvas_system.js';
import RigidBodySystem from './systems/rigid_body_system.js';
import GravitySystem from './systems/gravity_system.js';
import BoundingBoxSystem from './systems/bounding_box_system.js';
import KeyboardMovementSystem from './systems/keyboard_movement_system.js';
import CollisionSystem from './systems/collision_system.js';
import CanvasClearWebgl from './systems/canvas_clear_webgl.js';
import CanvasDrawQuadWebgl from './systems/canvas_draw_quad_webgl.js';
import AnimationSystem from './systems/animation_system.js';

import KeyboardDashListener from './listeners/keyboard_dash_listener.js';
import MergeOnCollisionListener from './listeners/merge_on_collision_listener.js';

const canvas = document.body.appendChild(document.createElement('canvas'));

canvas.setAttribute('id', "webglcanvas");
canvas.setAttribute('height', 1000);
canvas.setAttribute('width', 1000);

const ecs = new Ecs(
    [
        new CollisionSystem(),
        new RigidBodySystem(),
        new GravitySystem(),
        new BoundingBoxSystem(),
        new KeyboardMovementSystem(),
        new CanvasClearWebgl(),
        new CanvasDrawQuadWebgl(),
        new AnimationSystem(),
    ],
    [new KeyboardDashListener(), new MergeOnCollisionListener()],
    {
        gl: initWebGl2D("#webglcanvas"),
        config: {
            canvasColor: '#2E3440',
        },
    },
);
Array.apply(null, Array(40)).forEach(() => ecs.addEntity(Particle, {Color: {color: '#9090CC'}, Sprite: { src:  "resources/orb_blue.png" }, Transform: {position: [Math.random()*1000, Math.random()*1000]}, RigidBody: {speed: [0, 0]}, CircleCollider: { radius: 5 }, Mass: {mass: 0.1}}))
ecs.addEntity(Blackhole, {Transform: {position: [500, 500]}, Mass: {mass: 100}, Sprite: {size: [60, 60], src: "resources/orb_blue.png" }, CircleCollider: {radius: 30}});
ecs.addEntity(HalfPlane, {HalfPlaneCollider: {points: [[0, 600], [800, 600]]}});
//ecs.addEntity(HalfPlane, {HalfPlaneCollider: {points: [[800, 200], [0, 200]]}});

function runOnce() {
    ecs.tick()
    if (!ecs.running) return;
   setTimeout(runOnce, 15);
}


runOnce();
