class Ecs {
    constructor(entities, systems, globals) {
        this.entities = entities;
        this.systems = systems;
        this.tickCount = 0;
		this.running = true;
		Object.keys(globals).forEach((globalName) => {
			this[globalName] = globals[globalName];
		})
    }

    tick() {
        this.tickCount++;
        this.systems.sort((a, b) => a.priority - b.priority);
        this.systems.forEach((system) => {system.tick(this)});
    }

	entitiesWithComponents(componentNames, active=true) {
		return this.entities.filter((entity) => {
			return entity.active == active && componentNames.every((componentName) => entity.componentNames.includes(componentName));
		})
	}
}

let id = 0

class System {
    priority = 1;

	tick() {}
}

class Entity {
	constructor(descriptor, componentValues) {
		this.id = id++;
		this.name = descriptor.name;
		this.descriptor = descriptor;
		this.active = true;
		this.componentNames = Object.keys(descriptor.components);

		Object.keys(descriptor.components).forEach((componentName) => {
			const component = descriptor.components[componentName];
			this[componentName] = {};
			Object.keys(component.fields).forEach((fieldName) => {
				this[componentName][fieldName] = componentValues[componentName]?.[fieldName] ?? JSON.parse(JSON.stringify(component.fields[fieldName]));
			}) ;
		});
	}
}

window.Ecs = Ecs;
window.Entity = Entity
window.System = System
