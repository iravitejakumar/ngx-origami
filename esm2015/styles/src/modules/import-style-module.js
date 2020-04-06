/**
 * The <dom-module> constructor.
 */
let cachedDomModule;
/**
 * Style module CSS text cached by id.
 */
let CACHED_STYLE_MODULES = new Map();
/**
 * Imports a `<dom-module id="name">` style module by its id and returns the
 * `<style>` content for the module. Ensure that the module is imported and
 * added to the DOM before calling `importStyleModule()`.
 *
 * @deprecated Use stylesFromModule from
 *   `@polymer/polymer/lib/utils/style-gather`
 * @param styleModule the named id of the style module to import
 * @returns the style module's CSS text, or an empty string if the module does
 *   not exist
 */
export function importStyleModule(styleModule) {
    if (!CACHED_STYLE_MODULES.has(styleModule)) {
        if (!cachedDomModule) {
            cachedDomModule = customElements.get('dom-module');
        }
        const styleTemplate = (cachedDomModule.import(styleModule, 'template'));
        if (styleTemplate) {
            const styles = styleTemplate.content.querySelectorAll('style');
            CACHED_STYLE_MODULES.set(styleModule, Array.from(styles)
                .map(style => style.innerText)
                .join('\n'));
        }
        else {
            CACHED_STYLE_MODULES.set(styleModule, '');
        }
    }
    return CACHED_STYLE_MODULES.get(styleModule);
}
/**
 * Resets the cache using by `importStyleModule()`, primarily used for testing.
 *
 * @deprecated clearStyleModuleCache will be removed in the next major release
 */
export function clearStyleModuleCache() {
    CACHED_STYLE_MODULES = new Map();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXN0eWxlLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RlYmFrZXJ5L29yaWdhbWkvc3R5bGVzLyIsInNvdXJjZXMiOlsic3JjL21vZHVsZXMvaW1wb3J0LXN0eWxlLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7R0FFRztBQUNILElBQUksZUFBaUMsQ0FBQztBQUV0Qzs7R0FFRztBQUNILElBQUksb0JBQW9CLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxXQUFtQjtJQUNuRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDcEIsZUFBZSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEQ7UUFFRCxNQUFNLGFBQWEsR0FBb0MsQ0FDckQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQ2hELENBQUM7UUFDRixJQUFJLGFBQWEsRUFBRTtZQUNqQixNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9ELG9CQUFvQixDQUFDLEdBQUcsQ0FDdEIsV0FBVyxFQUNYLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNmLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7aUJBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDZCxDQUFDO1NBQ0g7YUFBTTtZQUNMLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDM0M7S0FDRjtJQUVELE9BQU8sb0JBQW9CLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBRSxDQUFDO0FBQ2hELENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQjtJQUNuQyxvQkFBb0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ25DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEb21Nb2R1bGUgfSBmcm9tICdAcG9seW1lci9wb2x5bWVyL2xpYi9lbGVtZW50cy9kb20tbW9kdWxlJztcblxuLyoqXG4gKiBUaGUgPGRvbS1tb2R1bGU+IGNvbnN0cnVjdG9yLlxuICovXG5sZXQgY2FjaGVkRG9tTW9kdWxlOiB0eXBlb2YgRG9tTW9kdWxlO1xuXG4vKipcbiAqIFN0eWxlIG1vZHVsZSBDU1MgdGV4dCBjYWNoZWQgYnkgaWQuXG4gKi9cbmxldCBDQUNIRURfU1RZTEVfTU9EVUxFUyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5cbi8qKlxuICogSW1wb3J0cyBhIGA8ZG9tLW1vZHVsZSBpZD1cIm5hbWVcIj5gIHN0eWxlIG1vZHVsZSBieSBpdHMgaWQgYW5kIHJldHVybnMgdGhlXG4gKiBgPHN0eWxlPmAgY29udGVudCBmb3IgdGhlIG1vZHVsZS4gRW5zdXJlIHRoYXQgdGhlIG1vZHVsZSBpcyBpbXBvcnRlZCBhbmRcbiAqIGFkZGVkIHRvIHRoZSBET00gYmVmb3JlIGNhbGxpbmcgYGltcG9ydFN0eWxlTW9kdWxlKClgLlxuICpcbiAqIEBkZXByZWNhdGVkIFVzZSBzdHlsZXNGcm9tTW9kdWxlIGZyb21cbiAqICAgYEBwb2x5bWVyL3BvbHltZXIvbGliL3V0aWxzL3N0eWxlLWdhdGhlcmBcbiAqIEBwYXJhbSBzdHlsZU1vZHVsZSB0aGUgbmFtZWQgaWQgb2YgdGhlIHN0eWxlIG1vZHVsZSB0byBpbXBvcnRcbiAqIEByZXR1cm5zIHRoZSBzdHlsZSBtb2R1bGUncyBDU1MgdGV4dCwgb3IgYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBtb2R1bGUgZG9lc1xuICogICBub3QgZXhpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydFN0eWxlTW9kdWxlKHN0eWxlTW9kdWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoIUNBQ0hFRF9TVFlMRV9NT0RVTEVTLmhhcyhzdHlsZU1vZHVsZSkpIHtcbiAgICBpZiAoIWNhY2hlZERvbU1vZHVsZSkge1xuICAgICAgY2FjaGVkRG9tTW9kdWxlID0gY3VzdG9tRWxlbWVudHMuZ2V0KCdkb20tbW9kdWxlJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3R5bGVUZW1wbGF0ZSA9IDxIVE1MVGVtcGxhdGVFbGVtZW50IHwgdW5kZWZpbmVkPihcbiAgICAgIGNhY2hlZERvbU1vZHVsZS5pbXBvcnQoc3R5bGVNb2R1bGUsICd0ZW1wbGF0ZScpXG4gICAgKTtcbiAgICBpZiAoc3R5bGVUZW1wbGF0ZSkge1xuICAgICAgY29uc3Qgc3R5bGVzID0gc3R5bGVUZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3N0eWxlJyk7XG4gICAgICBDQUNIRURfU1RZTEVfTU9EVUxFUy5zZXQoXG4gICAgICAgIHN0eWxlTW9kdWxlLFxuICAgICAgICBBcnJheS5mcm9tKHN0eWxlcylcbiAgICAgICAgICAubWFwKHN0eWxlID0+IHN0eWxlLmlubmVyVGV4dClcbiAgICAgICAgICAuam9pbignXFxuJylcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENBQ0hFRF9TVFlMRV9NT0RVTEVTLnNldChzdHlsZU1vZHVsZSwgJycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBDQUNIRURfU1RZTEVfTU9EVUxFUy5nZXQoc3R5bGVNb2R1bGUpITtcbn1cblxuLyoqXG4gKiBSZXNldHMgdGhlIGNhY2hlIHVzaW5nIGJ5IGBpbXBvcnRTdHlsZU1vZHVsZSgpYCwgcHJpbWFyaWx5IHVzZWQgZm9yIHRlc3RpbmcuXG4gKlxuICogQGRlcHJlY2F0ZWQgY2xlYXJTdHlsZU1vZHVsZUNhY2hlIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclN0eWxlTW9kdWxlQ2FjaGUoKSB7XG4gIENBQ0hFRF9TVFlMRV9NT0RVTEVTID0gbmV3IE1hcCgpO1xufVxuIl19