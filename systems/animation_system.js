import System from './system.js';

export default class extends System {
    tick(ecs) {
        ecs.entitiesWithComponents(["Animated"]).forEach((entity) => {
            const propertiesToShift = []
            Object.values(entity.Animated.animations).forEach((animations) => {
                const animation = animations[0]
                if (animation.startValue === undefined) {
                    animation.startValue = dig(animation.property, entity);
                }
                const alpha = animation.currentTick/animation.totalTicks;
                set(animation.property, entity, animation.startValue*(1-alpha)+animation.endValue*alpha)
                animation.currentTick++;
                if (animation.currentTick >= animation.totalTicks) {
                    propertiesToShift.push(animation.property)
                }
            });
            propertiesToShift.forEach((property) => {
                entity.Animated.animations[property].shift();
                if (entity.Animated.animations[property].length == 0) {
                    delete entity.Animated.animations[property]
                }
            });
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
