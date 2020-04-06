import { AfterViewInit, ElementRef, Injector, OnDestroy, Provider, Renderer2 } from '@angular/core';
import { DefaultValueAccessor, AbstractControl } from '@angular/forms';
/**
 * An interface for determining if an element is a checkbox.
 */
export interface CheckedElementLike {
    checked?: boolean;
}
/**
 * An interface for determining if an element is selectable.
 */
export interface SelectableLike {
    multi?: boolean;
    selected?: string | number;
    selectedItem?: any;
}
/**
 * An interface for determining if an element is multi selectable.
 */
export interface MultiSelectableLike {
    multi?: boolean;
    selectedValues?: Array<string | number>;
    selectedItems?: any[];
}
/**
 * An interface for determining if an element is validatable.
 */
export interface ValidatableLike {
    invalid?: boolean;
    validate?(): void;
}
/**
 * OrigamiControlValueAccessor provider.
 */
export declare const ORIGAMI_CONTROL_VALUE_ACCESSOR: Provider;
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
export declare class OrigamiControlValueAccessor extends DefaultValueAccessor implements AfterViewInit, OnDestroy {
    elementRef: ElementRef;
    protected injector: Injector;
    protected renderer: Renderer2;
    /**
     * Overrides the logic to determine what to set an element's `invalid`
     * property to given the provided `AbstractControl`. The default is to set the
     * element as `invalid` whenever the control is both invalid and dirty.
     */
    isInvalid?: (control: AbstractControl) => boolean;
    /**
     * The key to use when reporting that an element's `validate()` function
     * returns false. When this happens, the control's `errors` object will be
     * set with this key and a value of true.
     *
     * The default key is "validate".
     */
    validationErrorsKey: string;
    /**
     * The `AbstractControl` attached to this element.
     */
    get control(): AbstractControl | undefined;
    /**
     * Subscription to the NgControl's statusChanges.
     */
    protected statusSub?: {
        unsubscribe(): void;
    };
    /**
     * Most custom elements property will emit a `property-changed` event when
     * their value is set. This flag informs the value accessor to ignore the
     * next event while it is in the middle of writing a value.
     */
    private isWritingValue;
    /**
     * Flag that informs the value accessor that it is currently updating an
     * element and should ignore additional `invalid` property changes until it is
     * complete.
     */
    private ignoreInvalidChanges;
    /**
     * Indicates whether or not to use the value property or index property for a
     * select or mulit-select element. When undefined, it indicates that the
     * determination of which property to use has not occurred yet.
     */
    private useSelectableValueProp?;
    /**
     * Cached `control` value.
     */
    private _control;
    constructor(elementRef: ElementRef, injector: Injector, renderer: Renderer2, compositionMode: boolean);
    /**
     * Lifecycle callback that will connect an element's validatable properties
     * (if they are implemented) to the Angular control.
     */
    ngAfterViewInit(): void;
    /**
     * Lifecycle callback to clean up subscriptions.
     */
    ngOnDestroy(): void;
    /**
     * Writes a value to a custom element's correct value property, based on what
     * kind of element the directive controls.
     *
     * @param value the value to write
     */
    writeValue(value: any): void;
    /**
     * Listen for custom element events and notify Angular of any changes.
     *
     * @param event the change event
     */
    onChangedEvent(event: Event): void;
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
    onInvalidChanged(): void;
    /**
     * Determines whether or not an element is checkbox-like.
     *
     * @param element the element to check
     */
    isCheckedElement(element: any): element is CheckedElementLike;
    /**
     * Determines whether or not an element is selectable-like.
     *
     * @param element the element to check
     */
    isSelectable(element: any): element is SelectableLike;
    /**
     * Determines whether or not an element is multi selectable-like.
     *
     * @param element the element to check
     */
    isMultiSelectable(element: any): element is MultiSelectableLike;
    /**
     * Determines whether or not an element is validatable-like.
     *
     * @param element the element to check
     */
    isValidatable(element: any): element is ValidatableLike;
    shouldUseValidate(element: any): element is {
        validate(): boolean;
    };
    /**
     * Determines whether or not a property is defined anywhere in the provided
     * element's prototype chain.
     *
     * @param element the element to check
     * @param property the property to check for
     */
    private isPropertyDefined;
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
    private getSelectableProperty;
}
