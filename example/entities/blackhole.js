import Circle from '../components/circle.js';
import Transform from '../components/transform.js';
import Mass from '../components/mass.js';
import Color from '../components/color.js';
import KeyboardMovement from '../components/keyboard_movement.js';
import KeyboardDash from '../components/keyboard_dash.js';
import RigidBody from '../components/rigid_body.js';
import BoundingBox from '../components/bounding_box.js';

export default {
    name: "BlackHole",
    components: {
        BoundingBox,
        KeyboardMovement,
        KeyboardDash,
        Circle,
        Transform,
        RigidBody,
        Color,
        Mass,
    },
}
