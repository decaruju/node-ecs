export default class extends System {
    beforeTick(ecs) {
        const context = ecs.canvas.getContext('2d');
        context.clearRect(0, 0, ecs.canvas.width, ecs.canvas.height);
        context.rect(0, 0, ecs.canvas.width, ecs.canvas.height);
        context.fillStyle = '#2E3440';
        context.fill();
    }
}
