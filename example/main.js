import Particle from './entities/particle.js';
import Blackhole from './entities/blackhole.js';

import CanvasClearSystem from './systems/canvas_clear_system.js';
import CircleCanvasSystem from './systems/circle_canvas_system.js';
import RigidBodySystem from './systems/rigid_body_system.js';
import GravitySystem from './systems/gravity_system.js';
import BoundingBoxSystem from './systems/bounding_box_system.js';
import KeyboardMovementSystem from './systems/keyboard_movement_system.js';
import CollisionSystem from './systems/collision_system.js';

import KeyboardDashListener from './listeners/keyboard_dash_listener.js';
import MergeOnCollisionListener from './listeners/merge_on_collision_listener.js';

const canvas = document.body.appendChild(document.createElement('canvas'));

canvas.setAttribute('height', 1000);
canvas.setAttribute('width', 1000);
const particles = Array.apply(null, Array(400)).map(() => new Entity(Particle, {Color: {color: '#9090CC'}, Transform: {position: [Math.random()*1000, Math.random()*1000]}, RigidBody: {speed: [0, 0]}, Circle: { radius: 1 }, CircleCollider: { radius: 1 }, Mass: {mass: 0.1}}))

const ecs = new Ecs(
    [
        ...particles,
        new Entity(Blackhole, {Transform: {position: [500, 500]}, Mass: {mass: 100}, Circle: {radius: 30}, CircleCollider: {radius: 30}}),
        new Entity(Blackhole, {Transform: {position: [600, 500]}, Mass: {mass: 100}, Circle: {radius: 30}, CircleCollider: {radius: 30}}),
    ],
    [new CollisionSystem(), new CanvasClearSystem(), new CircleCanvasSystem(), new RigidBodySystem(), new GravitySystem(), new BoundingBoxSystem(), new KeyboardMovementSystem()],
    [new KeyboardDashListener(), new MergeOnCollisionListener()],
    {
        canvas,
        config: {
            canvasColor: '#2E3440',
        },
    },
);

function runOnce() {
    ecs.tick()
    if (!ecs.running) return;
   setTimeout(runOnce, 15);
}

console.log(ecs)

runOnce();
