import ecs from 'ecs';
import Moving from '../components/moving.js';

export default {
    name: "Platform",
    components: {
        Sprite: ecs.components.Sprite,
        Animated: ecs.components.Animated,
        Transform: ecs.components.Transform,
        Collider: ecs.components.Collider,
        Moving: Moving,
    },
    fields() {
        return {
            Sprite: { src:  "./src/resources/wall.png", size: [400, 40] },
            Collider: {collider: new ecs.colliders.RectangleCollider(400, 40)},
            Moving: { speed: [0, 4] }
        };
    },
}
