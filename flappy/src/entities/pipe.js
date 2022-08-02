import ecs from 'ecs';
import KillOnCollision from '../components/kill_on_collision.js';

export default {
    name: "Pipe",
    components: {
        Sprite: ecs.components.Sprite,
        Animated: ecs.components.Animated,
        Transform: ecs.components.Transform,
        Collider: ecs.components.Collider,
        RigidBody: ecs.components.RigidBody,
        KillOnCollision,
    },
    fields() {
        return {
            Sprite: { src:  "./src/resources/wall.png", size: [40, 1000] },
            Collider: {isTrigger: true, collider: new ecs.colliders.RectangleCollider(40, 1000)},
            RigidBody: { speed: [-4, 0]  }
        };
    },
}
