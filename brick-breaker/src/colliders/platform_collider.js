import ecs from 'ecs';

export default class extends ecs.colliders.RectangleCollider {
    normal(position, point, origin) {
        const normal = super.normal(position, point, origin);
        normal[0] += (point[0]-position[0])/this.width;
        return normalise(normal);
    }
}

function normalise(vector) {
    const size = Math.sqrt(vector[0]**2+vector[1]**2);
    return [
        vector[0]/size,
        vector[1]/size,
    ];
}
