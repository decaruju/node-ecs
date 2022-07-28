export default class extends Listener {
    eventName = 'collision'

    handle(ecs, event) {
        if (event.params.entity1.hasComponent("MergeOnCollision") && event.params.entity2.hasComponent("MergeOnCollision")) {
            const entity1 = event.params.entity1;
            const entity2 = event.params.entity2;
            entity2.active = false;

            entity1.RigidBody.speed[0] = (entity2.RigidBody.speed[0]*entity2.Mass.mass + entity1.RigidBody.speed[0]*entity1.Mass.mass)/(entity1.Mass.mass+entity2.Mass.mass);
            entity1.RigidBody.speed[1] = (entity2.RigidBody.speed[1]*entity2.Mass.mass + entity1.RigidBody.speed[1]*entity1.Mass.mass)/(entity1.Mass.mass+entity2.Mass.mass);
            entity1.Mass.mass += entity2.Mass.mass;
            entity1.Circle.radius = Math.sqrt(entity1.Circle.radius**2 +entity2.Circle.radius);
            entity1.CircleCollider.radius = Math.sqrt(entity1.CircleCollider.radius**2 +entity2.CircleCollider.radius);
        }
    }
}
