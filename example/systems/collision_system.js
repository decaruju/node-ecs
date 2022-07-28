export default class extends System {
    tick(ecs) {
        ecs.entitiesWithComponents(['CircleCollider']).forEach((entity1) => {
            ecs.entitiesWithComponents(['CircleCollider']).forEach((entity2) => {
                if (entity1.id <= entity2.id) return;
                const position1 = entity1.Transform.position;
                const position2 = entity2.Transform.position;
                const distance2 = (position1[0]-position2[0])**2+(position1[1]-position2[1])**2
                if (distance2 < (entity1.CircleCollider.radius + entity2.CircleCollider.radius)**2) {
                    ecs.events.push(new Event("collision", {entity1, entity2}))
                    const distance = Math.sqrt(distance2);
                    if (distance == 0) return;
                    const midpointx = (entity1.Transform.position[0] + entity2.Transform.position[0]) / 2;
                    const midpointy = (entity1.Transform.position[1] + entity2.Transform.position[1]) / 2;

                    const xRatio = (entity1.Transform.position[0] - entity2.Transform.position[0])/distance;
                    const yRatio = (entity1.Transform.position[1] - entity2.Transform.position[1])/distance;
                    const p = 2 * (entity1.RigidBody.speed[0] * xRatio + entity1.RigidBody.speed[1] * yRatio - entity2.RigidBody.speed[0] * xRatio - entity2.RigidBody.speed[1] * yRatio)/(entity1.Mass.mass + entity2.Mass.mass);

                    // entity1.Transform.position[0] = midpointx + entity1.CircleCollider.radius * (entity1.Transform.position[0] - entity2.Transform.position[0])/distance; //
                    // entity1.Transform.position[1] = midpointy + entity1.CircleCollider.radius * (entity1.Transform.position[1] - entity2.Transform.position[1])/distance; //
                    // entity2.Transform.position[0] = midpointx + entity2.CircleCollider.radius * (entity2.Transform.position[0] - entity1.Transform.position[0])/distance; //
                    // entity2.Transform.position[1] = midpointy + entity2.CircleCollider.radius * (entity2.Transform.position[1] - entity1.Transform.position[1])/distance; //

                    entity1.RigidBody.speed[0] = (entity1.RigidBody.speed[0] - p * entity2.Mass.mass * xRatio);
                    entity1.RigidBody.speed[1] = (entity1.RigidBody.speed[1] - p * entity2.Mass.mass * yRatio);
                    entity2.RigidBody.speed[0] = (entity2.RigidBody.speed[0] + p * entity1.Mass.mass * xRatio);
                    entity2.RigidBody.speed[1] = (entity2.RigidBody.speed[1] + p * entity1.Mass.mass * yRatio);
                    entity1.RigidBody.acceleration[0] = 0;
                    entity1.RigidBody.acceleration[1] = 0;
                    entity2.RigidBody.acceleration[0] = 0;
                    entity2.RigidBody.acceleration[1] = 0;
                }
            });
        });
    }
}
