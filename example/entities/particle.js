import Point from '../components/point.js';
import Color from '../components/color.js';
import ColorSpeed from '../components/color_speed.js';
import Transform from '../components/transform.js';
import Mass from '../components/mass.js';
import RigidBody from '../components/rigid_body.js';

export default {
    name: "Particle",
    components: {
        Point,
        Transform,
        Mass,
        RigidBody,
        Color,
        ColorSpeed,
    },
}
