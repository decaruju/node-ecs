import ecs from 'ecs';

export default class extends ecs.Listener {
    eventName = 'collision'

    handle(game, event) {
        if (event.params.entity1.hasComponent("DieOnCollision") && event.params.entity2.hasComponent("KillOnCollision") ||
            event.params.entity2.hasComponent("DieOnCollision") && event.params.entity1.hasComponent("KillOnCollision")) {
            game.entities = [];
            generateFunction(game);
            game.points = 0;
        }
    }
}
