import Circle from '../components/circle.js';
import Color from '../components/color.js';
import Transform from '../components/transform.js';
import Mass from '../components/mass.js';
import RigidBody from '../components/rigid_body.js';
import BoundingBox from '../components/bounding_box.js';

export default {
    name: "Particle",
    components: {
        BoundingBox,
        Circle,
        Transform,
        Mass,
        RigidBody,
        Color,
    },
}
