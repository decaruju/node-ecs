import ecs from 'ecs';

export default class extends ecs.System {
    tick(game) {
        game.entitiesWithComponents(["ControlledByKeyboard"]).forEach((entity) => {
            if (game.pressedKeys[37]) {
                entity.RigidBody.speed[0] = -8;
            } else if (game.pressedKeys[39]) {
                entity.RigidBody.speed[0] = 8;
            } else {
                entity.RigidBody.speed[0] = 0;
            }
        })
    }
}
