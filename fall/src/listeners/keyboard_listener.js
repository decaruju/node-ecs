import ecs from 'ecs';

export default class extends ecs.Listener {
    eventName = 'keydown'

    handle(ecs, event) {
        ecs.entitiesWithComponents(["FlyOnKeydown"]).forEach((entity) => {
            if (entity.RigidBody.speed[1] < 5) {
                entity.RigidBody.speed[1] += 10
            }
        })
    }
}
