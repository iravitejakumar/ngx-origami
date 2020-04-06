/**
 * The <dom-module> constructor.
 */
var cachedDomModule;
/**
 * Style module CSS text cached by id.
 */
var CACHED_STYLE_MODULES = new Map();
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
        var styleTemplate = (cachedDomModule.import(styleModule, 'template'));
        if (styleTemplate) {
            var styles = styleTemplate.content.querySelectorAll('style');
            CACHED_STYLE_MODULES.set(styleModule, Array.from(styles)
                .map(function (style) { return style.innerText; })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXN0eWxlLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RlYmFrZXJ5L29yaWdhbWkvc3R5bGVzLyIsInNvdXJjZXMiOlsic3JjL21vZHVsZXMvaW1wb3J0LXN0eWxlLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7R0FFRztBQUNILElBQUksZUFBaUMsQ0FBQztBQUV0Qzs7R0FFRztBQUNILElBQUksb0JBQW9CLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxXQUFtQjtJQUNuRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDcEIsZUFBZSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEQ7UUFFRCxJQUFNLGFBQWEsR0FBb0MsQ0FDckQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQ2hELENBQUM7UUFDRixJQUFJLGFBQWEsRUFBRTtZQUNqQixJQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9ELG9CQUFvQixDQUFDLEdBQUcsQ0FDdEIsV0FBVyxFQUNYLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNmLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxTQUFTLEVBQWYsQ0FBZSxDQUFDO2lCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2QsQ0FBQztTQUNIO2FBQU07WUFDTCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzNDO0tBQ0Y7SUFFRCxPQUFPLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUUsQ0FBQztBQUNoRCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsb0JBQW9CLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNuQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRG9tTW9kdWxlIH0gZnJvbSAnQHBvbHltZXIvcG9seW1lci9saWIvZWxlbWVudHMvZG9tLW1vZHVsZSc7XG5cbi8qKlxuICogVGhlIDxkb20tbW9kdWxlPiBjb25zdHJ1Y3Rvci5cbiAqL1xubGV0IGNhY2hlZERvbU1vZHVsZTogdHlwZW9mIERvbU1vZHVsZTtcblxuLyoqXG4gKiBTdHlsZSBtb2R1bGUgQ1NTIHRleHQgY2FjaGVkIGJ5IGlkLlxuICovXG5sZXQgQ0FDSEVEX1NUWUxFX01PRFVMRVMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4vKipcbiAqIEltcG9ydHMgYSBgPGRvbS1tb2R1bGUgaWQ9XCJuYW1lXCI+YCBzdHlsZSBtb2R1bGUgYnkgaXRzIGlkIGFuZCByZXR1cm5zIHRoZVxuICogYDxzdHlsZT5gIGNvbnRlbnQgZm9yIHRoZSBtb2R1bGUuIEVuc3VyZSB0aGF0IHRoZSBtb2R1bGUgaXMgaW1wb3J0ZWQgYW5kXG4gKiBhZGRlZCB0byB0aGUgRE9NIGJlZm9yZSBjYWxsaW5nIGBpbXBvcnRTdHlsZU1vZHVsZSgpYC5cbiAqXG4gKiBAZGVwcmVjYXRlZCBVc2Ugc3R5bGVzRnJvbU1vZHVsZSBmcm9tXG4gKiAgIGBAcG9seW1lci9wb2x5bWVyL2xpYi91dGlscy9zdHlsZS1nYXRoZXJgXG4gKiBAcGFyYW0gc3R5bGVNb2R1bGUgdGhlIG5hbWVkIGlkIG9mIHRoZSBzdHlsZSBtb2R1bGUgdG8gaW1wb3J0XG4gKiBAcmV0dXJucyB0aGUgc3R5bGUgbW9kdWxlJ3MgQ1NTIHRleHQsIG9yIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgbW9kdWxlIGRvZXNcbiAqICAgbm90IGV4aXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbXBvcnRTdHlsZU1vZHVsZShzdHlsZU1vZHVsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKCFDQUNIRURfU1RZTEVfTU9EVUxFUy5oYXMoc3R5bGVNb2R1bGUpKSB7XG4gICAgaWYgKCFjYWNoZWREb21Nb2R1bGUpIHtcbiAgICAgIGNhY2hlZERvbU1vZHVsZSA9IGN1c3RvbUVsZW1lbnRzLmdldCgnZG9tLW1vZHVsZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0eWxlVGVtcGxhdGUgPSA8SFRNTFRlbXBsYXRlRWxlbWVudCB8IHVuZGVmaW5lZD4oXG4gICAgICBjYWNoZWREb21Nb2R1bGUuaW1wb3J0KHN0eWxlTW9kdWxlLCAndGVtcGxhdGUnKVxuICAgICk7XG4gICAgaWYgKHN0eWxlVGVtcGxhdGUpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHN0eWxlVGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZScpO1xuICAgICAgQ0FDSEVEX1NUWUxFX01PRFVMRVMuc2V0KFxuICAgICAgICBzdHlsZU1vZHVsZSxcbiAgICAgICAgQXJyYXkuZnJvbShzdHlsZXMpXG4gICAgICAgICAgLm1hcChzdHlsZSA9PiBzdHlsZS5pbm5lclRleHQpXG4gICAgICAgICAgLmpvaW4oJ1xcbicpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBDQUNIRURfU1RZTEVfTU9EVUxFUy5zZXQoc3R5bGVNb2R1bGUsICcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gQ0FDSEVEX1NUWUxFX01PRFVMRVMuZ2V0KHN0eWxlTW9kdWxlKSE7XG59XG5cbi8qKlxuICogUmVzZXRzIHRoZSBjYWNoZSB1c2luZyBieSBgaW1wb3J0U3R5bGVNb2R1bGUoKWAsIHByaW1hcmlseSB1c2VkIGZvciB0ZXN0aW5nLlxuICpcbiAqIEBkZXByZWNhdGVkIGNsZWFyU3R5bGVNb2R1bGVDYWNoZSB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgcmVsZWFzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTdHlsZU1vZHVsZUNhY2hlKCkge1xuICBDQUNIRURfU1RZTEVfTU9EVUxFUyA9IG5ldyBNYXAoKTtcbn1cbiJdfQ==