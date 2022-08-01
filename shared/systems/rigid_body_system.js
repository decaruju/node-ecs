export default class extends System {
    tick(ecs) {
        ecs.entitiesWithComponents(['RigidBody', 'Transform']).forEach((entity) => {
            entity.RigidBody.speed[0] += entity.RigidBody.acceleration[0];
            entity.RigidBody.speed[1] += entity.RigidBody.acceleration[1];
            entity.Transform.oldPosition[0] = entity.Transform.position[0] ;
            entity.Transform.oldPosition[1] = entity.Transform.position[1] ;
            entity.Transform.position[0] += entity.RigidBody.speed[0];
            entity.Transform.position[1] += entity.RigidBody.speed[1];
            entity.RigidBody.acceleration[0] = 0;
            entity.RigidBody.acceleration[1] = 0;
        });
    }
}
