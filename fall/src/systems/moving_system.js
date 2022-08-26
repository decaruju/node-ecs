import ecs from 'ecs';

export default class extends ecs.System {
    tick(game) {
        game.entitiesWithComponents(["Moving"]).forEach((entity) => {
            entity.Transform.position[0] += entity.Moving.speed[0];
            entity.Transform.position[1] += entity.Moving.speed[1];
        })
    }
}
