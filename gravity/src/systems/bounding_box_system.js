import ecs from 'ecs';

export default class extends ecs.System {
    tick(ecs) {
        ecs.entitiesWithComponents(["BoundingBox", "Transform"]).forEach((entity) => {
            entity.Transform.position[0] = flip(entity.Transform.position[0], entity.BoundingBox.min_x, entity.BoundingBox.max_x);
            entity.Transform.position[1] = flip(entity.Transform.position[1], entity.BoundingBox.min_y, entity.BoundingBox.max_y);
        });
    }
}

function flip(value, min, max) {
    if (value < min) {
        return max;
    } else if (value > max) {
        return min;
    }
    return value;
}
