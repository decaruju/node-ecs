class Ecs {
    constructor(entities, systems, listeners, globals) {
        this.entities = entities;
        this.systems = systems;
        this.events = [];
        this.callbacks = [];
        this.listeners = listeners;
        this.pressedKeys = {};
        window.onkeydown = (e) => {
            e = e || window.event;
            if (!this.pressedKeys[e.keyCode]) this.events.push(new Event("keydown", e))
            this.pressedKeys[e.keyCode] = true;
        }

        window.onkeyup = (e) => {
            e = e || window.event;
            if (this.pressedKeys[e.keyCode]) this.events.push(new Event("keyup", e))
            this.pressedKeys[e.keyCode] = false;
        }
        this.tickCount = 0;
        this.running = true;
        Object.keys(globals).forEach((globalName) => {
            this[globalName] = globals[globalName];
        })
    }

    nextTick(ticks, callback) {
        this.callbacks.push({ticks, fn: callback})
    }

    tick() {
        this.tickCount++;
        this.systems.sort((a, b) => a.priority - b.priority);
        this.systems.forEach((system) => {system.tick(this)});
        this.events.forEach((event) => {
            this.listeners.forEach((listener) => {
                if (listener.eventName == event.eventName) {
                    listener.handle(this, event)
                }
            })
        })
        this.events = []
        this.callbacks.forEach((callback) => {
            if (callback.ticks > 0) {
                callback.ticks --;
            } else {
                callback.fn()
                callback.called = true;
            }
        });
        this.callbacks = this.callbacks.filter((callback) => !callback.called);
    }

    entitiesWithComponents(componentNames, active=true) {
        return this.entities.filter((entity) => {
            return entity.active == active && componentNames.every((componentName) => entity.hasComponent(componentName));
        })
    }
}

let id = 0

class System {
    priority = 1;

    tick() {}
}

class Listener {
    eventName = null

    handle(_event) {}
}

class Event {
    constructor(eventName, params) {
        this.eventName = eventName;
        this.params = params;
    }
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

    hasComponent(componentName) {
        return this.componentNames.includes(componentName);
    }
}

window.Ecs = Ecs;
window.Entity = Entity
window.Event = Event
window.System = System
