export default class extends System {
    tick(ecs) {
        console.log("in")
        ecs.entitiesWithComponents(['Collider']).forEach((entity1) => {
            ecs.entitiesWithComponents(['Collider']).forEach((entity2) => {
                if (entity1.id <= entity2.id) return;
                const closestPoint = entity2.Collider.collider.closestPoint(entity2.Transform.position, entity1.Transform.position);
                console.log(closestPoint, entity1.Transform.position);

                if (entity1.Collider.collider.containsPoint(entity1.Transform.position, closestPoint)) {
                    console.log('collision between', entity1.id, entity2.id);
                }
            });
        })
//        ecs.entitiesWithComponents(['CircleCollider']).forEach((entity1) => {
//            ecs.entitiesWithComponents(['CircleCollider']).forEach((entity2) => {
//                if (entity1.id <= entity2.id) return;
//                const position1 = entity1.Transform.position;
//                const position2 = entity2.Transform.position;
//                const distance2 = (position1[0]-position2[0])**2+(position1[1]-position2[1])**2
//                if (distance2 < (entity1.CircleCollider.radius + entity2.CircleCollider.radius)**2) {
//                    ecs.events.push(new Event("collision", {entity1, entity2}))
//                    const distance = Math.sqrt(distance2);
//                    if (distance == 0) return;
//                    const midpointx = (entity1.Transform.position[0] + entity2.Transform.position[0]) / 2;
//                    const midpointy = (entity1.Transform.position[1] + entity2.Transform.position[1]) / 2;
//
//                    const xRatio = (entity1.Transform.position[0] - entity2.Transform.position[0])/distance;
//                    const yRatio = (entity1.Transform.position[1] - entity2.Transform.position[1])/distance;
//                    const p = 2 * (entity1.RigidBody.speed[0] * xRatio + entity1.RigidBody.speed[1] * yRatio - entity2.RigidBody.speed[0] * xRatio - entity2.RigidBody.speed[1] * yRatio)/(entity1.Mass.mass + entity2.Mass.mass);
//
//                    entity1.RigidBody.speed[0] = (entity1.RigidBody.speed[0] - p * entity2.Mass.mass * xRatio);
//                    entity1.RigidBody.speed[1] = (entity1.RigidBody.speed[1] - p * entity2.Mass.mass * yRatio);
//                    entity2.RigidBody.speed[0] = (entity2.RigidBody.speed[0] + p * entity1.Mass.mass * xRatio);
//                    entity2.RigidBody.speed[1] = (entity2.RigidBody.speed[1] + p * entity1.Mass.mass * yRatio);
//                    entity1.RigidBody.acceleration[0] = 0;
//                    entity1.RigidBody.acceleration[1] = 0;
//                    entity2.RigidBody.acceleration[0] = 0;
//                    entity2.RigidBody.acceleration[1] = 0;
//                }
//            });
//            ecs.entitiesWithComponents(['HalfPlaneCollider']).forEach((entity2) => {
//                const p0 = entity1.Transform.position;
//                const [p1, p2] = entity2.HalfPlaneCollider.points
//                const distanceToLine = ((p2[0]-p1[0])*(p1[1]-p0[1]) - (p1[0]-p0[0])*(p2[1]-p1[1]))/Math.sqrt((p2[0]-p1[0])**2+(p2[1]-p1[1])**2)
//                if (distanceToLine < entity1.CircleCollider.radius) {
//                    const size = Math.sqrt((p1[0]-p2[0])**2+(p1[1]-p2[1])**2);
//                    const perpX = -(p2[1]-p1[1])/size;
//                    const perpY = (p2[0]-p1[0])/size;
//                    const dotProduct = perpX*entity1.RigidBody.speed[0] + perpY*entity1.RigidBody.speed[1];
//
//
//                    entity1.Transform.position[0] += perpX*distanceToLine/(perpX+perpY);
//                    entity1.Transform.position[1] += perpY*distanceToLine/(perpX+perpY);
//                    entity1.RigidBody.speed[0] += 2*dotProduct*perpX;
//                    entity1.RigidBody.speed[1] += 2*dotProduct*perpY;
//                }
//            });
//        });
    }
}
