import ecs from 'ecs';

import GameOverIfOutOfBounds from '../components/game_over_if_out_of_bounds.js';
import ControlledByKeyboard from '../components/controlled_by_keyboard.js';

export default {
    name: "Bird",
    components: {
        Sprite: ecs.components.Sprite,
        Transform: ecs.components.Transform,
        RigidBody: ecs.components.RigidBody,
        Collider: ecs.components.Collider,
        Fall: ecs.components.Fall,
        GameOverIfOutOfBounds,
        ControlledByKeyboard,
    },
    fields() {
        return {
            Sprite: {size: [60, 60], src: "./src/resources/orb_blue.png" },
            Collider: {collider: new ecs.colliders.CircleCollider(30)},
        };
    },
}
