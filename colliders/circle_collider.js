import BaseCollider from './base_collider.js';

export default class extends BaseCollider {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    closestPoint(position, point) {
        const distance = Math.sqrt((position[0]-point[0])**2+(position[1]-point[1])**2)
        return [
            (point[0]-position[0])/distance*this.radius+position[0],
            (point[1]-position[1])/distance*this.radius+position[1],
        ]
    }

    containsPoint(position, point) {
        return (position[0]-point[0])**2+(position[1]-point[1])**2 < this.radius**2;
    }

    normal(position, point) {
    }
}
