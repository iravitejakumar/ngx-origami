import { whenSet } from 'ngx-origami/util';
var readyPromise;
/**
 * Returns a Promise that resolves when webcomponent polyfills are ready. If
 * this function is used *without* polyfills loaded, it will never resolve.
 *
 * @returns a Promise that resolves when webcomponents are ready
 */
export function webcomponentsReady() {
    if (!readyPromise) {
        readyPromise = new Promise(function (resolve) {
            whenSet(window, 'WebComponents', undefined, function (WebComponents) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViY29tcG9uZW50cy1yZWFkeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcmlnYW1pL3BvbHlmaWxscy8iLCJzb3VyY2VzIjpbInNyYy93ZWJjb21wb25lbnRzLXJlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQVUzQyxJQUFJLFlBQXVDLENBQUM7QUFDNUM7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDakIsWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTztZQUNoQyxPQUFPLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBQSxhQUFhO2dCQUN2RCxJQUFJLGFBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7b0JBQ3pDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsRUFBRSxTQUFTLE9BQU87d0JBQzlELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDNUQsT0FBTyxFQUFFLENBQUM7b0JBQ1osQ0FBQyxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCO0lBQ3JDLFlBQVksR0FBRyxTQUFTLENBQUM7QUFDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdoZW5TZXQgfSBmcm9tICduZ3gtb3JpZ2FtaS91dGlsJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBXZWJDb21wb25lbnRzOiB7XG4gICAgICByZWFkeTogYm9vbGVhbjtcbiAgICB9O1xuICB9XG59XG5cbmxldCByZWFkeVByb21pc2U6IFByb21pc2U8dm9pZD4gfCB1bmRlZmluZWQ7XG4vKipcbiAqIFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB3ZWJjb21wb25lbnQgcG9seWZpbGxzIGFyZSByZWFkeS4gSWZcbiAqIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCAqd2l0aG91dCogcG9seWZpbGxzIGxvYWRlZCwgaXQgd2lsbCBuZXZlciByZXNvbHZlLlxuICpcbiAqIEByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gd2ViY29tcG9uZW50cyBhcmUgcmVhZHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdlYmNvbXBvbmVudHNSZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFyZWFkeVByb21pc2UpIHtcbiAgICByZWFkeVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHdoZW5TZXQod2luZG93LCAnV2ViQ29tcG9uZW50cycsIHVuZGVmaW5lZCwgV2ViQ29tcG9uZW50cyA9PiB7XG4gICAgICAgIGlmIChXZWJDb21wb25lbnRzICYmICFXZWJDb21wb25lbnRzLnJlYWR5KSB7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignV2ViQ29tcG9uZW50c1JlYWR5JywgZnVuY3Rpb24gb25yZWFkeSgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ1dlYkNvbXBvbmVudHNSZWFkeScsIG9ucmVhZHkpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcmVhZHlQcm9taXNlO1xufVxuXG4vKipcbiAqIFJlc2V0cyB0aGUgYHdlYmNvbXBvbmVudHNSZWFkeSgpYCBmdW5jdGlvbi4gU2hvdWxkIG9ubHkgYmUgdXNlZCBpbiB0ZXN0aW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRXZWJjb21wb25lbnRzUmVhZHkoKSB7XG4gIHJlYWR5UHJvbWlzZSA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==