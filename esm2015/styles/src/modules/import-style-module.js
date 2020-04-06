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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXN0eWxlLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcmlnYW1pL3N0eWxlcy8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2ltcG9ydC1zdHlsZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7O0dBRUc7QUFDSCxJQUFJLGVBQWlDLENBQUM7QUFFdEM7O0dBRUc7QUFDSCxJQUFJLG9CQUFvQixHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO0FBRXJEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsV0FBbUI7SUFDbkQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3BCLGVBQWUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsTUFBTSxhQUFhLEdBQW9DLENBQ3JELGVBQWUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUNoRCxDQUFDO1FBQ0YsSUFBSSxhQUFhLEVBQUU7WUFDakIsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvRCxvQkFBb0IsQ0FBQyxHQUFHLENBQ3RCLFdBQVcsRUFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDZixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO2lCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2QsQ0FBQztTQUNIO2FBQU07WUFDTCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzNDO0tBQ0Y7SUFFRCxPQUFPLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUUsQ0FBQztBQUNoRCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsb0JBQW9CLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNuQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRG9tTW9kdWxlIH0gZnJvbSAnQHBvbHltZXIvcG9seW1lci9saWIvZWxlbWVudHMvZG9tLW1vZHVsZSc7XG5cbi8qKlxuICogVGhlIDxkb20tbW9kdWxlPiBjb25zdHJ1Y3Rvci5cbiAqL1xubGV0IGNhY2hlZERvbU1vZHVsZTogdHlwZW9mIERvbU1vZHVsZTtcblxuLyoqXG4gKiBTdHlsZSBtb2R1bGUgQ1NTIHRleHQgY2FjaGVkIGJ5IGlkLlxuICovXG5sZXQgQ0FDSEVEX1NUWUxFX01PRFVMRVMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4vKipcbiAqIEltcG9ydHMgYSBgPGRvbS1tb2R1bGUgaWQ9XCJuYW1lXCI+YCBzdHlsZSBtb2R1bGUgYnkgaXRzIGlkIGFuZCByZXR1cm5zIHRoZVxuICogYDxzdHlsZT5gIGNvbnRlbnQgZm9yIHRoZSBtb2R1bGUuIEVuc3VyZSB0aGF0IHRoZSBtb2R1bGUgaXMgaW1wb3J0ZWQgYW5kXG4gKiBhZGRlZCB0byB0aGUgRE9NIGJlZm9yZSBjYWxsaW5nIGBpbXBvcnRTdHlsZU1vZHVsZSgpYC5cbiAqXG4gKiBAZGVwcmVjYXRlZCBVc2Ugc3R5bGVzRnJvbU1vZHVsZSBmcm9tXG4gKiAgIGBAcG9seW1lci9wb2x5bWVyL2xpYi91dGlscy9zdHlsZS1nYXRoZXJgXG4gKiBAcGFyYW0gc3R5bGVNb2R1bGUgdGhlIG5hbWVkIGlkIG9mIHRoZSBzdHlsZSBtb2R1bGUgdG8gaW1wb3J0XG4gKiBAcmV0dXJucyB0aGUgc3R5bGUgbW9kdWxlJ3MgQ1NTIHRleHQsIG9yIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgbW9kdWxlIGRvZXNcbiAqICAgbm90IGV4aXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbXBvcnRTdHlsZU1vZHVsZShzdHlsZU1vZHVsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKCFDQUNIRURfU1RZTEVfTU9EVUxFUy5oYXMoc3R5bGVNb2R1bGUpKSB7XG4gICAgaWYgKCFjYWNoZWREb21Nb2R1bGUpIHtcbiAgICAgIGNhY2hlZERvbU1vZHVsZSA9IGN1c3RvbUVsZW1lbnRzLmdldCgnZG9tLW1vZHVsZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0eWxlVGVtcGxhdGUgPSA8SFRNTFRlbXBsYXRlRWxlbWVudCB8IHVuZGVmaW5lZD4oXG4gICAgICBjYWNoZWREb21Nb2R1bGUuaW1wb3J0KHN0eWxlTW9kdWxlLCAndGVtcGxhdGUnKVxuICAgICk7XG4gICAgaWYgKHN0eWxlVGVtcGxhdGUpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHN0eWxlVGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZScpO1xuICAgICAgQ0FDSEVEX1NUWUxFX01PRFVMRVMuc2V0KFxuICAgICAgICBzdHlsZU1vZHVsZSxcbiAgICAgICAgQXJyYXkuZnJvbShzdHlsZXMpXG4gICAgICAgICAgLm1hcChzdHlsZSA9PiBzdHlsZS5pbm5lclRleHQpXG4gICAgICAgICAgLmpvaW4oJ1xcbicpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBDQUNIRURfU1RZTEVfTU9EVUxFUy5zZXQoc3R5bGVNb2R1bGUsICcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gQ0FDSEVEX1NUWUxFX01PRFVMRVMuZ2V0KHN0eWxlTW9kdWxlKSE7XG59XG5cbi8qKlxuICogUmVzZXRzIHRoZSBjYWNoZSB1c2luZyBieSBgaW1wb3J0U3R5bGVNb2R1bGUoKWAsIHByaW1hcmlseSB1c2VkIGZvciB0ZXN0aW5nLlxuICpcbiAqIEBkZXByZWNhdGVkIGNsZWFyU3R5bGVNb2R1bGVDYWNoZSB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgcmVsZWFzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTdHlsZU1vZHVsZUNhY2hlKCkge1xuICBDQUNIRURfU1RZTEVfTU9EVUxFUyA9IG5ldyBNYXAoKTtcbn1cbiJdfQ==