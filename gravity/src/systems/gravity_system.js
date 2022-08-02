import ecs from 'ecs';

export default class extends ecs.System {
    tick(ecs) {
        const entitiesWithMass = ecs.entitiesWithComponents(['Mass', 'Transform']).filter((entity) => entity.Mass.mass > 0);
        ecs.entitiesWithComponents(['Mass', 'RigidBody', 'Transform']).forEach(entity1 => {
            entitiesWithMass.forEach(entity2 => {
                if (entity1.id == entity2.id || !entity1.active || !entity2.active) return;
                const dx = entity2.Transform.position[0] - entity1.Transform.position[0]
                const dy = entity2.Transform.position[1] - entity1.Transform.position[1]
                const distance2 = (dx)**2 + (dy)**2;
                if (distance2 == 0) {
                    return
                }
                const acceleration = entity2.Mass.mass/(distance2*entity1.Mass.mass);
                const angle = Math.atan2(dy, dx)

                entity1.RigidBody.acceleration[0] += acceleration * Math.cos(angle);
                entity1.RigidBody.acceleration[1] += acceleration * Math.sin(angle);
            });
        });
    }
}
