export default class extends Listener {
    eventName = 'keydown'

    handle(ecs, event) {
        ecs.entitiesWithComponents(['KeyboardDash']).forEach(entity => {
            if (!entity.KeyboardDash.cooled) return;
            if (ecs.pressedKeys[65] || ecs.pressedKeys[68] || ecs.pressedKeys[83 || ecs.pressedKeys[87]]) {
                entity.KeyboardDash.cooled = false;
                ecs.nextTick(entity.KeyboardDash.cooldown, () => {
                    entity.KeyboardDash.cooled = true;
                });
            }

            let speed = entity.KeyboardDash.speed;
            if ((ecs.pressedKeys[68] || ecs.pressedKeys[65]) && (ecs.pressedKeys[83] || ecs.pressedKeys[87])) {
                speed *= 0.707;
            }
            if ((ecs.pressedKeys[68] || ecs.pressedKeys[65]) && (ecs.pressedKeys[83] || ecs.pressedKeys[87])) {
                speed *= 0.707;
            }
            if (ecs.pressedKeys[68] && entity.RigidBody.speed[0] < speed) {
                entity.RigidBody.speed[0] += speed;
                ecs.nextTick(3, () => {
                    if (entity.RigidBody.speed[0] < speed) {
                        entity.RigidBody.speed[0] = 0
                    } else {
                        entity.RigidBody.speed[0] -= speed;
                    }
                })
            }
            if (ecs.pressedKeys[65] && entity.RigidBody.speed[0] > -speed) {
                entity.RigidBody.speed[0] -= speed;
                ecs.nextTick(3, () => {
                    if (entity.RigidBody.speed[0] > -speed) {
                        entity.RigidBody.speed[0] = 0
                    } else {
                        entity.RigidBody.speed[0] += speed;
                    }
                })
            }
            if (ecs.pressedKeys[87] && entity.RigidBody.speed[1] > -speed) {
                entity.RigidBody.speed[1] -= speed;
                ecs.nextTick(3, () => {
                    if (entity.RigidBody.speed[1] > -speed) {
                        entity.RigidBody.speed[1] = 0
                    } else {
                        entity.RigidBody.speed[1] += speed;
                    }
                })
            }
            if (ecs.pressedKeys[83] && entity.RigidBody.speed[1] < speed) {
                entity.RigidBody.speed[1] += speed;
                ecs.nextTick(3, () => {
                    if (entity.RigidBody.speed[1] < speed) {
                        entity.RigidBody.speed[1] = 0
                    } else {
                        entity.RigidBody.speed[1] -= speed;
                    }
                })
            }
        });
    }
}
