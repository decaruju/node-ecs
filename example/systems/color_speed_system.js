export default class extends System {
    tick(ecs) {
        ecs.entitiesWithComponents(['Color', 'ColorSpeed', 'RigidBody']).forEach(entity => {
            const max_speed = 10;
            const alpha = (entity.RigidBody.speed[0]**2 + entity.RigidBody.speed[1]**2)/max_speed;
            entity.Color.color = colorToHex([
                entity.ColorSpeed.fast[0]*alpha+entity.ColorSpeed.slow[0]*(1-alpha),
                entity.ColorSpeed.fast[1]*alpha+entity.ColorSpeed.slow[1]*(1-alpha),
                entity.ColorSpeed.fast[2]*alpha+entity.ColorSpeed.slow[2]*(1-alpha),
            ]);
        });
    }
}

function colorToHex(color) {
    return `#${floatToHex(color[0])}${floatToHex(color[1])}${floatToHex(color[2])}`
}

function floatToHex(float) {
    return parseInt(hexClamp(float)).toString(16).padStart(2, '0');
}

function hexClamp(value) {
    if (value < 0) {
        return 0
    } else if (value > 255) {
        return 255
    } else {
        return value
    }

}
