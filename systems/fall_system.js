import System from './system.js';

export default class extends System {
    tick(ecs) {
        ecs.entitiesWithComponents(['Fall', 'RigidBody']).forEach((entity1) => {
            entity1.RigidBody.acceleration[1] += entity1.Fall.acceleration;
        })
    }
}
