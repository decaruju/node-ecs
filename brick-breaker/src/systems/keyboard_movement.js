import ecs from 'ecs';

export default class extends ecs.System {
    tick(game) {
        game.entitiesWithComponents(['KeyboardMovement']).forEach((entity) => {
            if (game.pressedKeys[39] && entity.Transform.position[0] < entity.KeyboardMovement.maxX) {
                    entity.Transform.position[0] += entity.KeyboardMovement.speed;
            }
            if (game.pressedKeys[37] && entity.Transform.position[0] > entity.KeyboardMovement.minX) {
                    entity.Transform.position[0] -= entity.KeyboardMovement.speed;
            }
        });
    }
}
