import { __decorate, __param } from "tslib";
import { AfterViewInit, Directive, ElementRef, HostListener, Inject, Injector, Input, OnDestroy, Optional, Provider, Renderer2, forwardRef } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, DefaultValueAccessor, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms';
/**
 * OrigamiControlValueAccessor provider.
 */
export const ORIGAMI_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OrigamiControlValueAccessor),
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
let OrigamiControlValueAccessor = class OrigamiControlValueAccessor extends DefaultValueAccessor {
    constructor(elementRef, injector, renderer, compositionMode) {
        super(renderer, elementRef, compositionMode);
        this.elementRef = elementRef;
        this.injector = injector;
        this.renderer = renderer;
        /**
         * The key to use when reporting that an element's `validate()` function
         * returns false. When this happens, the control's `errors` object will be
         * set with this key and a value of true.
         *
         * The default key is "validate".
         */
        this.validationErrorsKey = 'validate';
        /**
         * Most custom elements property will emit a `property-changed` event when
         * their value is set. This flag informs the value accessor to ignore the
         * next event while it is in the middle of writing a value.
         */
        this.isWritingValue = false;
        /**
         * Flag that informs the value accessor that it is currently updating an
         * element and should ignore additional `invalid` property changes until it is
         * complete.
         */
        this.ignoreInvalidChanges = false;
    }
    /**
     * The `AbstractControl` attached to this element.
     */
    get control() {
        if (!this._control) {
            this._control = this.injector.get(NgControl).control;
        }
        return this._control;
    }
    /**
     * Lifecycle callback that will connect an element's validatable properties
     * (if they are implemented) to the Angular control.
     */
    ngAfterViewInit() {
        const element = this.elementRef.nativeElement;
        if (this.isValidatable(element)) {
            // The control will always be set by ngAfterViewInit due to the nature of
            // the directive's selectors
            const control = this.control;
            // Allows Angular validators to update the custom element's validity
            this.statusSub = control.statusChanges.subscribe(() => {
                if (typeof this.isInvalid === 'function') {
                    element.invalid = this.isInvalid(control);
                }
                else {
                    element.invalid = !!control.invalid && !!control.dirty;
                }
            });
            // Allows custom element validate function to update Angular control's
            // validity
            if (this.shouldUseValidate(element)) {
                control.setValidators(Validators.compose([
                    control.validator,
                    () => {
                        if (element.validate()) {
                            return null;
                        }
                        else {
                            return { [this.validationErrorsKey]: true };
                        }
                    }
                ]));
            }
        }
    }
    /**
     * Lifecycle callback to clean up subscriptions.
     */
    ngOnDestroy() {
        if (this.statusSub) {
            this.statusSub.unsubscribe();
        }
    }
    /**
     * Writes a value to a custom element's correct value property, based on what
     * kind of element the directive controls.
     *
     * @param value the value to write
     */
    writeValue(value) {
        this.isWritingValue = true;
        const element = this.elementRef.nativeElement;
        if (this.isMultiSelectable(element) || this.isSelectable(element)) {
            const property = this.getSelectableProperty(element, value);
            if (property) {
                element[property] = value;
            }
        }
        else if (this.isCheckedElement(element)) {
            element.checked = Boolean(value);
        }
        else {
            super.writeValue(value);
        }
        this.isWritingValue = false;
    }
    /**
     * Listen for custom element events and notify Angular of any changes.
     *
     * @param event the change event
     */
    onChangedEvent(event) {
        if (!this.isWritingValue) {
            const element = this.elementRef.nativeElement;
            let changed = false;
            switch (event.type) {
                case 'selected-items-changed':
                case 'selected-item-changed': {
                    const property = this.getSelectableProperty(element);
                    changed = property === 'selectedItems' || property === 'selectedItem';
                    break;
                }
                case 'selected-values-changed':
                case 'selected-changed': {
                    const property = this.getSelectableProperty(element);
                    changed = property === 'selectedValues' || property === 'selected';
                    break;
                }
                default:
                    changed = true;
            }
            if (changed) {
                let property;
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
    }
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
    onInvalidChanged() {
        if (!this.ignoreInvalidChanges) {
            const element = this.elementRef.nativeElement;
            if (this.isValidatable(element) &&
                this.control &&
                this.control.invalid !== element.invalid) {
                this.ignoreInvalidChanges = true;
                this.control.updateValueAndValidity();
                this.ignoreInvalidChanges = false;
            }
        }
    }
    /**
     * Determines whether or not an element is checkbox-like.
     *
     * @param element the element to check
     */
    isCheckedElement(element) {
        return this.isPropertyDefined(element, 'checked');
    }
    /**
     * Determines whether or not an element is selectable-like.
     *
     * @param element the element to check
     */
    isSelectable(element) {
        return (this.isPropertyDefined(element, 'selected') ||
            this.isPropertyDefined(element, 'selectedItem'));
    }
    /**
     * Determines whether or not an element is multi selectable-like.
     *
     * @param element the element to check
     */
    isMultiSelectable(element) {
        if (element &&
            (this.isPropertyDefined(element, 'selectedValues') ||
                this.isPropertyDefined(element, 'selectedItems'))) {
            return this.isSelectable(element) ? element.multi === true : true;
        }
        else {
            return false;
        }
    }
    /**
     * Determines whether or not an element is validatable-like.
     *
     * @param element the element to check
     */
    isValidatable(element) {
        return this.isPropertyDefined(element, 'invalid');
    }
    shouldUseValidate(element) {
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
            const wasInvalid = element.invalid;
            // If the element does mutate `invalid`, ask it to do so first to get a
            // baseline.
            element.validate();
            // When `validate()` is called next, we will know if the element mutates
            // `invalid` if the expected value matches `invalid` after changing
            // `invalid` to something else.
            const expected = element.invalid;
            element.invalid = !element.invalid;
            element.validate();
            const validateMutatesInvalid = element.invalid === expected;
            element.invalid = wasInvalid;
            this.ignoreInvalidChanges = false;
            return validateMutatesInvalid;
        }
        else {
            return false;
        }
    }
    /**
     * Determines whether or not a property is defined anywhere in the provided
     * element's prototype chain.
     *
     * @param element the element to check
     * @param property the property to check for
     */
    isPropertyDefined(element, property) {
        return !!element && property in element;
    }
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
    getSelectableProperty(element, value) {
        const isMulti = this.isMultiSelectable(element);
        const valueProp = isMulti ? 'selectedItems' : 'selectedItem';
        const indexProp = isMulti ? 'selectedValues' : 'selected';
        if (typeof this.useSelectableValueProp !== 'boolean') {
            // Determine whether we should be setting the index or value property for
            // a selectable element
            const hasValueProp = valueProp in element;
            const hasIndexProp = indexProp in element;
            if (hasValueProp && !hasIndexProp) {
                this.useSelectableValueProp = true;
            }
            else if (!hasValueProp && hasIndexProp) {
                this.useSelectableValueProp = false;
            }
            else if (typeof value !== 'undefined' && value !== null) {
                const previousValue = element[valueProp];
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
    }
};
OrigamiControlValueAccessor.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector },
    { type: Renderer2 },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [COMPOSITION_BUFFER_MODE,] }] }
];
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
export { OrigamiControlValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtYWNjZXNzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kZWJha2VyeS9vcmlnYW1pL2Zvcm1zLyIsInNvdXJjZXMiOlsic3JjL3ZhbHVlLWFjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFNBQVMsRUFDVCxVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBRVgsTUFBTSxnQkFBZ0IsQ0FBQztBQW1DeEI7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBYTtJQUN0RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMkJBQTJCLENBQUM7SUFDMUQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNENHO0FBTUgsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBNEIsU0FBUSxvQkFBb0I7SUF5RG5FLFlBQ1MsVUFBc0IsRUFDbkIsUUFBa0IsRUFDbEIsUUFBbUIsRUFHN0IsZUFBd0I7UUFFeEIsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFQdEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFuRC9COzs7Ozs7V0FNRztRQUVILHdCQUFtQixHQUFHLFVBQVUsQ0FBQztRQWlCakM7Ozs7V0FJRztRQUNLLG1CQUFjLEdBQUcs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UyxDQUFDO1FBQ1QsUUFBUSxFQUNOLHNFQUFzRTtRQUN4RSxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztLQUM1QyxDQUFDO0lBOERHLFdBQUEsUUFBUSxFQUFFLENBQUE7SUFDVixXQUFBLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0dBOUR2QiwyQkFBMkIsQ0FvV3ZDO1NBcFdZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgUHJvdmlkZXIsXG4gIFJlbmRlcmVyMixcbiAgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFLFxuICBEZWZhdWx0VmFsdWVBY2Nlc3NvcixcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIE5nQ29udHJvbCxcbiAgVmFsaWRhdG9ycyxcbiAgQWJzdHJhY3RDb250cm9sXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgZm9yIGRldGVybWluaW5nIGlmIGFuIGVsZW1lbnQgaXMgYSBjaGVja2JveC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDaGVja2VkRWxlbWVudExpa2Uge1xuICBjaGVja2VkPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgZm9yIGRldGVybWluaW5nIGlmIGFuIGVsZW1lbnQgaXMgc2VsZWN0YWJsZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RhYmxlTGlrZSB7XG4gIG11bHRpPzogYm9vbGVhbjtcbiAgc2VsZWN0ZWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHNlbGVjdGVkSXRlbT86IGFueTtcbn1cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgZm9yIGRldGVybWluaW5nIGlmIGFuIGVsZW1lbnQgaXMgbXVsdGkgc2VsZWN0YWJsZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNdWx0aVNlbGVjdGFibGVMaWtlIHtcbiAgbXVsdGk/OiBib29sZWFuO1xuICBzZWxlY3RlZFZhbHVlcz86IEFycmF5PHN0cmluZyB8IG51bWJlcj47XG4gIHNlbGVjdGVkSXRlbXM/OiBhbnlbXTtcbn1cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgZm9yIGRldGVybWluaW5nIGlmIGFuIGVsZW1lbnQgaXMgdmFsaWRhdGFibGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGFibGVMaWtlIHtcbiAgaW52YWxpZD86IGJvb2xlYW47XG4gIHZhbGlkYXRlPygpOiB2b2lkO1xufVxuXG4vKipcbiAqIE9yaWdhbWlDb250cm9sVmFsdWVBY2Nlc3NvciBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IE9SSUdBTUlfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPcmlnYW1pQ29udHJvbFZhbHVlQWNjZXNzb3IpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBBIHZhbHVlIGFjY2Vzc29yIGZvciBgbmdNb2RlbGAsIGBmb3JtQ29udHJvbGAsIGFuZCBgZm9ybUNvbnRyb2xOYW1lYCwgb25cbiAqIGN1c3RvbSBlbGVtZW50cy4gSW4gYWRkaXRpb24gdG8gb25lIG9mIHRoZSBhYm92ZSBkaXJlY3RpdmVzLCBgb3JpZ2FtaWBcbiAqIHNob3VsZCBiZSBhZGRlZCB0byB0aGUgZWxlbWVudCB0byBkZW5vdGUgdGhhdCB0aGlzIHZhbHVlIGFjY2Vzc29yIHNob3VsZFxuICogY29udHJvbCBpdC5cbiAqXG4gKiBFeGFtcGxlOiBgPHBhcGVyLWlucHV0IFsobmdNb2RlbCldPVwidmFsdWVcIiBvcmlnYW1pPjwvcGFwZXItaW5wdXQ+YFxuICpcbiAqIFRoZSBjb25uZWN0ZWQgZWxlbWVudCBzaG91bGQgaW1wbGVtZW50IG9uZSBvZiB0aGUgYmVsb3dcbiAqIHByb3BlcnRpZXM6XG4gKlxuICogLSBgY2hlY2tlZGAgYXMgYSBib29sZWFuIGZvciBjaGVja2JveC1saWtlIGVsZW1lbnRzLlxuICogLSBgc2VsZWN0ZWRgIGZvciBzaW5nbGUgc2VsZWN0YWJsZSBlbGVtZW50cy4gSXQgbXVzdCBiZSBhbiBpbmRleCBvciBzdHJpbmdcbiAqICAgbmFtZSBhdHRyaWJ1dGUuXG4gKiAtIGBzZWxlY3RlZEl0ZW1gIGZvciBzaW5nbGUgc2VsZWN0YWJsZSBlbGVtZW50cy4gSXQgbWF5IGJlIGFueSB0eXBlLlxuICogLSBgc2VsZWN0ZWRWYWx1ZXNgIGZvciBtdWx0aSBzZWxlY3RhYmxlIGVsZW1lbnRzLiBJdCBtdXN0IGJlIGFuIGFycmF5IG9mXG4gKiAgIGluZGljZXMgb3Igc3RyaW5nIG5hbWUgYXR0cmlidXRlcy5cbiAqIC0gYHNlbGVjdGVkSXRlbXNgIGZvciBtdWx0aSBzZWxlY3RhYmxlIGVsZW1lbnRzLiBJdCBtdXN0IGJlIGFuIGFycmF5IG9mIGFueVxuICogICB0eXBlLlxuICogLSBgdmFsdWVgIGZvciBhbnkgYmFzaWMgZm9ybSBlbGVtZW50LiBJdCBtYXkgYmUgYW55IHR5cGUuXG4gKlxuICogRm9yIHNlbGVjdGFibGUgYW5kIG11bHRpIHNlbGVjdGFibGUgZWxlbWVudHMsIHRoZSBhdHRyaWJ1dGUgYHVzZUtleWAgc2hvdWxkXG4gKiBiZSBzcGVjaWZpZWQgaWYgdGhlIGNvbnRyb2wgYmluZGluZ3MgYW4gaW5kZXggb3IgbmFtZSB2YWx1ZSB0byB0aGUgZWxlbWVudFxuICogaW5zdGVhZCBvZiBhbiBvYmplY3QuXG4gKlxuICogQWRkaXRpb25hbGx5LCBhbiBlbGVtZW50IG1heSBpbXBsZW1lbnQgb25lIG9yIG1vcmUgb2YgdGhlIGZvbGxvd2luZ1xuICogcHJvcGVydGllczpcbiAqXG4gKiAtIGBkaXNhYmxlZGAgYXMgYSBib29sZWFuXG4gKiAtIGBpbnZhbGlkYCBhcyBhIGJvb2xlYW4gdG8gaW5kaWNhdGUgdmFsaWRpdHlcbiAqIC0gYHZhbGlkYXRlKClgIGFzIGEgZnVuY3Rpb24gdG8gcnVuIGN1c3RvbSB2YWxpZGF0aW9uXG4gKlxuICogVG8gbGlzdGVuIGZvciBjaGFuZ2VzIHRvIHRoZXNlIGV2ZW50cywgYW4gZWxlbWVudCBzaG91bGQgaW1wbGVtZW50IG9uZSBvclxuICogbW9yZSBvZiB0aGUgZm9sbG93aW5nIGV2ZW50cyB0byBub3RpZnkgQW5ndWxhciBvZiBhbnkgdXBkYXRlcy5cbiAqXG4gKiAtIGBpbnB1dGAgLSB3aWxsIHVwZGF0ZSBhbnkgb2YgdGhlIGFib3ZlIHByb3BlcnRpZXNcbiAqIC0gYGJsdXJgXG4gKiAtIGBjaGVja2VkLWNoYW5nZWRgXG4gKiAtIGBzZWxlY3RlZC1jaGFuZ2VkYFxuICogLSBgc2VsZWN0ZWQtaXRlbS1jaGFuZ2VkYFxuICogLSBgc2VsZWN0ZWQtdmFsdWVzLWNoYW5nZWRgXG4gKiAtIGBzZWxlY3RlZC1pdGVtcy1jaGFuZ2VkYFxuICogLSBgdmFsdWUtY2hhbmdlZGBcbiAqIC0gYGludmFsaWQtY2hhbmdlZGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOlxuICAgICdbbmdNb2RlbF1bb3JpZ2FtaV0sW2Zvcm1Db250cm9sTmFtZV1bb3JpZ2FtaV0sW2Zvcm1Db250cm9sXVtvcmlnYW1pXScsXG4gIHByb3ZpZGVyczogW09SSUdBTUlfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgT3JpZ2FtaUNvbnRyb2xWYWx1ZUFjY2Vzc29yIGV4dGVuZHMgRGVmYXVsdFZhbHVlQWNjZXNzb3JcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogT3ZlcnJpZGVzIHRoZSBsb2dpYyB0byBkZXRlcm1pbmUgd2hhdCB0byBzZXQgYW4gZWxlbWVudCdzIGBpbnZhbGlkYFxuICAgKiBwcm9wZXJ0eSB0byBnaXZlbiB0aGUgcHJvdmlkZWQgYEFic3RyYWN0Q29udHJvbGAuIFRoZSBkZWZhdWx0IGlzIHRvIHNldCB0aGVcbiAgICogZWxlbWVudCBhcyBgaW52YWxpZGAgd2hlbmV2ZXIgdGhlIGNvbnRyb2wgaXMgYm90aCBpbnZhbGlkIGFuZCBkaXJ0eS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGlzSW52YWxpZD86IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpID0+IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUaGUga2V5IHRvIHVzZSB3aGVuIHJlcG9ydGluZyB0aGF0IGFuIGVsZW1lbnQncyBgdmFsaWRhdGUoKWAgZnVuY3Rpb25cbiAgICogcmV0dXJucyBmYWxzZS4gV2hlbiB0aGlzIGhhcHBlbnMsIHRoZSBjb250cm9sJ3MgYGVycm9yc2Agb2JqZWN0IHdpbGwgYmVcbiAgICogc2V0IHdpdGggdGhpcyBrZXkgYW5kIGEgdmFsdWUgb2YgdHJ1ZS5cbiAgICpcbiAgICogVGhlIGRlZmF1bHQga2V5IGlzIFwidmFsaWRhdGVcIi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHZhbGlkYXRpb25FcnJvcnNLZXkgPSAndmFsaWRhdGUnO1xuXG4gIC8qKlxuICAgKiBUaGUgYEFic3RyYWN0Q29udHJvbGAgYXR0YWNoZWQgdG8gdGhpcyBlbGVtZW50LlxuICAgKi9cbiAgZ2V0IGNvbnRyb2woKTogQWJzdHJhY3RDb250cm9sIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRyb2wpIHtcbiAgICAgIHRoaXMuX2NvbnRyb2wgPSAoPE5nQ29udHJvbD50aGlzLmluamVjdG9yLmdldChOZ0NvbnRyb2wpKS5jb250cm9sITtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIE5nQ29udHJvbCdzIHN0YXR1c0NoYW5nZXMuXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhdHVzU3ViPzogeyB1bnN1YnNjcmliZSgpOiB2b2lkIH07XG4gIC8qKlxuICAgKiBNb3N0IGN1c3RvbSBlbGVtZW50cyBwcm9wZXJ0eSB3aWxsIGVtaXQgYSBgcHJvcGVydHktY2hhbmdlZGAgZXZlbnQgd2hlblxuICAgKiB0aGVpciB2YWx1ZSBpcyBzZXQuIFRoaXMgZmxhZyBpbmZvcm1zIHRoZSB2YWx1ZSBhY2Nlc3NvciB0byBpZ25vcmUgdGhlXG4gICAqIG5leHQgZXZlbnQgd2hpbGUgaXQgaXMgaW4gdGhlIG1pZGRsZSBvZiB3cml0aW5nIGEgdmFsdWUuXG4gICAqL1xuICBwcml2YXRlIGlzV3JpdGluZ1ZhbHVlID0gZmFsc2U7XG4gIC8qKlxuICAgKiBGbGFnIHRoYXQgaW5mb3JtcyB0aGUgdmFsdWUgYWNjZXNzb3IgdGhhdCBpdCBpcyBjdXJyZW50bHkgdXBkYXRpbmcgYW5cbiAgICogZWxlbWVudCBhbmQgc2hvdWxkIGlnbm9yZSBhZGRpdGlvbmFsIGBpbnZhbGlkYCBwcm9wZXJ0eSBjaGFuZ2VzIHVudGlsIGl0IGlzXG4gICAqIGNvbXBsZXRlLlxuICAgKi9cbiAgcHJpdmF0ZSBpZ25vcmVJbnZhbGlkQ2hhbmdlcyA9IGZhbHNlO1xuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRvIHVzZSB0aGUgdmFsdWUgcHJvcGVydHkgb3IgaW5kZXggcHJvcGVydHkgZm9yIGFcbiAgICogc2VsZWN0IG9yIG11bGl0LXNlbGVjdCBlbGVtZW50LiBXaGVuIHVuZGVmaW5lZCwgaXQgaW5kaWNhdGVzIHRoYXQgdGhlXG4gICAqIGRldGVybWluYXRpb24gb2Ygd2hpY2ggcHJvcGVydHkgdG8gdXNlIGhhcyBub3Qgb2NjdXJyZWQgeWV0LlxuICAgKi9cbiAgcHJpdmF0ZSB1c2VTZWxlY3RhYmxlVmFsdWVQcm9wPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENhY2hlZCBgY29udHJvbGAgdmFsdWUuXG4gICAqL1xuICBwcml2YXRlIF9jb250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoQ09NUE9TSVRJT05fQlVGRkVSX01PREUpXG4gICAgY29tcG9zaXRpb25Nb2RlOiBib29sZWFuXG4gICkge1xuICAgIHN1cGVyKHJlbmRlcmVyLCBlbGVtZW50UmVmLCBjb21wb3NpdGlvbk1vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpZmVjeWNsZSBjYWxsYmFjayB0aGF0IHdpbGwgY29ubmVjdCBhbiBlbGVtZW50J3MgdmFsaWRhdGFibGUgcHJvcGVydGllc1xuICAgKiAoaWYgdGhleSBhcmUgaW1wbGVtZW50ZWQpIHRvIHRoZSBBbmd1bGFyIGNvbnRyb2wuXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGlmICh0aGlzLmlzVmFsaWRhdGFibGUoZWxlbWVudCkpIHtcbiAgICAgIC8vIFRoZSBjb250cm9sIHdpbGwgYWx3YXlzIGJlIHNldCBieSBuZ0FmdGVyVmlld0luaXQgZHVlIHRvIHRoZSBuYXR1cmUgb2ZcbiAgICAgIC8vIHRoZSBkaXJlY3RpdmUncyBzZWxlY3RvcnNcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2whO1xuICAgICAgLy8gQWxsb3dzIEFuZ3VsYXIgdmFsaWRhdG9ycyB0byB1cGRhdGUgdGhlIGN1c3RvbSBlbGVtZW50J3MgdmFsaWRpdHlcbiAgICAgIHRoaXMuc3RhdHVzU3ViID0gY29udHJvbC5zdGF0dXNDaGFuZ2VzIS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuaXNJbnZhbGlkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZWxlbWVudC5pbnZhbGlkID0gdGhpcy5pc0ludmFsaWQoY29udHJvbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbWVudC5pbnZhbGlkID0gISFjb250cm9sLmludmFsaWQgJiYgISFjb250cm9sLmRpcnR5O1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gQWxsb3dzIGN1c3RvbSBlbGVtZW50IHZhbGlkYXRlIGZ1bmN0aW9uIHRvIHVwZGF0ZSBBbmd1bGFyIGNvbnRyb2wnc1xuICAgICAgLy8gdmFsaWRpdHlcbiAgICAgIGlmICh0aGlzLnNob3VsZFVzZVZhbGlkYXRlKGVsZW1lbnQpKSB7XG4gICAgICAgIGNvbnRyb2wuc2V0VmFsaWRhdG9ycyhcbiAgICAgICAgICBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICAgICAgY29udHJvbC52YWxpZGF0b3IsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50LnZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBbdGhpcy52YWxpZGF0aW9uRXJyb3JzS2V5XTogdHJ1ZSB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlmZWN5Y2xlIGNhbGxiYWNrIHRvIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdGF0dXNTdWIpIHtcbiAgICAgIHRoaXMuc3RhdHVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyBhIHZhbHVlIHRvIGEgY3VzdG9tIGVsZW1lbnQncyBjb3JyZWN0IHZhbHVlIHByb3BlcnR5LCBiYXNlZCBvbiB3aGF0XG4gICAqIGtpbmQgb2YgZWxlbWVudCB0aGUgZGlyZWN0aXZlIGNvbnRyb2xzLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIHRvIHdyaXRlXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmlzV3JpdGluZ1ZhbHVlID0gdHJ1ZTtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuaXNNdWx0aVNlbGVjdGFibGUoZWxlbWVudCkgfHwgdGhpcy5pc1NlbGVjdGFibGUoZWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gdGhpcy5nZXRTZWxlY3RhYmxlUHJvcGVydHkoZWxlbWVudCwgdmFsdWUpO1xuICAgICAgaWYgKHByb3BlcnR5KSB7XG4gICAgICAgICg8YW55PmVsZW1lbnQpW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5pc0NoZWNrZWRFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50LmNoZWNrZWQgPSBCb29sZWFuKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIud3JpdGVWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5pc1dyaXRpbmdWYWx1ZSA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiBmb3IgY3VzdG9tIGVsZW1lbnQgZXZlbnRzIGFuZCBub3RpZnkgQW5ndWxhciBvZiBhbnkgY2hhbmdlcy5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IHRoZSBjaGFuZ2UgZXZlbnRcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ3NlbGVjdGVkLWl0ZW1zLWNoYW5nZWQnLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCdzZWxlY3RlZC1pdGVtLWNoYW5nZWQnLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCdzZWxlY3RlZC12YWx1ZXMtY2hhbmdlZCcsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ3NlbGVjdGVkLWNoYW5nZWQnLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCdjaGVja2VkLWNoYW5nZWQnLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCd2YWx1ZS1jaGFuZ2VkJywgWyckZXZlbnQnXSlcbiAgb25DaGFuZ2VkRXZlbnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzV3JpdGluZ1ZhbHVlKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3NlbGVjdGVkLWl0ZW1zLWNoYW5nZWQnOlxuICAgICAgICBjYXNlICdzZWxlY3RlZC1pdGVtLWNoYW5nZWQnOiB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydHkgPSB0aGlzLmdldFNlbGVjdGFibGVQcm9wZXJ0eShlbGVtZW50KTtcbiAgICAgICAgICBjaGFuZ2VkID0gcHJvcGVydHkgPT09ICdzZWxlY3RlZEl0ZW1zJyB8fCBwcm9wZXJ0eSA9PT0gJ3NlbGVjdGVkSXRlbSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnc2VsZWN0ZWQtdmFsdWVzLWNoYW5nZWQnOlxuICAgICAgICBjYXNlICdzZWxlY3RlZC1jaGFuZ2VkJzoge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5ID0gdGhpcy5nZXRTZWxlY3RhYmxlUHJvcGVydHkoZWxlbWVudCk7XG4gICAgICAgICAgY2hhbmdlZCA9IHByb3BlcnR5ID09PSAnc2VsZWN0ZWRWYWx1ZXMnIHx8IHByb3BlcnR5ID09PSAnc2VsZWN0ZWQnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eTogc3RyaW5nO1xuICAgICAgICBpZiAodGhpcy5pc011bHRpU2VsZWN0YWJsZShlbGVtZW50KSB8fCB0aGlzLmlzU2VsZWN0YWJsZShlbGVtZW50KSkge1xuICAgICAgICAgIC8vIHByb3BlcnR5IHdpbGwgYmUgZGVmaW5lZCBpZiB3ZSByZWFjaCB0aGlzIHNpbmNlIGNoYW5nZWQgY2FuIG9ubHlcbiAgICAgICAgICAvLyBiZSB0cnVlIGlmIHRoZSBwcm9wZXJ0eSBpcyBkZWZpbmVkIGZvciBzZWxlY3RhYmxlIGVsZW1lbnRzXG4gICAgICAgICAgcHJvcGVydHkgPSB0aGlzLmdldFNlbGVjdGFibGVQcm9wZXJ0eShlbGVtZW50KSE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0NoZWNrZWRFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICAgICAgcHJvcGVydHkgPSAnY2hlY2tlZCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcGVydHkgPSAndmFsdWUnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRG9uJ3QgdXNlIGBldmVudC5kZXRhaWwudmFsdWVgLCBzaW5jZSB3ZSBjYW5ub3QgYXNzdW1lIHRoYXQgYWxsXG4gICAgICAgIC8vIGNoYW5nZSBldmVudHMgd2lsbCBwcm92aWRlIHRoYXQuIEFkZGl0aW9uYWxseSwgc29tZSBldmVudCBkZXRhaWxzXG4gICAgICAgIC8vIG1heSBiZSBzcGxpY2VzIG9mIGFuIGFycmF5IG9yIG9iamVjdCBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHZhbHVlLlxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGVsZW1lbnRbcHJvcGVydHldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIGZvciBgaW52YWxpZGAgcHJvcGVydHkgY2hhbmdlcy4gU29tZSBlbGVtZW50cywgc3VjaCBhc1xuICAgKiBgPHZhYWRpbi1kYXRlLXBpY2tlcj5gIGhhdmUgbXVsdGlwbGUgXCJ2YWx1ZXNcIi4gU2V0dGluZyB0aGUgcHJpbWFyeSB2YWx1ZVxuICAgKiAoZXguIHRoZSBkYXRlIHN0cmluZykgbWF5IHJlc3VsdCBpbiBhIHRlbXBvcmFyaWx5IGludmFsaWQgZWxlbWVudCB1bnRpbFxuICAgKiBzdWJzZXF1ZW50IHZhbHVlcyAoZXguIHRoZSBzZWxlY3RlZCBkYXRlKSBoYXZlIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogU2luY2UgdGhpcyB2YWx1ZSBhY2Nlc3NvciBvbmx5IGxpc3RlbnMgZm9yIHZhbHVlIGNoYW5nZXMsIGl0IG1heSBub3QgYmVcbiAgICogbm90aWZpZWQgb2YgdGhlIGNoYW5nZSBpbiB2YWxpZGl0eS4gVGhpcyBsaXN0ZW5lciB3aWxsIGxpc3RlbiBmb3IgYW55XG4gICAqIGV4cGxpY2l0eSB2YWxpZGl0eSBjaGFuZ2VzIGZyb20gdGhlIGVsZW1lbnQgYW5kIHJlLWV2YWx1YXRlIGEgY29udHJvbCdzXG4gICAqIHZhbGlkaXR5IGlmIGl0IGFuZCB0aGUgZWxlbWVudCdzIHZhbGlkaXR5IGFyZSBvdXQgb2Ygc3luYy5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2ludmFsaWQtY2hhbmdlZCcpXG4gIG9uSW52YWxpZENoYW5nZWQoKSB7XG4gICAgaWYgKCF0aGlzLmlnbm9yZUludmFsaWRDaGFuZ2VzKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuaXNWYWxpZGF0YWJsZShlbGVtZW50KSAmJlxuICAgICAgICB0aGlzLmNvbnRyb2wgJiZcbiAgICAgICAgdGhpcy5jb250cm9sLmludmFsaWQgIT09IGVsZW1lbnQuaW52YWxpZFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuaWdub3JlSW52YWxpZENoYW5nZXMgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB0aGlzLmlnbm9yZUludmFsaWRDaGFuZ2VzID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgYW4gZWxlbWVudCBpcyBjaGVja2JveC1saWtlLlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBjaGVja1xuICAgKi9cbiAgaXNDaGVja2VkRWxlbWVudChlbGVtZW50OiBhbnkpOiBlbGVtZW50IGlzIENoZWNrZWRFbGVtZW50TGlrZSB7XG4gICAgcmV0dXJuIHRoaXMuaXNQcm9wZXJ0eURlZmluZWQoZWxlbWVudCwgJ2NoZWNrZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGFuIGVsZW1lbnQgaXMgc2VsZWN0YWJsZS1saWtlLlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBjaGVja1xuICAgKi9cbiAgaXNTZWxlY3RhYmxlKGVsZW1lbnQ6IGFueSk6IGVsZW1lbnQgaXMgU2VsZWN0YWJsZUxpa2Uge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmlzUHJvcGVydHlEZWZpbmVkKGVsZW1lbnQsICdzZWxlY3RlZCcpIHx8XG4gICAgICB0aGlzLmlzUHJvcGVydHlEZWZpbmVkKGVsZW1lbnQsICdzZWxlY3RlZEl0ZW0nKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCBhbiBlbGVtZW50IGlzIG11bHRpIHNlbGVjdGFibGUtbGlrZS5cbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gY2hlY2tcbiAgICovXG4gIGlzTXVsdGlTZWxlY3RhYmxlKGVsZW1lbnQ6IGFueSk6IGVsZW1lbnQgaXMgTXVsdGlTZWxlY3RhYmxlTGlrZSB7XG4gICAgaWYgKFxuICAgICAgZWxlbWVudCAmJlxuICAgICAgKHRoaXMuaXNQcm9wZXJ0eURlZmluZWQoZWxlbWVudCwgJ3NlbGVjdGVkVmFsdWVzJykgfHxcbiAgICAgICAgdGhpcy5pc1Byb3BlcnR5RGVmaW5lZChlbGVtZW50LCAnc2VsZWN0ZWRJdGVtcycpKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNTZWxlY3RhYmxlKGVsZW1lbnQpID8gZWxlbWVudC5tdWx0aSA9PT0gdHJ1ZSA6IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCBhbiBlbGVtZW50IGlzIHZhbGlkYXRhYmxlLWxpa2UuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIGNoZWNrXG4gICAqL1xuICBpc1ZhbGlkYXRhYmxlKGVsZW1lbnQ6IGFueSk6IGVsZW1lbnQgaXMgVmFsaWRhdGFibGVMaWtlIHtcbiAgICByZXR1cm4gdGhpcy5pc1Byb3BlcnR5RGVmaW5lZChlbGVtZW50LCAnaW52YWxpZCcpO1xuICB9XG5cbiAgc2hvdWxkVXNlVmFsaWRhdGUoZWxlbWVudDogYW55KTogZWxlbWVudCBpcyB7IHZhbGlkYXRlKCk6IGJvb2xlYW4gfSB7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50LnZhbGlkYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBTb21lIGVsZW1lbnQncyAoc3VjaCBhcyBgPHZhYWRpbi10ZXh0LWZpZWxkPmApIG1heSBub3QgYWN0dWFsbHkgbXV0YXRlXG4gICAgICAvLyB0aGUgYGludmFsaWRgIHByb3BlcnR5IHdoZW4gYHZhbGlkYXRlKClgIGlzIGNhbGxlZC4gSW4gdGhlc2VcbiAgICAgIC8vIHNpdHVhdGlvbnMsIGl0J3MgcG9zc2libGUgZm9yIEFuZ3VsYXIgdG8gc2V0IGFuIGVsZW1lbnQgYXMgaW52YWxpZCBhbmRcbiAgICAgIC8vIG5ldmVyIGJlIGFibGUgdG8gcmVjb3ZlciBzaW5jZSB0aGUgZWxlbWVudCdzIGB2YWxpZGF0ZSgpYCB3aWxsIGFsd2F5c1xuICAgICAgLy8gcmVwb3J0IGl0IGlzIGludmFsaWQuXG4gICAgICAvL1xuICAgICAgLy8gSW4gdGhlc2Ugc2l0dWF0aW9ucywgT3JpZ2FtaSBzaG91bGQgaWdub3JlIHRoZSBlbGVtZW50J3MgdmFsaWRhdGUoKVxuICAgICAgLy8gZnVuY3Rpb24uXG4gICAgICB0aGlzLmlnbm9yZUludmFsaWRDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgIGNvbnN0IHdhc0ludmFsaWQgPSBlbGVtZW50LmludmFsaWQ7XG4gICAgICAvLyBJZiB0aGUgZWxlbWVudCBkb2VzIG11dGF0ZSBgaW52YWxpZGAsIGFzayBpdCB0byBkbyBzbyBmaXJzdCB0byBnZXQgYVxuICAgICAgLy8gYmFzZWxpbmUuXG4gICAgICBlbGVtZW50LnZhbGlkYXRlKCk7XG4gICAgICAvLyBXaGVuIGB2YWxpZGF0ZSgpYCBpcyBjYWxsZWQgbmV4dCwgd2Ugd2lsbCBrbm93IGlmIHRoZSBlbGVtZW50IG11dGF0ZXNcbiAgICAgIC8vIGBpbnZhbGlkYCBpZiB0aGUgZXhwZWN0ZWQgdmFsdWUgbWF0Y2hlcyBgaW52YWxpZGAgYWZ0ZXIgY2hhbmdpbmdcbiAgICAgIC8vIGBpbnZhbGlkYCB0byBzb21ldGhpbmcgZWxzZS5cbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gZWxlbWVudC5pbnZhbGlkO1xuICAgICAgZWxlbWVudC5pbnZhbGlkID0gIWVsZW1lbnQuaW52YWxpZDtcbiAgICAgIGVsZW1lbnQudmFsaWRhdGUoKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRlTXV0YXRlc0ludmFsaWQgPSBlbGVtZW50LmludmFsaWQgPT09IGV4cGVjdGVkO1xuICAgICAgZWxlbWVudC5pbnZhbGlkID0gd2FzSW52YWxpZDtcbiAgICAgIHRoaXMuaWdub3JlSW52YWxpZENoYW5nZXMgPSBmYWxzZTtcbiAgICAgIHJldHVybiB2YWxpZGF0ZU11dGF0ZXNJbnZhbGlkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgYSBwcm9wZXJ0eSBpcyBkZWZpbmVkIGFueXdoZXJlIGluIHRoZSBwcm92aWRlZFxuICAgKiBlbGVtZW50J3MgcHJvdG90eXBlIGNoYWluLlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBjaGVja1xuICAgKiBAcGFyYW0gcHJvcGVydHkgdGhlIHByb3BlcnR5IHRvIGNoZWNrIGZvclxuICAgKi9cbiAgcHJpdmF0ZSBpc1Byb3BlcnR5RGVmaW5lZChlbGVtZW50OiBhbnksIHByb3BlcnR5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFlbGVtZW50ICYmIHByb3BlcnR5IGluIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBwcm9wZXJ0eSBuYW1lIG9mIHRoZSBzZWxlY3RhYmxlIG9yIG11bHRpLXNlbGVjdGFibGUgZWxlbWVudFxuICAgKiB0aGF0IHNob3VsZCBiZSB1cGRhdGVkLiBUaGlzIG1ldGhvZCB3aWxsIHVzZSBkZWZpbmVkIHByb3BlcnRpZXMgYW5kIHRoZVxuICAgKiB2YWx1ZSB0eXBlIHRvIGRldGVybWluZSB3aGljaCBwcm9wZXJ0eSBzaG91bGQgYmUgdXNlZC4gSWYgaXQgY2Fubm90XG4gICAqIGRldGVybWluZSB3aGljaCBwcm9wZXJ0eSB0byB1c2UsIGl0IHdpbGwgcmV0dXJuIHVuZGVmaW5lZC5cbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gZ2V0IHRoZSBwcm9wZXJ0eSBmb3JcbiAgICogQHBhcmFtIHZhbHVlIGEgdmFsdWUgZm9yIHRoZSBlbGVtZW50J3MgcHJvcGVydHlcbiAgICogQHJldHVybnMgdGhlIHByb3BlcnR5IG5hbWUsIG9yIHVuZGVmaW5lZCBpZiBpdCBjYW5ub3QgYmUgZGV0ZXJtaW5lZFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRTZWxlY3RhYmxlUHJvcGVydHkoZWxlbWVudDogYW55LCB2YWx1ZT86IGFueSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgaXNNdWx0aSA9IHRoaXMuaXNNdWx0aVNlbGVjdGFibGUoZWxlbWVudCk7XG4gICAgY29uc3QgdmFsdWVQcm9wID0gaXNNdWx0aSA/ICdzZWxlY3RlZEl0ZW1zJyA6ICdzZWxlY3RlZEl0ZW0nO1xuICAgIGNvbnN0IGluZGV4UHJvcCA9IGlzTXVsdGkgPyAnc2VsZWN0ZWRWYWx1ZXMnIDogJ3NlbGVjdGVkJztcbiAgICBpZiAodHlwZW9mIHRoaXMudXNlU2VsZWN0YWJsZVZhbHVlUHJvcCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciB3ZSBzaG91bGQgYmUgc2V0dGluZyB0aGUgaW5kZXggb3IgdmFsdWUgcHJvcGVydHkgZm9yXG4gICAgICAvLyBhIHNlbGVjdGFibGUgZWxlbWVudFxuICAgICAgY29uc3QgaGFzVmFsdWVQcm9wID0gdmFsdWVQcm9wIGluIGVsZW1lbnQ7XG4gICAgICBjb25zdCBoYXNJbmRleFByb3AgPSBpbmRleFByb3AgaW4gZWxlbWVudDtcbiAgICAgIGlmIChoYXNWYWx1ZVByb3AgJiYgIWhhc0luZGV4UHJvcCkge1xuICAgICAgICB0aGlzLnVzZVNlbGVjdGFibGVWYWx1ZVByb3AgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICghaGFzVmFsdWVQcm9wICYmIGhhc0luZGV4UHJvcCkge1xuICAgICAgICB0aGlzLnVzZVNlbGVjdGFibGVWYWx1ZVByb3AgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gZWxlbWVudFt2YWx1ZVByb3BdO1xuICAgICAgICAvLyBXaGVuIHRoZSBlbGVtZW50IGhhcyBib3RoIHByb3BlcnRpZXMsIHRyeSB0byBzZXQgaXQgdG8gdGhlIHZhbHVlXG4gICAgICAgIC8vIHByb3BlcnR5IGZpcnN0LiBJZiBpdCBmYWlscywgdGhlbiB1c2UgdGhlIGluZGV4IHByb3BlcnR5XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZWxlbWVudFt2YWx1ZVByb3BdID0gdmFsdWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgLy8gQ291bGQgdGhyb3cgaWYgdGhlIHZhbHVlIGlzIGFuIHVuZXhwZWN0ZWQgdHlwZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSB2YWx1ZSB3ZSBzZXQgaXQgdG8gaXMgc3RpbGwgYWNjdXJhdGUuIElmIGl0J3NcbiAgICAgICAgLy8gbm90IHRoZW4gdGhlIGVsZW1lbnQgc2lsZW50bHkgcmVqZWN0ZWQgdGhlIG5ldyB2YWx1ZS5cbiAgICAgICAgdGhpcy51c2VTZWxlY3RhYmxlVmFsdWVQcm9wID0gZWxlbWVudFt2YWx1ZVByb3BdID09PSB2YWx1ZTtcbiAgICAgICAgZWxlbWVudFt2YWx1ZVByb3BdID0gcHJldmlvdXNWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQuaXRlbVZhbHVlUGF0aCkge1xuICAgICAgLy8gPHZhYWRpbi1jb21iby1ib3g+IHdpbGwgd2FudCB0byB1c2Ugc2VsZWN0ZWRJdGVtIGZvciBvYmplY3QgdmFsdWVzLlxuICAgICAgLy8gSG93ZXZlciwgaWYgYGl0ZW1WYWx1ZVBhdGhgIGlzIHNldCB0aGVuIHRoZSBjb250cm9sIHZhbHVlIGlzIG5vdCB0aGVcbiAgICAgIC8vIGl0ZW0gaXRzZWxmLCBidXQgdGhlIGB2YWx1ZWAgcHJvcGVydHkuXG4gICAgICByZXR1cm4gJ3ZhbHVlJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudXNlU2VsZWN0YWJsZVZhbHVlUHJvcCA/IHZhbHVlUHJvcCA6IGluZGV4UHJvcDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==