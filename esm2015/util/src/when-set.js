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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi1zZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kZWJha2VyeS9vcmlnYW1pL3V0aWwvIiwic291cmNlcyI6WyJzcmMvd2hlbi1zZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILElBQUksVUFBd0QsQ0FBQztBQUM3RCxJQUFJLGVBQW1FLENBQUM7QUFFeEU7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sVUFBVSxPQUFPLENBS3JCLE1BQVMsRUFDVCxRQUFXLEVBQ1gsWUFBWSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLEtBQUssV0FBVyxFQUN4RCxZQUFpQztJQUVqQyxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDM0IsSUFBSSxPQUFPLFlBQVksS0FBSyxVQUFVLEVBQUU7WUFDdEMsWUFBWSxDQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0tBQzdDO1NBQU07UUFDTCxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsVUFBVSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3BCLGVBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxrQkFBc0MsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMzQixrQkFBa0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQy9CLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLGtCQUFrQixHQUF1QixVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEMsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBRSxDQUFDO1lBQ2xELElBQUksT0FBTyxZQUFZLEtBQUssVUFBVSxFQUFFO2dCQUN0QyxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBRSxDQUFDO2dCQUNoRCxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzlCO1lBRUQsT0FBTyxPQUFPLENBQUM7U0FDaEI7YUFBTTtZQUNMLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFJLE9BQU8sQ0FBQyxFQUFFO2dCQUN2QyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUU7b0JBQ3RDLFlBQVksRUFBRSxJQUFJO29CQUNsQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsR0FBRzt3QkFDRCxPQUFPLFlBQVksQ0FBQztvQkFDdEIsQ0FBQztvQkFDRCxHQUFHLENBQUMsS0FBUTt3QkFDVixZQUFZLEdBQUcsS0FBSyxDQUFDO3dCQUNyQixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDcEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO2dDQUN0QyxLQUFLO2dDQUNMLFlBQVksRUFBRSxJQUFJO2dDQUNsQixVQUFVLEVBQUUsSUFBSTtnQ0FDaEIsUUFBUSxFQUFFLElBQUk7NkJBQ2YsQ0FBQyxDQUFDOzRCQUVILGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDcEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRTtnQ0FDNUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDM0I7NEJBRUQsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUUsQ0FBQzs0QkFDaEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQ0FDM0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNsQixDQUFDLENBQUMsQ0FBQzs0QkFFSCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ2hCO29CQUNILENBQUM7aUJBQ0YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLE1BQU0sU0FBUyxHQUE4QixFQUFFLENBQUM7WUFDaEQsSUFBSSxPQUFPLFlBQVksS0FBSyxVQUFVLEVBQUU7Z0JBQ3RDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDOUI7WUFFRCxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN4QyxPQUFPLE9BQU8sQ0FBQztTQUNoQjtLQUNGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTWFwIG9mIHRhcmdldHMsIHRoZWlyIHByb3BlcnRpZXMsIGFuZCBwcm9taXNlcyB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2hlblxuICogdGhleSBhcmUgc2V0LiBUaGlzIGFsbG93cyBtdWx0aXBsZSBpbnZvY2F0aW9ucyB0byBgd2hlblNldCgpYCBmb3IgdGhlIHNhbWVcbiAqIHRhcmdldCBhbmQgcHJvcGVydHkgdG8gcmVzb2x2ZS5cbiAqL1xubGV0IHdoZW5TZXRNYXA6IFdlYWtNYXA8YW55LCBNYXA8UHJvcGVydHlLZXksIFByb21pc2U8YW55Pj4+O1xubGV0IGNhbGxiYWNrU3luY01hcDogV2Vha01hcDxQcm9taXNlPGFueT4sIEFycmF5PCh2YWx1ZTogYW55KSA9PiB2b2lkPj47XG5cbi8qKlxuICogUmVzb2x2ZXMgd2hlbiB0aGUgcHJvdmlkZWQgcHJvcGVydHkgaXMgc2V0IHRvIGEgbm9uLXVuZGVmaW5lZCB2YWx1ZSBvbiB0aGVcbiAqIHRhcmdldC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IHRoZSB0YXJnZXQgdG8gbGlzdGVuIHRvXG4gKiBAcGFyYW0gcHJvcGVydHkgdGhlIHByb3BlcnR5IHRvIHdhaXQgZm9yXG4gKiBAcGFyYW0gcHJlZGljYXRlIHRoZSBwcmVkaWNhdGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHRoZSBQcm9taXNlXG4gKiAgIHNob3VsZCByZXNvbHZlIGZvciBhIG5ldyB2YWx1ZS4gVGhlIGRlZmF1bHQgaXMgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIGlzXG4gKiAgIG5vdCB1bmRlZmluZWQuXG4gKiBAcGFyYW0gY2FsbGJhY2tTeW5jIGlmIG1vcmUgcHJlY2lzZSB0aW1pbmcgaXMgbmVlZGVkLCB0aGlzIGNhbGxiYWNrIG1heSBiZVxuICogICBwcm92aWRlZCB0byBpbW1lZGlhdGVseSBwcm9jZXNzIHRoZSBzZXQgdmFsdWUgc2luY2UgdGhlIHJlc29sdmVkIFByb21pc2VcbiAqICAgd2lsbCBiZSBhc3luY1xuICogQHJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbmV3IHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aGVuU2V0PFxuICBULFxuICBLIGV4dGVuZHMga2V5b2YgVCxcbiAgViBleHRlbmRzIFRbS10gPSBFeGNsdWRlPFRbS10sIHVuZGVmaW5lZD5cbj4oXG4gIHRhcmdldDogVCxcbiAgcHJvcGVydHk6IEssXG4gIHByZWRpY2F0ZSA9ICh2YWx1ZTogYW55KSA9PiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnLFxuICBjYWxsYmFja1N5bmM/OiAodmFsdWU6IFYpID0+IHZvaWRcbik6IFByb21pc2U8Vj4ge1xuICBsZXQgY3VycmVudFZhbHVlID0gdGFyZ2V0W3Byb3BlcnR5XTtcbiAgaWYgKHByZWRpY2F0ZShjdXJyZW50VmFsdWUpKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFja1N5bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrU3luYyg8Vj50YXJnZXRbcHJvcGVydHldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKDxWPnRhcmdldFtwcm9wZXJ0eV0pO1xuICB9IGVsc2Uge1xuICAgIGlmICghd2hlblNldE1hcCkge1xuICAgICAgd2hlblNldE1hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgfVxuXG4gICAgaWYgKCFjYWxsYmFja1N5bmNNYXApIHtcbiAgICAgIGNhbGxiYWNrU3luY01hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgfVxuXG4gICAgbGV0IHByb3BlcnR5UHJvbWlzZU1hcDogTWFwPEssIFByb21pc2U8Vj4+O1xuICAgIGlmICghd2hlblNldE1hcC5oYXModGFyZ2V0KSkge1xuICAgICAgcHJvcGVydHlQcm9taXNlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgd2hlblNldE1hcC5zZXQodGFyZ2V0LCBwcm9wZXJ0eVByb21pc2VNYXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wZXJ0eVByb21pc2VNYXAgPSA8TWFwPEssIFByb21pc2U8Vj4+PndoZW5TZXRNYXAuZ2V0KHRhcmdldCk7XG4gICAgfVxuXG4gICAgaWYgKHByb3BlcnR5UHJvbWlzZU1hcC5oYXMocHJvcGVydHkpKSB7XG4gICAgICBjb25zdCBwcm9taXNlID0gcHJvcGVydHlQcm9taXNlTWFwLmdldChwcm9wZXJ0eSkhO1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja1N5bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gY2FsbGJhY2tTeW5jTWFwLmdldChwcm9taXNlKSE7XG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrU3luYyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2U8Vj4ocmVzb2x2ZSA9PiB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldCh2YWx1ZTogVikge1xuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwge1xuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIHByb3BlcnR5UHJvbWlzZU1hcC5kZWxldGUocHJvcGVydHkpO1xuICAgICAgICAgICAgICBpZiAoIXByb3BlcnR5UHJvbWlzZU1hcC5zaXplKSB7XG4gICAgICAgICAgICAgICAgd2hlblNldE1hcC5kZWxldGUodGFyZ2V0KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IGNhbGxiYWNrU3luY01hcC5nZXQocHJvbWlzZSkhO1xuICAgICAgICAgICAgICBjYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodmFsdWUpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHByb3BlcnR5UHJvbWlzZU1hcC5zZXQocHJvcGVydHksIHByb21pc2UpO1xuICAgICAgY29uc3QgY2FsbGJhY2tzOiBBcnJheTwodmFsdWU6IFYpID0+IHZvaWQ+ID0gW107XG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrU3luYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFja1N5bmMpO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFja1N5bmNNYXAuc2V0KHByb21pc2UsIGNhbGxiYWNrcyk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==