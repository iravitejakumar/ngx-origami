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
export declare function whenSet<T, K extends keyof T, V extends T[K] = Exclude<T[K], undefined>>(target: T, property: K, predicate?: (value: any) => boolean, callbackSync?: (value: V) => void): Promise<V>;
