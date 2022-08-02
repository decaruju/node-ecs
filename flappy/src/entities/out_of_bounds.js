import ecs from 'ecs';
import KillOnCollision from '../components/kill_on_collision.js';

export default {
    name: "OutOfBounds",
    components: {
        Transform: ecs.components.Transform,
        Collider: ecs.components.Collider,
        KillOnCollision,
    },
    fields() {
        return {
            Collider: {isTrigger: true, collider: new ecs.colliders.RectangleCollider(1000, 100)},
        };
    },
}
