export default class extends System {
    tick(ecs) {
        ecs.entitiesWithComponents(['KeyboardMovement']).forEach((entity) => {
            if (ecs.pressedKeys[39] && entity.Transform.position[0] < entity.KeyboardMovement.maxX) {
                    entity.Transform.position[0] += entity.KeyboardMovement.speed;
            }
            if (ecs.pressedKeys[37] && entity.Transform.position[0] > entity.KeyboardMovement.minX) {
                    entity.Transform.position[0] -= entity.KeyboardMovement.speed;
            }
        });
    }
}
