import System from './system.js';

export default class extends System {
    priority = 1;

    tick(ecs) {
        ecs.entitiesWithComponents(["Sprite"]).forEach((entity) => {
            if (entity.Sprite.textureInfo?.texture)
                ecs.gl.drawQuad(entity.Transform.position, entity.Sprite.size, entity.Sprite.textureInfo)
        });
    }
}
