import { __awaiter, __decorate, __generator, __param } from "tslib";
import { Directive, ElementRef, Inject, Optional, NgZone } from '@angular/core';
import { whenSet, wrapAndDefineDescriptor } from '@codebakery/origami/util';
import { camelToDashCase } from '@polymer/polymer/lib/utils/case-map';
import { POLYMER_HOST } from './polymerHost';
/**
 * This directive is attached to each `<template>` element. If a Polymer host
 * component is provided, this directive will enable Polymer's event and
 * two-way binding syntax styles.
 */
var TemplateDirective = /** @class */ (function () {
    function TemplateDirective(elementRef, polymerHost, zone) {
        var _this = this;
        this.elementRef = elementRef;
        this.polymerHost = polymerHost;
        this.zone = zone;
        this.ready = (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.polymerHost) return [3 /*break*/, 2];
                        this.enableEventBindings(elementRef.nativeElement);
                        return [4 /*yield*/, this.enablePropertyBindings(elementRef.nativeElement)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); })();
    }
    /**
     * Enables the use of Polymer event bindings. An event binding is declared
     * with the syntax `on-event-name="handler"`, where `event-name` is the
     * name of the event to listen to and `handler` is the name of the host's
     * method to call when the event is dispatched.
     *
     * @param template the Polymer template to enable event binding syntax for
     */
    TemplateDirective.prototype.enableEventBindings = function (template) {
        // When templatize looks for a PropertyEffects host, it will use the
        // template's __dataHost property. This is the _methodHost for a template
        // instance and is used to add event listener bindings.
        template.__dataHost = this.polymerHost;
    };
    /**
     * Enables the use of Polymer property bindings. A property binding is
     * declared either as a one-way binding `value="[[propName]]"` or a two-way
     * binding `value="{{propName}}"`.
     *
     * @param template the Polymer template to enable data binding syntax for
     */
    TemplateDirective.prototype.enablePropertyBindings = function (template) {
        return __awaiter(this, void 0, void 0, function () {
            var hostProps, _loop_1, this_1, prop;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTemplateInfo(template)];
                    case 1:
                        hostProps = (_a.sent()).hostProps;
                        if (hostProps) {
                            _loop_1 = function (prop) {
                                // Angular -> Polymer (one-way bindings)
                                var initialValue = this_1.polymerHost[prop];
                                wrapAndDefineDescriptor(this_1.polymerHost, prop, {
                                    afterSet: function (changed, value) {
                                        if (changed) {
                                            template["_host_" + prop] = value;
                                        }
                                    }
                                });
                                this_1.polymerHost[prop] = initialValue;
                                // Polymer -> Angular (two-way bindings)
                                var eventName = "_host_" + camelToDashCase(prop) + "-changed";
                                template.addEventListener(eventName, function (event) {
                                    if (!_this.isSplicesChange(event) &&
                                        !_this.isPathChange(event)) {
                                        _this.zone.run(function () {
                                            _this.polymerHost[prop] = event.detail.value;
                                        });
                                    }
                                });
                            };
                            this_1 = this;
                            for (prop in hostProps) {
                                _loop_1(prop);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves the template info metadata for a Polymer template.
     *
     * @param template the Polymer template to retrieve template info for
     * @returns a Promise that resolves with the template's info
     */
    TemplateDirective.prototype.getTemplateInfo = function (template) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!template._templateInfo) return [3 /*break*/, 1];
                        return [2 /*return*/, template._templateInfo];
                    case 1: return [4 /*yield*/, whenSet(template, '_templateInfo')];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Indicates whether or not an event is a "splices" Polymer change event,
     * which has a detail value object that dictates what elements were changed if
     * the array reference remains the same.
     *
     * @param event the event to check
     * @returns true if the event is a splices change event
     */
    TemplateDirective.prototype.isSplicesChange = function (event) {
        var value = event.detail.value;
        return value && Array.isArray(value.indexSplices);
    };
    /**
     * Indicates whether or not an event is a path Polymer change event, which
     * has a detail path property indicating the path of the value changed, and a
     * value of the path's value. This is used when an array or object reference
     * remains the same.
     *
     * @param event the event to check
     * @returns true if the event is a path change event
     */
    TemplateDirective.prototype.isPathChange = function (event) {
        return typeof event.detail.path === 'string';
    };
    TemplateDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [POLYMER_HOST,] }, { type: Optional }] },
        { type: NgZone }
    ]; };
    TemplateDirective = __decorate([
        Directive({
            selector: 'template'
        }),
        __param(1, Inject(POLYMER_HOST)),
        __param(1, Optional())
    ], TemplateDirective);
    return TemplateDirective;
}());
export { TemplateDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvZGViYWtlcnkvb3JpZ2FtaS90ZW1wbGF0ZXMvIiwic291cmNlcyI6WyJzcmMvdGVtcGxhdGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRXRFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFzQjdDOzs7O0dBSUc7QUFJSDtJQUdFLDJCQUNTLFVBQXNCLEVBR3RCLFdBQWdCLEVBQ2YsSUFBWTtRQUx0QixpQkFhQztRQVpRLGVBQVUsR0FBVixVQUFVLENBQVk7UUFHdEIsZ0JBQVcsR0FBWCxXQUFXLENBQUs7UUFDZixTQUFJLEdBQUosSUFBSSxDQUFRO1FBRXBCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQzs7Ozs2QkFDUixJQUFJLENBQUMsV0FBVyxFQUFoQix3QkFBZ0I7d0JBQ2xCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ25ELHFCQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUE7O3dCQUEzRCxTQUEyRCxDQUFDOzs7OzthQUUvRCxDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsK0NBQW1CLEdBQW5CLFVBQW9CLFFBQXlCO1FBQzNDLG9FQUFvRTtRQUNwRSx5RUFBeUU7UUFDekUsdURBQXVEO1FBQ3ZELFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0csa0RBQXNCLEdBQTVCLFVBQTZCLFFBQXlCOzs7Ozs7NEJBQzlCLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUE7O3dCQUFsRCxTQUFTLEdBQUssQ0FBQSxTQUFvQyxDQUFBLFVBQXpDO3dCQUNqQixJQUFJLFNBQVMsRUFBRTtnREFDSixJQUFJO2dDQUNYLHdDQUF3QztnQ0FDeEMsSUFBTSxZQUFZLEdBQUcsT0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQzVDLHVCQUF1QixDQUFDLE9BQUssV0FBVyxFQUFFLElBQUksRUFBRTtvQ0FDOUMsUUFBUSxFQUFSLFVBQVMsT0FBZ0IsRUFBRSxLQUFVO3dDQUNuQyxJQUFJLE9BQU8sRUFBRTs0Q0FDWCxRQUFRLENBQUMsV0FBUyxJQUFNLENBQUMsR0FBRyxLQUFLLENBQUM7eUNBQ25DO29DQUNILENBQUM7aUNBQ0YsQ0FBQyxDQUFDO2dDQUVILE9BQUssV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQztnQ0FFdEMsd0NBQXdDO2dDQUN4QyxJQUFNLFNBQVMsR0FBRyxXQUFTLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBVSxDQUFDO2dDQUMzRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUEsS0FBSztvQ0FDeEMsSUFDRSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQWMsS0FBSyxDQUFDO3dDQUN6QyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQWMsS0FBSyxDQUFDLEVBQ3RDO3dDQUNBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzRDQUNaLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQWlCLEtBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO3dDQUM3RCxDQUFDLENBQUMsQ0FBQztxQ0FDSjtnQ0FDSCxDQUFDLENBQUMsQ0FBQzs7OzRCQXhCTCxLQUFTLElBQUksSUFBSSxTQUFTO3dDQUFqQixJQUFJOzZCQXlCWjt5QkFDRjs7Ozs7S0FDRjtJQUVEOzs7OztPQUtHO0lBQ0csMkNBQWUsR0FBckIsVUFBc0IsUUFBeUI7Ozs7OzZCQUN6QyxRQUFRLENBQUMsYUFBYSxFQUF0Qix3QkFBc0I7d0JBQ3hCLHNCQUFPLFFBQVEsQ0FBQyxhQUFhLEVBQUM7NEJBRXZCLHFCQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLEVBQUE7NEJBQS9DLHNCQUFPLFNBQXdDLEVBQUM7Ozs7S0FFbkQ7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssMkNBQWUsR0FBdkIsVUFBd0IsS0FBa0I7UUFDeEMsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakMsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ssd0NBQVksR0FBcEIsVUFBcUIsS0FBa0I7UUFDckMsT0FBTyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQztJQUMvQyxDQUFDOztnQkExR29CLFVBQVU7Z0RBQzVCLE1BQU0sU0FBQyxZQUFZLGNBQ25CLFFBQVE7Z0JBRUssTUFBTTs7SUFSWCxpQkFBaUI7UUFIN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7U0FDckIsQ0FBQztRQU1HLFdBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3BCLFdBQUEsUUFBUSxFQUFFLENBQUE7T0FORixpQkFBaUIsQ0ErRzdCO0lBQUQsd0JBQUM7Q0FBQSxBQS9HRCxJQStHQztTQS9HWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdCwgT3B0aW9uYWwsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgd2hlblNldCwgd3JhcEFuZERlZmluZURlc2NyaXB0b3IgfSBmcm9tICdAY29kZWJha2VyeS9vcmlnYW1pL3V0aWwnO1xuaW1wb3J0IHsgY2FtZWxUb0Rhc2hDYXNlIH0gZnJvbSAnQHBvbHltZXIvcG9seW1lci9saWIvdXRpbHMvY2FzZS1tYXAnO1xuaW1wb3J0IHsgVGVtcGxhdGVJbmZvIH0gZnJvbSAnQHBvbHltZXIvcG9seW1lci9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFBPTFlNRVJfSE9TVCB9IGZyb20gJy4vcG9seW1lckhvc3QnO1xuXG4vKipcbiAqIEFuIEhUTUxUZW1wbGF0ZUVsZW1lbnQgdGhhdCBpcyBwcm9jZXNzZWQgYnkgUG9seW1lcidzIHRlbXBsYXRpemVyLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBvbHltZXJUZW1wbGF0ZSBleHRlbmRzIEhUTUxUZW1wbGF0ZUVsZW1lbnQge1xuICAvKipcbiAgICogQWRkZWQgYnkgdGhlIGBQcm9wZXJ0eUVmZmVjdHNgIG1peGluIHRvIGluc3RydWN0IHRlbXBsYXRpemUgb2YgdGhlIGhvc3RcbiAgICogZm9yIHRoZSB0ZW1wbGF0ZS4gRWZmZWN0cyB0aGF0IGFyZSBub3QgcGFydCBvZiB0aGUgdGVtcGxhdGUgaW5zdGFuY2Ugd2lsbFxuICAgKiBwcm9wYWdhdGUgdG8gdGhpcyBob3N0LlxuICAgKi9cbiAgX19kYXRhSG9zdD86IGFueTtcbiAgLyoqXG4gICAqIFRlbXBsYXRlIG1ldGFkYXRhIGdlbmVyYXRlZCBmcm9tIGBUZW1wbGF0ZVN0YW1wYC5cbiAgICovXG4gIF90ZW1wbGF0ZUluZm8/OiBUZW1wbGF0ZUluZm87XG4gIC8qKlxuICAgKiBIb3N0IHByb3BlcnRpZXMgYXJlIGRlZmluZWQgYXMgYF9ob3N0X3Byb3BOYW1lYCBieSB0ZW1wbGF0aXplci5cbiAgICovXG4gIFtob3N0UHJvcDogc3RyaW5nXTogYW55O1xufVxuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIGlzIGF0dGFjaGVkIHRvIGVhY2ggYDx0ZW1wbGF0ZT5gIGVsZW1lbnQuIElmIGEgUG9seW1lciBob3N0XG4gKiBjb21wb25lbnQgaXMgcHJvdmlkZWQsIHRoaXMgZGlyZWN0aXZlIHdpbGwgZW5hYmxlIFBvbHltZXIncyBldmVudCBhbmRcbiAqIHR3by13YXkgYmluZGluZyBzeW50YXggc3R5bGVzLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0ZW1wbGF0ZSdcbn0pXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVEaXJlY3RpdmUge1xuICByZWFkeTogUHJvbWlzZTx2b2lkPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBASW5qZWN0KFBPTFlNRVJfSE9TVClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHB1YmxpYyBwb2x5bWVySG9zdDogYW55LFxuICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICkge1xuICAgIHRoaXMucmVhZHkgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucG9seW1lckhvc3QpIHtcbiAgICAgICAgdGhpcy5lbmFibGVFdmVudEJpbmRpbmdzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZW5hYmxlUHJvcGVydHlCaW5kaW5ncyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pKCk7XG4gIH1cblxuICAvKipcbiAgICogRW5hYmxlcyB0aGUgdXNlIG9mIFBvbHltZXIgZXZlbnQgYmluZGluZ3MuIEFuIGV2ZW50IGJpbmRpbmcgaXMgZGVjbGFyZWRcbiAgICogd2l0aCB0aGUgc3ludGF4IGBvbi1ldmVudC1uYW1lPVwiaGFuZGxlclwiYCwgd2hlcmUgYGV2ZW50LW5hbWVgIGlzIHRoZVxuICAgKiBuYW1lIG9mIHRoZSBldmVudCB0byBsaXN0ZW4gdG8gYW5kIGBoYW5kbGVyYCBpcyB0aGUgbmFtZSBvZiB0aGUgaG9zdCdzXG4gICAqIG1ldGhvZCB0byBjYWxsIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXG4gICAqXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZSB0aGUgUG9seW1lciB0ZW1wbGF0ZSB0byBlbmFibGUgZXZlbnQgYmluZGluZyBzeW50YXggZm9yXG4gICAqL1xuICBlbmFibGVFdmVudEJpbmRpbmdzKHRlbXBsYXRlOiBQb2x5bWVyVGVtcGxhdGUpIHtcbiAgICAvLyBXaGVuIHRlbXBsYXRpemUgbG9va3MgZm9yIGEgUHJvcGVydHlFZmZlY3RzIGhvc3QsIGl0IHdpbGwgdXNlIHRoZVxuICAgIC8vIHRlbXBsYXRlJ3MgX19kYXRhSG9zdCBwcm9wZXJ0eS4gVGhpcyBpcyB0aGUgX21ldGhvZEhvc3QgZm9yIGEgdGVtcGxhdGVcbiAgICAvLyBpbnN0YW5jZSBhbmQgaXMgdXNlZCB0byBhZGQgZXZlbnQgbGlzdGVuZXIgYmluZGluZ3MuXG4gICAgdGVtcGxhdGUuX19kYXRhSG9zdCA9IHRoaXMucG9seW1lckhvc3Q7XG4gIH1cblxuICAvKipcbiAgICogRW5hYmxlcyB0aGUgdXNlIG9mIFBvbHltZXIgcHJvcGVydHkgYmluZGluZ3MuIEEgcHJvcGVydHkgYmluZGluZyBpc1xuICAgKiBkZWNsYXJlZCBlaXRoZXIgYXMgYSBvbmUtd2F5IGJpbmRpbmcgYHZhbHVlPVwiW1twcm9wTmFtZV1dXCJgIG9yIGEgdHdvLXdheVxuICAgKiBiaW5kaW5nIGB2YWx1ZT1cInt7cHJvcE5hbWV9fVwiYC5cbiAgICpcbiAgICogQHBhcmFtIHRlbXBsYXRlIHRoZSBQb2x5bWVyIHRlbXBsYXRlIHRvIGVuYWJsZSBkYXRhIGJpbmRpbmcgc3ludGF4IGZvclxuICAgKi9cbiAgYXN5bmMgZW5hYmxlUHJvcGVydHlCaW5kaW5ncyh0ZW1wbGF0ZTogUG9seW1lclRlbXBsYXRlKSB7XG4gICAgY29uc3QgeyBob3N0UHJvcHMgfSA9IGF3YWl0IHRoaXMuZ2V0VGVtcGxhdGVJbmZvKHRlbXBsYXRlKTtcbiAgICBpZiAoaG9zdFByb3BzKSB7XG4gICAgICBmb3IgKGxldCBwcm9wIGluIGhvc3RQcm9wcykge1xuICAgICAgICAvLyBBbmd1bGFyIC0+IFBvbHltZXIgKG9uZS13YXkgYmluZGluZ3MpXG4gICAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHRoaXMucG9seW1lckhvc3RbcHJvcF07XG4gICAgICAgIHdyYXBBbmREZWZpbmVEZXNjcmlwdG9yKHRoaXMucG9seW1lckhvc3QsIHByb3AsIHtcbiAgICAgICAgICBhZnRlclNldChjaGFuZ2VkOiBib29sZWFuLCB2YWx1ZTogYW55KSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZVtgX2hvc3RfJHtwcm9wfWBdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnBvbHltZXJIb3N0W3Byb3BdID0gaW5pdGlhbFZhbHVlO1xuXG4gICAgICAgIC8vIFBvbHltZXIgLT4gQW5ndWxhciAodHdvLXdheSBiaW5kaW5ncylcbiAgICAgICAgY29uc3QgZXZlbnROYW1lID0gYF9ob3N0XyR7Y2FtZWxUb0Rhc2hDYXNlKHByb3ApfS1jaGFuZ2VkYDtcbiAgICAgICAgdGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5pc1NwbGljZXNDaGFuZ2UoPEN1c3RvbUV2ZW50PmV2ZW50KSAmJlxuICAgICAgICAgICAgIXRoaXMuaXNQYXRoQ2hhbmdlKDxDdXN0b21FdmVudD5ldmVudClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBvbHltZXJIb3N0W3Byb3BdID0gKDxDdXN0b21FdmVudD5ldmVudCkuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSB0ZW1wbGF0ZSBpbmZvIG1ldGFkYXRhIGZvciBhIFBvbHltZXIgdGVtcGxhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZSB0aGUgUG9seW1lciB0ZW1wbGF0ZSB0byByZXRyaWV2ZSB0ZW1wbGF0ZSBpbmZvIGZvclxuICAgKiBAcmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSB0ZW1wbGF0ZSdzIGluZm9cbiAgICovXG4gIGFzeW5jIGdldFRlbXBsYXRlSW5mbyh0ZW1wbGF0ZTogUG9seW1lclRlbXBsYXRlKTogUHJvbWlzZTxUZW1wbGF0ZUluZm8+IHtcbiAgICBpZiAodGVtcGxhdGUuX3RlbXBsYXRlSW5mbykge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlLl90ZW1wbGF0ZUluZm87XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhd2FpdCB3aGVuU2V0KHRlbXBsYXRlLCAnX3RlbXBsYXRlSW5mbycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYW4gZXZlbnQgaXMgYSBcInNwbGljZXNcIiBQb2x5bWVyIGNoYW5nZSBldmVudCxcbiAgICogd2hpY2ggaGFzIGEgZGV0YWlsIHZhbHVlIG9iamVjdCB0aGF0IGRpY3RhdGVzIHdoYXQgZWxlbWVudHMgd2VyZSBjaGFuZ2VkIGlmXG4gICAqIHRoZSBhcnJheSByZWZlcmVuY2UgcmVtYWlucyB0aGUgc2FtZS5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCB0byBjaGVja1xuICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBldmVudCBpcyBhIHNwbGljZXMgY2hhbmdlIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIGlzU3BsaWNlc0NoYW5nZShldmVudDogQ3VzdG9tRXZlbnQpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZTtcbiAgICByZXR1cm4gdmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZS5pbmRleFNwbGljZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbiBldmVudCBpcyBhIHBhdGggUG9seW1lciBjaGFuZ2UgZXZlbnQsIHdoaWNoXG4gICAqIGhhcyBhIGRldGFpbCBwYXRoIHByb3BlcnR5IGluZGljYXRpbmcgdGhlIHBhdGggb2YgdGhlIHZhbHVlIGNoYW5nZWQsIGFuZCBhXG4gICAqIHZhbHVlIG9mIHRoZSBwYXRoJ3MgdmFsdWUuIFRoaXMgaXMgdXNlZCB3aGVuIGFuIGFycmF5IG9yIG9iamVjdCByZWZlcmVuY2VcbiAgICogcmVtYWlucyB0aGUgc2FtZS5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IHRoZSBldmVudCB0byBjaGVja1xuICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBldmVudCBpcyBhIHBhdGggY2hhbmdlIGV2ZW50XG4gICAqL1xuICBwcml2YXRlIGlzUGF0aENoYW5nZShldmVudDogQ3VzdG9tRXZlbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHlwZW9mIGV2ZW50LmRldGFpbC5wYXRoID09PSAnc3RyaW5nJztcbiAgfVxufVxuIl19