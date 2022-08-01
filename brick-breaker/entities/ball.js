import Sprite from '../../shared/components/sprite.js';
import Transform from '../../shared/components/transform.js';
import Collider from '../../shared/components/collider.js';
import RigidBody from '../../shared/components/rigid_body.js';

export default {
    name: "Ball",
    components: {
        Sprite,
        RigidBody,
        Transform,
        Collider,
    },
}
