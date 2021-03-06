/**
 * Descriptor hooks that can be injected into a property's getter and setter.
 */
export interface DescriptorHooks<T> {
    /**
     * Executes before a property's value is set. If this function returns true,
     * the property will be set. Otherwise, the property will not be updated.
     *
     * @param value the value requested to set
     * @returns true if the property should be set, otherwise false
     */
    shouldSet?(value: T): boolean;
    /**
     * Executes before a property's value is set and after any `shouldSet()` has
     * returned true. This allows the value to be manipulated before setting it.
     *
     * @param value the value requested to set
     * @returns the value to actually set
     */
    beforeSet?(value: T): T;
    /**
     * Executes after a property's value is set. This allows side effects to be
     * performed on the new value or to determine if a value changed.
     *
     * @param changed indicates whether or not the value changed
     * @param current the new value
     * @param previous the previous value
     */
    afterSet?(changed: boolean, current: T, previous: T): void;
}
/**
 * Redefines an object's property with descriptor hooks that inject side effects
 * into the property's getter and setter. If the property has an existing
 * getter or setter, they will be preserved.
 *
 * @param target the object target for the descriptor
 * @param propertyKey the property of the object target
 * @param hooks the hooks to inject
 */
export declare function wrapAndDefineDescriptor<T>(target: any, propertyKey: string, hooks: DescriptorHooks<T>): void;
/**
 * Creates a property descriptor that injects hooks into a property's getter and
 * setter to execute side effects.
 *
 * @param target the object target for the descriptor
 * @param propertyKey the property of the object target
 * @param hooks the hooks to inject
 * @returns a descriptor that can be used in `Object.defineProperty()`
 */
export declare function wrapDescriptor<T>(target: any, propertyKey: PropertyKey, hooks: DescriptorHooks<T>): PropertyDescriptor;
/**
 * Similar to `Object.getOwnPropertyDescriptor()`, but this function will
 * search through the target's prototype chain when looking for the property's
 * descriptor.
 *
 * @param target object that contains the property
 * @param propertyKey name of the property
 * @returns the property descriptor if one exists
 */
export declare function getPropertyDescriptor(target: any, propertyKey: PropertyKey): PropertyDescriptor | undefined;
