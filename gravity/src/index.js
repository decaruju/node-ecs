import ecs from 'ecs';
import Particle from './entities/particle.js';
import Blackhole from './entities/blackhole.js';

import GravitySystem from './systems/gravity_system.js';
import BoundingBoxSystem from './systems/bounding_box_system.js';

import MergeOnCollisionListener from './listeners/merge_on_collision_listener.js';

const game = new ecs.Ecs(
    [
        new ecs.systems.CollisionSystem(),
        new ecs.systems.RigidBodySystem(),
        new ecs.systems.CanvasClearWebgl(),
        new ecs.systems.CanvasDrawQuadWebgl(),
        new ecs.systems.AnimationSystem(),
        new GravitySystem(),
        new BoundingBoxSystem(),
    ],
    [new MergeOnCollisionListener()],
    {
        gl: ecs.initWebGl2D("#webglcanvas"),
    },
);

Array.apply(null, Array(100)).forEach(() => {
    game.addEntity(
        Particle, {
            Transform: {position: [Math.random()*1000, Math.random()*1000]},
        },
    )
});
game.addEntity(Blackhole, {Transform: {position: [500, 500]}});

function runOnce() {
    game.tick()
    if (!game.running) return;
    setTimeout(runOnce, 15);
}


runOnce();
