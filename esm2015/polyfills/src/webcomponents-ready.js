import { whenSet } from '@codebakery/origami/util';
let readyPromise;
/**
 * Returns a Promise that resolves when webcomponent polyfills are ready. If
 * this function is used *without* polyfills loaded, it will never resolve.
 *
 * @returns a Promise that resolves when webcomponents are ready
 */
export function webcomponentsReady() {
    if (!readyPromise) {
        readyPromise = new Promise(resolve => {
            whenSet(window, 'WebComponents', undefined, WebComponents => {
                if (WebComponents && !WebComponents.ready) {
                    document.addEventListener('WebComponentsReady', function onready() {
                        document.removeEventListener('WebComponentsReady', onready);
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        });
    }
    return readyPromise;
}
/**
 * Resets the `webcomponentsReady()` function. Should only be used in testing.
 */
export function resetWebcomponentsReady() {
    readyPromise = undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViY29tcG9uZW50cy1yZWFkeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RlYmFrZXJ5L29yaWdhbWkvcG9seWZpbGxzLyIsInNvdXJjZXMiOlsic3JjL3dlYmNvbXBvbmVudHMtcmVhZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBVW5ELElBQUksWUFBdUMsQ0FBQztBQUM1Qzs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxrQkFBa0I7SUFDaEMsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixZQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxFQUFFO2dCQUMxRCxJQUFJLGFBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7b0JBQ3pDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsRUFBRSxTQUFTLE9BQU87d0JBQzlELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDNUQsT0FBTyxFQUFFLENBQUM7b0JBQ1osQ0FBQyxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCO0lBQ3JDLFlBQVksR0FBRyxTQUFTLENBQUM7QUFDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdoZW5TZXQgfSBmcm9tICdAY29kZWJha2VyeS9vcmlnYW1pL3V0aWwnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIFdlYkNvbXBvbmVudHM6IHtcbiAgICAgIHJlYWR5OiBib29sZWFuO1xuICAgIH07XG4gIH1cbn1cblxubGV0IHJlYWR5UHJvbWlzZTogUHJvbWlzZTx2b2lkPiB8IHVuZGVmaW5lZDtcbi8qKlxuICogUmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHdlYmNvbXBvbmVudCBwb2x5ZmlsbHMgYXJlIHJlYWR5LiBJZlxuICogdGhpcyBmdW5jdGlvbiBpcyB1c2VkICp3aXRob3V0KiBwb2x5ZmlsbHMgbG9hZGVkLCBpdCB3aWxsIG5ldmVyIHJlc29sdmUuXG4gKlxuICogQHJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB3ZWJjb21wb25lbnRzIGFyZSByZWFkeVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2ViY29tcG9uZW50c1JlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoIXJlYWR5UHJvbWlzZSkge1xuICAgIHJlYWR5UHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgd2hlblNldCh3aW5kb3csICdXZWJDb21wb25lbnRzJywgdW5kZWZpbmVkLCBXZWJDb21wb25lbnRzID0+IHtcbiAgICAgICAgaWYgKFdlYkNvbXBvbmVudHMgJiYgIVdlYkNvbXBvbmVudHMucmVhZHkpIHtcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdXZWJDb21wb25lbnRzUmVhZHknLCBmdW5jdGlvbiBvbnJlYWR5KCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignV2ViQ29tcG9uZW50c1JlYWR5Jywgb25yZWFkeSk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZWFkeVByb21pc2U7XG59XG5cbi8qKlxuICogUmVzZXRzIHRoZSBgd2ViY29tcG9uZW50c1JlYWR5KClgIGZ1bmN0aW9uLiBTaG91bGQgb25seSBiZSB1c2VkIGluIHRlc3RpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldFdlYmNvbXBvbmVudHNSZWFkeSgpIHtcbiAgcmVhZHlQcm9taXNlID0gdW5kZWZpbmVkO1xufVxuIl19