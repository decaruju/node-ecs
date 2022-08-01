import BaseCollider from './base_collider.js';

export default class extends BaseCollider {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    closestPoint(position, point) {
        return position;
    }

    containsPoint(position, point) {
        return point[0] >= position[0] - this.width/2.0 && point[0] <= position[0] + this.width/2.0 && point[1] >= position[1] - this.height/2.0 && point[1] <= position[1] + this.height/2.0;
    }

    normal(position, point, origin) {
        const normal = [0, 0];
        const bl = [
            position[0]-this.width/2.0,
            position[1]-this.height/2.0,
        ];
        const br = [
            position[0]+this.width/2.0,
            position[1]-this.height/2.0,
        ];
        const tl = [
            position[0]-this.width/2.0,
            position[1]+this.height/2.0,
        ];
        const tr = [
            position[0]+this.width/2.0,
            position[1]+this.height/2.0,
        ];
        if (intersects(bl, br, point, origin)) {
            normal[1] -= 1;
        }
        if (intersects(tl, tr, point, origin)) {
            normal[1] += 1;
        }
        if (intersects(bl, tl, point, origin)) {
            normal[0] -= 1;
        }
        if (intersects(br, tr, point, origin)) {
            normal[0] += 1;
        }
        if (normal[0] == 0 && normal[1] == 0) {
            console.log("oops")
            const oldPosition = [
                2*(origin[0] - point[0]) + origin[0],
                2*(origin[1] - point[1]) + origin[1],
            ]
            const newNormal = this.normal(position, point, oldPosition)
            debugger
            return newNormal;
        }
        return normal
    }
}

function intersects(a, b, c, d) {
    return ccw(a, c, d) != ccw(b, c, d) && ccw(a, b, c) != ccw(a, b, d)
}

function ccw(a, b, c) {
    return (c[1]-a[1])*(b[0]-a[0]) > (b[1]-a[1]) * (c[0]-a[0]);
}
