import RectangleCollider from '../../shared/colliders/rectangle_collider.js';

export default class extends RectangleCollider {
    normal(position, point, origin) {
        const normal = super.normal(position, point, origin);
        normal[0] += (point[0]-position[0])/this.width;
        console.log(normal)
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
