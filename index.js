import System from './systems/system.js';
import initWebGl2D from './webgl2d.js';

class Ecs {
    constructor(systems, listeners, globals) {
        this.entities = [];
        this.systems = systems;
        this.events = [];
        this.callbacks = [];
        this.listeners = listeners;
        this.pressedKeys = {};
        window.onkeydown = (e) => {
            e = e || window.event;
            if (!this.pressedKeys[e.keyCode]) this.events.push({eventName: "keydown", params: e})
            this.pressedKeys[e.keyCode] = true;
        }

        window.onkeyup = (e) => {
            e = e || window.event;
            if (this.pressedKeys[e.keyCode]) this.events.push({eventName: "keyup", params: e})
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
        Object.keys(componentClasses).forEach((componentClassName) => {
            const componentClass = componentClasses[componentClassName];
            if (componentClass.tick) {
                this.entitiesWithComponents([componentClassName]).forEach((entity) => {
                    componentClass.tick(entity);
                });
            }
        });
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

    addEntity(entityClass, descriptor) {
        const entity = new Entity(this, entityClass, descriptor || {});
        this.entities.push(entity);
        return entity;
    }

    buildEntity(entityClassName, descriptor) {
        const entityClass = entityClasses[entityClassName];
        return this.addEntity(entityClass, descriptor);
    }
}

let id = 0


class Listener {
    eventName = null

    handle(_event) {}
}

class Router {
    constructor() {
        this.history = []
        this.scenes = {}
    }

    registerScene(sceneName, sceneClass) {
        this.scenes[sceneName] = sceneClass;
    }

    go(sceneName, params={}) {
        const scene = this.scenes[sceneName]
        this.history.push({routeName, params})
    }

    currentRoute() {
        return this.history[this.history.length-1]
    }
}

class Scene {
    build(game) {}
}

class Entity {
    constructor(ecs, descriptor, componentValues) {
        this.id = id++;
        this.name = descriptor.name;
        this.descriptor = descriptor;
        this.active = true;
        this.componentNames = Object.keys(descriptor.components);

        Object.keys(descriptor.components).forEach((componentName) => {
            const component = componentClasses[componentName];
            this[componentName] = {};
            Object.keys(component.fields || {}).forEach((fieldName) => {
                this[componentName][fieldName] = componentValues[componentName]?.[fieldName] ?? descriptor.components?.[componentName]?.[fieldName] ?? JSON.parse(JSON.stringify(component.fields[fieldName]));
            }) ;
            Object.keys(component.methods || {}).forEach((methodName) => {
                this[componentName][methodName] = component.methods[methodName];
            }) ;
            if (component.onCreate) {
                component.onCreate.call(this[componentName], this, ecs);
            }
        });
    }

    hasComponent(componentName) {
        return this.componentNames.includes(componentName);
    }
}

const entityClasses = {};
const componentClasses = {
    Animated: require('./components/animated.js').default,
    Collider: require('./components/collider.js').default,
    RigidBody: require('./components/rigid_body.js').default,
    Sprite: require('./components/sprite.js').default,
    Transform: require('./components/transform.js').default,
    Fall: require('./components/fall.js').default,
};

export default {
    Ecs,
    Entity,
    System,
    Listener,
    initWebGl2D,
    systems: {
        AnimationSystem: require('./systems/animation_system.js').default,
        CanvasClearWebgl: require('./systems/canvas_clear_webgl.js').default,
        CanvasDrawQuadWebgl: require('./systems/canvas_draw_quad_webgl.js').default,
        CollisionSystem: require('./systems/collision_system.js').default,
        RigidBodySystem: require('./systems/rigid_body_system.js').default,
        FallSystem: require('./systems/fall_system.js').default,
    },
    registerComponent(componentName, component) {
        this.components[componentName] = component;
    },
    registerEntity(entityName, entity) {
        this.entities[entityName] = entity;
    },
    entities: entityClasses,
    components: componentClasses,
    colliders: {
        BaseCollider: require('./colliders/base_collider.js').default,
        CircleCollider: require('./colliders/circle_collider.js').default,
        RectangleCollider: require('./colliders/rectangle_collider.js').default,
    },
};
