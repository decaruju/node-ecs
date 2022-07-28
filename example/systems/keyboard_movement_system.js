export default class extends System {
    priority = 0;

    tick(ecs) {
        ecs.entitiesWithComponents(['KeyboardMovement']).forEach(entity => {
            let acceleration = entity.KeyboardMovement.acceleration;
            if ((ecs.pressedKeys[38] || ecs.pressedKeys[40]) && (ecs.pressedKeys[36] || ecs.pressedKeys[37])) {
                acceleration *= 0.707;
            }
            if (ecs.pressedKeys[39] && entity.RigidBody.speed[0] < entity.KeyboardMovement.maxSpeed) {
                    entity.RigidBody.acceleration[0] += acceleration;
            }
            if (ecs.pressedKeys[37] && entity.RigidBody.speed[0] > -entity.KeyboardMovement.maxSpeed) {
                    entity.RigidBody.acceleration[0] -= acceleration;
            }
            if (ecs.pressedKeys[38] && entity.RigidBody.speed[1] > -entity.KeyboardMovement.maxSpeed) {
                    entity.RigidBody.acceleration[1] -= acceleration;
            }
            if (ecs.pressedKeys[40] && entity.RigidBody.speed[1] < entity.KeyboardMovement.maxSpeed) {
                    entity.RigidBody.acceleration[1] += acceleration;
            }
        });
    }
}
