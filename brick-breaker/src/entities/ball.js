import ecs from 'ecs';


export default {
    name: "Ball",
    components: {
        Sprite: ecs.components.Sprite,
        RigidBody: ecs.components.RigidBody,
        Transform: ecs.components.Transform,
        Collider: ecs.components.Collider,
    },
    fields: () => ({
        Collider: {collider: new ecs.colliders.CircleCollider(5)},
        Transform: {position: [150, 150]},
        RigidBody: { speed: [3, 4]},
        Sprite: {size: [10, 10], src: "../resources/orb_blue.png"},
    }),
}
