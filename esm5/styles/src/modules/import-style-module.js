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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LXN0eWxlLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcmlnYW1pL3N0eWxlcy8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2ltcG9ydC1zdHlsZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7O0dBRUc7QUFDSCxJQUFJLGVBQWlDLENBQUM7QUFFdEM7O0dBRUc7QUFDSCxJQUFJLG9CQUFvQixHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO0FBRXJEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsV0FBbUI7SUFDbkQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3BCLGVBQWUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsSUFBTSxhQUFhLEdBQW9DLENBQ3JELGVBQWUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUNoRCxDQUFDO1FBQ0YsSUFBSSxhQUFhLEVBQUU7WUFDakIsSUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvRCxvQkFBb0IsQ0FBQyxHQUFHLENBQ3RCLFdBQVcsRUFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDZixHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsU0FBUyxFQUFmLENBQWUsQ0FBQztpQkFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNkLENBQUM7U0FDSDthQUFNO1lBQ0wsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMzQztLQUNGO0lBRUQsT0FBTyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFFLENBQUM7QUFDaEQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLG9CQUFvQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDbkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvbU1vZHVsZSB9IGZyb20gJ0Bwb2x5bWVyL3BvbHltZXIvbGliL2VsZW1lbnRzL2RvbS1tb2R1bGUnO1xuXG4vKipcbiAqIFRoZSA8ZG9tLW1vZHVsZT4gY29uc3RydWN0b3IuXG4gKi9cbmxldCBjYWNoZWREb21Nb2R1bGU6IHR5cGVvZiBEb21Nb2R1bGU7XG5cbi8qKlxuICogU3R5bGUgbW9kdWxlIENTUyB0ZXh0IGNhY2hlZCBieSBpZC5cbiAqL1xubGV0IENBQ0hFRF9TVFlMRV9NT0RVTEVTID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuLyoqXG4gKiBJbXBvcnRzIGEgYDxkb20tbW9kdWxlIGlkPVwibmFtZVwiPmAgc3R5bGUgbW9kdWxlIGJ5IGl0cyBpZCBhbmQgcmV0dXJucyB0aGVcbiAqIGA8c3R5bGU+YCBjb250ZW50IGZvciB0aGUgbW9kdWxlLiBFbnN1cmUgdGhhdCB0aGUgbW9kdWxlIGlzIGltcG9ydGVkIGFuZFxuICogYWRkZWQgdG8gdGhlIERPTSBiZWZvcmUgY2FsbGluZyBgaW1wb3J0U3R5bGVNb2R1bGUoKWAuXG4gKlxuICogQGRlcHJlY2F0ZWQgVXNlIHN0eWxlc0Zyb21Nb2R1bGUgZnJvbVxuICogICBgQHBvbHltZXIvcG9seW1lci9saWIvdXRpbHMvc3R5bGUtZ2F0aGVyYFxuICogQHBhcmFtIHN0eWxlTW9kdWxlIHRoZSBuYW1lZCBpZCBvZiB0aGUgc3R5bGUgbW9kdWxlIHRvIGltcG9ydFxuICogQHJldHVybnMgdGhlIHN0eWxlIG1vZHVsZSdzIENTUyB0ZXh0LCBvciBhbiBlbXB0eSBzdHJpbmcgaWYgdGhlIG1vZHVsZSBkb2VzXG4gKiAgIG5vdCBleGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW1wb3J0U3R5bGVNb2R1bGUoc3R5bGVNb2R1bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICghQ0FDSEVEX1NUWUxFX01PRFVMRVMuaGFzKHN0eWxlTW9kdWxlKSkge1xuICAgIGlmICghY2FjaGVkRG9tTW9kdWxlKSB7XG4gICAgICBjYWNoZWREb21Nb2R1bGUgPSBjdXN0b21FbGVtZW50cy5nZXQoJ2RvbS1tb2R1bGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZVRlbXBsYXRlID0gPEhUTUxUZW1wbGF0ZUVsZW1lbnQgfCB1bmRlZmluZWQ+KFxuICAgICAgY2FjaGVkRG9tTW9kdWxlLmltcG9ydChzdHlsZU1vZHVsZSwgJ3RlbXBsYXRlJylcbiAgICApO1xuICAgIGlmIChzdHlsZVRlbXBsYXRlKSB7XG4gICAgICBjb25zdCBzdHlsZXMgPSBzdHlsZVRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnc3R5bGUnKTtcbiAgICAgIENBQ0hFRF9TVFlMRV9NT0RVTEVTLnNldChcbiAgICAgICAgc3R5bGVNb2R1bGUsXG4gICAgICAgIEFycmF5LmZyb20oc3R5bGVzKVxuICAgICAgICAgIC5tYXAoc3R5bGUgPT4gc3R5bGUuaW5uZXJUZXh0KVxuICAgICAgICAgIC5qb2luKCdcXG4nKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ0FDSEVEX1NUWUxFX01PRFVMRVMuc2V0KHN0eWxlTW9kdWxlLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIENBQ0hFRF9TVFlMRV9NT0RVTEVTLmdldChzdHlsZU1vZHVsZSkhO1xufVxuXG4vKipcbiAqIFJlc2V0cyB0aGUgY2FjaGUgdXNpbmcgYnkgYGltcG9ydFN0eWxlTW9kdWxlKClgLCBwcmltYXJpbHkgdXNlZCBmb3IgdGVzdGluZy5cbiAqXG4gKiBAZGVwcmVjYXRlZCBjbGVhclN0eWxlTW9kdWxlQ2FjaGUgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU3R5bGVNb2R1bGVDYWNoZSgpIHtcbiAgQ0FDSEVEX1NUWUxFX01PRFVMRVMgPSBuZXcgTWFwKCk7XG59XG4iXX0=