export default class extends System {
    tick(ecs) {
        const context = ecs.canvas.getContext('2d');

        ecs.entitiesWithComponents(['Circle', 'Transform']).forEach((entity) => {
            context.fillStyle = entity.Color.color;
            context.beginPath();
            context.arc(entity.Transform.position[0], entity.Transform.position[1], entity.Circle.radius, 0, 2*Math.PI, true);
            context.fill();
        });
    }
}
