import Particle from './entities/particle.js';
import Blackhole from './entities/blackhole.js';
import ColorSpeedSystem from './systems/color_speed_system.js';
import CanvasClearSystem from './systems/canvas_clear_system.js';
import PointCanvasSystem from './systems/point_canvas_system.js';
import CircleCanvasSystem from './systems/circle_canvas_system.js';
import RigidBodySystem from './systems/rigid_body_system.js';
import GravitySystem from './systems/gravity_system.js';

const canvas = document.body.appendChild(document.createElement('canvas'));

canvas.setAttribute('height', 1000);
canvas.setAttribute('width', 1000);
const entities = Array.apply(null, Array(10000)).map(() => new Entity(Particle, {Transform: {position: [100+Math.random()*400, 500]}, RigidBody: {speed: [0, Math.random()+1]}, Mass: {mass: 0}}))
console.log(entities)
const ecs = new Ecs(
    [
        ...entities,
        new Entity(Blackhole, {Transform: {position: [500, 500]}, Mass: {mass: 2000}, Color: {color: "#000000"}}),
    ],
    [new CanvasClearSystem(), new PointCanvasSystem(), new CircleCanvasSystem(), new RigidBodySystem(), new GravitySystem(), new ColorSpeedSystem()],
    {
        canvas,
    },
);
console.log(ecs)

function runOnce() {
    ecs.tick()
    if (!ecs.running) return;
    setTimeout(runOnce, 0);
}

runOnce();
