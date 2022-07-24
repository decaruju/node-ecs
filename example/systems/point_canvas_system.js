export default class extends System {
    tick(ecs) {
        const context = ecs.canvas.getContext('2d');

        ecs.entitiesWithComponents(['Point', 'Transform']).forEach((entity) => {
            context.fillStyle = entity.Color.color;
            context.fillRect(entity.Transform.position[0], entity.Transform.position[1], 1, 1);
        });
    }
}
