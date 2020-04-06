import { __extends, __decorate, __param } from 'tslib';
import { forwardRef, ElementRef, Injector, Renderer2, Optional, Inject, Input, HostListener, Directive, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl, Validators, COMPOSITION_BUFFER_MODE, DefaultValueAccessor } from '@angular/forms';

/**
 * OrigamiControlValueAccessor provider.
 */
var ORIGAMI_CONTROL_VALUE_ACCESSOR = {
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

/**
 * Provides support for template and reactive Angular form directives and
 * custom elements.
 */
var OrigamiFormsModule = /** @class */ (function () {
    function OrigamiFormsModule() {
    }
    OrigamiFormsModule = __decorate([
        NgModule({
            declarations: [OrigamiControlValueAccessor],
            exports: [OrigamiControlValueAccessor]
        })
    ], OrigamiFormsModule);
    return OrigamiFormsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ORIGAMI_CONTROL_VALUE_ACCESSOR, OrigamiControlValueAccessor, OrigamiFormsModule };
//# sourceMappingURL=origami-forms.js.map
