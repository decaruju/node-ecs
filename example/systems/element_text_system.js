export default class extends System {
    tick(ecs) {
        ecs.entitiesWithComponents(['HtmlElement', 'HtmlElementText']).forEach((entity) => {
            entity.HtmlElement.element.innerText = entity.HtmlElementText.text;
        });
    }
}
