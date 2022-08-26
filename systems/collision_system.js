import System from './system.js';

export default class extends System {
    tick(ecs) {
        ecs.entitiesWithComponents(['Collider']).forEach((entity1) => {
            ecs.entitiesWithComponents(['Collider', 'RigidBody']).forEach((entity2) => {
                if (entity1.id == entity2.id) return;
                if (entity1.Collider.collider === null || entity2.Collider.collider === null) return;
                const closestPoint = entity2.Collider.collider.closestPoint(entity2.Transform.position, entity1.Transform.position);
                if (entity1.Collider.collider.containsPoint(entity1.Transform.position, closestPoint)) {
                    ecs.events.push({eventName: "collision", params: {entity1, entity2}})
                    if (entity1.Collider.isTrigger || entity2.Collider.isTrigger) return;
                    const normal = entity1.Collider.collider.normal(entity1.Transform.position, closestPoint, entity2.Transform.oldPosition);
                    if (normal[0] == 0 && normal[1] == 0) {
                    } else {
                        const normalisedNormal = normalise(normal);
                        const dotProduct = normalisedNormal[0]*entity2.RigidBody.speed[0] + normalisedNormal[1]*entity2.RigidBody.speed[1];
                        entity2.RigidBody.speed[0] -= 2*dotProduct*normalisedNormal[0];
                        entity2.RigidBody.speed[1] -= 2*dotProduct*normalisedNormal[1];
                        const totalSpeed = Math.sqrt(entity2.RigidBody.speed[0]**2+entity2.RigidBody.speed[1]**2);
                        entity2.Transform.position[0] += normal[0];
                        entity2.Transform.position[1] += normal[1];
                        if (entity1.hasComponent("Moving")) {
                            entity2.Transform.position[0] += entity1.Moving.speed[0];
                            entity2.Transform.position[1] += entity1.Moving.speed[1];
                        }
                    }
                    return
                }
            });
        })
    }
}

function normalise(c) {
    const size = Math.sqrt(c[0]**2+c[1]**2);
    return [
        c[0]/size,
        c[1]/size,
    ];
}
