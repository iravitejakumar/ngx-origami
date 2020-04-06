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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtYWNjZXNzb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS9mb3Jtcy8iLCJzb3VyY2VzIjpbInNyYy92YWx1ZS1hY2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGFBQWEsRUFDYixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsRUFDUixTQUFTLEVBQ1QsVUFBVSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVYLE1BQU0sZ0JBQWdCLENBQUM7QUFtQ3hCOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQWE7SUFDdEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDJCQUEyQixDQUFDO0lBQzFELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQU1ILElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTRCLFNBQVEsb0JBQW9CO0lBeURuRSxZQUNTLFVBQXNCLEVBQ25CLFFBQWtCLEVBQ2xCLFFBQW1CLEVBRzdCLGVBQXdCO1FBRXhCLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBUHRDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBbkQvQjs7Ozs7O1dBTUc7UUFFSCx3QkFBbUIsR0FBRyxVQUFVLENBQUM7UUFpQmpDOzs7O1dBSUc7UUFDSyxtQkFBYyxHQUFHLEtBQUssQ0FB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QUNULFFBQVEsRUFDTixzRUFBc0U7UUFDeEUsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7S0FDNUMsQ0FBQztJQThERyxXQUFBLFFBQVEsRUFBRSxDQUFBO0lBQ1YsV0FBQSxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtHQTlEdkIsMkJBQTJCLENBb1d2QztTQXBXWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFByb3ZpZGVyLFxuICBSZW5kZXJlcjIsXG4gIGZvcndhcmRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDT01QT1NJVElPTl9CVUZGRVJfTU9ERSxcbiAgRGVmYXVsdFZhbHVlQWNjZXNzb3IsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBOZ0NvbnRyb2wsXG4gIFZhbGlkYXRvcnMsXG4gIEFic3RyYWN0Q29udHJvbFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIGZvciBkZXRlcm1pbmluZyBpZiBhbiBlbGVtZW50IGlzIGEgY2hlY2tib3guXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2hlY2tlZEVsZW1lbnRMaWtlIHtcbiAgY2hlY2tlZD86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIGZvciBkZXRlcm1pbmluZyBpZiBhbiBlbGVtZW50IGlzIHNlbGVjdGFibGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0YWJsZUxpa2Uge1xuICBtdWx0aT86IGJvb2xlYW47XG4gIHNlbGVjdGVkPzogc3RyaW5nIHwgbnVtYmVyO1xuICBzZWxlY3RlZEl0ZW0/OiBhbnk7XG59XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIGZvciBkZXRlcm1pbmluZyBpZiBhbiBlbGVtZW50IGlzIG11bHRpIHNlbGVjdGFibGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTXVsdGlTZWxlY3RhYmxlTGlrZSB7XG4gIG11bHRpPzogYm9vbGVhbjtcbiAgc2VsZWN0ZWRWYWx1ZXM/OiBBcnJheTxzdHJpbmcgfCBudW1iZXI+O1xuICBzZWxlY3RlZEl0ZW1zPzogYW55W107XG59XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIGZvciBkZXRlcm1pbmluZyBpZiBhbiBlbGVtZW50IGlzIHZhbGlkYXRhYmxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRhYmxlTGlrZSB7XG4gIGludmFsaWQ/OiBib29sZWFuO1xuICB2YWxpZGF0ZT8oKTogdm9pZDtcbn1cblxuLyoqXG4gKiBPcmlnYW1pQ29udHJvbFZhbHVlQWNjZXNzb3IgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBPUklHQU1JX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IFByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT3JpZ2FtaUNvbnRyb2xWYWx1ZUFjY2Vzc29yKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogQSB2YWx1ZSBhY2Nlc3NvciBmb3IgYG5nTW9kZWxgLCBgZm9ybUNvbnRyb2xgLCBhbmQgYGZvcm1Db250cm9sTmFtZWAsIG9uXG4gKiBjdXN0b20gZWxlbWVudHMuIEluIGFkZGl0aW9uIHRvIG9uZSBvZiB0aGUgYWJvdmUgZGlyZWN0aXZlcywgYG9yaWdhbWlgXG4gKiBzaG91bGQgYmUgYWRkZWQgdG8gdGhlIGVsZW1lbnQgdG8gZGVub3RlIHRoYXQgdGhpcyB2YWx1ZSBhY2Nlc3NvciBzaG91bGRcbiAqIGNvbnRyb2wgaXQuXG4gKlxuICogRXhhbXBsZTogYDxwYXBlci1pbnB1dCBbKG5nTW9kZWwpXT1cInZhbHVlXCIgb3JpZ2FtaT48L3BhcGVyLWlucHV0PmBcbiAqXG4gKiBUaGUgY29ubmVjdGVkIGVsZW1lbnQgc2hvdWxkIGltcGxlbWVudCBvbmUgb2YgdGhlIGJlbG93XG4gKiBwcm9wZXJ0aWVzOlxuICpcbiAqIC0gYGNoZWNrZWRgIGFzIGEgYm9vbGVhbiBmb3IgY2hlY2tib3gtbGlrZSBlbGVtZW50cy5cbiAqIC0gYHNlbGVjdGVkYCBmb3Igc2luZ2xlIHNlbGVjdGFibGUgZWxlbWVudHMuIEl0IG11c3QgYmUgYW4gaW5kZXggb3Igc3RyaW5nXG4gKiAgIG5hbWUgYXR0cmlidXRlLlxuICogLSBgc2VsZWN0ZWRJdGVtYCBmb3Igc2luZ2xlIHNlbGVjdGFibGUgZWxlbWVudHMuIEl0IG1heSBiZSBhbnkgdHlwZS5cbiAqIC0gYHNlbGVjdGVkVmFsdWVzYCBmb3IgbXVsdGkgc2VsZWN0YWJsZSBlbGVtZW50cy4gSXQgbXVzdCBiZSBhbiBhcnJheSBvZlxuICogICBpbmRpY2VzIG9yIHN0cmluZyBuYW1lIGF0dHJpYnV0ZXMuXG4gKiAtIGBzZWxlY3RlZEl0ZW1zYCBmb3IgbXVsdGkgc2VsZWN0YWJsZSBlbGVtZW50cy4gSXQgbXVzdCBiZSBhbiBhcnJheSBvZiBhbnlcbiAqICAgdHlwZS5cbiAqIC0gYHZhbHVlYCBmb3IgYW55IGJhc2ljIGZvcm0gZWxlbWVudC4gSXQgbWF5IGJlIGFueSB0eXBlLlxuICpcbiAqIEZvciBzZWxlY3RhYmxlIGFuZCBtdWx0aSBzZWxlY3RhYmxlIGVsZW1lbnRzLCB0aGUgYXR0cmlidXRlIGB1c2VLZXlgIHNob3VsZFxuICogYmUgc3BlY2lmaWVkIGlmIHRoZSBjb250cm9sIGJpbmRpbmdzIGFuIGluZGV4IG9yIG5hbWUgdmFsdWUgdG8gdGhlIGVsZW1lbnRcbiAqIGluc3RlYWQgb2YgYW4gb2JqZWN0LlxuICpcbiAqIEFkZGl0aW9uYWxseSwgYW4gZWxlbWVudCBtYXkgaW1wbGVtZW50IG9uZSBvciBtb3JlIG9mIHRoZSBmb2xsb3dpbmdcbiAqIHByb3BlcnRpZXM6XG4gKlxuICogLSBgZGlzYWJsZWRgIGFzIGEgYm9vbGVhblxuICogLSBgaW52YWxpZGAgYXMgYSBib29sZWFuIHRvIGluZGljYXRlIHZhbGlkaXR5XG4gKiAtIGB2YWxpZGF0ZSgpYCBhcyBhIGZ1bmN0aW9uIHRvIHJ1biBjdXN0b20gdmFsaWRhdGlvblxuICpcbiAqIFRvIGxpc3RlbiBmb3IgY2hhbmdlcyB0byB0aGVzZSBldmVudHMsIGFuIGVsZW1lbnQgc2hvdWxkIGltcGxlbWVudCBvbmUgb3JcbiAqIG1vcmUgb2YgdGhlIGZvbGxvd2luZyBldmVudHMgdG8gbm90aWZ5IEFuZ3VsYXIgb2YgYW55IHVwZGF0ZXMuXG4gKlxuICogLSBgaW5wdXRgIC0gd2lsbCB1cGRhdGUgYW55IG9mIHRoZSBhYm92ZSBwcm9wZXJ0aWVzXG4gKiAtIGBibHVyYFxuICogLSBgY2hlY2tlZC1jaGFuZ2VkYFxuICogLSBgc2VsZWN0ZWQtY2hhbmdlZGBcbiAqIC0gYHNlbGVjdGVkLWl0ZW0tY2hhbmdlZGBcbiAqIC0gYHNlbGVjdGVkLXZhbHVlcy1jaGFuZ2VkYFxuICogLSBgc2VsZWN0ZWQtaXRlbXMtY2hhbmdlZGBcbiAqIC0gYHZhbHVlLWNoYW5nZWRgXG4gKiAtIGBpbnZhbGlkLWNoYW5nZWRgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAnW25nTW9kZWxdW29yaWdhbWldLFtmb3JtQ29udHJvbE5hbWVdW29yaWdhbWldLFtmb3JtQ29udHJvbF1bb3JpZ2FtaV0nLFxuICBwcm92aWRlcnM6IFtPUklHQU1JX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIE9yaWdhbWlDb250cm9sVmFsdWVBY2Nlc3NvciBleHRlbmRzIERlZmF1bHRWYWx1ZUFjY2Vzc29yXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIE92ZXJyaWRlcyB0aGUgbG9naWMgdG8gZGV0ZXJtaW5lIHdoYXQgdG8gc2V0IGFuIGVsZW1lbnQncyBgaW52YWxpZGBcbiAgICogcHJvcGVydHkgdG8gZ2l2ZW4gdGhlIHByb3ZpZGVkIGBBYnN0cmFjdENvbnRyb2xgLiBUaGUgZGVmYXVsdCBpcyB0byBzZXQgdGhlXG4gICAqIGVsZW1lbnQgYXMgYGludmFsaWRgIHdoZW5ldmVyIHRoZSBjb250cm9sIGlzIGJvdGggaW52YWxpZCBhbmQgZGlydHkuXG4gICAqL1xuICBASW5wdXQoKVxuICBpc0ludmFsaWQ/OiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKSA9PiBib29sZWFuO1xuICAvKipcbiAgICogVGhlIGtleSB0byB1c2Ugd2hlbiByZXBvcnRpbmcgdGhhdCBhbiBlbGVtZW50J3MgYHZhbGlkYXRlKClgIGZ1bmN0aW9uXG4gICAqIHJldHVybnMgZmFsc2UuIFdoZW4gdGhpcyBoYXBwZW5zLCB0aGUgY29udHJvbCdzIGBlcnJvcnNgIG9iamVjdCB3aWxsIGJlXG4gICAqIHNldCB3aXRoIHRoaXMga2V5IGFuZCBhIHZhbHVlIG9mIHRydWUuXG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IGtleSBpcyBcInZhbGlkYXRlXCIuXG4gICAqL1xuICBASW5wdXQoKVxuICB2YWxpZGF0aW9uRXJyb3JzS2V5ID0gJ3ZhbGlkYXRlJztcblxuICAvKipcbiAgICogVGhlIGBBYnN0cmFjdENvbnRyb2xgIGF0dGFjaGVkIHRvIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIGdldCBjb250cm9sKCk6IEFic3RyYWN0Q29udHJvbCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF0aGlzLl9jb250cm9sKSB7XG4gICAgICB0aGlzLl9jb250cm9sID0gKDxOZ0NvbnRyb2w+dGhpcy5pbmplY3Rvci5nZXQoTmdDb250cm9sKSkuY29udHJvbCE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBOZ0NvbnRyb2wncyBzdGF0dXNDaGFuZ2VzLlxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXR1c1N1Yj86IHsgdW5zdWJzY3JpYmUoKTogdm9pZCB9O1xuICAvKipcbiAgICogTW9zdCBjdXN0b20gZWxlbWVudHMgcHJvcGVydHkgd2lsbCBlbWl0IGEgYHByb3BlcnR5LWNoYW5nZWRgIGV2ZW50IHdoZW5cbiAgICogdGhlaXIgdmFsdWUgaXMgc2V0LiBUaGlzIGZsYWcgaW5mb3JtcyB0aGUgdmFsdWUgYWNjZXNzb3IgdG8gaWdub3JlIHRoZVxuICAgKiBuZXh0IGV2ZW50IHdoaWxlIGl0IGlzIGluIHRoZSBtaWRkbGUgb2Ygd3JpdGluZyBhIHZhbHVlLlxuICAgKi9cbiAgcHJpdmF0ZSBpc1dyaXRpbmdWYWx1ZSA9IGZhbHNlO1xuICAvKipcbiAgICogRmxhZyB0aGF0IGluZm9ybXMgdGhlIHZhbHVlIGFjY2Vzc29yIHRoYXQgaXQgaXMgY3VycmVudGx5IHVwZGF0aW5nIGFuXG4gICAqIGVsZW1lbnQgYW5kIHNob3VsZCBpZ25vcmUgYWRkaXRpb25hbCBgaW52YWxpZGAgcHJvcGVydHkgY2hhbmdlcyB1bnRpbCBpdCBpc1xuICAgKiBjb21wbGV0ZS5cbiAgICovXG4gIHByaXZhdGUgaWdub3JlSW52YWxpZENoYW5nZXMgPSBmYWxzZTtcbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0byB1c2UgdGhlIHZhbHVlIHByb3BlcnR5IG9yIGluZGV4IHByb3BlcnR5IGZvciBhXG4gICAqIHNlbGVjdCBvciBtdWxpdC1zZWxlY3QgZWxlbWVudC4gV2hlbiB1bmRlZmluZWQsIGl0IGluZGljYXRlcyB0aGF0IHRoZVxuICAgKiBkZXRlcm1pbmF0aW9uIG9mIHdoaWNoIHByb3BlcnR5IHRvIHVzZSBoYXMgbm90IG9jY3VycmVkIHlldC5cbiAgICovXG4gIHByaXZhdGUgdXNlU2VsZWN0YWJsZVZhbHVlUHJvcD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBDYWNoZWQgYGNvbnRyb2xgIHZhbHVlLlxuICAgKi9cbiAgcHJpdmF0ZSBfY29udHJvbDogQWJzdHJhY3RDb250cm9sIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFKVxuICAgIGNvbXBvc2l0aW9uTW9kZTogYm9vbGVhblxuICApIHtcbiAgICBzdXBlcihyZW5kZXJlciwgZWxlbWVudFJlZiwgY29tcG9zaXRpb25Nb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaWZlY3ljbGUgY2FsbGJhY2sgdGhhdCB3aWxsIGNvbm5lY3QgYW4gZWxlbWVudCdzIHZhbGlkYXRhYmxlIHByb3BlcnRpZXNcbiAgICogKGlmIHRoZXkgYXJlIGltcGxlbWVudGVkKSB0byB0aGUgQW5ndWxhciBjb250cm9sLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBpZiAodGhpcy5pc1ZhbGlkYXRhYmxlKGVsZW1lbnQpKSB7XG4gICAgICAvLyBUaGUgY29udHJvbCB3aWxsIGFsd2F5cyBiZSBzZXQgYnkgbmdBZnRlclZpZXdJbml0IGR1ZSB0byB0aGUgbmF0dXJlIG9mXG4gICAgICAvLyB0aGUgZGlyZWN0aXZlJ3Mgc2VsZWN0b3JzXG4gICAgICBjb25zdCBjb250cm9sID0gdGhpcy5jb250cm9sITtcbiAgICAgIC8vIEFsbG93cyBBbmd1bGFyIHZhbGlkYXRvcnMgdG8gdXBkYXRlIHRoZSBjdXN0b20gZWxlbWVudCdzIHZhbGlkaXR5XG4gICAgICB0aGlzLnN0YXR1c1N1YiA9IGNvbnRyb2wuc3RhdHVzQ2hhbmdlcyEuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmlzSW52YWxpZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGVsZW1lbnQuaW52YWxpZCA9IHRoaXMuaXNJbnZhbGlkKGNvbnRyb2wpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1lbnQuaW52YWxpZCA9ICEhY29udHJvbC5pbnZhbGlkICYmICEhY29udHJvbC5kaXJ0eTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEFsbG93cyBjdXN0b20gZWxlbWVudCB2YWxpZGF0ZSBmdW5jdGlvbiB0byB1cGRhdGUgQW5ndWxhciBjb250cm9sJ3NcbiAgICAgIC8vIHZhbGlkaXR5XG4gICAgICBpZiAodGhpcy5zaG91bGRVc2VWYWxpZGF0ZShlbGVtZW50KSkge1xuICAgICAgICBjb250cm9sLnNldFZhbGlkYXRvcnMoXG4gICAgICAgICAgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgICAgIGNvbnRyb2wudmFsaWRhdG9yLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudC52YWxpZGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgW3RoaXMudmFsaWRhdGlvbkVycm9yc0tleV06IHRydWUgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpZmVjeWNsZSBjYWxsYmFjayB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zLlxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3RhdHVzU3ViKSB7XG4gICAgICB0aGlzLnN0YXR1c1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZXMgYSB2YWx1ZSB0byBhIGN1c3RvbSBlbGVtZW50J3MgY29ycmVjdCB2YWx1ZSBwcm9wZXJ0eSwgYmFzZWQgb24gd2hhdFxuICAgKiBraW5kIG9mIGVsZW1lbnQgdGhlIGRpcmVjdGl2ZSBjb250cm9scy5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSB0byB3cml0ZVxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5pc1dyaXRpbmdWYWx1ZSA9IHRydWU7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGlmICh0aGlzLmlzTXVsdGlTZWxlY3RhYmxlKGVsZW1lbnQpIHx8IHRoaXMuaXNTZWxlY3RhYmxlKGVsZW1lbnQpKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0eSA9IHRoaXMuZ2V0U2VsZWN0YWJsZVByb3BlcnR5KGVsZW1lbnQsIHZhbHVlKTtcbiAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAoPGFueT5lbGVtZW50KVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNDaGVja2VkRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgZWxlbWVudC5jaGVja2VkID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLndyaXRlVmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuaXNXcml0aW5nVmFsdWUgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gZm9yIGN1c3RvbSBlbGVtZW50IGV2ZW50cyBhbmQgbm90aWZ5IEFuZ3VsYXIgb2YgYW55IGNoYW5nZXMuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCB0aGUgY2hhbmdlIGV2ZW50XG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdzZWxlY3RlZC1pdGVtcy1jaGFuZ2VkJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0ZWQtaXRlbS1jaGFuZ2VkJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignc2VsZWN0ZWQtdmFsdWVzLWNoYW5nZWQnLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCdzZWxlY3RlZC1jaGFuZ2VkJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignY2hlY2tlZC1jaGFuZ2VkJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcigndmFsdWUtY2hhbmdlZCcsIFsnJGV2ZW50J10pXG4gIG9uQ2hhbmdlZEV2ZW50KGV2ZW50OiBFdmVudCkge1xuICAgIGlmICghdGhpcy5pc1dyaXRpbmdWYWx1ZSkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICBjYXNlICdzZWxlY3RlZC1pdGVtcy1jaGFuZ2VkJzpcbiAgICAgICAgY2FzZSAnc2VsZWN0ZWQtaXRlbS1jaGFuZ2VkJzoge1xuICAgICAgICAgIGNvbnN0IHByb3BlcnR5ID0gdGhpcy5nZXRTZWxlY3RhYmxlUHJvcGVydHkoZWxlbWVudCk7XG4gICAgICAgICAgY2hhbmdlZCA9IHByb3BlcnR5ID09PSAnc2VsZWN0ZWRJdGVtcycgfHwgcHJvcGVydHkgPT09ICdzZWxlY3RlZEl0ZW0nO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3NlbGVjdGVkLXZhbHVlcy1jaGFuZ2VkJzpcbiAgICAgICAgY2FzZSAnc2VsZWN0ZWQtY2hhbmdlZCc6IHtcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHRoaXMuZ2V0U2VsZWN0YWJsZVByb3BlcnR5KGVsZW1lbnQpO1xuICAgICAgICAgIGNoYW5nZWQgPSBwcm9wZXJ0eSA9PT0gJ3NlbGVjdGVkVmFsdWVzJyB8fCBwcm9wZXJ0eSA9PT0gJ3NlbGVjdGVkJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICBsZXQgcHJvcGVydHk6IHN0cmluZztcbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aVNlbGVjdGFibGUoZWxlbWVudCkgfHwgdGhpcy5pc1NlbGVjdGFibGUoZWxlbWVudCkpIHtcbiAgICAgICAgICAvLyBwcm9wZXJ0eSB3aWxsIGJlIGRlZmluZWQgaWYgd2UgcmVhY2ggdGhpcyBzaW5jZSBjaGFuZ2VkIGNhbiBvbmx5XG4gICAgICAgICAgLy8gYmUgdHJ1ZSBpZiB0aGUgcHJvcGVydHkgaXMgZGVmaW5lZCBmb3Igc2VsZWN0YWJsZSBlbGVtZW50c1xuICAgICAgICAgIHByb3BlcnR5ID0gdGhpcy5nZXRTZWxlY3RhYmxlUHJvcGVydHkoZWxlbWVudCkhO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNDaGVja2VkRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgICAgIHByb3BlcnR5ID0gJ2NoZWNrZWQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BlcnR5ID0gJ3ZhbHVlJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvbid0IHVzZSBgZXZlbnQuZGV0YWlsLnZhbHVlYCwgc2luY2Ugd2UgY2Fubm90IGFzc3VtZSB0aGF0IGFsbFxuICAgICAgICAvLyBjaGFuZ2UgZXZlbnRzIHdpbGwgcHJvdmlkZSB0aGF0LiBBZGRpdGlvbmFsbHksIHNvbWUgZXZlbnQgZGV0YWlsc1xuICAgICAgICAvLyBtYXkgYmUgc3BsaWNlcyBvZiBhbiBhcnJheSBvciBvYmplY3QgaW5zdGVhZCBvZiB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICAgICAgdGhpcy5vbkNoYW5nZShlbGVtZW50W3Byb3BlcnR5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbiBmb3IgYGludmFsaWRgIHByb3BlcnR5IGNoYW5nZXMuIFNvbWUgZWxlbWVudHMsIHN1Y2ggYXNcbiAgICogYDx2YWFkaW4tZGF0ZS1waWNrZXI+YCBoYXZlIG11bHRpcGxlIFwidmFsdWVzXCIuIFNldHRpbmcgdGhlIHByaW1hcnkgdmFsdWVcbiAgICogKGV4LiB0aGUgZGF0ZSBzdHJpbmcpIG1heSByZXN1bHQgaW4gYSB0ZW1wb3JhcmlseSBpbnZhbGlkIGVsZW1lbnQgdW50aWxcbiAgICogc3Vic2VxdWVudCB2YWx1ZXMgKGV4LiB0aGUgc2VsZWN0ZWQgZGF0ZSkgaGF2ZSBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIFNpbmNlIHRoaXMgdmFsdWUgYWNjZXNzb3Igb25seSBsaXN0ZW5zIGZvciB2YWx1ZSBjaGFuZ2VzLCBpdCBtYXkgbm90IGJlXG4gICAqIG5vdGlmaWVkIG9mIHRoZSBjaGFuZ2UgaW4gdmFsaWRpdHkuIFRoaXMgbGlzdGVuZXIgd2lsbCBsaXN0ZW4gZm9yIGFueVxuICAgKiBleHBsaWNpdHkgdmFsaWRpdHkgY2hhbmdlcyBmcm9tIHRoZSBlbGVtZW50IGFuZCByZS1ldmFsdWF0ZSBhIGNvbnRyb2wnc1xuICAgKiB2YWxpZGl0eSBpZiBpdCBhbmQgdGhlIGVsZW1lbnQncyB2YWxpZGl0eSBhcmUgb3V0IG9mIHN5bmMuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdpbnZhbGlkLWNoYW5nZWQnKVxuICBvbkludmFsaWRDaGFuZ2VkKCkge1xuICAgIGlmICghdGhpcy5pZ25vcmVJbnZhbGlkQ2hhbmdlcykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmlzVmFsaWRhdGFibGUoZWxlbWVudCkgJiZcbiAgICAgICAgdGhpcy5jb250cm9sICYmXG4gICAgICAgIHRoaXMuY29udHJvbC5pbnZhbGlkICE9PSBlbGVtZW50LmludmFsaWRcbiAgICAgICkge1xuICAgICAgICB0aGlzLmlnbm9yZUludmFsaWRDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgdGhpcy5pZ25vcmVJbnZhbGlkQ2hhbmdlcyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGFuIGVsZW1lbnQgaXMgY2hlY2tib3gtbGlrZS5cbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gY2hlY2tcbiAgICovXG4gIGlzQ2hlY2tlZEVsZW1lbnQoZWxlbWVudDogYW55KTogZWxlbWVudCBpcyBDaGVja2VkRWxlbWVudExpa2Uge1xuICAgIHJldHVybiB0aGlzLmlzUHJvcGVydHlEZWZpbmVkKGVsZW1lbnQsICdjaGVja2VkJyk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCBhbiBlbGVtZW50IGlzIHNlbGVjdGFibGUtbGlrZS5cbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gY2hlY2tcbiAgICovXG4gIGlzU2VsZWN0YWJsZShlbGVtZW50OiBhbnkpOiBlbGVtZW50IGlzIFNlbGVjdGFibGVMaWtlIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5pc1Byb3BlcnR5RGVmaW5lZChlbGVtZW50LCAnc2VsZWN0ZWQnKSB8fFxuICAgICAgdGhpcy5pc1Byb3BlcnR5RGVmaW5lZChlbGVtZW50LCAnc2VsZWN0ZWRJdGVtJylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgYW4gZWxlbWVudCBpcyBtdWx0aSBzZWxlY3RhYmxlLWxpa2UuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIGNoZWNrXG4gICAqL1xuICBpc011bHRpU2VsZWN0YWJsZShlbGVtZW50OiBhbnkpOiBlbGVtZW50IGlzIE11bHRpU2VsZWN0YWJsZUxpa2Uge1xuICAgIGlmIChcbiAgICAgIGVsZW1lbnQgJiZcbiAgICAgICh0aGlzLmlzUHJvcGVydHlEZWZpbmVkKGVsZW1lbnQsICdzZWxlY3RlZFZhbHVlcycpIHx8XG4gICAgICAgIHRoaXMuaXNQcm9wZXJ0eURlZmluZWQoZWxlbWVudCwgJ3NlbGVjdGVkSXRlbXMnKSlcbiAgICApIHtcbiAgICAgIHJldHVybiB0aGlzLmlzU2VsZWN0YWJsZShlbGVtZW50KSA/IGVsZW1lbnQubXVsdGkgPT09IHRydWUgOiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgYW4gZWxlbWVudCBpcyB2YWxpZGF0YWJsZS1saWtlLlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudCB0aGUgZWxlbWVudCB0byBjaGVja1xuICAgKi9cbiAgaXNWYWxpZGF0YWJsZShlbGVtZW50OiBhbnkpOiBlbGVtZW50IGlzIFZhbGlkYXRhYmxlTGlrZSB7XG4gICAgcmV0dXJuIHRoaXMuaXNQcm9wZXJ0eURlZmluZWQoZWxlbWVudCwgJ2ludmFsaWQnKTtcbiAgfVxuXG4gIHNob3VsZFVzZVZhbGlkYXRlKGVsZW1lbnQ6IGFueSk6IGVsZW1lbnQgaXMgeyB2YWxpZGF0ZSgpOiBib29sZWFuIH0ge1xuICAgIGlmICh0eXBlb2YgZWxlbWVudC52YWxpZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gU29tZSBlbGVtZW50J3MgKHN1Y2ggYXMgYDx2YWFkaW4tdGV4dC1maWVsZD5gKSBtYXkgbm90IGFjdHVhbGx5IG11dGF0ZVxuICAgICAgLy8gdGhlIGBpbnZhbGlkYCBwcm9wZXJ0eSB3aGVuIGB2YWxpZGF0ZSgpYCBpcyBjYWxsZWQuIEluIHRoZXNlXG4gICAgICAvLyBzaXR1YXRpb25zLCBpdCdzIHBvc3NpYmxlIGZvciBBbmd1bGFyIHRvIHNldCBhbiBlbGVtZW50IGFzIGludmFsaWQgYW5kXG4gICAgICAvLyBuZXZlciBiZSBhYmxlIHRvIHJlY292ZXIgc2luY2UgdGhlIGVsZW1lbnQncyBgdmFsaWRhdGUoKWAgd2lsbCBhbHdheXNcbiAgICAgIC8vIHJlcG9ydCBpdCBpcyBpbnZhbGlkLlxuICAgICAgLy9cbiAgICAgIC8vIEluIHRoZXNlIHNpdHVhdGlvbnMsIE9yaWdhbWkgc2hvdWxkIGlnbm9yZSB0aGUgZWxlbWVudCdzIHZhbGlkYXRlKClcbiAgICAgIC8vIGZ1bmN0aW9uLlxuICAgICAgdGhpcy5pZ25vcmVJbnZhbGlkQ2hhbmdlcyA9IHRydWU7XG4gICAgICBjb25zdCB3YXNJbnZhbGlkID0gZWxlbWVudC5pbnZhbGlkO1xuICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgZG9lcyBtdXRhdGUgYGludmFsaWRgLCBhc2sgaXQgdG8gZG8gc28gZmlyc3QgdG8gZ2V0IGFcbiAgICAgIC8vIGJhc2VsaW5lLlxuICAgICAgZWxlbWVudC52YWxpZGF0ZSgpO1xuICAgICAgLy8gV2hlbiBgdmFsaWRhdGUoKWAgaXMgY2FsbGVkIG5leHQsIHdlIHdpbGwga25vdyBpZiB0aGUgZWxlbWVudCBtdXRhdGVzXG4gICAgICAvLyBgaW52YWxpZGAgaWYgdGhlIGV4cGVjdGVkIHZhbHVlIG1hdGNoZXMgYGludmFsaWRgIGFmdGVyIGNoYW5naW5nXG4gICAgICAvLyBgaW52YWxpZGAgdG8gc29tZXRoaW5nIGVsc2UuXG4gICAgICBjb25zdCBleHBlY3RlZCA9IGVsZW1lbnQuaW52YWxpZDtcbiAgICAgIGVsZW1lbnQuaW52YWxpZCA9ICFlbGVtZW50LmludmFsaWQ7XG4gICAgICBlbGVtZW50LnZhbGlkYXRlKCk7XG4gICAgICBjb25zdCB2YWxpZGF0ZU11dGF0ZXNJbnZhbGlkID0gZWxlbWVudC5pbnZhbGlkID09PSBleHBlY3RlZDtcbiAgICAgIGVsZW1lbnQuaW52YWxpZCA9IHdhc0ludmFsaWQ7XG4gICAgICB0aGlzLmlnbm9yZUludmFsaWRDaGFuZ2VzID0gZmFsc2U7XG4gICAgICByZXR1cm4gdmFsaWRhdGVNdXRhdGVzSW52YWxpZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGEgcHJvcGVydHkgaXMgZGVmaW5lZCBhbnl3aGVyZSBpbiB0aGUgcHJvdmlkZWRcbiAgICogZWxlbWVudCdzIHByb3RvdHlwZSBjaGFpbi5cbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gY2hlY2tcbiAgICogQHBhcmFtIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSB0byBjaGVjayBmb3JcbiAgICovXG4gIHByaXZhdGUgaXNQcm9wZXJ0eURlZmluZWQoZWxlbWVudDogYW55LCBwcm9wZXJ0eTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhZWxlbWVudCAmJiBwcm9wZXJ0eSBpbiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgcHJvcGVydHkgbmFtZSBvZiB0aGUgc2VsZWN0YWJsZSBvciBtdWx0aS1zZWxlY3RhYmxlIGVsZW1lbnRcbiAgICogdGhhdCBzaG91bGQgYmUgdXBkYXRlZC4gVGhpcyBtZXRob2Qgd2lsbCB1c2UgZGVmaW5lZCBwcm9wZXJ0aWVzIGFuZCB0aGVcbiAgICogdmFsdWUgdHlwZSB0byBkZXRlcm1pbmUgd2hpY2ggcHJvcGVydHkgc2hvdWxkIGJlIHVzZWQuIElmIGl0IGNhbm5vdFxuICAgKiBkZXRlcm1pbmUgd2hpY2ggcHJvcGVydHkgdG8gdXNlLCBpdCB3aWxsIHJldHVybiB1bmRlZmluZWQuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIGdldCB0aGUgcHJvcGVydHkgZm9yXG4gICAqIEBwYXJhbSB2YWx1ZSBhIHZhbHVlIGZvciB0aGUgZWxlbWVudCdzIHByb3BlcnR5XG4gICAqIEByZXR1cm5zIHRoZSBwcm9wZXJ0eSBuYW1lLCBvciB1bmRlZmluZWQgaWYgaXQgY2Fubm90IGJlIGRldGVybWluZWRcbiAgICovXG4gIHByaXZhdGUgZ2V0U2VsZWN0YWJsZVByb3BlcnR5KGVsZW1lbnQ6IGFueSwgdmFsdWU/OiBhbnkpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGlzTXVsdGkgPSB0aGlzLmlzTXVsdGlTZWxlY3RhYmxlKGVsZW1lbnQpO1xuICAgIGNvbnN0IHZhbHVlUHJvcCA9IGlzTXVsdGkgPyAnc2VsZWN0ZWRJdGVtcycgOiAnc2VsZWN0ZWRJdGVtJztcbiAgICBjb25zdCBpbmRleFByb3AgPSBpc011bHRpID8gJ3NlbGVjdGVkVmFsdWVzJyA6ICdzZWxlY3RlZCc7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnVzZVNlbGVjdGFibGVWYWx1ZVByb3AgIT09ICdib29sZWFuJykge1xuICAgICAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgd2Ugc2hvdWxkIGJlIHNldHRpbmcgdGhlIGluZGV4IG9yIHZhbHVlIHByb3BlcnR5IGZvclxuICAgICAgLy8gYSBzZWxlY3RhYmxlIGVsZW1lbnRcbiAgICAgIGNvbnN0IGhhc1ZhbHVlUHJvcCA9IHZhbHVlUHJvcCBpbiBlbGVtZW50O1xuICAgICAgY29uc3QgaGFzSW5kZXhQcm9wID0gaW5kZXhQcm9wIGluIGVsZW1lbnQ7XG4gICAgICBpZiAoaGFzVmFsdWVQcm9wICYmICFoYXNJbmRleFByb3ApIHtcbiAgICAgICAgdGhpcy51c2VTZWxlY3RhYmxlVmFsdWVQcm9wID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoIWhhc1ZhbHVlUHJvcCAmJiBoYXNJbmRleFByb3ApIHtcbiAgICAgICAgdGhpcy51c2VTZWxlY3RhYmxlVmFsdWVQcm9wID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IGVsZW1lbnRbdmFsdWVQcm9wXTtcbiAgICAgICAgLy8gV2hlbiB0aGUgZWxlbWVudCBoYXMgYm90aCBwcm9wZXJ0aWVzLCB0cnkgdG8gc2V0IGl0IHRvIHRoZSB2YWx1ZVxuICAgICAgICAvLyBwcm9wZXJ0eSBmaXJzdC4gSWYgaXQgZmFpbHMsIHRoZW4gdXNlIHRoZSBpbmRleCBwcm9wZXJ0eVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGVsZW1lbnRbdmFsdWVQcm9wXSA9IHZhbHVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIC8vIENvdWxkIHRocm93IGlmIHRoZSB2YWx1ZSBpcyBhbiB1bmV4cGVjdGVkIHR5cGVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgdmFsdWUgd2Ugc2V0IGl0IHRvIGlzIHN0aWxsIGFjY3VyYXRlLiBJZiBpdCdzXG4gICAgICAgIC8vIG5vdCB0aGVuIHRoZSBlbGVtZW50IHNpbGVudGx5IHJlamVjdGVkIHRoZSBuZXcgdmFsdWUuXG4gICAgICAgIHRoaXMudXNlU2VsZWN0YWJsZVZhbHVlUHJvcCA9IGVsZW1lbnRbdmFsdWVQcm9wXSA9PT0gdmFsdWU7XG4gICAgICAgIGVsZW1lbnRbdmFsdWVQcm9wXSA9IHByZXZpb3VzVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlbGVtZW50Lml0ZW1WYWx1ZVBhdGgpIHtcbiAgICAgIC8vIDx2YWFkaW4tY29tYm8tYm94PiB3aWxsIHdhbnQgdG8gdXNlIHNlbGVjdGVkSXRlbSBmb3Igb2JqZWN0IHZhbHVlcy5cbiAgICAgIC8vIEhvd2V2ZXIsIGlmIGBpdGVtVmFsdWVQYXRoYCBpcyBzZXQgdGhlbiB0aGUgY29udHJvbCB2YWx1ZSBpcyBub3QgdGhlXG4gICAgICAvLyBpdGVtIGl0c2VsZiwgYnV0IHRoZSBgdmFsdWVgIHByb3BlcnR5LlxuICAgICAgcmV0dXJuICd2YWx1ZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnVzZVNlbGVjdGFibGVWYWx1ZVByb3AgPyB2YWx1ZVByb3AgOiBpbmRleFByb3A7XG4gICAgfVxuICB9XG59XG4iXX0=