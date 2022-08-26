import ecs from 'ecs';

ecs.registerEntity(
    "Bird",
    {
        components: {
            Sprite: { size: [60, 60], src: "./src/resources/orb_blue.png" },
            Collider: {collider: new ecs.colliders.CircleCollider(30)},
            Animated: {},
            Transform: {},
            RigidBody: {},
            Fall: {},
            FlyOnKeydown: {},
            DieOnCollision: {},
        },
    }
)

ecs.registerEntity(
    "Gate",
    {
        components: {
            Transform: {},
            Collider: {isTrigger: true, collider: new ecs.colliders.RectangleCollider(40, 300)},
            RigidBody: { speed: [-4, 0]  },
            PointOnCollision: {},
        },
    }
)

ecs.registerEntity(
    "OutOfBounds",
    {
        components: {
            Transform: {},
            Collider: {isTrigger: true, collider: new ecs.colliders.RectangleCollider(1000, 100)},
            KillOnCollision: {},
        },
    }
)

ecs.registerEntity(
    "Pipe",
    {
        components: {
            Sprite: { src:  "./src/resources/wall.png", size: [40, 1000] },
            Collider: {isTrigger: true, collider: new ecs.colliders.RectangleCollider(40, 1000)},
            RigidBody: { speed: [-4, 0]  },
            Animated: {},
            Transform: {},
            KillOnCollision: {},
        },
    },
)
