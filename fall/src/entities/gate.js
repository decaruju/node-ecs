import ecs from 'ecs';
import PointOnCollision from '../components/point_on_collision.js';
import Moving from '../components/moving.js';

export default {
    name: "Gate",
    components: {
        Transform: ecs.components.Transform,
        Collider: ecs.components.Collider,
        PointOnCollision,
    },
    fields() {
        return {
            Collider: {isTrigger: true, collider: new ecs.colliders.RectangleCollider(40, 1000)},
            Moving: { speed: [0, 4]  }
        };
    },
}
