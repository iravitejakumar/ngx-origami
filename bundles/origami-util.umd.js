(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('@codebakery/origami/util', ['exports'], factory) :
    (global = global || self, factory((global.codebakery = global.codebakery || {}, global.codebakery.origami = global.codebakery.origami || {}, global.codebakery.origami.util = {})));
}(this, (function (exports) { 'use strict';

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
        var desc = wrapDescriptor(target, propertyKey, hooks);
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
        var desc = getPropertyDescriptor(target, propertyKey);
        var properties = new WeakMap();
        return {
            enumerable: desc ? desc.enumerable : true,
            get: function () {
                if (desc && desc.get) {
                    return desc.get.apply(this);
                }
                else {
                    var props = properties.get(this);
                    return props && props[propertyKey];
                }
            },
            set: function (original) {
                var value = original;
                if (!hooks.shouldSet || hooks.shouldSet.apply(this, [value])) {
                    if (hooks.beforeSet) {
                        value = hooks.beforeSet.apply(this, [value]);
                    }
                    var props = properties.get(this);
                    if (!props) {
                        props = {};
                        properties.set(this, props);
                    }
                    var changed = value !== props[propertyKey];
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
            var desc = Object.getOwnPropertyDescriptor(target, propertyKey);
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
    var whenSetMap;
    var callbackSyncMap;
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
    function whenSet(target, property, predicate, callbackSync) {
        if (predicate === void 0) { predicate = function (value) { return typeof value !== 'undefined'; }; }
        var currentValue = target[property];
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
            var propertyPromiseMap_1;
            if (!whenSetMap.has(target)) {
                propertyPromiseMap_1 = new Map();
                whenSetMap.set(target, propertyPromiseMap_1);
            }
            else {
                propertyPromiseMap_1 = whenSetMap.get(target);
            }
            if (propertyPromiseMap_1.has(property)) {
                var promise = propertyPromiseMap_1.get(property);
                if (typeof callbackSync === 'function') {
                    var callbacks = callbackSyncMap.get(promise);
                    callbacks.push(callbackSync);
                }
                return promise;
            }
            else {
                var promise_1 = new Promise(function (resolve) {
                    Object.defineProperty(target, property, {
                        configurable: true,
                        enumerable: true,
                        get: function () {
                            return currentValue;
                        },
                        set: function (value) {
                            currentValue = value;
                            if (predicate(value)) {
                                Object.defineProperty(target, property, {
                                    value: value,
                                    configurable: true,
                                    enumerable: true,
                                    writable: true
                                });
                                propertyPromiseMap_1.delete(property);
                                if (!propertyPromiseMap_1.size) {
                                    whenSetMap.delete(target);
                                }
                                var callbacks_1 = callbackSyncMap.get(promise_1);
                                callbacks_1.forEach(function (callback) {
                                    callback(value);
                                });
                                resolve(value);
                            }
                        }
                    });
                });
                propertyPromiseMap_1.set(property, promise_1);
                var callbacks = [];
                if (typeof callbackSync === 'function') {
                    callbacks.push(callbackSync);
                }
                callbackSyncMap.set(promise_1, callbacks);
                return promise_1;
            }
        }
    }

    exports.getPropertyDescriptor = getPropertyDescriptor;
    exports.whenSet = whenSet;
    exports.wrapAndDefineDescriptor = wrapAndDefineDescriptor;
    exports.wrapDescriptor = wrapDescriptor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=origami-util.umd.js.map
