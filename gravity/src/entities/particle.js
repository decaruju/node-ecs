import ecs from 'ecs';

import Mass from '../components/mass.js';
import BoundingBox from '../components/bounding_box.js';
import MergeOnCollision from '../components/merge_on_collision.js';

export default {
    name: "Particle",
    components: {
        Sprite: ecs.components.Sprite,
        Animated: ecs.components.Animated,
        Transform: ecs.components.Transform,
        RigidBody: ecs.components.RigidBody,
        Collider: ecs.components.Collider,
        Mass,
        BoundingBox,
        MergeOnCollision,
    },
    fields() {
        return {
            Sprite: { src:  "./src/resources/orb_blue.png" },
            RigidBody: {speed: [0, 0]},
            Collider: {collider: new ecs.colliders.CircleCollider(5)},
            Mass: {mass: 0.1}
        };
    },
}
