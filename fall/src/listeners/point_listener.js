import ecs from 'ecs';
import generateFunction from '../level_generator.js';

export default class extends ecs.Listener {
    eventName = 'collision'

    handle(game, event) {
        if (event.params.entity2.hasComponent("PointOnCollision") || event.params.entity1.hasComponent("PointOnCollision")) {
            game.points ++;
        }
        if (event.params.entity2.hasComponent("PointOnCollision")) {
            event.params.entity2.active = false
        }
        if (event.params.entity1.hasComponent("PointOnCollision")) {
            event.params.entity1.active = false
        }
    }
}
