import { __awaiter, __decorate, __param } from "tslib";
import { Directive, ElementRef, Inject, Optional, NgZone } from '@angular/core';
import { whenSet, wrapAndDefineDescriptor } from '@codebakery/origami/util';
import { camelToDashCase } from '@polymer/polymer/lib/utils/case-map';
import { POLYMER_HOST } from './polymerHost';
/**
 * This directive is attached to each `<template>` element. If a Polymer host
 * component is provided, this directive will enable Polymer's event and
 * two-way binding syntax styles.
 */
let TemplateDirective = class TemplateDirective {
    constructor(elementRef, polymerHost, zone) {
        this.elementRef = elementRef;
        this.polymerHost = polymerHost;
        this.zone = zone;
        this.ready = (() => __awaiter(this, void 0, void 0, function* () {
            if (this.polymerHost) {
                this.enableEventBindings(elementRef.nativeElement);
                yield this.enablePropertyBindings(elementRef.nativeElement);
            }
        }))();
    }
    /**
     * Enables the use of Polymer event bindings. An event binding is declared
     * with the syntax `on-event-name="handler"`, where `event-name` is the
     * name of the event to listen to and `handler` is the name of the host's
     * method to call when the event is dispatched.
     *
     * @param template the Polymer template to enable event binding syntax for
     */
    enableEventBindings(template) {
        // When templatize looks for a PropertyEffects host, it will use the
        // template's __dataHost property. This is the _methodHost for a template
        // instance and is used to add event listener bindings.
        template.__dataHost = this.polymerHost;
    }
    /**
     * Enables the use of Polymer property bindings. A property binding is
     * declared either as a one-way binding `value="[[propName]]"` or a two-way
     * binding `value="{{propName}}"`.
     *
     * @param template the Polymer template to enable data binding syntax for
     */
    enablePropertyBindings(template) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hostProps } = yield this.getTemplateInfo(template);
            if (hostProps) {
                for (let prop in hostProps) {
                    // Angular -> Polymer (one-way bindings)
                    const initialValue = this.polymerHost[prop];
                    wrapAndDefineDescriptor(this.polymerHost, prop, {
                        afterSet(changed, value) {
                            if (changed) {
                                template[`_host_${prop}`] = value;
                            }
                        }
                    });
                    this.polymerHost[prop] = initialValue;
                    // Polymer -> Angular (two-way bindings)
                    const eventName = `_host_${camelToDashCase(prop)}-changed`;
                    template.addEventListener(eventName, event => {
                        if (!this.isSplicesChange(event) &&
                            !this.isPathChange(event)) {
                            this.zone.run(() => {
                                this.polymerHost[prop] = event.detail.value;
                            });
                        }
                    });
                }
            }
        });
    }
    /**
     * Retrieves the template info metadata for a Polymer template.
     *
     * @param template the Polymer template to retrieve template info for
     * @returns a Promise that resolves with the template's info
     */
    getTemplateInfo(template) {
        return __awaiter(this, void 0, void 0, function* () {
            if (template._templateInfo) {
                return template._templateInfo;
            }
            else {
                return yield whenSet(template, '_templateInfo');
            }
        });
    }
    /**
     * Indicates whether or not an event is a "splices" Polymer change event,
     * which has a detail value object that dictates what elements were changed if
     * the array reference remains the same.
     *
     * @param event the event to check
     * @returns true if the event is a splices change event
     */
    isSplicesChange(event) {
        const value = event.detail.value;
        return value && Array.isArray(value.indexSplices);
    }
    /**
     * Indicates whether or not an event is a path Polymer change event, which
     * has a detail path property indicating the path of the value changed, and a
     * value of the path's value. This is used when an array or object reference
     * remains the same.
     *
     * @param event the event to check
     * @returns true if the event is a path change event
     */
    isPathChange(event) {
        return typeof event.detail.path === 'string';
    }
};
TemplateDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [POLYMER_HOST,] }, { type: Optional }] },
    { type: NgZone }
];
TemplateDirective = __decorate([
    Directive({
        selector: 'template'
    }),
    __param(1, Inject(POLYMER_HOST)),
    __param(1, Optional())
], TemplateDirective);
export { TemplateDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvZGViYWtlcnkvb3JpZ2FtaS90ZW1wbGF0ZXMvIiwic291cmNlcyI6WyJzcmMvdGVtcGxhdGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRXRFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFzQjdDOzs7O0dBSUc7QUFJSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUc1QixZQUNTLFVBQXNCLEVBR3RCLFdBQWdCLEVBQ2YsSUFBWTtRQUpiLGVBQVUsR0FBVixVQUFVLENBQVk7UUFHdEIsZ0JBQVcsR0FBWCxXQUFXLENBQUs7UUFDZixTQUFJLEdBQUosSUFBSSxDQUFRO1FBRXBCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFTLEVBQUU7WUFDdkIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNuRCxNQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDN0Q7UUFDSCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILG1CQUFtQixDQUFDLFFBQXlCO1FBQzNDLG9FQUFvRTtRQUNwRSx5RUFBeUU7UUFDekUsdURBQXVEO1FBQ3ZELFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0csc0JBQXNCLENBQUMsUUFBeUI7O1lBQ3BELE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsS0FBSyxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7b0JBQzFCLHdDQUF3QztvQkFDeEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUU7d0JBQzlDLFFBQVEsQ0FBQyxPQUFnQixFQUFFLEtBQVU7NEJBQ25DLElBQUksT0FBTyxFQUFFO2dDQUNYLFFBQVEsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDOzZCQUNuQzt3QkFDSCxDQUFDO3FCQUNGLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQztvQkFFdEMsd0NBQXdDO29CQUN4QyxNQUFNLFNBQVMsR0FBRyxTQUFTLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUMzRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO3dCQUMzQyxJQUNFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBYyxLQUFLLENBQUM7NEJBQ3pDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBYyxLQUFLLENBQUMsRUFDdEM7NEJBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dDQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFpQixLQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs0QkFDN0QsQ0FBQyxDQUFDLENBQUM7eUJBQ0o7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7YUFDRjtRQUNILENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0csZUFBZSxDQUFDLFFBQXlCOztZQUM3QyxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7Z0JBQzFCLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQzthQUMvQjtpQkFBTTtnQkFDTCxPQUFPLE1BQU0sT0FBTyxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUNqRDtRQUNILENBQUM7S0FBQTtJQUVEOzs7Ozs7O09BT0c7SUFDSyxlQUFlLENBQUMsS0FBa0I7UUFDeEMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakMsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ssWUFBWSxDQUFDLEtBQWtCO1FBQ3JDLE9BQU8sT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUM7SUFDL0MsQ0FBQztDQUNGLENBQUE7O1lBM0dzQixVQUFVOzRDQUM1QixNQUFNLFNBQUMsWUFBWSxjQUNuQixRQUFRO1lBRUssTUFBTTs7QUFSWCxpQkFBaUI7SUFIN0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFVBQVU7S0FDckIsQ0FBQztJQU1HLFdBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3BCLFdBQUEsUUFBUSxFQUFFLENBQUE7R0FORixpQkFBaUIsQ0ErRzdCO1NBL0dZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0LCBPcHRpb25hbCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB3aGVuU2V0LCB3cmFwQW5kRGVmaW5lRGVzY3JpcHRvciB9IGZyb20gJ0Bjb2RlYmFrZXJ5L29yaWdhbWkvdXRpbCc7XG5pbXBvcnQgeyBjYW1lbFRvRGFzaENhc2UgfSBmcm9tICdAcG9seW1lci9wb2x5bWVyL2xpYi91dGlscy9jYXNlLW1hcCc7XG5pbXBvcnQgeyBUZW1wbGF0ZUluZm8gfSBmcm9tICdAcG9seW1lci9wb2x5bWVyL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUE9MWU1FUl9IT1NUIH0gZnJvbSAnLi9wb2x5bWVySG9zdCc7XG5cbi8qKlxuICogQW4gSFRNTFRlbXBsYXRlRWxlbWVudCB0aGF0IGlzIHByb2Nlc3NlZCBieSBQb2x5bWVyJ3MgdGVtcGxhdGl6ZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUG9seW1lclRlbXBsYXRlIGV4dGVuZHMgSFRNTFRlbXBsYXRlRWxlbWVudCB7XG4gIC8qKlxuICAgKiBBZGRlZCBieSB0aGUgYFByb3BlcnR5RWZmZWN0c2AgbWl4aW4gdG8gaW5zdHJ1Y3QgdGVtcGxhdGl6ZSBvZiB0aGUgaG9zdFxuICAgKiBmb3IgdGhlIHRlbXBsYXRlLiBFZmZlY3RzIHRoYXQgYXJlIG5vdCBwYXJ0IG9mIHRoZSB0ZW1wbGF0ZSBpbnN0YW5jZSB3aWxsXG4gICAqIHByb3BhZ2F0ZSB0byB0aGlzIGhvc3QuXG4gICAqL1xuICBfX2RhdGFIb3N0PzogYW55O1xuICAvKipcbiAgICogVGVtcGxhdGUgbWV0YWRhdGEgZ2VuZXJhdGVkIGZyb20gYFRlbXBsYXRlU3RhbXBgLlxuICAgKi9cbiAgX3RlbXBsYXRlSW5mbz86IFRlbXBsYXRlSW5mbztcbiAgLyoqXG4gICAqIEhvc3QgcHJvcGVydGllcyBhcmUgZGVmaW5lZCBhcyBgX2hvc3RfcHJvcE5hbWVgIGJ5IHRlbXBsYXRpemVyLlxuICAgKi9cbiAgW2hvc3RQcm9wOiBzdHJpbmddOiBhbnk7XG59XG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgaXMgYXR0YWNoZWQgdG8gZWFjaCBgPHRlbXBsYXRlPmAgZWxlbWVudC4gSWYgYSBQb2x5bWVyIGhvc3RcbiAqIGNvbXBvbmVudCBpcyBwcm92aWRlZCwgdGhpcyBkaXJlY3RpdmUgd2lsbCBlbmFibGUgUG9seW1lcidzIGV2ZW50IGFuZFxuICogdHdvLXdheSBiaW5kaW5nIHN5bnRheCBzdHlsZXMuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RlbXBsYXRlJ1xufSlcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZURpcmVjdGl2ZSB7XG4gIHJlYWR5OiBQcm9taXNlPHZvaWQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoUE9MWU1FUl9IT1NUKVxuICAgIEBPcHRpb25hbCgpXG4gICAgcHVibGljIHBvbHltZXJIb3N0OiBhbnksXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgdGhpcy5yZWFkeSA9IChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wb2x5bWVySG9zdCkge1xuICAgICAgICB0aGlzLmVuYWJsZUV2ZW50QmluZGluZ3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgYXdhaXQgdGhpcy5lbmFibGVQcm9wZXJ0eUJpbmRpbmdzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGVzIHRoZSB1c2Ugb2YgUG9seW1lciBldmVudCBiaW5kaW5ncy4gQW4gZXZlbnQgYmluZGluZyBpcyBkZWNsYXJlZFxuICAgKiB3aXRoIHRoZSBzeW50YXggYG9uLWV2ZW50LW5hbWU9XCJoYW5kbGVyXCJgLCB3aGVyZSBgZXZlbnQtbmFtZWAgaXMgdGhlXG4gICAqIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGxpc3RlbiB0byBhbmQgYGhhbmRsZXJgIGlzIHRoZSBuYW1lIG9mIHRoZSBob3N0J3NcbiAgICogbWV0aG9kIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogQHBhcmFtIHRlbXBsYXRlIHRoZSBQb2x5bWVyIHRlbXBsYXRlIHRvIGVuYWJsZSBldmVudCBiaW5kaW5nIHN5bnRheCBmb3JcbiAgICovXG4gIGVuYWJsZUV2ZW50QmluZGluZ3ModGVtcGxhdGU6IFBvbHltZXJUZW1wbGF0ZSkge1xuICAgIC8vIFdoZW4gdGVtcGxhdGl6ZSBsb29rcyBmb3IgYSBQcm9wZXJ0eUVmZmVjdHMgaG9zdCwgaXQgd2lsbCB1c2UgdGhlXG4gICAgLy8gdGVtcGxhdGUncyBfX2RhdGFIb3N0IHByb3BlcnR5LiBUaGlzIGlzIHRoZSBfbWV0aG9kSG9zdCBmb3IgYSB0ZW1wbGF0ZVxuICAgIC8vIGluc3RhbmNlIGFuZCBpcyB1c2VkIHRvIGFkZCBldmVudCBsaXN0ZW5lciBiaW5kaW5ncy5cbiAgICB0ZW1wbGF0ZS5fX2RhdGFIb3N0ID0gdGhpcy5wb2x5bWVySG9zdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGVzIHRoZSB1c2Ugb2YgUG9seW1lciBwcm9wZXJ0eSBiaW5kaW5ncy4gQSBwcm9wZXJ0eSBiaW5kaW5nIGlzXG4gICAqIGRlY2xhcmVkIGVpdGhlciBhcyBhIG9uZS13YXkgYmluZGluZyBgdmFsdWU9XCJbW3Byb3BOYW1lXV1cImAgb3IgYSB0d28td2F5XG4gICAqIGJpbmRpbmcgYHZhbHVlPVwie3twcm9wTmFtZX19XCJgLlxuICAgKlxuICAgKiBAcGFyYW0gdGVtcGxhdGUgdGhlIFBvbHltZXIgdGVtcGxhdGUgdG8gZW5hYmxlIGRhdGEgYmluZGluZyBzeW50YXggZm9yXG4gICAqL1xuICBhc3luYyBlbmFibGVQcm9wZXJ0eUJpbmRpbmdzKHRlbXBsYXRlOiBQb2x5bWVyVGVtcGxhdGUpIHtcbiAgICBjb25zdCB7IGhvc3RQcm9wcyB9ID0gYXdhaXQgdGhpcy5nZXRUZW1wbGF0ZUluZm8odGVtcGxhdGUpO1xuICAgIGlmIChob3N0UHJvcHMpIHtcbiAgICAgIGZvciAobGV0IHByb3AgaW4gaG9zdFByb3BzKSB7XG4gICAgICAgIC8vIEFuZ3VsYXIgLT4gUG9seW1lciAob25lLXdheSBiaW5kaW5ncylcbiAgICAgICAgY29uc3QgaW5pdGlhbFZhbHVlID0gdGhpcy5wb2x5bWVySG9zdFtwcm9wXTtcbiAgICAgICAgd3JhcEFuZERlZmluZURlc2NyaXB0b3IodGhpcy5wb2x5bWVySG9zdCwgcHJvcCwge1xuICAgICAgICAgIGFmdGVyU2V0KGNoYW5nZWQ6IGJvb2xlYW4sIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlW2BfaG9zdF8ke3Byb3B9YF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucG9seW1lckhvc3RbcHJvcF0gPSBpbml0aWFsVmFsdWU7XG5cbiAgICAgICAgLy8gUG9seW1lciAtPiBBbmd1bGFyICh0d28td2F5IGJpbmRpbmdzKVxuICAgICAgICBjb25zdCBldmVudE5hbWUgPSBgX2hvc3RfJHtjYW1lbFRvRGFzaENhc2UocHJvcCl9LWNoYW5nZWRgO1xuICAgICAgICB0ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnQgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLmlzU3BsaWNlc0NoYW5nZSg8Q3VzdG9tRXZlbnQ+ZXZlbnQpICYmXG4gICAgICAgICAgICAhdGhpcy5pc1BhdGhDaGFuZ2UoPEN1c3RvbUV2ZW50PmV2ZW50KVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucG9seW1lckhvc3RbcHJvcF0gPSAoPEN1c3RvbUV2ZW50PmV2ZW50KS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHRlbXBsYXRlIGluZm8gbWV0YWRhdGEgZm9yIGEgUG9seW1lciB0ZW1wbGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRlbXBsYXRlIHRoZSBQb2x5bWVyIHRlbXBsYXRlIHRvIHJldHJpZXZlIHRlbXBsYXRlIGluZm8gZm9yXG4gICAqIEByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHRlbXBsYXRlJ3MgaW5mb1xuICAgKi9cbiAgYXN5bmMgZ2V0VGVtcGxhdGVJbmZvKHRlbXBsYXRlOiBQb2x5bWVyVGVtcGxhdGUpOiBQcm9taXNlPFRlbXBsYXRlSW5mbz4ge1xuICAgIGlmICh0ZW1wbGF0ZS5fdGVtcGxhdGVJbmZvKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGUuX3RlbXBsYXRlSW5mbztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGF3YWl0IHdoZW5TZXQodGVtcGxhdGUsICdfdGVtcGxhdGVJbmZvJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBhbiBldmVudCBpcyBhIFwic3BsaWNlc1wiIFBvbHltZXIgY2hhbmdlIGV2ZW50LFxuICAgKiB3aGljaCBoYXMgYSBkZXRhaWwgdmFsdWUgb2JqZWN0IHRoYXQgZGljdGF0ZXMgd2hhdCBlbGVtZW50cyB3ZXJlIGNoYW5nZWQgaWZcbiAgICogdGhlIGFycmF5IHJlZmVyZW5jZSByZW1haW5zIHRoZSBzYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IHRvIGNoZWNrXG4gICAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGV2ZW50IGlzIGEgc3BsaWNlcyBjaGFuZ2UgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgaXNTcGxpY2VzQ2hhbmdlKGV2ZW50OiBDdXN0b21FdmVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlLmluZGV4U3BsaWNlcyk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGFuIGV2ZW50IGlzIGEgcGF0aCBQb2x5bWVyIGNoYW5nZSBldmVudCwgd2hpY2hcbiAgICogaGFzIGEgZGV0YWlsIHBhdGggcHJvcGVydHkgaW5kaWNhdGluZyB0aGUgcGF0aCBvZiB0aGUgdmFsdWUgY2hhbmdlZCwgYW5kIGFcbiAgICogdmFsdWUgb2YgdGhlIHBhdGgncyB2YWx1ZS4gVGhpcyBpcyB1c2VkIHdoZW4gYW4gYXJyYXkgb3Igb2JqZWN0IHJlZmVyZW5jZVxuICAgKiByZW1haW5zIHRoZSBzYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IHRvIGNoZWNrXG4gICAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGV2ZW50IGlzIGEgcGF0aCBjaGFuZ2UgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgaXNQYXRoQ2hhbmdlKGV2ZW50OiBDdXN0b21FdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YgZXZlbnQuZGV0YWlsLnBhdGggPT09ICdzdHJpbmcnO1xuICB9XG59XG4iXX0=