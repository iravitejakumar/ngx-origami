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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZS1zdHlsZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS9zdHlsZXMvIiwic291cmNlcyI6WyJzcmMvbW9kdWxlcy9pbmNsdWRlLXN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7R0FFRztBQUNILElBQUksa0JBQWtCLEdBQUcsSUFBSSxHQUFHLEVBQXVCLENBQUM7QUFFeEQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxhQUFhO0lBQUMsc0JBQXlCO1NBQXpCLFVBQXlCLEVBQXpCLHFCQUF5QixFQUF6QixJQUF5QjtRQUF6QixpQ0FBeUI7O0lBQ3JELE9BQU8sVUFBQyxNQUFXO1FBQ2pCLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDN0MsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLElBQWdCO0lBQ2pELE9BQU8sQ0FBQyxJQUFJLElBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3RELENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLGtCQUFrQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDakMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBNYXAgb2YgdHlwZXMgdG8gc3R5bGUgbW9kdWxlcy5cbiAqL1xubGV0IFRZUEVfU1RZTEVfTU9EVUxFUyA9IG5ldyBNYXA8VHlwZTxhbnk+LCBzdHJpbmdbXT4oKTtcblxuLyoqXG4gKiBEZWNvcmF0b3IgdGhhdCByZWdpc3RlcnMgc3R5bGUgbW9kdWxlcyB0byBiZSBpbmplY3RlZCBmb3IgYSBnaXZlbiBjb21wb25lbnRcbiAqIHR5cGUuIE9uZSBvciBtb3JlIHN0eWxlIG1vZHVsZXMgbWF5IGJlIHNwZWNpZmllZC5cbiAqXG4gKiBAcGFyYW0gc3R5bGVNb2R1bGUgYSBzdHlsZSBtb2R1bGUgdG8gaW5jbHVkZVxuICogQHBhcmFtIHN0eWxlTW9kdWxlcyBhZGRpdGlvbmFsIHN0eWxlIG1vZHVsZXMgdG8gaW5jbHVkZVxuICogQHJldHVybnMgYSBjbGFzcyBkZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEluY2x1ZGVTdHlsZXMoLi4uc3R5bGVNb2R1bGVzOiBzdHJpbmdbXSk6IENsYXNzRGVjb3JhdG9yIHtcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSkgPT4ge1xuICAgIFRZUEVfU1RZTEVfTU9EVUxFUy5zZXQodGFyZ2V0LCBzdHlsZU1vZHVsZXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG59XG5cbi8qKlxuICogUmV0cmlldmVzIGFsbCB0eXBlcyB0aGF0IGhhdmUgYmVlbiBkZWNvcmF0ZWQgd2l0aCBgQEluY2x1ZGVTdHlsZXMoKWAuXG4gKlxuICogQHJldHVybnMgYW4gYXJyYXkgb2YgYWxsIGRlY29yYXRlZCB0eXBlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVnaXN0ZXJlZFR5cGVzKCk6IEFycmF5PFR5cGU8YW55Pj4ge1xuICByZXR1cm4gQXJyYXkuZnJvbShUWVBFX1NUWUxFX01PRFVMRVMua2V5cygpKTtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIHN0eWxlIG1vZHVsZXMgZm9yIGEgZ2l2ZW4gdHlwZSB0aGF0IHdhcyBkZWNvcmF0ZWQgd2l0aFxuICogYEBJbmNsdWRlU3R5bGVzKClgXG4gKlxuICogQHBhcmFtIHR5cGUgdGhlIHR5cGUgdG8gcmV0cmlldmUgc3R5bGUgbW9kdWxlcyBmb3JcbiAqIEByZXR1cm5zIGFuIGFycmF5IG9mIHN0eWxlIG1vZHVsZXMgZm9yIHRoZSBkZWNvcmF0ZWQgdHlwZSwgb3IgYW4gZW1wdHlcbiAqICAgYXJyYXkgaWYgdGhlIHR5cGUgd2FzIG5vdCBkZWNvcmF0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlTW9kdWxlc0Zvcih0eXBlPzogVHlwZTxhbnk+KTogc3RyaW5nW10ge1xuICByZXR1cm4gKHR5cGUgJiYgVFlQRV9TVFlMRV9NT0RVTEVTLmdldCh0eXBlKSkgfHwgW107XG59XG5cbi8qKlxuICogUmVzZXRzIGFsbCB0eXBlcyBkZWNvcmF0ZWQgd2l0aCBgQEluY2x1ZGVTdHlsZXMoKWAuIFNob3VsZCBvbmx5IGJlIHVzZWQgZm9yXG4gKiB0ZXN0aW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRJbmNsdWRlU3R5bGVzKCkge1xuICBUWVBFX1NUWUxFX01PRFVMRVMgPSBuZXcgTWFwKCk7XG59XG4iXX0=