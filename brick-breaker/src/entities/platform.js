import ecs from 'ecs';
import KeyboardMovement from '../components/keyboard_movement.js';
import PlatformCollider from '../colliders/platform_collider.js';

export default {
    name: "Platform",
    components: {
        KeyboardMovement,
        Sprite: ecs.components.Sprite,
        Transform: ecs.components.Transform,
        Collider: ecs.components.Collider,
    },
    fields: () => ({
        Collider: {collider: new PlatformCollider(100, 20)},
        Sprite: {size: [100, 20], src: "../resources/platform.png"},
        Transform: {position: [100, 100]},
    }),
};
