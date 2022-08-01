import KeyboardMovement from '../components/keyboard_movement.js';
import Sprite from '../../shared/components/sprite.js';
import Transform from '../../shared/components/transform.js';
import Collider from '../../shared/components/collider.js';

export default {
    name: "Platform",
    components: {
        KeyboardMovement,
        Sprite,
        Transform,
        Collider,
    },
}
