export default class extends System {
    tick(ecs) {
        ecs.entitiesWithComponents(['HtmlElementText', 'HtmlElementCounter']).forEach((entity) => {
        console.log('in')
            entity.HtmlElementText.text = ecs.tickCount;
            entity.HtmlElement.element.style.marginLeft = ecs.tickCount;
            entity.HtmlElement.element.style.marginTop = (Math.sin(ecs.tickCount/10) + 1)*200;
        });
    }
}
