import ecs from 'ecs';
import BreakOnCollision from '../components/break_on_collision.js';

export default {
    name: "Brick",
    components: {
        Sprite: ecs.components.Sprite,
        Transform: ecs.components.Transform,
        Collider: ecs.components.Collider,
        BreakOnCollision,
    },
    fields: () => ({
        Collider: { collider: new ecs.colliders.RectangleCollider(40, 20) },
        Sprite: {size: [38, 18], src: "../resources/brick.png" },
    }),
}
