/**
 * Map of types to style modules.
 */
var TYPE_STYLE_MODULES = new Map();
/**
 * Decorator that registers style modules to be injected for a given component
 * type. One or more style modules may be specified.
 *
 * @param styleModule a style module to include
 * @param styleModules additional style modules to include
 * @returns a class decorator
 */
export function IncludeStyles() {
    var styleModules = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        styleModules[_i] = arguments[_i];
    }
    return function (target) {
        TYPE_STYLE_MODULES.set(target, styleModules);
        return target;
    };
}
/**
 * Retrieves all types that have been decorated with `@IncludeStyles()`.
 *
 * @returns an array of all decorated types
 */
export function getRegisteredTypes() {
    return Array.from(TYPE_STYLE_MODULES.keys());
}
/**
 * Retrieves the style modules for a given type that was decorated with
 * `@IncludeStyles()`
 *
 * @param type the type to retrieve style modules for
 * @returns an array of style modules for the decorated type, or an empty
 *   array if the type was not decorated
 */
export function getStyleModulesFor(type) {
    return (type && TYPE_STYLE_MODULES.get(type)) || [];
}
/**
 * Resets all types decorated with `@IncludeStyles()`. Should only be used for
 * testing.
 */
export function resetIncludeStyles() {
    TYPE_STYLE_MODULES = new Map();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZS1zdHlsZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kZWJha2VyeS9vcmlnYW1pL3N0eWxlcy8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2luY2x1ZGUtc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOztHQUVHO0FBQ0gsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsRUFBdUIsQ0FBQztBQUV4RDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLGFBQWE7SUFBQyxzQkFBeUI7U0FBekIsVUFBeUIsRUFBekIscUJBQXlCLEVBQXpCLElBQXlCO1FBQXpCLGlDQUF5Qjs7SUFDckQsT0FBTyxVQUFDLE1BQVc7UUFDakIsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3QyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxrQkFBa0I7SUFDaEMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsSUFBZ0I7SUFDakQsT0FBTyxDQUFDLElBQUksSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdEQsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxrQkFBa0I7SUFDaEMsa0JBQWtCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNqQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIE1hcCBvZiB0eXBlcyB0byBzdHlsZSBtb2R1bGVzLlxuICovXG5sZXQgVFlQRV9TVFlMRV9NT0RVTEVTID0gbmV3IE1hcDxUeXBlPGFueT4sIHN0cmluZ1tdPigpO1xuXG4vKipcbiAqIERlY29yYXRvciB0aGF0IHJlZ2lzdGVycyBzdHlsZSBtb2R1bGVzIHRvIGJlIGluamVjdGVkIGZvciBhIGdpdmVuIGNvbXBvbmVudFxuICogdHlwZS4gT25lIG9yIG1vcmUgc3R5bGUgbW9kdWxlcyBtYXkgYmUgc3BlY2lmaWVkLlxuICpcbiAqIEBwYXJhbSBzdHlsZU1vZHVsZSBhIHN0eWxlIG1vZHVsZSB0byBpbmNsdWRlXG4gKiBAcGFyYW0gc3R5bGVNb2R1bGVzIGFkZGl0aW9uYWwgc3R5bGUgbW9kdWxlcyB0byBpbmNsdWRlXG4gKiBAcmV0dXJucyBhIGNsYXNzIGRlY29yYXRvclxuICovXG5leHBvcnQgZnVuY3Rpb24gSW5jbHVkZVN0eWxlcyguLi5zdHlsZU1vZHVsZXM6IHN0cmluZ1tdKTogQ2xhc3NEZWNvcmF0b3Ige1xuICByZXR1cm4gKHRhcmdldDogYW55KSA9PiB7XG4gICAgVFlQRV9TVFlMRV9NT0RVTEVTLnNldCh0YXJnZXQsIHN0eWxlTW9kdWxlcyk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgYWxsIHR5cGVzIHRoYXQgaGF2ZSBiZWVuIGRlY29yYXRlZCB3aXRoIGBASW5jbHVkZVN0eWxlcygpYC5cbiAqXG4gKiBAcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgZGVjb3JhdGVkIHR5cGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWdpc3RlcmVkVHlwZXMoKTogQXJyYXk8VHlwZTxhbnk+PiB7XG4gIHJldHVybiBBcnJheS5mcm9tKFRZUEVfU1RZTEVfTU9EVUxFUy5rZXlzKCkpO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgc3R5bGUgbW9kdWxlcyBmb3IgYSBnaXZlbiB0eXBlIHRoYXQgd2FzIGRlY29yYXRlZCB3aXRoXG4gKiBgQEluY2x1ZGVTdHlsZXMoKWBcbiAqXG4gKiBAcGFyYW0gdHlwZSB0aGUgdHlwZSB0byByZXRyaWV2ZSBzdHlsZSBtb2R1bGVzIGZvclxuICogQHJldHVybnMgYW4gYXJyYXkgb2Ygc3R5bGUgbW9kdWxlcyBmb3IgdGhlIGRlY29yYXRlZCB0eXBlLCBvciBhbiBlbXB0eVxuICogICBhcnJheSBpZiB0aGUgdHlwZSB3YXMgbm90IGRlY29yYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGVNb2R1bGVzRm9yKHR5cGU/OiBUeXBlPGFueT4pOiBzdHJpbmdbXSB7XG4gIHJldHVybiAodHlwZSAmJiBUWVBFX1NUWUxFX01PRFVMRVMuZ2V0KHR5cGUpKSB8fCBbXTtcbn1cblxuLyoqXG4gKiBSZXNldHMgYWxsIHR5cGVzIGRlY29yYXRlZCB3aXRoIGBASW5jbHVkZVN0eWxlcygpYC4gU2hvdWxkIG9ubHkgYmUgdXNlZCBmb3JcbiAqIHRlc3RpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldEluY2x1ZGVTdHlsZXMoKSB7XG4gIFRZUEVfU1RZTEVfTU9EVUxFUyA9IG5ldyBNYXAoKTtcbn1cbiJdfQ==