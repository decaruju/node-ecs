import ecs from 'ecs';

import Mass from '../components/mass.js';
import BoundingBox from '../components/bounding_box.js';


export default {
    name: "BlackHole",
    components: {
        Sprite: ecs.components.Sprite,
        Animated: ecs.components.Animated,
        Transform: ecs.components.Transform,
        RigidBody: ecs.components.RigidBody,
        Collider: ecs.components.Collider,
        Mass,
        BoundingBox,
    },
    fields() {
        return {
            Mass: {mass: 100},
            Sprite: {size: [60, 60], src: "./src/resources/orb_blue.png" },
            Collider: {collider: new ecs.colliders.CircleCollider(30)},
        };
    },
}
