export default class extends System {
    tick(ecs) {
        ecs.entitiesWithComponents(["Animated"]).forEach((entity) => {
            entity.Animated.animations.forEach((animation) => {
                if (animation.startValue === undefined) {
                    animation.startValue = dig(animation.property, entity);
                }
                const alpha = animation.currentTick/animation.totalTicks;
                set(animation.property, entity, animation.startValue*(1-alpha)+animation.endValue*alpha)
                animation.currentTick++;
            });
            entity.Animated.animations = entity.Animated.animations.filter((animation) => animation.currentTick < animation.totalTicks)
        });
    }
}

function dig(property, object) {
    return property.split('.').reduce((obj, key) => obj[key], object)
}

function set(property, object, value) {
    const properties = property.split('.');
    properties.slice(0, -1).reduce((obj, key) => obj[key], object)[properties[properties.length-1]] = value;
}
