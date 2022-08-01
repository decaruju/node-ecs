import Sprite from '../../shared/components/sprite.js';
import Transform from '../../shared/components/transform.js';
import Collider from '../../shared/components/collider.js';
import BreakOnCollision from '../components/break_on_collision.js';

export default {
    name: "Brick",
    components: {
        Sprite,
        Transform,
        Collider,
        BreakOnCollision,
    },
}
