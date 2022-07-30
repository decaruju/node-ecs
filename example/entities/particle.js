import Sprite from '../components/sprite.js';
import Transform from '../components/transform.js';
import Mass from '../components/mass.js';
import RigidBody from '../components/rigid_body.js';
import BoundingBox from '../components/bounding_box.js';
import CircleCollider from '../components/circle_collider.js';
import MergeOnCollision from '../components/merge_on_collision.js';

export default {
    name: "Particle",
    components: {
        BoundingBox,
        Transform,
        Mass,
        RigidBody,
        CircleCollider,
        MergeOnCollision,
        Sprite,
    },
}
