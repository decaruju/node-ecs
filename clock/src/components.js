import ecs from 'ecs';

ecs.registerComponent(
    "TrackedPosition",
    {
        fields: {
            getPosition() {},
        },
        tick(entity) {
            const position = entity.TrackedPosition.getPosition();
            entity.Transform.position[0] = position[0];
            entity.Transform.position[1] = position[1];
        },
    },
)
