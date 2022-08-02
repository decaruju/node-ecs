import ecs from 'ecs';
import PointOnCollision from '../components/point_on_collision.js';

export default {
    name: "Gate",
    components: {
        Transform: ecs.components.Transform,
        Collider: ecs.components.Collider,
        RigidBody: ecs.components.RigidBody,
        PointOnCollision,
    },
    fields() {
        return {
            Collider: {isTrigger: true, collider: new ecs.colliders.RectangleCollider(40, 300)},
            RigidBody: { speed: [-4, 0]  }
        };
    },
}
