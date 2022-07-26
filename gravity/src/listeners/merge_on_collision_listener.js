import ecs from 'ecs';

export default class extends ecs.Listener {
    eventName = 'collision'

    handle(ecs, event) {
        if (event.params.entity1.hasComponent("MergeOnCollision") && event.params.entity2.hasComponent("MergeOnCollision")) {
            const entity1 = event.params.entity1;
            const entity2 = event.params.entity2;
            entity2.active = false;

            entity1.RigidBody.speed[0] = (entity2.RigidBody.speed[0]*entity2.Mass.mass + entity1.RigidBody.speed[0]*entity1.Mass.mass)/(entity1.Mass.mass+entity2.Mass.mass);
            entity1.RigidBody.speed[1] = (entity2.RigidBody.speed[1]*entity2.Mass.mass + entity1.RigidBody.speed[1]*entity1.Mass.mass)/(entity1.Mass.mass+entity2.Mass.mass);
            entity1.Mass.mass += entity2.Mass.mass;
            if (entity1.hasComponent("Circle") && entity2.hasComponent("Circle")) {
                entity1.Circle.radius = Math.sqrt(entity1.Circle.radius**2 +entity2.Circle.radius);
            }
            const newRadius = Math.sqrt(entity1.Collider.collider.radius**2 +entity2.Collider.collider.radius);
            entity1.Collider.collider.radius = newRadius;
            entity1.Animated.addAnimation('Sprite.size.0', newRadius*2, 100);
            entity1.Animated.addAnimation('Sprite.size.1', newRadius*2, 100);
        }
    }
}
