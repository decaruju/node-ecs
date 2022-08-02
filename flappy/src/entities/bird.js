import ecs from 'ecs';

import FlyOnKeydown from '../components/fly_on_keydown.js';
import DieOnCollision from '../components/die_on_collision.js';


export default {
    name: "Bird",
    components: {
        Sprite: ecs.components.Sprite,
        Animated: ecs.components.Animated,
        Transform: ecs.components.Transform,
        RigidBody: ecs.components.RigidBody,
        Collider: ecs.components.Collider,
        Fall: ecs.components.Fall,
        FlyOnKeydown,
        DieOnCollision,
    },
    fields() {
        return {
            Sprite: {size: [60, 60], src: "./src/resources/orb_blue.png" },
            Collider: {collider: new ecs.colliders.CircleCollider(30)},
        };
    },
}
