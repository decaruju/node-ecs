import ecs from 'ecs';

export default {
    name: "Wall",
    components: {
        Sprite: ecs.components.Sprite,
        Transform: ecs.components.Transform,
        Collider: ecs.components.Collider,
    },
    fields: () => ({
        Collider: {collider: new ecs.colliders.RectangleCollider(20, 20)},
        Sprite: {size: [20, 20], src: "../resources/wall.png" },
    }),
}
