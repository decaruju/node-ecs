import ecs from 'ecs';

ecs.registerEntity(
    "Sun",
    {
        components: {
            Sprite: { size: [60, 60], src: "./src/resources/orb_blue.png" },
            TrackedPosition: {
                getPosition() {
                    return [0, 0]
                },
            },
            Animated: {},
            Transform: {},
            RigidBody: {},
            Fall: {},
        },
    }
)
