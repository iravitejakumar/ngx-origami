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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kZWJha2VyeS9vcmlnYW1pL3V0aWwvIiwic291cmNlcyI6WyJzcmMvZGVzY3JpcHRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0JBOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QixDQUNyQyxNQUFXLEVBQ1gsV0FBbUIsRUFDbkIsS0FBeUI7SUFFekIsSUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQzVCLE1BQVcsRUFDWCxXQUF3QixFQUN4QixLQUF5QjtJQUV6QixJQUFNLElBQUksR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDeEQsSUFBTSxVQUFVLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUNqQyxPQUFPO1FBQ0wsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUN6QyxHQUFHO1lBQ0QsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDcEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QjtpQkFBTTtnQkFDTCxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDcEM7UUFDSCxDQUFDO1FBQ0QsR0FBRyxFQUFILFVBQUksUUFBVztZQUNiLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUM1RCxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7b0JBQ25CLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUM5QztnQkFFRCxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ1gsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzdCO2dCQUVELElBQU0sT0FBTyxHQUFHLEtBQUssS0FBSyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzdDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQzNCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQy9CO2dCQUVELElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtvQkFDbEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUN4RDthQUNGO1FBQ0gsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLE1BQVcsRUFDWCxXQUF3QjtJQUV4QixPQUFPLE1BQU0sRUFBRTtRQUNiLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEUsSUFBSSxJQUFJLEVBQUU7WUFDUixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QztLQUNGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGVzY3JpcHRvciBob29rcyB0aGF0IGNhbiBiZSBpbmplY3RlZCBpbnRvIGEgcHJvcGVydHkncyBnZXR0ZXIgYW5kIHNldHRlci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZXNjcmlwdG9ySG9va3M8VD4ge1xuICAvKipcbiAgICogRXhlY3V0ZXMgYmVmb3JlIGEgcHJvcGVydHkncyB2YWx1ZSBpcyBzZXQuIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0cnVlLFxuICAgKiB0aGUgcHJvcGVydHkgd2lsbCBiZSBzZXQuIE90aGVyd2lzZSwgdGhlIHByb3BlcnR5IHdpbGwgbm90IGJlIHVwZGF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgcmVxdWVzdGVkIHRvIHNldFxuICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBwcm9wZXJ0eSBzaG91bGQgYmUgc2V0LCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHNob3VsZFNldD8odmFsdWU6IFQpOiBib29sZWFuO1xuICAvKipcbiAgICogRXhlY3V0ZXMgYmVmb3JlIGEgcHJvcGVydHkncyB2YWx1ZSBpcyBzZXQgYW5kIGFmdGVyIGFueSBgc2hvdWxkU2V0KClgIGhhc1xuICAgKiByZXR1cm5lZCB0cnVlLiBUaGlzIGFsbG93cyB0aGUgdmFsdWUgdG8gYmUgbWFuaXB1bGF0ZWQgYmVmb3JlIHNldHRpbmcgaXQuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgcmVxdWVzdGVkIHRvIHNldFxuICAgKiBAcmV0dXJucyB0aGUgdmFsdWUgdG8gYWN0dWFsbHkgc2V0XG4gICAqL1xuICBiZWZvcmVTZXQ/KHZhbHVlOiBUKTogVDtcbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGFmdGVyIGEgcHJvcGVydHkncyB2YWx1ZSBpcyBzZXQuIFRoaXMgYWxsb3dzIHNpZGUgZWZmZWN0cyB0byBiZVxuICAgKiBwZXJmb3JtZWQgb24gdGhlIG5ldyB2YWx1ZSBvciB0byBkZXRlcm1pbmUgaWYgYSB2YWx1ZSBjaGFuZ2VkLlxuICAgKlxuICAgKiBAcGFyYW0gY2hhbmdlZCBpbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlIHZhbHVlIGNoYW5nZWRcbiAgICogQHBhcmFtIGN1cnJlbnQgdGhlIG5ldyB2YWx1ZVxuICAgKiBAcGFyYW0gcHJldmlvdXMgdGhlIHByZXZpb3VzIHZhbHVlXG4gICAqL1xuICBhZnRlclNldD8oY2hhbmdlZDogYm9vbGVhbiwgY3VycmVudDogVCwgcHJldmlvdXM6IFQpOiB2b2lkO1xufVxuXG4vKipcbiAqIFJlZGVmaW5lcyBhbiBvYmplY3QncyBwcm9wZXJ0eSB3aXRoIGRlc2NyaXB0b3IgaG9va3MgdGhhdCBpbmplY3Qgc2lkZSBlZmZlY3RzXG4gKiBpbnRvIHRoZSBwcm9wZXJ0eSdzIGdldHRlciBhbmQgc2V0dGVyLiBJZiB0aGUgcHJvcGVydHkgaGFzIGFuIGV4aXN0aW5nXG4gKiBnZXR0ZXIgb3Igc2V0dGVyLCB0aGV5IHdpbGwgYmUgcHJlc2VydmVkLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgdGhlIG9iamVjdCB0YXJnZXQgZm9yIHRoZSBkZXNjcmlwdG9yXG4gKiBAcGFyYW0gcHJvcGVydHlLZXkgdGhlIHByb3BlcnR5IG9mIHRoZSBvYmplY3QgdGFyZ2V0XG4gKiBAcGFyYW0gaG9va3MgdGhlIGhvb2tzIHRvIGluamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gd3JhcEFuZERlZmluZURlc2NyaXB0b3I8VD4oXG4gIHRhcmdldDogYW55LFxuICBwcm9wZXJ0eUtleTogc3RyaW5nLFxuICBob29rczogRGVzY3JpcHRvckhvb2tzPFQ+XG4pIHtcbiAgY29uc3QgZGVzYyA9IHdyYXBEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHlLZXksIGhvb2tzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2MpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHRoYXQgaW5qZWN0cyBob29rcyBpbnRvIGEgcHJvcGVydHkncyBnZXR0ZXIgYW5kXG4gKiBzZXR0ZXIgdG8gZXhlY3V0ZSBzaWRlIGVmZmVjdHMuXG4gKlxuICogQHBhcmFtIHRhcmdldCB0aGUgb2JqZWN0IHRhcmdldCBmb3IgdGhlIGRlc2NyaXB0b3JcbiAqIEBwYXJhbSBwcm9wZXJ0eUtleSB0aGUgcHJvcGVydHkgb2YgdGhlIG9iamVjdCB0YXJnZXRcbiAqIEBwYXJhbSBob29rcyB0aGUgaG9va3MgdG8gaW5qZWN0XG4gKiBAcmV0dXJucyBhIGRlc2NyaXB0b3IgdGhhdCBjYW4gYmUgdXNlZCBpbiBgT2JqZWN0LmRlZmluZVByb3BlcnR5KClgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3cmFwRGVzY3JpcHRvcjxUPihcbiAgdGFyZ2V0OiBhbnksXG4gIHByb3BlcnR5S2V5OiBQcm9wZXJ0eUtleSxcbiAgaG9va3M6IERlc2NyaXB0b3JIb29rczxUPlxuKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcbiAgY29uc3QgZGVzYyA9IGdldFByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgY29uc3QgcHJvcGVydGllcyA9IG5ldyBXZWFrTWFwKCk7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogZGVzYyA/IGRlc2MuZW51bWVyYWJsZSA6IHRydWUsXG4gICAgZ2V0KCkge1xuICAgICAgaWYgKGRlc2MgJiYgZGVzYy5nZXQpIHtcbiAgICAgICAgcmV0dXJuIGRlc2MuZ2V0LmFwcGx5KHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzLmdldCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHByb3BzICYmIHByb3BzW3Byb3BlcnR5S2V5XTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldChvcmlnaW5hbDogVCkge1xuICAgICAgbGV0IHZhbHVlID0gb3JpZ2luYWw7XG4gICAgICBpZiAoIWhvb2tzLnNob3VsZFNldCB8fCBob29rcy5zaG91bGRTZXQuYXBwbHkodGhpcywgW3ZhbHVlXSkpIHtcbiAgICAgICAgaWYgKGhvb2tzLmJlZm9yZVNldCkge1xuICAgICAgICAgIHZhbHVlID0gaG9va3MuYmVmb3JlU2V0LmFwcGx5KHRoaXMsIFt2YWx1ZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BzID0gcHJvcGVydGllcy5nZXQodGhpcyk7XG4gICAgICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgICBwcm9wcyA9IHt9O1xuICAgICAgICAgIHByb3BlcnRpZXMuc2V0KHRoaXMsIHByb3BzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNoYW5nZWQgPSB2YWx1ZSAhPT0gcHJvcHNbcHJvcGVydHlLZXldO1xuICAgICAgICBwcm9wc1twcm9wZXJ0eUtleV0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKGRlc2MgJiYgZGVzYy5zZXQpIHtcbiAgICAgICAgICBkZXNjLnNldC5hcHBseSh0aGlzLCBbdmFsdWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob29rcy5hZnRlclNldCkge1xuICAgICAgICAgIGhvb2tzLmFmdGVyU2V0LmFwcGx5KHRoaXMsIFtjaGFuZ2VkLCB2YWx1ZSwgb3JpZ2luYWxdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBTaW1pbGFyIHRvIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKClgLCBidXQgdGhpcyBmdW5jdGlvbiB3aWxsXG4gKiBzZWFyY2ggdGhyb3VnaCB0aGUgdGFyZ2V0J3MgcHJvdG90eXBlIGNoYWluIHdoZW4gbG9va2luZyBmb3IgdGhlIHByb3BlcnR5J3NcbiAqIGRlc2NyaXB0b3IuXG4gKlxuICogQHBhcmFtIHRhcmdldCBvYmplY3QgdGhhdCBjb250YWlucyB0aGUgcHJvcGVydHlcbiAqIEBwYXJhbSBwcm9wZXJ0eUtleSBuYW1lIG9mIHRoZSBwcm9wZXJ0eVxuICogQHJldHVybnMgdGhlIHByb3BlcnR5IGRlc2NyaXB0b3IgaWYgb25lIGV4aXN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKFxuICB0YXJnZXQ6IGFueSxcbiAgcHJvcGVydHlLZXk6IFByb3BlcnR5S2V5XG4pOiBQcm9wZXJ0eURlc2NyaXB0b3IgfCB1bmRlZmluZWQge1xuICB3aGlsZSAodGFyZ2V0KSB7XG4gICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgaWYgKGRlc2MpIHtcbiAgICAgIHJldHVybiBkZXNjO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==