/**
 * Redefines an object's property with descriptor hooks that inject side effects
 * into the property's getter and setter. If the property has an existing
 * getter or setter, they will be preserved.
 *
 * @param target the object target for the descriptor
 * @param propertyKey the property of the object target
 * @param hooks the hooks to inject
 */
export function wrapAndDefineDescriptor(target, propertyKey, hooks) {
    var desc = wrapDescriptor(target, propertyKey, hooks);
    Object.defineProperty(target, propertyKey, desc);
}
/**
 * Creates a property descriptor that injects hooks into a property's getter and
 * setter to execute side effects.
 *
 * @param target the object target for the descriptor
 * @param propertyKey the property of the object target
 * @param hooks the hooks to inject
 * @returns a descriptor that can be used in `Object.defineProperty()`
 */
export function wrapDescriptor(target, propertyKey, hooks) {
    var desc = getPropertyDescriptor(target, propertyKey);
    var properties = new WeakMap();
    return {
        enumerable: desc ? desc.enumerable : true,
        get: function () {
            if (desc && desc.get) {
                return desc.get.apply(this);
            }
            else {
                var props = properties.get(this);
                return props && props[propertyKey];
            }
        },
        set: function (original) {
            var value = original;
            if (!hooks.shouldSet || hooks.shouldSet.apply(this, [value])) {
                if (hooks.beforeSet) {
                    value = hooks.beforeSet.apply(this, [value]);
                }
                var props = properties.get(this);
                if (!props) {
                    props = {};
                    properties.set(this, props);
                }
                var changed = value !== props[propertyKey];
                props[propertyKey] = value;
                if (desc && desc.set) {
                    desc.set.apply(this, [value]);
                }
                if (hooks.afterSet) {
                    hooks.afterSet.apply(this, [changed, value, original]);
                }
            }
        }
    };
}
/**
 * Similar to `Object.getOwnPropertyDescriptor()`, but this function will
 * search through the target's prototype chain when looking for the property's
 * descriptor.
 *
 * @param target object that contains the property
 * @param propertyKey name of the property
 * @returns the property descriptor if one exists
 */
export function getPropertyDescriptor(target, propertyKey) {
    while (target) {
        var desc = Object.getOwnPropertyDescriptor(target, propertyKey);
        if (desc) {
            return desc;
        }
        else {
            target = Object.getPrototypeOf(target);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS91dGlsLyIsInNvdXJjZXMiOlsic3JjL2Rlc2NyaXB0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStCQTs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSx1QkFBdUIsQ0FDckMsTUFBVyxFQUNYLFdBQW1CLEVBQ25CLEtBQXlCO0lBRXpCLElBQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUM1QixNQUFXLEVBQ1gsV0FBd0IsRUFDeEIsS0FBeUI7SUFFekIsSUFBTSxJQUFJLEdBQUcscUJBQXFCLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3hELElBQU0sVUFBVSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDakMsT0FBTztRQUNMLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDekMsR0FBRztZQUNELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsSUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQztRQUNELEdBQUcsRUFBSCxVQUFJLFFBQVc7WUFDYixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDNUQsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFO29CQUNuQixLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDOUM7Z0JBRUQsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNYLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUM3QjtnQkFFRCxJQUFNLE9BQU8sR0FBRyxLQUFLLEtBQUssS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM3QyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUMvQjtnQkFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQ2xCLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDeEQ7YUFDRjtRQUNILENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxNQUFXLEVBQ1gsV0FBd0I7SUFFeEIsT0FBTyxNQUFNLEVBQUU7UUFDYixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEM7S0FDRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERlc2NyaXB0b3IgaG9va3MgdGhhdCBjYW4gYmUgaW5qZWN0ZWQgaW50byBhIHByb3BlcnR5J3MgZ2V0dGVyIGFuZCBzZXR0ZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVzY3JpcHRvckhvb2tzPFQ+IHtcbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGJlZm9yZSBhIHByb3BlcnR5J3MgdmFsdWUgaXMgc2V0LiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSxcbiAgICogdGhlIHByb3BlcnR5IHdpbGwgYmUgc2V0LiBPdGhlcndpc2UsIHRoZSBwcm9wZXJ0eSB3aWxsIG5vdCBiZSB1cGRhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIHJlcXVlc3RlZCB0byBzZXRcbiAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIHNldCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzaG91bGRTZXQ/KHZhbHVlOiBUKTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGJlZm9yZSBhIHByb3BlcnR5J3MgdmFsdWUgaXMgc2V0IGFuZCBhZnRlciBhbnkgYHNob3VsZFNldCgpYCBoYXNcbiAgICogcmV0dXJuZWQgdHJ1ZS4gVGhpcyBhbGxvd3MgdGhlIHZhbHVlIHRvIGJlIG1hbmlwdWxhdGVkIGJlZm9yZSBzZXR0aW5nIGl0LlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIHJlcXVlc3RlZCB0byBzZXRcbiAgICogQHJldHVybnMgdGhlIHZhbHVlIHRvIGFjdHVhbGx5IHNldFxuICAgKi9cbiAgYmVmb3JlU2V0Pyh2YWx1ZTogVCk6IFQ7XG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhZnRlciBhIHByb3BlcnR5J3MgdmFsdWUgaXMgc2V0LiBUaGlzIGFsbG93cyBzaWRlIGVmZmVjdHMgdG8gYmVcbiAgICogcGVyZm9ybWVkIG9uIHRoZSBuZXcgdmFsdWUgb3IgdG8gZGV0ZXJtaW5lIGlmIGEgdmFsdWUgY2hhbmdlZC5cbiAgICpcbiAgICogQHBhcmFtIGNoYW5nZWQgaW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRoZSB2YWx1ZSBjaGFuZ2VkXG4gICAqIEBwYXJhbSBjdXJyZW50IHRoZSBuZXcgdmFsdWVcbiAgICogQHBhcmFtIHByZXZpb3VzIHRoZSBwcmV2aW91cyB2YWx1ZVxuICAgKi9cbiAgYWZ0ZXJTZXQ/KGNoYW5nZWQ6IGJvb2xlYW4sIGN1cnJlbnQ6IFQsIHByZXZpb3VzOiBUKTogdm9pZDtcbn1cblxuLyoqXG4gKiBSZWRlZmluZXMgYW4gb2JqZWN0J3MgcHJvcGVydHkgd2l0aCBkZXNjcmlwdG9yIGhvb2tzIHRoYXQgaW5qZWN0IHNpZGUgZWZmZWN0c1xuICogaW50byB0aGUgcHJvcGVydHkncyBnZXR0ZXIgYW5kIHNldHRlci4gSWYgdGhlIHByb3BlcnR5IGhhcyBhbiBleGlzdGluZ1xuICogZ2V0dGVyIG9yIHNldHRlciwgdGhleSB3aWxsIGJlIHByZXNlcnZlZC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IHRoZSBvYmplY3QgdGFyZ2V0IGZvciB0aGUgZGVzY3JpcHRvclxuICogQHBhcmFtIHByb3BlcnR5S2V5IHRoZSBwcm9wZXJ0eSBvZiB0aGUgb2JqZWN0IHRhcmdldFxuICogQHBhcmFtIGhvb2tzIHRoZSBob29rcyB0byBpbmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdyYXBBbmREZWZpbmVEZXNjcmlwdG9yPFQ+KFxuICB0YXJnZXQ6IGFueSxcbiAgcHJvcGVydHlLZXk6IHN0cmluZyxcbiAgaG9va3M6IERlc2NyaXB0b3JIb29rczxUPlxuKSB7XG4gIGNvbnN0IGRlc2MgPSB3cmFwRGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5LCBob29rcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgcHJvcGVydHkgZGVzY3JpcHRvciB0aGF0IGluamVjdHMgaG9va3MgaW50byBhIHByb3BlcnR5J3MgZ2V0dGVyIGFuZFxuICogc2V0dGVyIHRvIGV4ZWN1dGUgc2lkZSBlZmZlY3RzLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgdGhlIG9iamVjdCB0YXJnZXQgZm9yIHRoZSBkZXNjcmlwdG9yXG4gKiBAcGFyYW0gcHJvcGVydHlLZXkgdGhlIHByb3BlcnR5IG9mIHRoZSBvYmplY3QgdGFyZ2V0XG4gKiBAcGFyYW0gaG9va3MgdGhlIGhvb2tzIHRvIGluamVjdFxuICogQHJldHVybnMgYSBkZXNjcmlwdG9yIHRoYXQgY2FuIGJlIHVzZWQgaW4gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgpYFxuICovXG5leHBvcnQgZnVuY3Rpb24gd3JhcERlc2NyaXB0b3I8VD4oXG4gIHRhcmdldDogYW55LFxuICBwcm9wZXJ0eUtleTogUHJvcGVydHlLZXksXG4gIGhvb2tzOiBEZXNjcmlwdG9ySG9va3M8VD5cbik6IFByb3BlcnR5RGVzY3JpcHRvciB7XG4gIGNvbnN0IGRlc2MgPSBnZXRQcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gIGNvbnN0IHByb3BlcnRpZXMgPSBuZXcgV2Vha01hcCgpO1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6IGRlc2MgPyBkZXNjLmVudW1lcmFibGUgOiB0cnVlLFxuICAgIGdldCgpIHtcbiAgICAgIGlmIChkZXNjICYmIGRlc2MuZ2V0KSB7XG4gICAgICAgIHJldHVybiBkZXNjLmdldC5hcHBseSh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gcHJvcGVydGllcy5nZXQodGhpcyk7XG4gICAgICAgIHJldHVybiBwcm9wcyAmJiBwcm9wc1twcm9wZXJ0eUtleV07XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXQob3JpZ2luYWw6IFQpIHtcbiAgICAgIGxldCB2YWx1ZSA9IG9yaWdpbmFsO1xuICAgICAgaWYgKCFob29rcy5zaG91bGRTZXQgfHwgaG9va3Muc2hvdWxkU2V0LmFwcGx5KHRoaXMsIFt2YWx1ZV0pKSB7XG4gICAgICAgIGlmIChob29rcy5iZWZvcmVTZXQpIHtcbiAgICAgICAgICB2YWx1ZSA9IGhvb2tzLmJlZm9yZVNldC5hcHBseSh0aGlzLCBbdmFsdWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wcyA9IHByb3BlcnRpZXMuZ2V0KHRoaXMpO1xuICAgICAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgICAgcHJvcHMgPSB7fTtcbiAgICAgICAgICBwcm9wZXJ0aWVzLnNldCh0aGlzLCBwcm9wcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjaGFuZ2VkID0gdmFsdWUgIT09IHByb3BzW3Byb3BlcnR5S2V5XTtcbiAgICAgICAgcHJvcHNbcHJvcGVydHlLZXldID0gdmFsdWU7XG4gICAgICAgIGlmIChkZXNjICYmIGRlc2Muc2V0KSB7XG4gICAgICAgICAgZGVzYy5zZXQuYXBwbHkodGhpcywgW3ZhbHVlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG9va3MuYWZ0ZXJTZXQpIHtcbiAgICAgICAgICBob29rcy5hZnRlclNldC5hcHBseSh0aGlzLCBbY2hhbmdlZCwgdmFsdWUsIG9yaWdpbmFsXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogU2ltaWxhciB0byBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcigpYCwgYnV0IHRoaXMgZnVuY3Rpb24gd2lsbFxuICogc2VhcmNoIHRocm91Z2ggdGhlIHRhcmdldCdzIHByb3RvdHlwZSBjaGFpbiB3aGVuIGxvb2tpbmcgZm9yIHRoZSBwcm9wZXJ0eSdzXG4gKiBkZXNjcmlwdG9yLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0gcHJvcGVydHlLZXkgbmFtZSBvZiB0aGUgcHJvcGVydHlcbiAqIEByZXR1cm5zIHRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIGlmIG9uZSBleGlzdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3BlcnR5RGVzY3JpcHRvcihcbiAgdGFyZ2V0OiBhbnksXG4gIHByb3BlcnR5S2V5OiBQcm9wZXJ0eUtleVxuKTogUHJvcGVydHlEZXNjcmlwdG9yIHwgdW5kZWZpbmVkIHtcbiAgd2hpbGUgKHRhcmdldCkge1xuICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgIGlmIChkZXNjKSB7XG4gICAgICByZXR1cm4gZGVzYztcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XG4gICAgfVxuICB9XG59XG4iXX0=