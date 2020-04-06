(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ngx-origami/forms', ['exports', '@angular/core', '@angular/forms'], factory) :
    (global = global || self, factory((global['ngx-origami'] = global['ngx-origami'] || {}, global['ngx-origami'].forms = {}), global.ng.core, global.ng.forms));
}(this, (function (exports, core, forms) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * OrigamiControlValueAccessor provider.
     */
    var ORIGAMI_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return OrigamiControlValueAccessor; }),
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
                    this._control = this.injector.get(forms.NgControl).control;
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
                    control_1.setValidators(forms.Validators.compose([
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
            { type: core.ElementRef },
            { type: core.Injector },
            { type: core.Renderer2 },
            { type: Boolean, decorators: [{ type: core.Optional }, { type: core.Inject, args: [forms.COMPOSITION_BUFFER_MODE,] }] }
        ]; };
        __decorate([
            core.Input()
        ], OrigamiControlValueAccessor.prototype, "isInvalid", void 0);
        __decorate([
            core.Input()
        ], OrigamiControlValueAccessor.prototype, "validationErrorsKey", void 0);
        __decorate([
            core.HostListener('selected-items-changed', ['$event']),
            core.HostListener('selected-item-changed', ['$event']),
            core.HostListener('selected-values-changed', ['$event']),
            core.HostListener('selected-changed', ['$event']),
            core.HostListener('checked-changed', ['$event']),
            core.HostListener('value-changed', ['$event'])
        ], OrigamiControlValueAccessor.prototype, "onChangedEvent", null);
        __decorate([
            core.HostListener('invalid-changed')
        ], OrigamiControlValueAccessor.prototype, "onInvalidChanged", null);
        OrigamiControlValueAccessor = __decorate([
            core.Directive({
                selector: '[ngModel][origami],[formControlName][origami],[formControl][origami]',
                providers: [ORIGAMI_CONTROL_VALUE_ACCESSOR]
            }),
            __param(3, core.Optional()),
            __param(3, core.Inject(forms.COMPOSITION_BUFFER_MODE))
        ], OrigamiControlValueAccessor);
        return OrigamiControlValueAccessor;
    }(forms.DefaultValueAccessor));

    /**
     * Provides support for template and reactive Angular form directives and
     * custom elements.
     */
    var OrigamiFormsModule = /** @class */ (function () {
        function OrigamiFormsModule() {
        }
        OrigamiFormsModule = __decorate([
            core.NgModule({
                declarations: [OrigamiControlValueAccessor],
                exports: [OrigamiControlValueAccessor]
            })
        ], OrigamiFormsModule);
        return OrigamiFormsModule;
    }());

    exports.ORIGAMI_CONTROL_VALUE_ACCESSOR = ORIGAMI_CONTROL_VALUE_ACCESSOR;
    exports.OrigamiControlValueAccessor = OrigamiControlValueAccessor;
    exports.OrigamiFormsModule = OrigamiFormsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=origami-forms.umd.js.map
