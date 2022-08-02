import ecs from 'ecs';

export default class extends ecs.Listener {
    eventName = 'collision'

    handle(ecs, event) {
        if (event.params.entity1.hasComponent("BreakOnCollision")) {
            event.params.entity1.active = false;
        }
        if (event.params.entity2.hasComponent("BreakOnCollision")) {
            event.params.entity2.active = false;
        }
    }
}
