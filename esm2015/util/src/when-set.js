/**
 * Map of targets, their properties, and promises that will be resolved when
 * they are set. This allows multiple invocations to `whenSet()` for the same
 * target and property to resolve.
 */
let whenSetMap;
let callbackSyncMap;
/**
 * Resolves when the provided property is set to a non-undefined value on the
 * target.
 *
 * @param target the target to listen to
 * @param property the property to wait for
 * @param predicate the predicate to determine whether or not the Promise
 *   should resolve for a new value. The default is to check if the value is
 *   not undefined.
 * @param callbackSync if more precise timing is needed, this callback may be
 *   provided to immediately process the set value since the resolved Promise
 *   will be async
 * @returns a Promise that resolves with the new value
 */
export function whenSet(target, property, predicate = (value) => typeof value !== 'undefined', callbackSync) {
    let currentValue = target[property];
    if (predicate(currentValue)) {
        if (typeof callbackSync === 'function') {
            callbackSync(target[property]);
        }
        return Promise.resolve(target[property]);
    }
    else {
        if (!whenSetMap) {
            whenSetMap = new WeakMap();
        }
        if (!callbackSyncMap) {
            callbackSyncMap = new WeakMap();
        }
        let propertyPromiseMap;
        if (!whenSetMap.has(target)) {
            propertyPromiseMap = new Map();
            whenSetMap.set(target, propertyPromiseMap);
        }
        else {
            propertyPromiseMap = whenSetMap.get(target);
        }
        if (propertyPromiseMap.has(property)) {
            const promise = propertyPromiseMap.get(property);
            if (typeof callbackSync === 'function') {
                const callbacks = callbackSyncMap.get(promise);
                callbacks.push(callbackSync);
            }
            return promise;
        }
        else {
            const promise = new Promise(resolve => {
                Object.defineProperty(target, property, {
                    configurable: true,
                    enumerable: true,
                    get() {
                        return currentValue;
                    },
                    set(value) {
                        currentValue = value;
                        if (predicate(value)) {
                            Object.defineProperty(target, property, {
                                value,
                                configurable: true,
                                enumerable: true,
                                writable: true
                            });
                            propertyPromiseMap.delete(property);
                            if (!propertyPromiseMap.size) {
                                whenSetMap.delete(target);
                            }
                            const callbacks = callbackSyncMap.get(promise);
                            callbacks.forEach(callback => {
                                callback(value);
                            });
                            resolve(value);
                        }
                    }
                });
            });
            propertyPromiseMap.set(property, promise);
            const callbacks = [];
            if (typeof callbackSync === 'function') {
                callbacks.push(callbackSync);
            }
            callbackSyncMap.set(promise, callbacks);
            return promise;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi1zZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS91dGlsLyIsInNvdXJjZXMiOlsic3JjL3doZW4tc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxJQUFJLFVBQXdELENBQUM7QUFDN0QsSUFBSSxlQUFtRSxDQUFDO0FBRXhFOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLFVBQVUsT0FBTyxDQUtyQixNQUFTLEVBQ1QsUUFBVyxFQUNYLFlBQVksQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVcsRUFDeEQsWUFBaUM7SUFFakMsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzNCLElBQUksT0FBTyxZQUFZLEtBQUssVUFBVSxFQUFFO1lBQ3RDLFlBQVksQ0FBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUM3QztTQUFNO1FBQ0wsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLFVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNwQixlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztTQUNqQztRQUVELElBQUksa0JBQXNDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDM0Isa0JBQWtCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUMvQixVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxrQkFBa0IsR0FBdUIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqRTtRQUVELElBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUUsQ0FBQztZQUNsRCxJQUFJLE9BQU8sWUFBWSxLQUFLLFVBQVUsRUFBRTtnQkFDdEMsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUUsQ0FBQztnQkFDaEQsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM5QjtZQUVELE9BQU8sT0FBTyxDQUFDO1NBQ2hCO2FBQU07WUFDTCxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBSSxPQUFPLENBQUMsRUFBRTtnQkFDdkMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO29CQUN0QyxZQUFZLEVBQUUsSUFBSTtvQkFDbEIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLEdBQUc7d0JBQ0QsT0FBTyxZQUFZLENBQUM7b0JBQ3RCLENBQUM7b0JBQ0QsR0FBRyxDQUFDLEtBQVE7d0JBQ1YsWUFBWSxHQUFHLEtBQUssQ0FBQzt3QkFDckIsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ3BCLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRTtnQ0FDdEMsS0FBSztnQ0FDTCxZQUFZLEVBQUUsSUFBSTtnQ0FDbEIsVUFBVSxFQUFFLElBQUk7Z0NBQ2hCLFFBQVEsRUFBRSxJQUFJOzZCQUNmLENBQUMsQ0FBQzs0QkFFSCxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUU7Z0NBQzVCLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQzNCOzRCQUVELE1BQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFFLENBQUM7NEJBQ2hELFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBQzNCLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDbEIsQ0FBQyxDQUFDLENBQUM7NEJBRUgsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUNoQjtvQkFDSCxDQUFDO2lCQUNGLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMxQyxNQUFNLFNBQVMsR0FBOEIsRUFBRSxDQUFDO1lBQ2hELElBQUksT0FBTyxZQUFZLEtBQUssVUFBVSxFQUFFO2dCQUN0QyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzlCO1lBRUQsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDeEMsT0FBTyxPQUFPLENBQUM7U0FDaEI7S0FDRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1hcCBvZiB0YXJnZXRzLCB0aGVpciBwcm9wZXJ0aWVzLCBhbmQgcHJvbWlzZXMgdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdoZW5cbiAqIHRoZXkgYXJlIHNldC4gVGhpcyBhbGxvd3MgbXVsdGlwbGUgaW52b2NhdGlvbnMgdG8gYHdoZW5TZXQoKWAgZm9yIHRoZSBzYW1lXG4gKiB0YXJnZXQgYW5kIHByb3BlcnR5IHRvIHJlc29sdmUuXG4gKi9cbmxldCB3aGVuU2V0TWFwOiBXZWFrTWFwPGFueSwgTWFwPFByb3BlcnR5S2V5LCBQcm9taXNlPGFueT4+PjtcbmxldCBjYWxsYmFja1N5bmNNYXA6IFdlYWtNYXA8UHJvbWlzZTxhbnk+LCBBcnJheTwodmFsdWU6IGFueSkgPT4gdm9pZD4+O1xuXG4vKipcbiAqIFJlc29sdmVzIHdoZW4gdGhlIHByb3ZpZGVkIHByb3BlcnR5IGlzIHNldCB0byBhIG5vbi11bmRlZmluZWQgdmFsdWUgb24gdGhlXG4gKiB0YXJnZXQuXG4gKlxuICogQHBhcmFtIHRhcmdldCB0aGUgdGFyZ2V0IHRvIGxpc3RlbiB0b1xuICogQHBhcmFtIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSB0byB3YWl0IGZvclxuICogQHBhcmFtIHByZWRpY2F0ZSB0aGUgcHJlZGljYXRlIHRvIGRldGVybWluZSB3aGV0aGVyIG9yIG5vdCB0aGUgUHJvbWlzZVxuICogICBzaG91bGQgcmVzb2x2ZSBmb3IgYSBuZXcgdmFsdWUuIFRoZSBkZWZhdWx0IGlzIHRvIGNoZWNrIGlmIHRoZSB2YWx1ZSBpc1xuICogICBub3QgdW5kZWZpbmVkLlxuICogQHBhcmFtIGNhbGxiYWNrU3luYyBpZiBtb3JlIHByZWNpc2UgdGltaW5nIGlzIG5lZWRlZCwgdGhpcyBjYWxsYmFjayBtYXkgYmVcbiAqICAgcHJvdmlkZWQgdG8gaW1tZWRpYXRlbHkgcHJvY2VzcyB0aGUgc2V0IHZhbHVlIHNpbmNlIHRoZSByZXNvbHZlZCBQcm9taXNlXG4gKiAgIHdpbGwgYmUgYXN5bmNcbiAqIEByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIG5ldyB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2hlblNldDxcbiAgVCxcbiAgSyBleHRlbmRzIGtleW9mIFQsXG4gIFYgZXh0ZW5kcyBUW0tdID0gRXhjbHVkZTxUW0tdLCB1bmRlZmluZWQ+XG4+KFxuICB0YXJnZXQ6IFQsXG4gIHByb3BlcnR5OiBLLFxuICBwcmVkaWNhdGUgPSAodmFsdWU6IGFueSkgPT4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyxcbiAgY2FsbGJhY2tTeW5jPzogKHZhbHVlOiBWKSA9PiB2b2lkXG4pOiBQcm9taXNlPFY+IHtcbiAgbGV0IGN1cnJlbnRWYWx1ZSA9IHRhcmdldFtwcm9wZXJ0eV07XG4gIGlmIChwcmVkaWNhdGUoY3VycmVudFZhbHVlKSkge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2tTeW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFja1N5bmMoPFY+dGFyZ2V0W3Byb3BlcnR5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSg8Vj50YXJnZXRbcHJvcGVydHldKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIXdoZW5TZXRNYXApIHtcbiAgICAgIHdoZW5TZXRNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgIH1cblxuICAgIGlmICghY2FsbGJhY2tTeW5jTWFwKSB7XG4gICAgICBjYWxsYmFja1N5bmNNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgIH1cblxuICAgIGxldCBwcm9wZXJ0eVByb21pc2VNYXA6IE1hcDxLLCBQcm9taXNlPFY+PjtcbiAgICBpZiAoIXdoZW5TZXRNYXAuaGFzKHRhcmdldCkpIHtcbiAgICAgIHByb3BlcnR5UHJvbWlzZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgIHdoZW5TZXRNYXAuc2V0KHRhcmdldCwgcHJvcGVydHlQcm9taXNlTWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvcGVydHlQcm9taXNlTWFwID0gPE1hcDxLLCBQcm9taXNlPFY+Pj53aGVuU2V0TWFwLmdldCh0YXJnZXQpO1xuICAgIH1cblxuICAgIGlmIChwcm9wZXJ0eVByb21pc2VNYXAuaGFzKHByb3BlcnR5KSkge1xuICAgICAgY29uc3QgcHJvbWlzZSA9IHByb3BlcnR5UHJvbWlzZU1hcC5nZXQocHJvcGVydHkpITtcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tTeW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IGNhbGxiYWNrU3luY01hcC5nZXQocHJvbWlzZSkhO1xuICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFja1N5bmMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPFY+KHJlc29sdmUgPT4ge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwge1xuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQodmFsdWU6IFYpIHtcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHksIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBwcm9wZXJ0eVByb21pc2VNYXAuZGVsZXRlKHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eVByb21pc2VNYXAuc2l6ZSkge1xuICAgICAgICAgICAgICAgIHdoZW5TZXRNYXAuZGVsZXRlKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSBjYWxsYmFja1N5bmNNYXAuZ2V0KHByb21pc2UpITtcbiAgICAgICAgICAgICAgY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9wZXJ0eVByb21pc2VNYXAuc2V0KHByb3BlcnR5LCBwcm9taXNlKTtcbiAgICAgIGNvbnN0IGNhbGxiYWNrczogQXJyYXk8KHZhbHVlOiBWKSA9PiB2b2lkPiA9IFtdO1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja1N5bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2tTeW5jKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2tTeW5jTWFwLnNldChwcm9taXNlLCBjYWxsYmFja3MpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICB9XG59XG4iXX0=