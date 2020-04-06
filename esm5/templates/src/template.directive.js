import { __awaiter, __decorate, __generator, __param } from "tslib";
import { Directive, ElementRef, Inject, Optional, NgZone } from '@angular/core';
import { whenSet, wrapAndDefineDescriptor } from 'ngx-origami/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9yaWdhbWkvdGVtcGxhdGVzLyIsInNvdXJjZXMiOlsic3JjL3RlbXBsYXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUV0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBc0I3Qzs7OztHQUlHO0FBSUg7SUFHRSwyQkFDUyxVQUFzQixFQUd0QixXQUFnQixFQUNmLElBQVk7UUFMdEIsaUJBYUM7UUFaUSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBR3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFLO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUVwQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUM7Ozs7NkJBQ1IsSUFBSSxDQUFDLFdBQVcsRUFBaEIsd0JBQWdCO3dCQUNsQixJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUNuRCxxQkFBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFBOzt3QkFBM0QsU0FBMkQsQ0FBQzs7Ozs7YUFFL0QsQ0FBQyxFQUFFLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILCtDQUFtQixHQUFuQixVQUFvQixRQUF5QjtRQUMzQyxvRUFBb0U7UUFDcEUseUVBQXlFO1FBQ3pFLHVEQUF1RDtRQUN2RCxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNHLGtEQUFzQixHQUE1QixVQUE2QixRQUF5Qjs7Ozs7OzRCQUM5QixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBbEQsU0FBUyxHQUFLLENBQUEsU0FBb0MsQ0FBQSxVQUF6Qzt3QkFDakIsSUFBSSxTQUFTLEVBQUU7Z0RBQ0osSUFBSTtnQ0FDWCx3Q0FBd0M7Z0NBQ3hDLElBQU0sWUFBWSxHQUFHLE9BQUssV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUM1Qyx1QkFBdUIsQ0FBQyxPQUFLLFdBQVcsRUFBRSxJQUFJLEVBQUU7b0NBQzlDLFFBQVEsRUFBUixVQUFTLE9BQWdCLEVBQUUsS0FBVTt3Q0FDbkMsSUFBSSxPQUFPLEVBQUU7NENBQ1gsUUFBUSxDQUFDLFdBQVMsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDO3lDQUNuQztvQ0FDSCxDQUFDO2lDQUNGLENBQUMsQ0FBQztnQ0FFSCxPQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7Z0NBRXRDLHdDQUF3QztnQ0FDeEMsSUFBTSxTQUFTLEdBQUcsV0FBUyxlQUFlLENBQUMsSUFBSSxDQUFDLGFBQVUsQ0FBQztnQ0FDM0QsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFBLEtBQUs7b0NBQ3hDLElBQ0UsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFjLEtBQUssQ0FBQzt3Q0FDekMsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFjLEtBQUssQ0FBQyxFQUN0Qzt3Q0FDQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0Q0FDWixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFpQixLQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzt3Q0FDN0QsQ0FBQyxDQUFDLENBQUM7cUNBQ0o7Z0NBQ0gsQ0FBQyxDQUFDLENBQUM7Ozs0QkF4QkwsS0FBUyxJQUFJLElBQUksU0FBUzt3Q0FBakIsSUFBSTs2QkF5Qlo7eUJBQ0Y7Ozs7O0tBQ0Y7SUFFRDs7Ozs7T0FLRztJQUNHLDJDQUFlLEdBQXJCLFVBQXNCLFFBQXlCOzs7Ozs2QkFDekMsUUFBUSxDQUFDLGFBQWEsRUFBdEIsd0JBQXNCO3dCQUN4QixzQkFBTyxRQUFRLENBQUMsYUFBYSxFQUFDOzRCQUV2QixxQkFBTSxPQUFPLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxFQUFBOzRCQUEvQyxzQkFBTyxTQUF3QyxFQUFDOzs7O0tBRW5EO0lBRUQ7Ozs7Ozs7T0FPRztJQUNLLDJDQUFlLEdBQXZCLFVBQXdCLEtBQWtCO1FBQ3hDLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pDLE9BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNLLHdDQUFZLEdBQXBCLFVBQXFCLEtBQWtCO1FBQ3JDLE9BQU8sT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUM7SUFDL0MsQ0FBQzs7Z0JBMUdvQixVQUFVO2dEQUM1QixNQUFNLFNBQUMsWUFBWSxjQUNuQixRQUFRO2dCQUVLLE1BQU07O0lBUlgsaUJBQWlCO1FBSDdCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1NBQ3JCLENBQUM7UUFNRyxXQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNwQixXQUFBLFFBQVEsRUFBRSxDQUFBO09BTkYsaUJBQWlCLENBK0c3QjtJQUFELHdCQUFDO0NBQUEsQUEvR0QsSUErR0M7U0EvR1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIE9wdGlvbmFsLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHdoZW5TZXQsIHdyYXBBbmREZWZpbmVEZXNjcmlwdG9yIH0gZnJvbSAnbmd4LW9yaWdhbWkvdXRpbCc7XG5pbXBvcnQgeyBjYW1lbFRvRGFzaENhc2UgfSBmcm9tICdAcG9seW1lci9wb2x5bWVyL2xpYi91dGlscy9jYXNlLW1hcCc7XG5pbXBvcnQgeyBUZW1wbGF0ZUluZm8gfSBmcm9tICdAcG9seW1lci9wb2x5bWVyL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUE9MWU1FUl9IT1NUIH0gZnJvbSAnLi9wb2x5bWVySG9zdCc7XG5cbi8qKlxuICogQW4gSFRNTFRlbXBsYXRlRWxlbWVudCB0aGF0IGlzIHByb2Nlc3NlZCBieSBQb2x5bWVyJ3MgdGVtcGxhdGl6ZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUG9seW1lclRlbXBsYXRlIGV4dGVuZHMgSFRNTFRlbXBsYXRlRWxlbWVudCB7XG4gIC8qKlxuICAgKiBBZGRlZCBieSB0aGUgYFByb3BlcnR5RWZmZWN0c2AgbWl4aW4gdG8gaW5zdHJ1Y3QgdGVtcGxhdGl6ZSBvZiB0aGUgaG9zdFxuICAgKiBmb3IgdGhlIHRlbXBsYXRlLiBFZmZlY3RzIHRoYXQgYXJlIG5vdCBwYXJ0IG9mIHRoZSB0ZW1wbGF0ZSBpbnN0YW5jZSB3aWxsXG4gICAqIHByb3BhZ2F0ZSB0byB0aGlzIGhvc3QuXG4gICAqL1xuICBfX2RhdGFIb3N0PzogYW55O1xuICAvKipcbiAgICogVGVtcGxhdGUgbWV0YWRhdGEgZ2VuZXJhdGVkIGZyb20gYFRlbXBsYXRlU3RhbXBgLlxuICAgKi9cbiAgX3RlbXBsYXRlSW5mbz86IFRlbXBsYXRlSW5mbztcbiAgLyoqXG4gICAqIEhvc3QgcHJvcGVydGllcyBhcmUgZGVmaW5lZCBhcyBgX2hvc3RfcHJvcE5hbWVgIGJ5IHRlbXBsYXRpemVyLlxuICAgKi9cbiAgW2hvc3RQcm9wOiBzdHJpbmddOiBhbnk7XG59XG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgaXMgYXR0YWNoZWQgdG8gZWFjaCBgPHRlbXBsYXRlPmAgZWxlbWVudC4gSWYgYSBQb2x5bWVyIGhvc3RcbiAqIGNvbXBvbmVudCBpcyBwcm92aWRlZCwgdGhpcyBkaXJlY3RpdmUgd2lsbCBlbmFibGUgUG9seW1lcidzIGV2ZW50IGFuZFxuICogdHdvLXdheSBiaW5kaW5nIHN5bnRheCBzdHlsZXMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RlbXBsYXRlJ1xufSlcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZURpcmVjdGl2ZSB7XG4gIHJlYWR5OiBQcm9taXNlPHZvaWQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoUE9MWU1FUl9IT1NUKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHVibGljIHBvbHltZXJIb3N0OiBhbnksXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgdGhpcy5yZWFkeSA9IChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wb2x5bWVySG9zdCkge1xuICAgICAgICB0aGlzLmVuYWJsZUV2ZW50QmluZGluZ3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgYXdhaXQgdGhpcy5lbmFibGVQcm9wZXJ0eUJpbmRpbmdzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGVzIHRoZSB1c2Ugb2YgUG9seW1lciBldmVudCBiaW5kaW5ncy4gQW4gZXZlbnQgYmluZGluZyBpcyBkZWNsYXJlZFxuICAgKiB3aXRoIHRoZSBzeW50YXggYG9uLWV2ZW50LW5hbWU9XCJoYW5kbGVyXCJgLCB3aGVyZSBgZXZlbnQtbmFtZWAgaXMgdGhlXG4gICAqIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGxpc3RlbiB0byBhbmQgYGhhbmRsZXJgIGlzIHRoZSBuYW1lIG9mIHRoZSBob3N0J3NcbiAgICogbWV0aG9kIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogQHBhcmFtIHRlbXBsYXRlIHRoZSBQb2x5bWVyIHRlbXBsYXRlIHRvIGVuYWJsZSBldmVudCBiaW5kaW5nIHN5bnRheCBmb3JcbiAgICovXG4gIGVuYWJsZUV2ZW50QmluZGluZ3ModGVtcGxhdGU6IFBvbHltZXJUZW1wbGF0ZSkge1xuICAgIC8vIFdoZW4gdGVtcGxhdGl6ZSBsb29rcyBmb3IgYSBQcm9wZXJ0eUVmZmVjdHMgaG9zdCwgaXQgd2lsbCB1c2UgdGhlXG4gICAgLy8gdGVtcGxhdGUncyBfX2RhdGFIb3N0IHByb3BlcnR5LiBUaGlzIGlzIHRoZSBfbWV0aG9kSG9zdCBmb3IgYSB0ZW1wbGF0ZVxuICAgIC8vIGluc3RhbmNlIGFuZCBpcyB1c2VkIHRvIGFkZCBldmVudCBsaXN0ZW5lciBiaW5kaW5ncy5cbiAgICB0ZW1wbGF0ZS5fX2RhdGFIb3N0ID0gdGhpcy5wb2x5bWVySG9zdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGVzIHRoZSB1c2Ugb2YgUG9seW1lciBwcm9wZXJ0eSBiaW5kaW5ncy4gQSBwcm9wZXJ0eSBiaW5kaW5nIGlzXG4gICAqIGRlY2xhcmVkIGVpdGhlciBhcyBhIG9uZS13YXkgYmluZGluZyBgdmFsdWU9XCJbW3Byb3BOYW1lXV1cImAgb3IgYSB0d28td2F5XG4gICAqIGJpbmRpbmcgYHZhbHVlPVwie3twcm9wTmFtZX19XCJgLlxuICAgKlxuICAgKiBAcGFyYW0gdGVtcGxhdGUgdGhlIFBvbHltZXIgdGVtcGxhdGUgdG8gZW5hYmxlIGRhdGEgYmluZGluZyBzeW50YXggZm9yXG4gICAqL1xuICBhc3luYyBlbmFibGVQcm9wZXJ0eUJpbmRpbmdzKHRlbXBsYXRlOiBQb2x5bWVyVGVtcGxhdGUpIHtcbiAgICBjb25zdCB7IGhvc3RQcm9wcyB9ID0gYXdhaXQgdGhpcy5nZXRUZW1wbGF0ZUluZm8odGVtcGxhdGUpO1xuICAgIGlmIChob3N0UHJvcHMpIHtcbiAgICAgIGZvciAobGV0IHByb3AgaW4gaG9zdFByb3BzKSB7XG4gICAgICAgIC8vIEFuZ3VsYXIgLT4gUG9seW1lciAob25lLXdheSBiaW5kaW5ncylcbiAgICAgICAgY29uc3QgaW5pdGlhbFZhbHVlID0gdGhpcy5wb2x5bWVySG9zdFtwcm9wXTtcbiAgICAgICAgd3JhcEFuZERlZmluZURlc2NyaXB0b3IodGhpcy5wb2x5bWVySG9zdCwgcHJvcCwge1xuICAgICAgICAgIGFmdGVyU2V0KGNoYW5nZWQ6IGJvb2xlYW4sIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlW2BfaG9zdF8ke3Byb3B9YF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucG9seW1lckhvc3RbcHJvcF0gPSBpbml0aWFsVmFsdWU7XG5cbiAgICAgICAgLy8gUG9seW1lciAtPiBBbmd1bGFyICh0d28td2F5IGJpbmRpbmdzKVxuICAgICAgICBjb25zdCBldmVudE5hbWUgPSBgX2hvc3RfJHtjYW1lbFRvRGFzaENhc2UocHJvcCl9LWNoYW5nZWRgO1xuICAgICAgICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnQgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLmlzU3BsaWNlc0NoYW5nZSg8Q3VzdG9tRXZlbnQ+ZXZlbnQpICYmXG4gICAgICAgICAgICAhdGhpcy5pc1BhdGhDaGFuZ2UoPEN1c3RvbUV2ZW50PmV2ZW50KVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucG9seW1lckhvc3RbcHJvcF0gPSAoPEN1c3RvbUV2ZW50PmV2ZW50KS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHRlbXBsYXRlIGluZm8gbWV0YWRhdGEgZm9yIGEgUG9seW1lciB0ZW1wbGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRlbXBsYXRlIHRoZSBQb2x5bWVyIHRlbXBsYXRlIHRvIHJldHJpZXZlIHRlbXBsYXRlIGluZm8gZm9yXG4gICAqIEByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHRlbXBsYXRlJ3MgaW5mb1xuICAgKi9cbiAgYXN5bmMgZ2V0VGVtcGxhdGVJbmZvKHRlbXBsYXRlOiBQb2x5bWVyVGVtcGxhdGUpOiBQcm9taXNlPFRlbXBsYXRlSW5mbz4ge1xuICAgIGlmICh0ZW1wbGF0ZS5fdGVtcGxhdGVJbmZvKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGUuX3RlbXBsYXRlSW5mbztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGF3YWl0IHdoZW5TZXQodGVtcGxhdGUsICdfdGVtcGxhdGVJbmZvJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbiBldmVudCBpcyBhIFwic3BsaWNlc1wiIFBvbHltZXIgY2hhbmdlIGV2ZW50LFxuICAgKiB3aGljaCBoYXMgYSBkZXRhaWwgdmFsdWUgb2JqZWN0IHRoYXQgZGljdGF0ZXMgd2hhdCBlbGVtZW50cyB3ZXJlIGNoYW5nZWQgaWZcbiAgICogdGhlIGFycmF5IHJlZmVyZW5jZSByZW1haW5zIHRoZSBzYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IHRvIGNoZWNrXG4gICAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGV2ZW50IGlzIGEgc3BsaWNlcyBjaGFuZ2UgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgaXNTcGxpY2VzQ2hhbmdlKGV2ZW50OiBDdXN0b21FdmVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlLmluZGV4U3BsaWNlcyk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGFuIGV2ZW50IGlzIGEgcGF0aCBQb2x5bWVyIGNoYW5nZSBldmVudCwgd2hpY2hcbiAgICogaGFzIGEgZGV0YWlsIHBhdGggcHJvcGVydHkgaW5kaWNhdGluZyB0aGUgcGF0aCBvZiB0aGUgdmFsdWUgY2hhbmdlZCwgYW5kIGFcbiAgICogdmFsdWUgb2YgdGhlIHBhdGgncyB2YWx1ZS4gVGhpcyBpcyB1c2VkIHdoZW4gYW4gYXJyYXkgb3Igb2JqZWN0IHJlZmVyZW5jZVxuICAgKiByZW1haW5zIHRoZSBzYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IHRvIGNoZWNrXG4gICAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGV2ZW50IGlzIGEgcGF0aCBjaGFuZ2UgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgaXNQYXRoQ2hhbmdlKGV2ZW50OiBDdXN0b21FdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YgZXZlbnQuZGV0YWlsLnBhdGggPT09ICdzdHJpbmcnO1xuICB9XG59XG4iXX0=