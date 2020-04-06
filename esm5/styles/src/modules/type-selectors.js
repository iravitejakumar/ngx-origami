import { getRegisteredTypes } from './include-styles';
var SELECTOR_TO_TYPE = new Map();
var TYPE_TO_SELECTOR = new Map();
/**
 * Scans a `ComponentFactoryResolver` for types decorated with
 * `@IncludeStyles()` to build a map of types and selectors.
 *
 * @param resolver the `ComponentFactoryResolver` to scan
 */
export function scanComponentFactoryResolver(resolver) {
    Array.from(getRegisteredTypes()).forEach(function (type) {
        if (!TYPE_TO_SELECTOR.has(type)) {
            try {
                var factory = resolver.resolveComponentFactory(type);
                TYPE_TO_SELECTOR.set(type, factory.selector);
                SELECTOR_TO_TYPE.set(factory.selector, type);
            }
            catch (err) {
                // No component factory found
            }
        }
    });
}
/**
 * Retrieves the component type for a given selector string. The component must
 * have been decorated by `@IncludeStyles()` and scanned by
 * `scanComponentFactoryResolver()`.
 *
 * @param selector the selector of the component type
 * @returns the component type, or undefined if the type is not decorated or
 *   scanned
 */
export function getTypeFor(selector) {
    return SELECTOR_TO_TYPE.get(selector);
}
/**
 * Resets the type selector maps that were scanned by
 * `scanComponentFactoryResolver()`. This should only be used for testing.
 */
export function resetTypeSelectors() {
    SELECTOR_TO_TYPE = new Map();
    TYPE_TO_SELECTOR = new Map();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS1zZWxlY3RvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS9zdHlsZXMvIiwic291cmNlcyI6WyJzcmMvbW9kdWxlcy90eXBlLXNlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUV0RCxJQUFJLGdCQUFnQixHQUFHLElBQUksR0FBRyxFQUFxQixDQUFDO0FBQ3BELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQXFCLENBQUM7QUFFcEQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsNEJBQTRCLENBQzFDLFFBQWtDO0lBRWxDLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7UUFDM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQixJQUFJO2dCQUNGLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkQsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzdDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzlDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osNkJBQTZCO2FBQzlCO1NBQ0Y7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUMsUUFBZ0I7SUFDekMsT0FBTyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxrQkFBa0I7SUFDaEMsZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUM3QixnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGdldFJlZ2lzdGVyZWRUeXBlcyB9IGZyb20gJy4vaW5jbHVkZS1zdHlsZXMnO1xuXG5sZXQgU0VMRUNUT1JfVE9fVFlQRSA9IG5ldyBNYXA8c3RyaW5nLCBUeXBlPGFueT4+KCk7XG5sZXQgVFlQRV9UT19TRUxFQ1RPUiA9IG5ldyBNYXA8VHlwZTxhbnk+LCBzdHJpbmc+KCk7XG5cbi8qKlxuICogU2NhbnMgYSBgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyYCBmb3IgdHlwZXMgZGVjb3JhdGVkIHdpdGhcbiAqIGBASW5jbHVkZVN0eWxlcygpYCB0byBidWlsZCBhIG1hcCBvZiB0eXBlcyBhbmQgc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSByZXNvbHZlciB0aGUgYENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcmAgdG8gc2NhblxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcihcbiAgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuKSB7XG4gIEFycmF5LmZyb20oZ2V0UmVnaXN0ZXJlZFR5cGVzKCkpLmZvckVhY2godHlwZSA9PiB7XG4gICAgaWYgKCFUWVBFX1RPX1NFTEVDVE9SLmhhcyh0eXBlKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHR5cGUpO1xuICAgICAgICBUWVBFX1RPX1NFTEVDVE9SLnNldCh0eXBlLCBmYWN0b3J5LnNlbGVjdG9yKTtcbiAgICAgICAgU0VMRUNUT1JfVE9fVFlQRS5zZXQoZmFjdG9yeS5zZWxlY3RvciwgdHlwZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gTm8gY29tcG9uZW50IGZhY3RvcnkgZm91bmRcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY29tcG9uZW50IHR5cGUgZm9yIGEgZ2l2ZW4gc2VsZWN0b3Igc3RyaW5nLiBUaGUgY29tcG9uZW50IG11c3RcbiAqIGhhdmUgYmVlbiBkZWNvcmF0ZWQgYnkgYEBJbmNsdWRlU3R5bGVzKClgIGFuZCBzY2FubmVkIGJ5XG4gKiBgc2NhbkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcigpYC5cbiAqXG4gKiBAcGFyYW0gc2VsZWN0b3IgdGhlIHNlbGVjdG9yIG9mIHRoZSBjb21wb25lbnQgdHlwZVxuICogQHJldHVybnMgdGhlIGNvbXBvbmVudCB0eXBlLCBvciB1bmRlZmluZWQgaWYgdGhlIHR5cGUgaXMgbm90IGRlY29yYXRlZCBvclxuICogICBzY2FubmVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlRm9yKHNlbGVjdG9yOiBzdHJpbmcpOiBUeXBlPGFueT4gfCB1bmRlZmluZWQge1xuICByZXR1cm4gU0VMRUNUT1JfVE9fVFlQRS5nZXQoc2VsZWN0b3IpO1xufVxuXG4vKipcbiAqIFJlc2V0cyB0aGUgdHlwZSBzZWxlY3RvciBtYXBzIHRoYXQgd2VyZSBzY2FubmVkIGJ5XG4gKiBgc2NhbkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcigpYC4gVGhpcyBzaG91bGQgb25seSBiZSB1c2VkIGZvciB0ZXN0aW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRUeXBlU2VsZWN0b3JzKCkge1xuICBTRUxFQ1RPUl9UT19UWVBFID0gbmV3IE1hcCgpO1xuICBUWVBFX1RPX1NFTEVDVE9SID0gbmV3IE1hcCgpO1xufVxuIl19