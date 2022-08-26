import ecs from 'ecs';

ecs.registerComponent(
    "DieOnCollision",
    {},
)

ecs.registerComponent(
    "FlyOnKeydown",
    {},
)

ecs.registerComponent(
    "KillOnCollision",
    {},
)

ecs.registerComponent(
    "PointOnCollision",
    {
        fields: {
            pointed: false,
        },
    },
)
