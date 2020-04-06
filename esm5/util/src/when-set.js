/**
 * Map of targets, their properties, and promises that will be resolved when
 * they are set. This allows multiple invocations to `whenSet()` for the same
 * target and property to resolve.
 */
var whenSetMap;
var callbackSyncMap;
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
export function whenSet(target, property, predicate, callbackSync) {
    if (predicate === void 0) { predicate = function (value) { return typeof value !== 'undefined'; }; }
    var currentValue = target[property];
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
        var propertyPromiseMap_1;
        if (!whenSetMap.has(target)) {
            propertyPromiseMap_1 = new Map();
            whenSetMap.set(target, propertyPromiseMap_1);
        }
        else {
            propertyPromiseMap_1 = whenSetMap.get(target);
        }
        if (propertyPromiseMap_1.has(property)) {
            var promise = propertyPromiseMap_1.get(property);
            if (typeof callbackSync === 'function') {
                var callbacks = callbackSyncMap.get(promise);
                callbacks.push(callbackSync);
            }
            return promise;
        }
        else {
            var promise_1 = new Promise(function (resolve) {
                Object.defineProperty(target, property, {
                    configurable: true,
                    enumerable: true,
                    get: function () {
                        return currentValue;
                    },
                    set: function (value) {
                        currentValue = value;
                        if (predicate(value)) {
                            Object.defineProperty(target, property, {
                                value: value,
                                configurable: true,
                                enumerable: true,
                                writable: true
                            });
                            propertyPromiseMap_1.delete(property);
                            if (!propertyPromiseMap_1.size) {
                                whenSetMap.delete(target);
                            }
                            var callbacks_1 = callbackSyncMap.get(promise_1);
                            callbacks_1.forEach(function (callback) {
                                callback(value);
                            });
                            resolve(value);
                        }
                    }
                });
            });
            propertyPromiseMap_1.set(property, promise_1);
            var callbacks = [];
            if (typeof callbackSync === 'function') {
                callbacks.push(callbackSync);
            }
            callbackSyncMap.set(promise_1, callbacks);
            return promise_1;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi1zZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kZWJha2VyeS9vcmlnYW1pL3V0aWwvIiwic291cmNlcyI6WyJzcmMvd2hlbi1zZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILElBQUksVUFBd0QsQ0FBQztBQUM3RCxJQUFJLGVBQW1FLENBQUM7QUFFeEU7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sVUFBVSxPQUFPLENBS3JCLE1BQVMsRUFDVCxRQUFXLEVBQ1gsU0FBd0QsRUFDeEQsWUFBaUM7SUFEakMsMEJBQUEsRUFBQSxzQkFBYSxLQUFVLElBQUssT0FBQSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQTVCLENBQTRCO0lBR3hELElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUMzQixJQUFJLE9BQU8sWUFBWSxLQUFLLFVBQVUsRUFBRTtZQUN0QyxZQUFZLENBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDbkM7UUFFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7S0FDN0M7U0FBTTtRQUNMLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixVQUFVLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDcEIsZUFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7U0FDakM7UUFFRCxJQUFJLG9CQUFzQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNCLG9CQUFrQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7WUFDL0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsb0JBQWtCLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsb0JBQWtCLEdBQXVCLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakU7UUFFRCxJQUFJLG9CQUFrQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwQyxJQUFNLE9BQU8sR0FBRyxvQkFBa0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFFLENBQUM7WUFDbEQsSUFBSSxPQUFPLFlBQVksS0FBSyxVQUFVLEVBQUU7Z0JBQ3RDLElBQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFFLENBQUM7Z0JBQ2hELFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDOUI7WUFFRCxPQUFPLE9BQU8sQ0FBQztTQUNoQjthQUFNO1lBQ0wsSUFBTSxTQUFPLEdBQUcsSUFBSSxPQUFPLENBQUksVUFBQSxPQUFPO2dCQUNwQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUU7b0JBQ3RDLFlBQVksRUFBRSxJQUFJO29CQUNsQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsR0FBRzt3QkFDRCxPQUFPLFlBQVksQ0FBQztvQkFDdEIsQ0FBQztvQkFDRCxHQUFHLEVBQUgsVUFBSSxLQUFRO3dCQUNWLFlBQVksR0FBRyxLQUFLLENBQUM7d0JBQ3JCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUNwQixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUU7Z0NBQ3RDLEtBQUssT0FBQTtnQ0FDTCxZQUFZLEVBQUUsSUFBSTtnQ0FDbEIsVUFBVSxFQUFFLElBQUk7Z0NBQ2hCLFFBQVEsRUFBRSxJQUFJOzZCQUNmLENBQUMsQ0FBQzs0QkFFSCxvQkFBa0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ3BDLElBQUksQ0FBQyxvQkFBa0IsQ0FBQyxJQUFJLEVBQUU7Z0NBQzVCLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQzNCOzRCQUVELElBQU0sV0FBUyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsU0FBTyxDQUFFLENBQUM7NEJBQ2hELFdBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO2dDQUN4QixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2xCLENBQUMsQ0FBQyxDQUFDOzRCQUVILE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDaEI7b0JBQ0gsQ0FBQztpQkFDRixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILG9CQUFrQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBTyxDQUFDLENBQUM7WUFDMUMsSUFBTSxTQUFTLEdBQThCLEVBQUUsQ0FBQztZQUNoRCxJQUFJLE9BQU8sWUFBWSxLQUFLLFVBQVUsRUFBRTtnQkFDdEMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM5QjtZQUVELGVBQWUsQ0FBQyxHQUFHLENBQUMsU0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sU0FBTyxDQUFDO1NBQ2hCO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNYXAgb2YgdGFyZ2V0cywgdGhlaXIgcHJvcGVydGllcywgYW5kIHByb21pc2VzIHRoYXQgd2lsbCBiZSByZXNvbHZlZCB3aGVuXG4gKiB0aGV5IGFyZSBzZXQuIFRoaXMgYWxsb3dzIG11bHRpcGxlIGludm9jYXRpb25zIHRvIGB3aGVuU2V0KClgIGZvciB0aGUgc2FtZVxuICogdGFyZ2V0IGFuZCBwcm9wZXJ0eSB0byByZXNvbHZlLlxuICovXG5sZXQgd2hlblNldE1hcDogV2Vha01hcDxhbnksIE1hcDxQcm9wZXJ0eUtleSwgUHJvbWlzZTxhbnk+Pj47XG5sZXQgY2FsbGJhY2tTeW5jTWFwOiBXZWFrTWFwPFByb21pc2U8YW55PiwgQXJyYXk8KHZhbHVlOiBhbnkpID0+IHZvaWQ+PjtcblxuLyoqXG4gKiBSZXNvbHZlcyB3aGVuIHRoZSBwcm92aWRlZCBwcm9wZXJ0eSBpcyBzZXQgdG8gYSBub24tdW5kZWZpbmVkIHZhbHVlIG9uIHRoZVxuICogdGFyZ2V0LlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgdGhlIHRhcmdldCB0byBsaXN0ZW4gdG9cbiAqIEBwYXJhbSBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgdG8gd2FpdCBmb3JcbiAqIEBwYXJhbSBwcmVkaWNhdGUgdGhlIHByZWRpY2F0ZSB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3QgdGhlIFByb21pc2VcbiAqICAgc2hvdWxkIHJlc29sdmUgZm9yIGEgbmV3IHZhbHVlLiBUaGUgZGVmYXVsdCBpcyB0byBjaGVjayBpZiB0aGUgdmFsdWUgaXNcbiAqICAgbm90IHVuZGVmaW5lZC5cbiAqIEBwYXJhbSBjYWxsYmFja1N5bmMgaWYgbW9yZSBwcmVjaXNlIHRpbWluZyBpcyBuZWVkZWQsIHRoaXMgY2FsbGJhY2sgbWF5IGJlXG4gKiAgIHByb3ZpZGVkIHRvIGltbWVkaWF0ZWx5IHByb2Nlc3MgdGhlIHNldCB2YWx1ZSBzaW5jZSB0aGUgcmVzb2x2ZWQgUHJvbWlzZVxuICogICB3aWxsIGJlIGFzeW5jXG4gKiBAcmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBuZXcgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdoZW5TZXQ8XG4gIFQsXG4gIEsgZXh0ZW5kcyBrZXlvZiBULFxuICBWIGV4dGVuZHMgVFtLXSA9IEV4Y2x1ZGU8VFtLXSwgdW5kZWZpbmVkPlxuPihcbiAgdGFyZ2V0OiBULFxuICBwcm9wZXJ0eTogSyxcbiAgcHJlZGljYXRlID0gKHZhbHVlOiBhbnkpID0+IHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcsXG4gIGNhbGxiYWNrU3luYz86ICh2YWx1ZTogVikgPT4gdm9pZFxuKTogUHJvbWlzZTxWPiB7XG4gIGxldCBjdXJyZW50VmFsdWUgPSB0YXJnZXRbcHJvcGVydHldO1xuICBpZiAocHJlZGljYXRlKGN1cnJlbnRWYWx1ZSkpIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrU3luYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2tTeW5jKDxWPnRhcmdldFtwcm9wZXJ0eV0pO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoPFY+dGFyZ2V0W3Byb3BlcnR5XSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCF3aGVuU2V0TWFwKSB7XG4gICAgICB3aGVuU2V0TWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICB9XG5cbiAgICBpZiAoIWNhbGxiYWNrU3luY01hcCkge1xuICAgICAgY2FsbGJhY2tTeW5jTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICB9XG5cbiAgICBsZXQgcHJvcGVydHlQcm9taXNlTWFwOiBNYXA8SywgUHJvbWlzZTxWPj47XG4gICAgaWYgKCF3aGVuU2V0TWFwLmhhcyh0YXJnZXQpKSB7XG4gICAgICBwcm9wZXJ0eVByb21pc2VNYXAgPSBuZXcgTWFwKCk7XG4gICAgICB3aGVuU2V0TWFwLnNldCh0YXJnZXQsIHByb3BlcnR5UHJvbWlzZU1hcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb3BlcnR5UHJvbWlzZU1hcCA9IDxNYXA8SywgUHJvbWlzZTxWPj4+d2hlblNldE1hcC5nZXQodGFyZ2V0KTtcbiAgICB9XG5cbiAgICBpZiAocHJvcGVydHlQcm9taXNlTWFwLmhhcyhwcm9wZXJ0eSkpIHtcbiAgICAgIGNvbnN0IHByb21pc2UgPSBwcm9wZXJ0eVByb21pc2VNYXAuZ2V0KHByb3BlcnR5KSE7XG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrU3luYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSBjYWxsYmFja1N5bmNNYXAuZ2V0KHByb21pc2UpITtcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2tTeW5jKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxWPihyZXNvbHZlID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHksIHtcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0KHZhbHVlOiBWKSB7XG4gICAgICAgICAgICBjdXJyZW50VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUodmFsdWUpKSB7XG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCB7XG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgcHJvcGVydHlQcm9taXNlTWFwLmRlbGV0ZShwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgIGlmICghcHJvcGVydHlQcm9taXNlTWFwLnNpemUpIHtcbiAgICAgICAgICAgICAgICB3aGVuU2V0TWFwLmRlbGV0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gY2FsbGJhY2tTeW5jTWFwLmdldChwcm9taXNlKSE7XG4gICAgICAgICAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcHJvcGVydHlQcm9taXNlTWFwLnNldChwcm9wZXJ0eSwgcHJvbWlzZSk7XG4gICAgICBjb25zdCBjYWxsYmFja3M6IEFycmF5PCh2YWx1ZTogVikgPT4gdm9pZD4gPSBbXTtcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tTeW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrU3luYyk7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrU3luY01hcC5zZXQocHJvbWlzZSwgY2FsbGJhY2tzKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgfVxufVxuIl19