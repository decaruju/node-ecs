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
		console.debug(this.tickCount)
        this.tickCount++;
        this.systems.forEach((system) => {system.beforeTick(this)});
        this.systems.forEach((system) => {system.tick(this)});
        this.systems.forEach((system) => {system.afterTick(this)});
    }

	entitiesWithComponents(componentNames) {
		return this.entities.filter((entity) => {
			return componentNames.every((componentName) => entity.componentNames.includes(componentName));
		})
	}
}

let id = 0

class System {
	beforeTick() {}
	tick() {}
	afterTick() {}
}

class Entity {
	constructor(descriptor, componentValues) {
		this.id = id++;
		this.name = descriptor.name;
		this.descriptor = descriptor;
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
