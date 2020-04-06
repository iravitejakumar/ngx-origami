/**
 * Redefines an object's property with descriptor hooks that inject side effects
 * into the property's getter and setter. If the property has an existing
 * getter or setter, they will be preserved.
 *
 * @param target the object target for the descriptor
 * @param propertyKey the property of the object target
 * @param hooks the hooks to inject
 */
function wrapAndDefineDescriptor(target, propertyKey, hooks) {
    const desc = wrapDescriptor(target, propertyKey, hooks);
    Object.defineProperty(target, propertyKey, desc);
}
/**
 * Creates a property descriptor that injects hooks into a property's getter and
 * setter to execute side effects.
 *
 * @param target the object target for the descriptor
 * @param propertyKey the property of the object target
 * @param hooks the hooks to inject
 * @returns a descriptor that can be used in `Object.defineProperty()`
 */
function wrapDescriptor(target, propertyKey, hooks) {
    const desc = getPropertyDescriptor(target, propertyKey);
    const properties = new WeakMap();
    return {
        enumerable: desc ? desc.enumerable : true,
        get() {
            if (desc && desc.get) {
                return desc.get.apply(this);
            }
            else {
                const props = properties.get(this);
                return props && props[propertyKey];
            }
        },
        set(original) {
            let value = original;
            if (!hooks.shouldSet || hooks.shouldSet.apply(this, [value])) {
                if (hooks.beforeSet) {
                    value = hooks.beforeSet.apply(this, [value]);
                }
                let props = properties.get(this);
                if (!props) {
                    props = {};
                    properties.set(this, props);
                }
                const changed = value !== props[propertyKey];
                props[propertyKey] = value;
                if (desc && desc.set) {
                    desc.set.apply(this, [value]);
                }
                if (hooks.afterSet) {
                    hooks.afterSet.apply(this, [changed, value, original]);
                }
            }
        }
    };
}
/**
 * Similar to `Object.getOwnPropertyDescriptor()`, but this function will
 * search through the target's prototype chain when looking for the property's
 * descriptor.
 *
 * @param target object that contains the property
 * @param propertyKey name of the property
 * @returns the property descriptor if one exists
 */
function getPropertyDescriptor(target, propertyKey) {
    while (target) {
        const desc = Object.getOwnPropertyDescriptor(target, propertyKey);
        if (desc) {
            return desc;
        }
        else {
            target = Object.getPrototypeOf(target);
        }
    }
}

/**
 * Map of targets, their properties, and promises that will be resolved when
 * they are set. This allows multiple invocations to `whenSet()` for the same
 * target and property to resolve.
 */
let whenSetMap;
let callbackSyncMap;
/**
 * Resolves when the provided property is set to a non-undefined value on the
 * target.
 *
 * @param target the target to listen to
 * @param property the property to wait for
 * @param predicate the predicate to determine whether or not the Promise
 *   should resolve for a new value. The default is to check if the value is
 *   not undefined.
 * @param callbackSync if more precise timing is needed, this callback may be
 *   provided to immediately process the set value since the resolved Promise
 *   will be async
 * @returns a Promise that resolves with the new value
 */
function whenSet(target, property, predicate = (value) => typeof value !== 'undefined', callbackSync) {
    let currentValue = target[property];
    if (predicate(currentValue)) {
        if (typeof callbackSync === 'function') {
            callbackSync(target[property]);
        }
        return Promise.resolve(target[property]);
    }
    else {
        if (!whenSetMap) {
            whenSetMap = new WeakMap();
        }
        if (!callbackSyncMap) {
            callbackSyncMap = new WeakMap();
        }
        let propertyPromiseMap;
        if (!whenSetMap.has(target)) {
            propertyPromiseMap = new Map();
            whenSetMap.set(target, propertyPromiseMap);
        }
        else {
            propertyPromiseMap = whenSetMap.get(target);
        }
        if (propertyPromiseMap.has(property)) {
            const promise = propertyPromiseMap.get(property);
            if (typeof callbackSync === 'function') {
                const callbacks = callbackSyncMap.get(promise);
                callbacks.push(callbackSync);
            }
            return promise;
        }
        else {
            const promise = new Promise(resolve => {
                Object.defineProperty(target, property, {
                    configurable: true,
                    enumerable: true,
                    get() {
                        return currentValue;
                    },
                    set(value) {
                        currentValue = value;
                        if (predicate(value)) {
                            Object.defineProperty(target, property, {
                                value,
                                configurable: true,
                                enumerable: true,
                                writable: true
                            });
                            propertyPromiseMap.delete(property);
                            if (!propertyPromiseMap.size) {
                                whenSetMap.delete(target);
                            }
                            const callbacks = callbackSyncMap.get(promise);
                            callbacks.forEach(callback => {
                                callback(value);
                            });
                            resolve(value);
                        }
                    }
                });
            });
            propertyPromiseMap.set(property, promise);
            const callbacks = [];
            if (typeof callbackSync === 'function') {
                callbacks.push(callbackSync);
            }
            callbackSyncMap.set(promise, callbacks);
            return promise;
        }
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { getPropertyDescriptor, whenSet, wrapAndDefineDescriptor, wrapDescriptor };
//# sourceMappingURL=origami-util.js.map
