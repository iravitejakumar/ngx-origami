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
    const desc = wrapDescriptor(target, propertyKey, hooks);
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
    const desc = getPropertyDescriptor(target, propertyKey);
    const properties = new WeakMap();
    return {
        enumerable: desc ? desc.enumerable : true,
        get() {
            if (desc && desc.get) {
                return desc.get.apply(this);
            }
            else {
                const props = properties.get(this);
                return props && props[propertyKey];
            }
        },
        set(original) {
            let value = original;
            if (!hooks.shouldSet || hooks.shouldSet.apply(this, [value])) {
                if (hooks.beforeSet) {
                    value = hooks.beforeSet.apply(this, [value]);
                }
                let props = properties.get(this);
                if (!props) {
                    props = {};
                    properties.set(this, props);
                }
                const changed = value !== props[propertyKey];
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
        const desc = Object.getOwnPropertyDescriptor(target, propertyKey);
        if (desc) {
            return desc;
        }
        else {
            target = Object.getPrototypeOf(target);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS91dGlsLyIsInNvdXJjZXMiOlsic3JjL2Rlc2NyaXB0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStCQTs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSx1QkFBdUIsQ0FDckMsTUFBVyxFQUNYLFdBQW1CLEVBQ25CLEtBQXlCO0lBRXpCLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUM1QixNQUFXLEVBQ1gsV0FBd0IsRUFDeEIsS0FBeUI7SUFFekIsTUFBTSxJQUFJLEdBQUcscUJBQXFCLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3hELE1BQU0sVUFBVSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDakMsT0FBTztRQUNMLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDekMsR0FBRztZQUNELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQztRQUNELEdBQUcsQ0FBQyxRQUFXO1lBQ2IsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzVELElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtvQkFDbkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQzlDO2dCQUVELElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDWCxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDN0I7Z0JBRUQsTUFBTSxPQUFPLEdBQUcsS0FBSyxLQUFLLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDN0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDM0IsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDL0I7Z0JBRUQsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO29CQUNsQixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ3hEO2FBQ0Y7UUFDSCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsTUFBVyxFQUNYLFdBQXdCO0lBRXhCLE9BQU8sTUFBTSxFQUFFO1FBQ2IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsRSxJQUFJLElBQUksRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEZXNjcmlwdG9yIGhvb2tzIHRoYXQgY2FuIGJlIGluamVjdGVkIGludG8gYSBwcm9wZXJ0eSdzIGdldHRlciBhbmQgc2V0dGVyLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERlc2NyaXB0b3JIb29rczxUPiB7XG4gIC8qKlxuICAgKiBFeGVjdXRlcyBiZWZvcmUgYSBwcm9wZXJ0eSdzIHZhbHVlIGlzIHNldC4gSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRydWUsXG4gICAqIHRoZSBwcm9wZXJ0eSB3aWxsIGJlIHNldC4gT3RoZXJ3aXNlLCB0aGUgcHJvcGVydHkgd2lsbCBub3QgYmUgdXBkYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSByZXF1ZXN0ZWQgdG8gc2V0XG4gICAqIEByZXR1cm5zIHRydWUgaWYgdGhlIHByb3BlcnR5IHNob3VsZCBiZSBzZXQsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgc2hvdWxkU2V0Pyh2YWx1ZTogVCk6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBFeGVjdXRlcyBiZWZvcmUgYSBwcm9wZXJ0eSdzIHZhbHVlIGlzIHNldCBhbmQgYWZ0ZXIgYW55IGBzaG91bGRTZXQoKWAgaGFzXG4gICAqIHJldHVybmVkIHRydWUuIFRoaXMgYWxsb3dzIHRoZSB2YWx1ZSB0byBiZSBtYW5pcHVsYXRlZCBiZWZvcmUgc2V0dGluZyBpdC5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSByZXF1ZXN0ZWQgdG8gc2V0XG4gICAqIEByZXR1cm5zIHRoZSB2YWx1ZSB0byBhY3R1YWxseSBzZXRcbiAgICovXG4gIGJlZm9yZVNldD8odmFsdWU6IFQpOiBUO1xuICAvKipcbiAgICogRXhlY3V0ZXMgYWZ0ZXIgYSBwcm9wZXJ0eSdzIHZhbHVlIGlzIHNldC4gVGhpcyBhbGxvd3Mgc2lkZSBlZmZlY3RzIHRvIGJlXG4gICAqIHBlcmZvcm1lZCBvbiB0aGUgbmV3IHZhbHVlIG9yIHRvIGRldGVybWluZSBpZiBhIHZhbHVlIGNoYW5nZWQuXG4gICAqXG4gICAqIEBwYXJhbSBjaGFuZ2VkIGluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgdmFsdWUgY2hhbmdlZFxuICAgKiBAcGFyYW0gY3VycmVudCB0aGUgbmV3IHZhbHVlXG4gICAqIEBwYXJhbSBwcmV2aW91cyB0aGUgcHJldmlvdXMgdmFsdWVcbiAgICovXG4gIGFmdGVyU2V0PyhjaGFuZ2VkOiBib29sZWFuLCBjdXJyZW50OiBULCBwcmV2aW91czogVCk6IHZvaWQ7XG59XG5cbi8qKlxuICogUmVkZWZpbmVzIGFuIG9iamVjdCdzIHByb3BlcnR5IHdpdGggZGVzY3JpcHRvciBob29rcyB0aGF0IGluamVjdCBzaWRlIGVmZmVjdHNcbiAqIGludG8gdGhlIHByb3BlcnR5J3MgZ2V0dGVyIGFuZCBzZXR0ZXIuIElmIHRoZSBwcm9wZXJ0eSBoYXMgYW4gZXhpc3RpbmdcbiAqIGdldHRlciBvciBzZXR0ZXIsIHRoZXkgd2lsbCBiZSBwcmVzZXJ2ZWQuXG4gKlxuICogQHBhcmFtIHRhcmdldCB0aGUgb2JqZWN0IHRhcmdldCBmb3IgdGhlIGRlc2NyaXB0b3JcbiAqIEBwYXJhbSBwcm9wZXJ0eUtleSB0aGUgcHJvcGVydHkgb2YgdGhlIG9iamVjdCB0YXJnZXRcbiAqIEBwYXJhbSBob29rcyB0aGUgaG9va3MgdG8gaW5qZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3cmFwQW5kRGVmaW5lRGVzY3JpcHRvcjxUPihcbiAgdGFyZ2V0OiBhbnksXG4gIHByb3BlcnR5S2V5OiBzdHJpbmcsXG4gIGhvb2tzOiBEZXNjcmlwdG9ySG9va3M8VD5cbikge1xuICBjb25zdCBkZXNjID0gd3JhcERlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSwgaG9va3MpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzYyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHByb3BlcnR5IGRlc2NyaXB0b3IgdGhhdCBpbmplY3RzIGhvb2tzIGludG8gYSBwcm9wZXJ0eSdzIGdldHRlciBhbmRcbiAqIHNldHRlciB0byBleGVjdXRlIHNpZGUgZWZmZWN0cy5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IHRoZSBvYmplY3QgdGFyZ2V0IGZvciB0aGUgZGVzY3JpcHRvclxuICogQHBhcmFtIHByb3BlcnR5S2V5IHRoZSBwcm9wZXJ0eSBvZiB0aGUgb2JqZWN0IHRhcmdldFxuICogQHBhcmFtIGhvb2tzIHRoZSBob29rcyB0byBpbmplY3RcbiAqIEByZXR1cm5zIGEgZGVzY3JpcHRvciB0aGF0IGNhbiBiZSB1c2VkIGluIGBPYmplY3QuZGVmaW5lUHJvcGVydHkoKWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdyYXBEZXNjcmlwdG9yPFQ+KFxuICB0YXJnZXQ6IGFueSxcbiAgcHJvcGVydHlLZXk6IFByb3BlcnR5S2V5LFxuICBob29rczogRGVzY3JpcHRvckhvb2tzPFQ+XG4pOiBQcm9wZXJ0eURlc2NyaXB0b3Ige1xuICBjb25zdCBkZXNjID0gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICBjb25zdCBwcm9wZXJ0aWVzID0gbmV3IFdlYWtNYXAoKTtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiBkZXNjID8gZGVzYy5lbnVtZXJhYmxlIDogdHJ1ZSxcbiAgICBnZXQoKSB7XG4gICAgICBpZiAoZGVzYyAmJiBkZXNjLmdldCkge1xuICAgICAgICByZXR1cm4gZGVzYy5nZXQuYXBwbHkodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXMuZ2V0KHRoaXMpO1xuICAgICAgICByZXR1cm4gcHJvcHMgJiYgcHJvcHNbcHJvcGVydHlLZXldO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0KG9yaWdpbmFsOiBUKSB7XG4gICAgICBsZXQgdmFsdWUgPSBvcmlnaW5hbDtcbiAgICAgIGlmICghaG9va3Muc2hvdWxkU2V0IHx8IGhvb2tzLnNob3VsZFNldC5hcHBseSh0aGlzLCBbdmFsdWVdKSkge1xuICAgICAgICBpZiAoaG9va3MuYmVmb3JlU2V0KSB7XG4gICAgICAgICAgdmFsdWUgPSBob29rcy5iZWZvcmVTZXQuYXBwbHkodGhpcywgW3ZhbHVlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcHMgPSBwcm9wZXJ0aWVzLmdldCh0aGlzKTtcbiAgICAgICAgaWYgKCFwcm9wcykge1xuICAgICAgICAgIHByb3BzID0ge307XG4gICAgICAgICAgcHJvcGVydGllcy5zZXQodGhpcywgcHJvcHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2hhbmdlZCA9IHZhbHVlICE9PSBwcm9wc1twcm9wZXJ0eUtleV07XG4gICAgICAgIHByb3BzW3Byb3BlcnR5S2V5XSA9IHZhbHVlO1xuICAgICAgICBpZiAoZGVzYyAmJiBkZXNjLnNldCkge1xuICAgICAgICAgIGRlc2Muc2V0LmFwcGx5KHRoaXMsIFt2YWx1ZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvb2tzLmFmdGVyU2V0KSB7XG4gICAgICAgICAgaG9va3MuYWZ0ZXJTZXQuYXBwbHkodGhpcywgW2NoYW5nZWQsIHZhbHVlLCBvcmlnaW5hbF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIFNpbWlsYXIgdG8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoKWAsIGJ1dCB0aGlzIGZ1bmN0aW9uIHdpbGxcbiAqIHNlYXJjaCB0aHJvdWdoIHRoZSB0YXJnZXQncyBwcm90b3R5cGUgY2hhaW4gd2hlbiBsb29raW5nIGZvciB0aGUgcHJvcGVydHknc1xuICogZGVzY3JpcHRvci5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBwcm9wZXJ0eVxuICogQHBhcmFtIHByb3BlcnR5S2V5IG5hbWUgb2YgdGhlIHByb3BlcnR5XG4gKiBAcmV0dXJucyB0aGUgcHJvcGVydHkgZGVzY3JpcHRvciBpZiBvbmUgZXhpc3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wZXJ0eURlc2NyaXB0b3IoXG4gIHRhcmdldDogYW55LFxuICBwcm9wZXJ0eUtleTogUHJvcGVydHlLZXlcbik6IFByb3BlcnR5RGVzY3JpcHRvciB8IHVuZGVmaW5lZCB7XG4gIHdoaWxlICh0YXJnZXQpIHtcbiAgICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICBpZiAoZGVzYykge1xuICAgICAgcmV0dXJuIGRlc2M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpO1xuICAgIH1cbiAgfVxufVxuIl19