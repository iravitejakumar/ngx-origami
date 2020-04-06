import { whenSet } from 'ngx-origami/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViY29tcG9uZW50cy1yZWFkeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcmlnYW1pL3BvbHlmaWxscy8iLCJzb3VyY2VzIjpbInNyYy93ZWJjb21wb25lbnRzLXJlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQVUzQyxJQUFJLFlBQXVDLENBQUM7QUFDNUM7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDakIsWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsRUFBRTtnQkFDMUQsSUFBSSxhQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO29CQUN6QyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxPQUFPO3dCQUM5RCxRQUFRLENBQUMsbUJBQW1CLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQzVELE9BQU8sRUFBRSxDQUFDO29CQUNaLENBQUMsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztLQUNKO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QjtJQUNyQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3aGVuU2V0IH0gZnJvbSAnbmd4LW9yaWdhbWkvdXRpbCc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgV2ViQ29tcG9uZW50czoge1xuICAgICAgcmVhZHk6IGJvb2xlYW47XG4gICAgfTtcbiAgfVxufVxuXG5sZXQgcmVhZHlQcm9taXNlOiBQcm9taXNlPHZvaWQ+IHwgdW5kZWZpbmVkO1xuLyoqXG4gKiBSZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gd2ViY29tcG9uZW50IHBvbHlmaWxscyBhcmUgcmVhZHkuIElmXG4gKiB0aGlzIGZ1bmN0aW9uIGlzIHVzZWQgKndpdGhvdXQqIHBvbHlmaWxscyBsb2FkZWQsIGl0IHdpbGwgbmV2ZXIgcmVzb2x2ZS5cbiAqXG4gKiBAcmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHdlYmNvbXBvbmVudHMgYXJlIHJlYWR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3ZWJjb21wb25lbnRzUmVhZHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmICghcmVhZHlQcm9taXNlKSB7XG4gICAgcmVhZHlQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB3aGVuU2V0KHdpbmRvdywgJ1dlYkNvbXBvbmVudHMnLCB1bmRlZmluZWQsIFdlYkNvbXBvbmVudHMgPT4ge1xuICAgICAgICBpZiAoV2ViQ29tcG9uZW50cyAmJiAhV2ViQ29tcG9uZW50cy5yZWFkeSkge1xuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1dlYkNvbXBvbmVudHNSZWFkeScsIGZ1bmN0aW9uIG9ucmVhZHkoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdXZWJDb21wb25lbnRzUmVhZHknLCBvbnJlYWR5KTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJlYWR5UHJvbWlzZTtcbn1cblxuLyoqXG4gKiBSZXNldHMgdGhlIGB3ZWJjb21wb25lbnRzUmVhZHkoKWAgZnVuY3Rpb24uIFNob3VsZCBvbmx5IGJlIHVzZWQgaW4gdGVzdGluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0V2ViY29tcG9uZW50c1JlYWR5KCkge1xuICByZWFkeVByb21pc2UgPSB1bmRlZmluZWQ7XG59XG4iXX0=