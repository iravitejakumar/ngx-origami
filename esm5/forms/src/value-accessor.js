import { __decorate, __extends, __param } from "tslib";
import { AfterViewInit, Directive, ElementRef, HostListener, Inject, Injector, Input, OnDestroy, Optional, Provider, Renderer2, forwardRef } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, DefaultValueAccessor, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms';
/**
 * OrigamiControlValueAccessor provider.
 */
export var ORIGAMI_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return OrigamiControlValueAccessor; }),
    multi: true
};
/**
 * A value accessor for `ngModel`, `formControl`, and `formControlName`, on
 * custom elements. In addition to one of the above directives, `origami`
 * should be added to the element to denote that this value accessor should
 * control it.
 *
 * Example: `<paper-input [(ngModel)]="value" origami></paper-input>`
 *
 * The connected element should implement one of the below
 * properties:
 *
 * - `checked` as a boolean for checkbox-like elements.
 * - `selected` for single selectable elements. It must be an index or string
 *   name attribute.
 * - `selectedItem` for single selectable elements. It may be any type.
 * - `selectedValues` for multi selectable elements. It must be an array of
 *   indices or string name attributes.
 * - `selectedItems` for multi selectable elements. It must be an array of any
 *   type.
 * - `value` for any basic form element. It may be any type.
 *
 * For selectable and multi selectable elements, the attribute `useKey` should
 * be specified if the control bindings an index or name value to the element
 * instead of an object.
 *
 * Additionally, an element may implement one or more of the following
 * properties:
 *
 * - `disabled` as a boolean
 * - `invalid` as a boolean to indicate validity
 * - `validate()` as a function to run custom validation
 *
 * To listen for changes to these events, an element should implement one or
 * more of the following events to notify Angular of any updates.
 *
 * - `input` - will update any of the above properties
 * - `blur`
 * - `checked-changed`
 * - `selected-changed`
 * - `selected-item-changed`
 * - `selected-values-changed`
 * - `selected-items-changed`
 * - `value-changed`
 * - `invalid-changed`
 */
var OrigamiControlValueAccessor = /** @class */ (function (_super) {
    __extends(OrigamiControlValueAccessor, _super);
    function OrigamiControlValueAccessor(elementRef, injector, renderer, compositionMode) {
        var _this = _super.call(this, renderer, elementRef, compositionMode) || this;
        _this.elementRef = elementRef;
        _this.injector = injector;
        _this.renderer = renderer;
        /**
         * The key to use when reporting that an element's `validate()` function
         * returns false. When this happens, the control's `errors` object will be
         * set with this key and a value of true.
         *
         * The default key is "validate".
         */
        _this.validationErrorsKey = 'validate';
        /**
         * Most custom elements property will emit a `property-changed` event when
         * their value is set. This flag informs the value accessor to ignore the
         * next event while it is in the middle of writing a value.
         */
        _this.isWritingValue = false;
        /**
         * Flag that informs the value accessor that it is currently updating an
         * element and should ignore additional `invalid` property changes until it is
         * complete.
         */
        _this.ignoreInvalidChanges = false;
        return _this;
    }
    Object.defineProperty(OrigamiControlValueAccessor.prototype, "control", {
        /**
         * The `AbstractControl` attached to this element.
         */
        get: function () {
            if (!this._control) {
                this._control = this.injector.get(NgControl).control;
            }
            return this._control;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Lifecycle callback that will connect an element's validatable properties
     * (if they are implemented) to the Angular control.
     */
    OrigamiControlValueAccessor.prototype.ngAfterViewInit = function () {
        var _this = this;
        var element = this.elementRef.nativeElement;
        if (this.isValidatable(element)) {
            // The control will always be set by ngAfterViewInit due to the nature of
            // the directive's selectors
            var control_1 = this.control;
            // Allows Angular validators to update the custom element's validity
            this.statusSub = control_1.statusChanges.subscribe(function () {
                if (typeof _this.isInvalid === 'function') {
                    element.invalid = _this.isInvalid(control_1);
                }
                else {
                    element.invalid = !!control_1.invalid && !!control_1.dirty;
                }
            });
            // Allows custom element validate function to update Angular control's
            // validity
            if (this.shouldUseValidate(element)) {
                control_1.setValidators(Validators.compose([
                    control_1.validator,
                    function () {
                        var _a;
                        if (element.validate()) {
                            return null;
                        }
                        else {
                            return _a = {}, _a[_this.validationErrorsKey] = true, _a;
                        }
                    }
                ]));
            }
        }
    };
    /**
     * Lifecycle callback to clean up subscriptions.
     */
    OrigamiControlValueAccessor.prototype.ngOnDestroy = function () {
        if (this.statusSub) {
            this.statusSub.unsubscribe();
        }
    };
    /**
     * Writes a value to a custom element's correct value property, based on what
     * kind of element the directive controls.
     *
     * @param value the value to write
     */
    OrigamiControlValueAccessor.prototype.writeValue = function (value) {
        this.isWritingValue = true;
        var element = this.elementRef.nativeElement;
        if (this.isMultiSelectable(element) || this.isSelectable(element)) {
            var property = this.getSelectableProperty(element, value);
            if (property) {
                element[property] = value;
            }
        }
        else if (this.isCheckedElement(element)) {
            element.checked = Boolean(value);
        }
        else {
            _super.prototype.writeValue.call(this, value);
        }
        this.isWritingValue = false;
    };
    /**
     * Listen for custom element events and notify Angular of any changes.
     *
     * @param event the change event
     */
    OrigamiControlValueAccessor.prototype.onChangedEvent = function (event) {
        if (!this.isWritingValue) {
            var element = this.elementRef.nativeElement;
            var changed = false;
            switch (event.type) {
                case 'selected-items-changed':
                case 'selected-item-changed': {
                    var property = this.getSelectableProperty(element);
                    changed = property === 'selectedItems' || property === 'selectedItem';
                    break;
                }
                case 'selected-values-changed':
                case 'selected-changed': {
                    var property = this.getSelectableProperty(element);
                    changed = property === 'selectedValues' || property === 'selected';
                    break;
                }
                default:
                    changed = true;
            }
            if (changed) {
                var property = void 0;
                if (this.isMultiSelectable(element) || this.isSelectable(element)) {
                    // property will be defined if we reach this since changed can only
                    // be true if the property is defined for selectable elements
                    property = this.getSelectableProperty(element);
                }
                else if (this.isCheckedElement(element)) {
                    property = 'checked';
                }
                else {
                    property = 'value';
                }
                // Don't use `event.detail.value`, since we cannot assume that all
                // change events will provide that. Additionally, some event details
                // may be splices of an array or object instead of the current value.
                this.onChange(element[property]);
            }
        }
    };
    /**
     * Listen for `invalid` property changes. Some elements, such as
     * `<vaadin-date-picker>` have multiple "values". Setting the primary value
     * (ex. the date string) may result in a temporarily invalid element until
     * subsequent values (ex. the selected date) have been updated.
     *
     * Since this value accessor only listens for value changes, it may not be
     * notified of the change in validity. This listener will listen for any
     * explicity validity changes from the element and re-evaluate a control's
     * validity if it and the element's validity are out of sync.
     */
    OrigamiControlValueAccessor.prototype.onInvalidChanged = function () {
        if (!this.ignoreInvalidChanges) {
            var element = this.elementRef.nativeElement;
            if (this.isValidatable(element) &&
                this.control &&
                this.control.invalid !== element.invalid) {
                this.ignoreInvalidChanges = true;
                this.control.updateValueAndValidity();
                this.ignoreInvalidChanges = false;
            }
        }
    };
    /**
     * Determines whether or not an element is checkbox-like.
     *
     * @param element the element to check
     */
    OrigamiControlValueAccessor.prototype.isCheckedElement = function (element) {
        return this.isPropertyDefined(element, 'checked');
    };
    /**
     * Determines whether or not an element is selectable-like.
     *
     * @param element the element to check
     */
    OrigamiControlValueAccessor.prototype.isSelectable = function (element) {
        return (this.isPropertyDefined(element, 'selected') ||
            this.isPropertyDefined(element, 'selectedItem'));
    };
    /**
     * Determines whether or not an element is multi selectable-like.
     *
     * @param element the element to check
     */
    OrigamiControlValueAccessor.prototype.isMultiSelectable = function (element) {
        if (element &&
            (this.isPropertyDefined(element, 'selectedValues') ||
                this.isPropertyDefined(element, 'selectedItems'))) {
            return this.isSelectable(element) ? element.multi === true : true;
        }
        else {
            return false;
        }
    };
    /**
     * Determines whether or not an element is validatable-like.
     *
     * @param element the element to check
     */
    OrigamiControlValueAccessor.prototype.isValidatable = function (element) {
        return this.isPropertyDefined(element, 'invalid');
    };
    OrigamiControlValueAccessor.prototype.shouldUseValidate = function (element) {
        if (typeof element.validate === 'function') {
            // Some element's (such as `<vaadin-text-field>`) may not actually mutate
            // the `invalid` property when `validate()` is called. In these
            // situations, it's possible for Angular to set an element as invalid and
            // never be able to recover since the element's `validate()` will always
            // report it is invalid.
            //
            // In these situations, Origami should ignore the element's validate()
            // function.
            this.ignoreInvalidChanges = true;
            var wasInvalid = element.invalid;
            // If the element does mutate `invalid`, ask it to do so first to get a
            // baseline.
            element.validate();
            // When `validate()` is called next, we will know if the element mutates
            // `invalid` if the expected value matches `invalid` after changing
            // `invalid` to something else.
            var expected = element.invalid;
            element.invalid = !element.invalid;
            element.validate();
            var validateMutatesInvalid = element.invalid === expected;
            element.invalid = wasInvalid;
            this.ignoreInvalidChanges = false;
            return validateMutatesInvalid;
        }
        else {
            return false;
        }
    };
    /**
     * Determines whether or not a property is defined anywhere in the provided
     * element's prototype chain.
     *
     * @param element the element to check
     * @param property the property to check for
     */
    OrigamiControlValueAccessor.prototype.isPropertyDefined = function (element, property) {
        return !!element && property in element;
    };
    /**
     * Retrieves the property name of the selectable or multi-selectable element
     * that should be updated. This method will use defined properties and the
     * value type to determine which property should be used. If it cannot
     * determine which property to use, it will return undefined.
     *
     * @param element the element to get the property for
     * @param value a value for the element's property
     * @returns the property name, or undefined if it cannot be determined
     */
    OrigamiControlValueAccessor.prototype.getSelectableProperty = function (element, value) {
        var isMulti = this.isMultiSelectable(element);
        var valueProp = isMulti ? 'selectedItems' : 'selectedItem';
        var indexProp = isMulti ? 'selectedValues' : 'selected';
        if (typeof this.useSelectableValueProp !== 'boolean') {
            // Determine whether we should be setting the index or value property for
            // a selectable element
            var hasValueProp = valueProp in element;
            var hasIndexProp = indexProp in element;
            if (hasValueProp && !hasIndexProp) {
                this.useSelectableValueProp = true;
            }
            else if (!hasValueProp && hasIndexProp) {
                this.useSelectableValueProp = false;
            }
            else if (typeof value !== 'undefined' && value !== null) {
                var previousValue = element[valueProp];
                // When the element has both properties, try to set it to the value
                // property first. If it fails, then use the index property
                try {
                    element[valueProp] = value;
                }
                catch (error) {
                    // Could throw if the value is an unexpected type
                }
                // Check to see if the value we set it to is still accurate. If it's
                // not then the element silently rejected the new value.
                this.useSelectableValueProp = element[valueProp] === value;
                element[valueProp] = previousValue;
            }
            else {
                return undefined;
            }
        }
        if (element.itemValuePath) {
            // <vaadin-combo-box> will want to use selectedItem for object values.
            // However, if `itemValuePath` is set then the control value is not the
            // item itself, but the `value` property.
            return 'value';
        }
        else {
            return this.useSelectableValueProp ? valueProp : indexProp;
        }
    };
    OrigamiControlValueAccessor.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector },
        { type: Renderer2 },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [COMPOSITION_BUFFER_MODE,] }] }
    ]; };
    __decorate([
        Input()
    ], OrigamiControlValueAccessor.prototype, "isInvalid", void 0);
    __decorate([
        Input()
    ], OrigamiControlValueAccessor.prototype, "validationErrorsKey", void 0);
    __decorate([
        HostListener('selected-items-changed', ['$event']),
        HostListener('selected-item-changed', ['$event']),
        HostListener('selected-values-changed', ['$event']),
        HostListener('selected-changed', ['$event']),
        HostListener('checked-changed', ['$event']),
        HostListener('value-changed', ['$event'])
    ], OrigamiControlValueAccessor.prototype, "onChangedEvent", null);
    __decorate([
        HostListener('invalid-changed')
    ], OrigamiControlValueAccessor.prototype, "onInvalidChanged", null);
    OrigamiControlValueAccessor = __decorate([
        Directive({
            selector: '[ngModel][origami],[formControlName][origami],[formControl][origami]',
            providers: [ORIGAMI_CONTROL_VALUE_ACCESSOR]
        }),
        __param(3, Optional()),
        __param(3, Inject(COMPOSITION_BUFFER_MODE))
    ], OrigamiControlValueAccessor);
    return OrigamiControlValueAccessor;
}(DefaultValueAccessor));
export { OrigamiControlValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtYWNjZXNzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kZWJha2VyeS9vcmlnYW1pL2Zvcm1zLyIsInNvdXJjZXMiOlsic3JjL3ZhbHVlLWFjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFNBQVMsRUFDVCxVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBRVgsTUFBTSxnQkFBZ0IsQ0FBQztBQW1DeEI7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSw4QkFBOEIsR0FBYTtJQUN0RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLDJCQUEyQixFQUEzQixDQUEyQixDQUFDO0lBQzFELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQU1IO0lBQWlELCtDQUFvQjtJQXlEbkUscUNBQ1MsVUFBc0IsRUFDbkIsUUFBa0IsRUFDbEIsUUFBbUIsRUFHN0IsZUFBd0I7UUFOMUIsWUFRRSxrQkFBTSxRQUFRLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxTQUM3QztRQVJRLGdCQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ25CLGNBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsY0FBUSxHQUFSLFFBQVEsQ0FBVztRQW5EL0I7Ozs7OztXQU1HO1FBRUgseUJBQW1CLEdBQUcsVUFBVSxDQUFDO1FBaUJqQzs7OztXQUlHO1FBQ0ssb0JBQWMsR0FBRyxLQUFLLENBQUM7UUFDL0I7Ozs7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LENBQUMsaUJBQWlCLENBQUM7dUVBYy9CO0lBdk5VLDJCQUEyQjtRQUx2QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQ04sc0VBQXNFO1lBQ3hFLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzVDLENBQUM7UUE4REcsV0FBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLFdBQUEsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUE7T0E5RHZCLDJCQUEyQixDQW9XdkM7SUFBRCxrQ0FBQztDQUFBLEFBcFdELENBQWlELG9CQUFvQixHQW9XcEU7U0FwV1ksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBQcm92aWRlcixcbiAgUmVuZGVyZXIyLFxuICBmb3J3YXJkUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ09NUE9TSVRJT05fQlVGRkVSX01PREUsXG4gIERlZmF1bHRWYWx1ZUFjY2Vzc29yLFxuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgTmdDb250cm9sLFxuICBWYWxpZGF0b3JzLFxuICBBYnN0cmFjdENvbnRyb2xcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vKipcbiAqIEFuIGludGVyZmFjZSBmb3IgZGV0ZXJtaW5pbmcgaWYgYW4gZWxlbWVudCBpcyBhIGNoZWNrYm94LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENoZWNrZWRFbGVtZW50TGlrZSB7XG4gIGNoZWNrZWQ/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEFuIGludGVyZmFjZSBmb3IgZGV0ZXJtaW5pbmcgaWYgYW4gZWxlbWVudCBpcyBzZWxlY3RhYmxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdGFibGVMaWtlIHtcbiAgbXVsdGk/OiBib29sZWFuO1xuICBzZWxlY3RlZD86IHN0cmluZyB8IG51bWJlcjtcbiAgc2VsZWN0ZWRJdGVtPzogYW55O1xufVxuXG4vKipcbiAqIEFuIGludGVyZmFjZSBmb3IgZGV0ZXJtaW5pbmcgaWYgYW4gZWxlbWVudCBpcyBtdWx0aSBzZWxlY3RhYmxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE11bHRpU2VsZWN0YWJsZUxpa2Uge1xuICBtdWx0aT86IGJvb2xlYW47XG4gIHNlbGVjdGVkVmFsdWVzPzogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjtcbiAgc2VsZWN0ZWRJdGVtcz86IGFueVtdO1xufVxuXG4vKipcbiAqIEFuIGludGVyZmFjZSBmb3IgZGV0ZXJtaW5pbmcgaWYgYW4gZWxlbWVudCBpcyB2YWxpZGF0YWJsZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0YWJsZUxpa2Uge1xuICBpbnZhbGlkPzogYm9vbGVhbjtcbiAgdmFsaWRhdGU/KCk6IHZvaWQ7XG59XG5cbi8qKlxuICogT3JpZ2FtaUNvbnRyb2xWYWx1ZUFjY2Vzc29yIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY29uc3QgT1JJR0FNSV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE9yaWdhbWlDb250cm9sVmFsdWVBY2Nlc3NvciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEEgdmFsdWUgYWNjZXNzb3IgZm9yIGBuZ01vZGVsYCwgYGZvcm1Db250cm9sYCwgYW5kIGBmb3JtQ29udHJvbE5hbWVgLCBvblxuICogY3VzdG9tIGVsZW1lbnRzLiBJbiBhZGRpdGlvbiB0byBvbmUgb2YgdGhlIGFib3ZlIGRpcmVjdGl2ZXMsIGBvcmlnYW1pYFxuICogc2hvdWxkIGJlIGFkZGVkIHRvIHRoZSBlbGVtZW50IHRvIGRlbm90ZSB0aGF0IHRoaXMgdmFsdWUgYWNjZXNzb3Igc2hvdWxkXG4gKiBjb250cm9sIGl0LlxuICpcbiAqIEV4YW1wbGU6IGA8cGFwZXItaW5wdXQgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiIG9yaWdhbWk+PC9wYXBlci1pbnB1dD5gXG4gKlxuICogVGhlIGNvbm5lY3RlZCBlbGVtZW50IHNob3VsZCBpbXBsZW1lbnQgb25lIG9mIHRoZSBiZWxvd1xuICogcHJvcGVydGllczpcbiAqXG4gKiAtIGBjaGVja2VkYCBhcyBhIGJvb2xlYW4gZm9yIGNoZWNrYm94LWxpa2UgZWxlbWVudHMuXG4gKiAtIGBzZWxlY3RlZGAgZm9yIHNpbmdsZSBzZWxlY3RhYmxlIGVsZW1lbnRzLiBJdCBtdXN0IGJlIGFuIGluZGV4IG9yIHN0cmluZ1xuICogICBuYW1lIGF0dHJpYnV0ZS5cbiAqIC0gYHNlbGVjdGVkSXRlbWAgZm9yIHNpbmdsZSBzZWxlY3RhYmxlIGVsZW1lbnRzLiBJdCBtYXkgYmUgYW55IHR5cGUuXG4gKiAtIGBzZWxlY3RlZFZhbHVlc2AgZm9yIG11bHRpIHNlbGVjdGFibGUgZWxlbWVudHMuIEl0IG11c3QgYmUgYW4gYXJyYXkgb2ZcbiAqICAgaW5kaWNlcyBvciBzdHJpbmcgbmFtZSBhdHRyaWJ1dGVzLlxuICogLSBgc2VsZWN0ZWRJdGVtc2AgZm9yIG11bHRpIHNlbGVjdGFibGUgZWxlbWVudHMuIEl0IG11c3QgYmUgYW4gYXJyYXkgb2YgYW55XG4gKiAgIHR5cGUuXG4gKiAtIGB2YWx1ZWAgZm9yIGFueSBiYXNpYyBmb3JtIGVsZW1lbnQuIEl0IG1heSBiZSBhbnkgdHlwZS5cbiAqXG4gKiBGb3Igc2VsZWN0YWJsZSBhbmQgbXVsdGkgc2VsZWN0YWJsZSBlbGVtZW50cywgdGhlIGF0dHJpYnV0ZSBgdXNlS2V5YCBzaG91bGRcbiAqIGJlIHNwZWNpZmllZCBpZiB0aGUgY29udHJvbCBiaW5kaW5ncyBhbiBpbmRleCBvciBuYW1lIHZhbHVlIHRvIHRoZSBlbGVtZW50XG4gKiBpbnN0ZWFkIG9mIGFuIG9iamVjdC5cbiAqXG4gKiBBZGRpdGlvbmFsbHksIGFuIGVsZW1lbnQgbWF5IGltcGxlbWVudCBvbmUgb3IgbW9yZSBvZiB0aGUgZm9sbG93aW5nXG4gKiBwcm9wZXJ0aWVzOlxuICpcbiAqIC0gYGRpc2FibGVkYCBhcyBhIGJvb2xlYW5cbiAqIC0gYGludmFsaWRgIGFzIGEgYm9vbGVhbiB0byBpbmRpY2F0ZSB2YWxpZGl0eVxuICogLSBgdmFsaWRhdGUoKWAgYXMgYSBmdW5jdGlvbiB0byBydW4gY3VzdG9tIHZhbGlkYXRpb25cbiAqXG4gKiBUbyBsaXN0ZW4gZm9yIGNoYW5nZXMgdG8gdGhlc2UgZXZlbnRzLCBhbiBlbGVtZW50IHNob3VsZCBpbXBsZW1lbnQgb25lIG9yXG4gKiBtb3JlIG9mIHRoZSBmb2xsb3dpbmcgZXZlbnRzIHRvIG5vdGlmeSBBbmd1bGFyIG9mIGFueSB1cGRhdGVzLlxuICpcbiAqIC0gYGlucHV0YCAtIHdpbGwgdXBkYXRlIGFueSBvZiB0aGUgYWJvdmUgcHJvcGVydGllc1xuICogLSBgYmx1cmBcbiAqIC0gYGNoZWNrZWQtY2hhbmdlZGBcbiAqIC0gYHNlbGVjdGVkLWNoYW5nZWRgXG4gKiAtIGBzZWxlY3RlZC1pdGVtLWNoYW5nZWRgXG4gKiAtIGBzZWxlY3RlZC12YWx1ZXMtY2hhbmdlZGBcbiAqIC0gYHNlbGVjdGVkLWl0ZW1zLWNoYW5nZWRgXG4gKiAtIGB2YWx1ZS1jaGFuZ2VkYFxuICogLSBgaW52YWxpZC1jaGFuZ2VkYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6XG4gICAgJ1tuZ01vZGVsXVtvcmlnYW1pXSxbZm9ybUNvbnRyb2xOYW1lXVtvcmlnYW1pXSxbZm9ybUNvbnRyb2xdW29yaWdhbWldJyxcbiAgcHJvdmlkZXJzOiBbT1JJR0FNSV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBPcmlnYW1pQ29udHJvbFZhbHVlQWNjZXNzb3IgZXh0ZW5kcyBEZWZhdWx0VmFsdWVBY2Nlc3NvclxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIGxvZ2ljIHRvIGRldGVybWluZSB3aGF0IHRvIHNldCBhbiBlbGVtZW50J3MgYGludmFsaWRgXG4gICAqIHByb3BlcnR5IHRvIGdpdmVuIHRoZSBwcm92aWRlZCBgQWJzdHJhY3RDb250cm9sYC4gVGhlIGRlZmF1bHQgaXMgdG8gc2V0IHRoZVxuICAgKiBlbGVtZW50IGFzIGBpbnZhbGlkYCB3aGVuZXZlciB0aGUgY29udHJvbCBpcyBib3RoIGludmFsaWQgYW5kIGRpcnR5LlxuICAgKi9cbiAgQElucHV0KClcbiAgaXNJbnZhbGlkPzogKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4gYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSBrZXkgdG8gdXNlIHdoZW4gcmVwb3J0aW5nIHRoYXQgYW4gZWxlbWVudCdzIGB2YWxpZGF0ZSgpYCBmdW5jdGlvblxuICAgKiByZXR1cm5zIGZhbHNlLiBXaGVuIHRoaXMgaGFwcGVucywgdGhlIGNvbnRyb2wncyBgZXJyb3JzYCBvYmplY3Qgd2lsbCBiZVxuICAgKiBzZXQgd2l0aCB0aGlzIGtleSBhbmQgYSB2YWx1ZSBvZiB0cnVlLlxuICAgKlxuICAgKiBUaGUgZGVmYXVsdCBrZXkgaXMgXCJ2YWxpZGF0ZVwiLlxuICAgKi9cbiAgQElucHV0KClcbiAgdmFsaWRhdGlvbkVycm9yc0tleSA9ICd2YWxpZGF0ZSc7XG5cbiAgLyoqXG4gICAqIFRoZSBgQWJzdHJhY3RDb250cm9sYCBhdHRhY2hlZCB0byB0aGlzIGVsZW1lbnQuXG4gICAqL1xuICBnZXQgY29udHJvbCgpOiBBYnN0cmFjdENvbnRyb2wgfCB1bmRlZmluZWQge1xuICAgIGlmICghdGhpcy5fY29udHJvbCkge1xuICAgICAgdGhpcy5fY29udHJvbCA9ICg8TmdDb250cm9sPnRoaXMuaW5qZWN0b3IuZ2V0KE5nQ29udHJvbCkpLmNvbnRyb2whO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgTmdDb250cm9sJ3Mgc3RhdHVzQ2hhbmdlcy5cbiAgICovXG4gIHByb3RlY3RlZCBzdGF0dXNTdWI/OiB7IHVuc3Vic2NyaWJlKCk6IHZvaWQgfTtcbiAgLyoqXG4gICAqIE1vc3QgY3VzdG9tIGVsZW1lbnRzIHByb3BlcnR5IHdpbGwgZW1pdCBhIGBwcm9wZXJ0eS1jaGFuZ2VkYCBldmVudCB3aGVuXG4gICAqIHRoZWlyIHZhbHVlIGlzIHNldC4gVGhpcyBmbGFnIGluZm9ybXMgdGhlIHZhbHVlIGFjY2Vzc29yIHRvIGlnbm9yZSB0aGVcbiAgICogbmV4dCBldmVudCB3aGlsZSBpdCBpcyBpbiB0aGUgbWlkZGxlIG9mIHdyaXRpbmcgYSB2YWx1ZS5cbiAgICovXG4gIHByaXZhdGUgaXNXcml0aW5nVmFsdWUgPSBmYWxzZTtcbiAgLyoqXG4gICAqIEZsYWcgdGhhdCBpbmZvcm1zIHRoZSB2YWx1ZSBhY2Nlc3NvciB0aGF0IGl0IGlzIGN1cnJlbnRseSB1cGRhdGluZyBhblxuICAgKiBlbGVtZW50IGFuZCBzaG91bGQgaWdub3JlIGFkZGl0aW9uYWwgYGludmFsaWRgIHByb3BlcnR5IGNoYW5nZXMgdW50aWwgaXQgaXNcbiAgICogY29tcGxldGUuXG4gICAqL1xuICBwcml2YXRlIGlnbm9yZUludmFsaWRDaGFuZ2VzID0gZmFsc2U7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdG8gdXNlIHRoZSB2YWx1ZSBwcm9wZXJ0eSBvciBpbmRleCBwcm9wZXJ0eSBmb3IgYVxuICAgKiBzZWxlY3Qgb3IgbXVsaXQtc2VsZWN0IGVsZW1lbnQuIFdoZW4gdW5kZWZpbmVkLCBpdCBpbmRpY2F0ZXMgdGhhdCB0aGVcbiAgICogZGV0ZXJtaW5hdGlvbiBvZiB3aGljaCBwcm9wZXJ0eSB0byB1c2UgaGFzIG5vdCBvY2N1cnJlZCB5ZXQuXG4gICAqL1xuICBwcml2YXRlIHVzZVNlbGVjdGFibGVWYWx1ZVByb3A/OiBib29sZWFuO1xuICAvKipcbiAgICogQ2FjaGVkIGBjb250cm9sYCB2YWx1ZS5cbiAgICovXG4gIHByaXZhdGUgX2NvbnRyb2w6IEFic3RyYWN0Q29udHJvbCB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChDT01QT1NJVElPTl9CVUZGRVJfTU9ERSlcbiAgICBjb21wb3NpdGlvbk1vZGU6IGJvb2xlYW5cbiAgKSB7XG4gICAgc3VwZXIocmVuZGVyZXIsIGVsZW1lbnRSZWYsIGNvbXBvc2l0aW9uTW9kZSk7XG4gIH1cblxuICAvKipcbiAgICogTGlmZWN5Y2xlIGNhbGxiYWNrIHRoYXQgd2lsbCBjb25uZWN0IGFuIGVsZW1lbnQncyB2YWxpZGF0YWJsZSBwcm9wZXJ0aWVzXG4gICAqIChpZiB0aGV5IGFyZSBpbXBsZW1lbnRlZCkgdG8gdGhlIEFuZ3VsYXIgY29udHJvbC5cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuaXNWYWxpZGF0YWJsZShlbGVtZW50KSkge1xuICAgICAgLy8gVGhlIGNvbnRyb2wgd2lsbCBhbHdheXMgYmUgc2V0IGJ5IG5nQWZ0ZXJWaWV3SW5pdCBkdWUgdG8gdGhlIG5hdHVyZSBvZlxuICAgICAgLy8gdGhlIGRpcmVjdGl2ZSdzIHNlbGVjdG9yc1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuY29udHJvbCE7XG4gICAgICAvLyBBbGxvd3MgQW5ndWxhciB2YWxpZGF0b3JzIHRvIHVwZGF0ZSB0aGUgY3VzdG9tIGVsZW1lbnQncyB2YWxpZGl0eVxuICAgICAgdGhpcy5zdGF0dXNTdWIgPSBjb250cm9sLnN0YXR1c0NoYW5nZXMhLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5pc0ludmFsaWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBlbGVtZW50LmludmFsaWQgPSB0aGlzLmlzSW52YWxpZChjb250cm9sKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtZW50LmludmFsaWQgPSAhIWNvbnRyb2wuaW52YWxpZCAmJiAhIWNvbnRyb2wuZGlydHk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBBbGxvd3MgY3VzdG9tIGVsZW1lbnQgdmFsaWRhdGUgZnVuY3Rpb24gdG8gdXBkYXRlIEFuZ3VsYXIgY29udHJvbCdzXG4gICAgICAvLyB2YWxpZGl0eVxuICAgICAgaWYgKHRoaXMuc2hvdWxkVXNlVmFsaWRhdGUoZWxlbWVudCkpIHtcbiAgICAgICAgY29udHJvbC5zZXRWYWxpZGF0b3JzKFxuICAgICAgICAgIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgICAgICBjb250cm9sLnZhbGlkYXRvcixcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudmFsaWRhdGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IFt0aGlzLnZhbGlkYXRpb25FcnJvcnNLZXldOiB0cnVlIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaWZlY3ljbGUgY2FsbGJhY2sgdG8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucy5cbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN0YXR1c1N1Yikge1xuICAgICAgdGhpcy5zdGF0dXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIGEgdmFsdWUgdG8gYSBjdXN0b20gZWxlbWVudCdzIGNvcnJlY3QgdmFsdWUgcHJvcGVydHksIGJhc2VkIG9uIHdoYXRcbiAgICoga2luZCBvZiBlbGVtZW50IHRoZSBkaXJlY3RpdmUgY29udHJvbHMuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgdG8gd3JpdGVcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuaXNXcml0aW5nVmFsdWUgPSB0cnVlO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBpZiAodGhpcy5pc011bHRpU2VsZWN0YWJsZShlbGVtZW50KSB8fCB0aGlzLmlzU2VsZWN0YWJsZShlbGVtZW50KSkge1xuICAgICAgY29uc3QgcHJvcGVydHkgPSB0aGlzLmdldFNlbGVjdGFibGVQcm9wZXJ0eShlbGVtZW50LCB2YWx1ZSk7XG4gICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgKDxhbnk+ZWxlbWVudClbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzQ2hlY2tlZEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnQuY2hlY2tlZCA9IEJvb2xlYW4odmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci53cml0ZVZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzV3JpdGluZ1ZhbHVlID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIGZvciBjdXN0b20gZWxlbWVudCBldmVudHMgYW5kIG5vdGlmeSBBbmd1bGFyIG9mIGFueSBjaGFuZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgdGhlIGNoYW5nZSBldmVudFxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0ZWQtaXRlbXMtY2hhbmdlZCcsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ3NlbGVjdGVkLWl0ZW0tY2hhbmdlZCcsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ3NlbGVjdGVkLXZhbHVlcy1jaGFuZ2VkJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0ZWQtY2hhbmdlZCcsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ2NoZWNrZWQtY2hhbmdlZCcsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ3ZhbHVlLWNoYW5nZWQnLCBbJyRldmVudCddKVxuICBvbkNoYW5nZWRFdmVudChldmVudDogRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuaXNXcml0aW5nVmFsdWUpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgY2FzZSAnc2VsZWN0ZWQtaXRlbXMtY2hhbmdlZCc6XG4gICAgICAgIGNhc2UgJ3NlbGVjdGVkLWl0ZW0tY2hhbmdlZCc6IHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHRoaXMuZ2V0U2VsZWN0YWJsZVByb3BlcnR5KGVsZW1lbnQpO1xuICAgICAgICAgIGNoYW5nZWQgPSBwcm9wZXJ0eSA9PT0gJ3NlbGVjdGVkSXRlbXMnIHx8IHByb3BlcnR5ID09PSAnc2VsZWN0ZWRJdGVtJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdzZWxlY3RlZC12YWx1ZXMtY2hhbmdlZCc6XG4gICAgICAgIGNhc2UgJ3NlbGVjdGVkLWNoYW5nZWQnOiB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydHkgPSB0aGlzLmdldFNlbGVjdGFibGVQcm9wZXJ0eShlbGVtZW50KTtcbiAgICAgICAgICBjaGFuZ2VkID0gcHJvcGVydHkgPT09ICdzZWxlY3RlZFZhbHVlcycgfHwgcHJvcGVydHkgPT09ICdzZWxlY3RlZCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgbGV0IHByb3BlcnR5OiBzdHJpbmc7XG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlTZWxlY3RhYmxlKGVsZW1lbnQpIHx8IHRoaXMuaXNTZWxlY3RhYmxlKGVsZW1lbnQpKSB7XG4gICAgICAgICAgLy8gcHJvcGVydHkgd2lsbCBiZSBkZWZpbmVkIGlmIHdlIHJlYWNoIHRoaXMgc2luY2UgY2hhbmdlZCBjYW4gb25seVxuICAgICAgICAgIC8vIGJlIHRydWUgaWYgdGhlIHByb3BlcnR5IGlzIGRlZmluZWQgZm9yIHNlbGVjdGFibGUgZWxlbWVudHNcbiAgICAgICAgICBwcm9wZXJ0eSA9IHRoaXMuZ2V0U2VsZWN0YWJsZVByb3BlcnR5KGVsZW1lbnQpITtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQ2hlY2tlZEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgICBwcm9wZXJ0eSA9ICdjaGVja2VkJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wZXJ0eSA9ICd2YWx1ZSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEb24ndCB1c2UgYGV2ZW50LmRldGFpbC52YWx1ZWAsIHNpbmNlIHdlIGNhbm5vdCBhc3N1bWUgdGhhdCBhbGxcbiAgICAgICAgLy8gY2hhbmdlIGV2ZW50cyB3aWxsIHByb3ZpZGUgdGhhdC4gQWRkaXRpb25hbGx5LCBzb21lIGV2ZW50IGRldGFpbHNcbiAgICAgICAgLy8gbWF5IGJlIHNwbGljZXMgb2YgYW4gYXJyYXkgb3Igb2JqZWN0IGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAgICAgIHRoaXMub25DaGFuZ2UoZWxlbWVudFtwcm9wZXJ0eV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gZm9yIGBpbnZhbGlkYCBwcm9wZXJ0eSBjaGFuZ2VzLiBTb21lIGVsZW1lbnRzLCBzdWNoIGFzXG4gICAqIGA8dmFhZGluLWRhdGUtcGlja2VyPmAgaGF2ZSBtdWx0aXBsZSBcInZhbHVlc1wiLiBTZXR0aW5nIHRoZSBwcmltYXJ5IHZhbHVlXG4gICAqIChleC4gdGhlIGRhdGUgc3RyaW5nKSBtYXkgcmVzdWx0IGluIGEgdGVtcG9yYXJpbHkgaW52YWxpZCBlbGVtZW50IHVudGlsXG4gICAqIHN1YnNlcXVlbnQgdmFsdWVzIChleC4gdGhlIHNlbGVjdGVkIGRhdGUpIGhhdmUgYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBTaW5jZSB0aGlzIHZhbHVlIGFjY2Vzc29yIG9ubHkgbGlzdGVucyBmb3IgdmFsdWUgY2hhbmdlcywgaXQgbWF5IG5vdCBiZVxuICAgKiBub3RpZmllZCBvZiB0aGUgY2hhbmdlIGluIHZhbGlkaXR5LiBUaGlzIGxpc3RlbmVyIHdpbGwgbGlzdGVuIGZvciBhbnlcbiAgICogZXhwbGljaXR5IHZhbGlkaXR5IGNoYW5nZXMgZnJvbSB0aGUgZWxlbWVudCBhbmQgcmUtZXZhbHVhdGUgYSBjb250cm9sJ3NcbiAgICogdmFsaWRpdHkgaWYgaXQgYW5kIHRoZSBlbGVtZW50J3MgdmFsaWRpdHkgYXJlIG91dCBvZiBzeW5jLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignaW52YWxpZC1jaGFuZ2VkJylcbiAgb25JbnZhbGlkQ2hhbmdlZCgpIHtcbiAgICBpZiAoIXRoaXMuaWdub3JlSW52YWxpZENoYW5nZXMpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5pc1ZhbGlkYXRhYmxlKGVsZW1lbnQpICYmXG4gICAgICAgIHRoaXMuY29udHJvbCAmJlxuICAgICAgICB0aGlzLmNvbnRyb2wuaW52YWxpZCAhPT0gZWxlbWVudC5pbnZhbGlkXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5pZ25vcmVJbnZhbGlkQ2hhbmdlcyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIHRoaXMuaWdub3JlSW52YWxpZENoYW5nZXMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCBhbiBlbGVtZW50IGlzIGNoZWNrYm94LWxpa2UuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIGNoZWNrXG4gICAqL1xuICBpc0NoZWNrZWRFbGVtZW50KGVsZW1lbnQ6IGFueSk6IGVsZW1lbnQgaXMgQ2hlY2tlZEVsZW1lbnRMaWtlIHtcbiAgICByZXR1cm4gdGhpcy5pc1Byb3BlcnR5RGVmaW5lZChlbGVtZW50LCAnY2hlY2tlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgYW4gZWxlbWVudCBpcyBzZWxlY3RhYmxlLWxpa2UuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIGNoZWNrXG4gICAqL1xuICBpc1NlbGVjdGFibGUoZWxlbWVudDogYW55KTogZWxlbWVudCBpcyBTZWxlY3RhYmxlTGlrZSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuaXNQcm9wZXJ0eURlZmluZWQoZWxlbWVudCwgJ3NlbGVjdGVkJykgfHxcbiAgICAgIHRoaXMuaXNQcm9wZXJ0eURlZmluZWQoZWxlbWVudCwgJ3NlbGVjdGVkSXRlbScpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGFuIGVsZW1lbnQgaXMgbXVsdGkgc2VsZWN0YWJsZS1saWtlLlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBjaGVja1xuICAgKi9cbiAgaXNNdWx0aVNlbGVjdGFibGUoZWxlbWVudDogYW55KTogZWxlbWVudCBpcyBNdWx0aVNlbGVjdGFibGVMaWtlIHtcbiAgICBpZiAoXG4gICAgICBlbGVtZW50ICYmXG4gICAgICAodGhpcy5pc1Byb3BlcnR5RGVmaW5lZChlbGVtZW50LCAnc2VsZWN0ZWRWYWx1ZXMnKSB8fFxuICAgICAgICB0aGlzLmlzUHJvcGVydHlEZWZpbmVkKGVsZW1lbnQsICdzZWxlY3RlZEl0ZW1zJykpXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1NlbGVjdGFibGUoZWxlbWVudCkgPyBlbGVtZW50Lm11bHRpID09PSB0cnVlIDogdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGFuIGVsZW1lbnQgaXMgdmFsaWRhdGFibGUtbGlrZS5cbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gY2hlY2tcbiAgICovXG4gIGlzVmFsaWRhdGFibGUoZWxlbWVudDogYW55KTogZWxlbWVudCBpcyBWYWxpZGF0YWJsZUxpa2Uge1xuICAgIHJldHVybiB0aGlzLmlzUHJvcGVydHlEZWZpbmVkKGVsZW1lbnQsICdpbnZhbGlkJyk7XG4gIH1cblxuICBzaG91bGRVc2VWYWxpZGF0ZShlbGVtZW50OiBhbnkpOiBlbGVtZW50IGlzIHsgdmFsaWRhdGUoKTogYm9vbGVhbiB9IHtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQudmFsaWRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIFNvbWUgZWxlbWVudCdzIChzdWNoIGFzIGA8dmFhZGluLXRleHQtZmllbGQ+YCkgbWF5IG5vdCBhY3R1YWxseSBtdXRhdGVcbiAgICAgIC8vIHRoZSBgaW52YWxpZGAgcHJvcGVydHkgd2hlbiBgdmFsaWRhdGUoKWAgaXMgY2FsbGVkLiBJbiB0aGVzZVxuICAgICAgLy8gc2l0dWF0aW9ucywgaXQncyBwb3NzaWJsZSBmb3IgQW5ndWxhciB0byBzZXQgYW4gZWxlbWVudCBhcyBpbnZhbGlkIGFuZFxuICAgICAgLy8gbmV2ZXIgYmUgYWJsZSB0byByZWNvdmVyIHNpbmNlIHRoZSBlbGVtZW50J3MgYHZhbGlkYXRlKClgIHdpbGwgYWx3YXlzXG4gICAgICAvLyByZXBvcnQgaXQgaXMgaW52YWxpZC5cbiAgICAgIC8vXG4gICAgICAvLyBJbiB0aGVzZSBzaXR1YXRpb25zLCBPcmlnYW1pIHNob3VsZCBpZ25vcmUgdGhlIGVsZW1lbnQncyB2YWxpZGF0ZSgpXG4gICAgICAvLyBmdW5jdGlvbi5cbiAgICAgIHRoaXMuaWdub3JlSW52YWxpZENoYW5nZXMgPSB0cnVlO1xuICAgICAgY29uc3Qgd2FzSW52YWxpZCA9IGVsZW1lbnQuaW52YWxpZDtcbiAgICAgIC8vIElmIHRoZSBlbGVtZW50IGRvZXMgbXV0YXRlIGBpbnZhbGlkYCwgYXNrIGl0IHRvIGRvIHNvIGZpcnN0IHRvIGdldCBhXG4gICAgICAvLyBiYXNlbGluZS5cbiAgICAgIGVsZW1lbnQudmFsaWRhdGUoKTtcbiAgICAgIC8vIFdoZW4gYHZhbGlkYXRlKClgIGlzIGNhbGxlZCBuZXh0LCB3ZSB3aWxsIGtub3cgaWYgdGhlIGVsZW1lbnQgbXV0YXRlc1xuICAgICAgLy8gYGludmFsaWRgIGlmIHRoZSBleHBlY3RlZCB2YWx1ZSBtYXRjaGVzIGBpbnZhbGlkYCBhZnRlciBjaGFuZ2luZ1xuICAgICAgLy8gYGludmFsaWRgIHRvIHNvbWV0aGluZyBlbHNlLlxuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBlbGVtZW50LmludmFsaWQ7XG4gICAgICBlbGVtZW50LmludmFsaWQgPSAhZWxlbWVudC5pbnZhbGlkO1xuICAgICAgZWxlbWVudC52YWxpZGF0ZSgpO1xuICAgICAgY29uc3QgdmFsaWRhdGVNdXRhdGVzSW52YWxpZCA9IGVsZW1lbnQuaW52YWxpZCA9PT0gZXhwZWN0ZWQ7XG4gICAgICBlbGVtZW50LmludmFsaWQgPSB3YXNJbnZhbGlkO1xuICAgICAgdGhpcy5pZ25vcmVJbnZhbGlkQ2hhbmdlcyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHZhbGlkYXRlTXV0YXRlc0ludmFsaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCBhIHByb3BlcnR5IGlzIGRlZmluZWQgYW55d2hlcmUgaW4gdGhlIHByb3ZpZGVkXG4gICAqIGVsZW1lbnQncyBwcm90b3R5cGUgY2hhaW4uXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIGNoZWNrXG4gICAqIEBwYXJhbSBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgdG8gY2hlY2sgZm9yXG4gICAqL1xuICBwcml2YXRlIGlzUHJvcGVydHlEZWZpbmVkKGVsZW1lbnQ6IGFueSwgcHJvcGVydHk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWVsZW1lbnQgJiYgcHJvcGVydHkgaW4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHByb3BlcnR5IG5hbWUgb2YgdGhlIHNlbGVjdGFibGUgb3IgbXVsdGktc2VsZWN0YWJsZSBlbGVtZW50XG4gICAqIHRoYXQgc2hvdWxkIGJlIHVwZGF0ZWQuIFRoaXMgbWV0aG9kIHdpbGwgdXNlIGRlZmluZWQgcHJvcGVydGllcyBhbmQgdGhlXG4gICAqIHZhbHVlIHR5cGUgdG8gZGV0ZXJtaW5lIHdoaWNoIHByb3BlcnR5IHNob3VsZCBiZSB1c2VkLiBJZiBpdCBjYW5ub3RcbiAgICogZGV0ZXJtaW5lIHdoaWNoIHByb3BlcnR5IHRvIHVzZSwgaXQgd2lsbCByZXR1cm4gdW5kZWZpbmVkLlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBnZXQgdGhlIHByb3BlcnR5IGZvclxuICAgKiBAcGFyYW0gdmFsdWUgYSB2YWx1ZSBmb3IgdGhlIGVsZW1lbnQncyBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyB0aGUgcHJvcGVydHkgbmFtZSwgb3IgdW5kZWZpbmVkIGlmIGl0IGNhbm5vdCBiZSBkZXRlcm1pbmVkXG4gICAqL1xuICBwcml2YXRlIGdldFNlbGVjdGFibGVQcm9wZXJ0eShlbGVtZW50OiBhbnksIHZhbHVlPzogYW55KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBpc011bHRpID0gdGhpcy5pc011bHRpU2VsZWN0YWJsZShlbGVtZW50KTtcbiAgICBjb25zdCB2YWx1ZVByb3AgPSBpc011bHRpID8gJ3NlbGVjdGVkSXRlbXMnIDogJ3NlbGVjdGVkSXRlbSc7XG4gICAgY29uc3QgaW5kZXhQcm9wID0gaXNNdWx0aSA/ICdzZWxlY3RlZFZhbHVlcycgOiAnc2VsZWN0ZWQnO1xuICAgIGlmICh0eXBlb2YgdGhpcy51c2VTZWxlY3RhYmxlVmFsdWVQcm9wICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHdlIHNob3VsZCBiZSBzZXR0aW5nIHRoZSBpbmRleCBvciB2YWx1ZSBwcm9wZXJ0eSBmb3JcbiAgICAgIC8vIGEgc2VsZWN0YWJsZSBlbGVtZW50XG4gICAgICBjb25zdCBoYXNWYWx1ZVByb3AgPSB2YWx1ZVByb3AgaW4gZWxlbWVudDtcbiAgICAgIGNvbnN0IGhhc0luZGV4UHJvcCA9IGluZGV4UHJvcCBpbiBlbGVtZW50O1xuICAgICAgaWYgKGhhc1ZhbHVlUHJvcCAmJiAhaGFzSW5kZXhQcm9wKSB7XG4gICAgICAgIHRoaXMudXNlU2VsZWN0YWJsZVZhbHVlUHJvcCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKCFoYXNWYWx1ZVByb3AgJiYgaGFzSW5kZXhQcm9wKSB7XG4gICAgICAgIHRoaXMudXNlU2VsZWN0YWJsZVZhbHVlUHJvcCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSBlbGVtZW50W3ZhbHVlUHJvcF07XG4gICAgICAgIC8vIFdoZW4gdGhlIGVsZW1lbnQgaGFzIGJvdGggcHJvcGVydGllcywgdHJ5IHRvIHNldCBpdCB0byB0aGUgdmFsdWVcbiAgICAgICAgLy8gcHJvcGVydHkgZmlyc3QuIElmIGl0IGZhaWxzLCB0aGVuIHVzZSB0aGUgaW5kZXggcHJvcGVydHlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBlbGVtZW50W3ZhbHVlUHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBDb3VsZCB0aHJvdyBpZiB0aGUgdmFsdWUgaXMgYW4gdW5leHBlY3RlZCB0eXBlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIHZhbHVlIHdlIHNldCBpdCB0byBpcyBzdGlsbCBhY2N1cmF0ZS4gSWYgaXQnc1xuICAgICAgICAvLyBub3QgdGhlbiB0aGUgZWxlbWVudCBzaWxlbnRseSByZWplY3RlZCB0aGUgbmV3IHZhbHVlLlxuICAgICAgICB0aGlzLnVzZVNlbGVjdGFibGVWYWx1ZVByb3AgPSBlbGVtZW50W3ZhbHVlUHJvcF0gPT09IHZhbHVlO1xuICAgICAgICBlbGVtZW50W3ZhbHVlUHJvcF0gPSBwcmV2aW91c1ZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC5pdGVtVmFsdWVQYXRoKSB7XG4gICAgICAvLyA8dmFhZGluLWNvbWJvLWJveD4gd2lsbCB3YW50IHRvIHVzZSBzZWxlY3RlZEl0ZW0gZm9yIG9iamVjdCB2YWx1ZXMuXG4gICAgICAvLyBIb3dldmVyLCBpZiBgaXRlbVZhbHVlUGF0aGAgaXMgc2V0IHRoZW4gdGhlIGNvbnRyb2wgdmFsdWUgaXMgbm90IHRoZVxuICAgICAgLy8gaXRlbSBpdHNlbGYsIGJ1dCB0aGUgYHZhbHVlYCBwcm9wZXJ0eS5cbiAgICAgIHJldHVybiAndmFsdWUnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy51c2VTZWxlY3RhYmxlVmFsdWVQcm9wID8gdmFsdWVQcm9wIDogaW5kZXhQcm9wO1xuICAgIH1cbiAgfVxufVxuIl19