export default class extends System {
    priority = 0;
    tick(ecs) {
        const context = ecs.canvas.getContext('2d');
        context.rect(0, 0, ecs.canvas.width, ecs.canvas.height);
        context.fillStyle = ecs.config.canvasColor;
        context.fill();
    }
}
