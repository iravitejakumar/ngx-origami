import { __awaiter, __decorate, __param } from "tslib";
import { Directive, ElementRef, Inject, Optional, NgZone } from '@angular/core';
import { whenSet, wrapAndDefineDescriptor } from 'ngx-origami/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9yaWdhbWkvdGVtcGxhdGVzLyIsInNvdXJjZXMiOlsic3JjL3RlbXBsYXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUV0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBc0I3Qzs7OztHQUlHO0FBSUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFHNUIsWUFDUyxVQUFzQixFQUd0QixXQUFnQixFQUNmLElBQVk7UUFKYixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBR3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFLO1FBQ2YsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUVwQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBUyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbkQsTUFBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzdEO1FBQ0gsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxtQkFBbUIsQ0FBQyxRQUF5QjtRQUMzQyxvRUFBb0U7UUFDcEUseUVBQXlFO1FBQ3pFLHVEQUF1RDtRQUN2RCxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNHLHNCQUFzQixDQUFDLFFBQXlCOztZQUNwRCxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNELElBQUksU0FBUyxFQUFFO2dCQUNiLEtBQUssSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFO29CQUMxQix3Q0FBd0M7b0JBQ3hDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFO3dCQUM5QyxRQUFRLENBQUMsT0FBZ0IsRUFBRSxLQUFVOzRCQUNuQyxJQUFJLE9BQU8sRUFBRTtnQ0FDWCxRQUFRLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQzs2QkFDbkM7d0JBQ0gsQ0FBQztxQkFDRixDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7b0JBRXRDLHdDQUF3QztvQkFDeEMsTUFBTSxTQUFTLEdBQUcsU0FBUyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztvQkFDM0QsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRTt3QkFDM0MsSUFDRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQWMsS0FBSyxDQUFDOzRCQUN6QyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQWMsS0FBSyxDQUFDLEVBQ3RDOzRCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQ0FDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBaUIsS0FBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7NEJBQzdELENBQUMsQ0FBQyxDQUFDO3lCQUNKO29CQUNILENBQUMsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7UUFDSCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNHLGVBQWUsQ0FBQyxRQUF5Qjs7WUFDN0MsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO2dCQUMxQixPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUM7YUFDL0I7aUJBQU07Z0JBQ0wsT0FBTyxNQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7YUFDakQ7UUFDSCxDQUFDO0tBQUE7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssZUFBZSxDQUFDLEtBQWtCO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pDLE9BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNLLFlBQVksQ0FBQyxLQUFrQjtRQUNyQyxPQUFPLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDO0lBQy9DLENBQUM7Q0FDRixDQUFBOztZQTNHc0IsVUFBVTs0Q0FDNUIsTUFBTSxTQUFDLFlBQVksY0FDbkIsUUFBUTtZQUVLLE1BQU07O0FBUlgsaUJBQWlCO0lBSDdCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxVQUFVO0tBQ3JCLENBQUM7SUFNRyxXQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNwQixXQUFBLFFBQVEsRUFBRSxDQUFBO0dBTkYsaUJBQWlCLENBK0c3QjtTQS9HWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdCwgT3B0aW9uYWwsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgd2hlblNldCwgd3JhcEFuZERlZmluZURlc2NyaXB0b3IgfSBmcm9tICduZ3gtb3JpZ2FtaS91dGlsJztcbmltcG9ydCB7IGNhbWVsVG9EYXNoQ2FzZSB9IGZyb20gJ0Bwb2x5bWVyL3BvbHltZXIvbGliL3V0aWxzL2Nhc2UtbWFwJztcbmltcG9ydCB7IFRlbXBsYXRlSW5mbyB9IGZyb20gJ0Bwb2x5bWVyL3BvbHltZXIvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBQT0xZTUVSX0hPU1QgfSBmcm9tICcuL3BvbHltZXJIb3N0JztcblxuLyoqXG4gKiBBbiBIVE1MVGVtcGxhdGVFbGVtZW50IHRoYXQgaXMgcHJvY2Vzc2VkIGJ5IFBvbHltZXIncyB0ZW1wbGF0aXplci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQb2x5bWVyVGVtcGxhdGUgZXh0ZW5kcyBIVE1MVGVtcGxhdGVFbGVtZW50IHtcbiAgLyoqXG4gICAqIEFkZGVkIGJ5IHRoZSBgUHJvcGVydHlFZmZlY3RzYCBtaXhpbiB0byBpbnN0cnVjdCB0ZW1wbGF0aXplIG9mIHRoZSBob3N0XG4gICAqIGZvciB0aGUgdGVtcGxhdGUuIEVmZmVjdHMgdGhhdCBhcmUgbm90IHBhcnQgb2YgdGhlIHRlbXBsYXRlIGluc3RhbmNlIHdpbGxcbiAgICogcHJvcGFnYXRlIHRvIHRoaXMgaG9zdC5cbiAgICovXG4gIF9fZGF0YUhvc3Q/OiBhbnk7XG4gIC8qKlxuICAgKiBUZW1wbGF0ZSBtZXRhZGF0YSBnZW5lcmF0ZWQgZnJvbSBgVGVtcGxhdGVTdGFtcGAuXG4gICAqL1xuICBfdGVtcGxhdGVJbmZvPzogVGVtcGxhdGVJbmZvO1xuICAvKipcbiAgICogSG9zdCBwcm9wZXJ0aWVzIGFyZSBkZWZpbmVkIGFzIGBfaG9zdF9wcm9wTmFtZWAgYnkgdGVtcGxhdGl6ZXIuXG4gICAqL1xuICBbaG9zdFByb3A6IHN0cmluZ106IGFueTtcbn1cblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZCB0byBlYWNoIGA8dGVtcGxhdGU+YCBlbGVtZW50LiBJZiBhIFBvbHltZXIgaG9zdFxuICogY29tcG9uZW50IGlzIHByb3ZpZGVkLCB0aGlzIGRpcmVjdGl2ZSB3aWxsIGVuYWJsZSBQb2x5bWVyJ3MgZXZlbnQgYW5kXG4gKiB0d28td2F5IGJpbmRpbmcgc3ludGF4IHN0eWxlcy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGVtcGxhdGUnXG59KVxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlRGlyZWN0aXZlIHtcbiAgcmVhZHk6IFByb21pc2U8dm9pZD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChQT0xZTUVSX0hPU1QpXG4gICAgQE9wdGlvbmFsKClcbiAgICBwdWJsaWMgcG9seW1lckhvc3Q6IGFueSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICB0aGlzLnJlYWR5ID0gKGFzeW5jICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnBvbHltZXJIb3N0KSB7XG4gICAgICAgIHRoaXMuZW5hYmxlRXZlbnRCaW5kaW5ncyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBhd2FpdCB0aGlzLmVuYWJsZVByb3BlcnR5QmluZGluZ3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgdGhlIHVzZSBvZiBQb2x5bWVyIGV2ZW50IGJpbmRpbmdzLiBBbiBldmVudCBiaW5kaW5nIGlzIGRlY2xhcmVkXG4gICAqIHdpdGggdGhlIHN5bnRheCBgb24tZXZlbnQtbmFtZT1cImhhbmRsZXJcImAsIHdoZXJlIGBldmVudC1uYW1lYCBpcyB0aGVcbiAgICogbmFtZSBvZiB0aGUgZXZlbnQgdG8gbGlzdGVuIHRvIGFuZCBgaGFuZGxlcmAgaXMgdGhlIG5hbWUgb2YgdGhlIGhvc3Qnc1xuICAgKiBtZXRob2QgdG8gY2FsbCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBAcGFyYW0gdGVtcGxhdGUgdGhlIFBvbHltZXIgdGVtcGxhdGUgdG8gZW5hYmxlIGV2ZW50IGJpbmRpbmcgc3ludGF4IGZvclxuICAgKi9cbiAgZW5hYmxlRXZlbnRCaW5kaW5ncyh0ZW1wbGF0ZTogUG9seW1lclRlbXBsYXRlKSB7XG4gICAgLy8gV2hlbiB0ZW1wbGF0aXplIGxvb2tzIGZvciBhIFByb3BlcnR5RWZmZWN0cyBob3N0LCBpdCB3aWxsIHVzZSB0aGVcbiAgICAvLyB0ZW1wbGF0ZSdzIF9fZGF0YUhvc3QgcHJvcGVydHkuIFRoaXMgaXMgdGhlIF9tZXRob2RIb3N0IGZvciBhIHRlbXBsYXRlXG4gICAgLy8gaW5zdGFuY2UgYW5kIGlzIHVzZWQgdG8gYWRkIGV2ZW50IGxpc3RlbmVyIGJpbmRpbmdzLlxuICAgIHRlbXBsYXRlLl9fZGF0YUhvc3QgPSB0aGlzLnBvbHltZXJIb3N0O1xuICB9XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgdGhlIHVzZSBvZiBQb2x5bWVyIHByb3BlcnR5IGJpbmRpbmdzLiBBIHByb3BlcnR5IGJpbmRpbmcgaXNcbiAgICogZGVjbGFyZWQgZWl0aGVyIGFzIGEgb25lLXdheSBiaW5kaW5nIGB2YWx1ZT1cIltbcHJvcE5hbWVdXVwiYCBvciBhIHR3by13YXlcbiAgICogYmluZGluZyBgdmFsdWU9XCJ7e3Byb3BOYW1lfX1cImAuXG4gICAqXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZSB0aGUgUG9seW1lciB0ZW1wbGF0ZSB0byBlbmFibGUgZGF0YSBiaW5kaW5nIHN5bnRheCBmb3JcbiAgICovXG4gIGFzeW5jIGVuYWJsZVByb3BlcnR5QmluZGluZ3ModGVtcGxhdGU6IFBvbHltZXJUZW1wbGF0ZSkge1xuICAgIGNvbnN0IHsgaG9zdFByb3BzIH0gPSBhd2FpdCB0aGlzLmdldFRlbXBsYXRlSW5mbyh0ZW1wbGF0ZSk7XG4gICAgaWYgKGhvc3RQcm9wcykge1xuICAgICAgZm9yIChsZXQgcHJvcCBpbiBob3N0UHJvcHMpIHtcbiAgICAgICAgLy8gQW5ndWxhciAtPiBQb2x5bWVyIChvbmUtd2F5IGJpbmRpbmdzKVxuICAgICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSB0aGlzLnBvbHltZXJIb3N0W3Byb3BdO1xuICAgICAgICB3cmFwQW5kRGVmaW5lRGVzY3JpcHRvcih0aGlzLnBvbHltZXJIb3N0LCBwcm9wLCB7XG4gICAgICAgICAgYWZ0ZXJTZXQoY2hhbmdlZDogYm9vbGVhbiwgdmFsdWU6IGFueSkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVbYF9ob3N0XyR7cHJvcH1gXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wb2x5bWVySG9zdFtwcm9wXSA9IGluaXRpYWxWYWx1ZTtcblxuICAgICAgICAvLyBQb2x5bWVyIC0+IEFuZ3VsYXIgKHR3by13YXkgYmluZGluZ3MpXG4gICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGBfaG9zdF8ke2NhbWVsVG9EYXNoQ2FzZShwcm9wKX0tY2hhbmdlZGA7XG4gICAgICAgIHRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudCA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuaXNTcGxpY2VzQ2hhbmdlKDxDdXN0b21FdmVudD5ldmVudCkgJiZcbiAgICAgICAgICAgICF0aGlzLmlzUGF0aENoYW5nZSg8Q3VzdG9tRXZlbnQ+ZXZlbnQpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5wb2x5bWVySG9zdFtwcm9wXSA9ICg8Q3VzdG9tRXZlbnQ+ZXZlbnQpLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgdGVtcGxhdGUgaW5mbyBtZXRhZGF0YSBmb3IgYSBQb2x5bWVyIHRlbXBsYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdGVtcGxhdGUgdGhlIFBvbHltZXIgdGVtcGxhdGUgdG8gcmV0cmlldmUgdGVtcGxhdGUgaW5mbyBmb3JcbiAgICogQHJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdGVtcGxhdGUncyBpbmZvXG4gICAqL1xuICBhc3luYyBnZXRUZW1wbGF0ZUluZm8odGVtcGxhdGU6IFBvbHltZXJUZW1wbGF0ZSk6IFByb21pc2U8VGVtcGxhdGVJbmZvPiB7XG4gICAgaWYgKHRlbXBsYXRlLl90ZW1wbGF0ZUluZm8pIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZS5fdGVtcGxhdGVJbmZvO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXdhaXQgd2hlblNldCh0ZW1wbGF0ZSwgJ190ZW1wbGF0ZUluZm8nKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGFuIGV2ZW50IGlzIGEgXCJzcGxpY2VzXCIgUG9seW1lciBjaGFuZ2UgZXZlbnQsXG4gICAqIHdoaWNoIGhhcyBhIGRldGFpbCB2YWx1ZSBvYmplY3QgdGhhdCBkaWN0YXRlcyB3aGF0IGVsZW1lbnRzIHdlcmUgY2hhbmdlZCBpZlxuICAgKiB0aGUgYXJyYXkgcmVmZXJlbmNlIHJlbWFpbnMgdGhlIHNhbWUuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgdG8gY2hlY2tcbiAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgZXZlbnQgaXMgYSBzcGxpY2VzIGNoYW5nZSBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBpc1NwbGljZXNDaGFuZ2UoZXZlbnQ6IEN1c3RvbUV2ZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlICYmIEFycmF5LmlzQXJyYXkodmFsdWUuaW5kZXhTcGxpY2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgYW4gZXZlbnQgaXMgYSBwYXRoIFBvbHltZXIgY2hhbmdlIGV2ZW50LCB3aGljaFxuICAgKiBoYXMgYSBkZXRhaWwgcGF0aCBwcm9wZXJ0eSBpbmRpY2F0aW5nIHRoZSBwYXRoIG9mIHRoZSB2YWx1ZSBjaGFuZ2VkLCBhbmQgYVxuICAgKiB2YWx1ZSBvZiB0aGUgcGF0aCdzIHZhbHVlLiBUaGlzIGlzIHVzZWQgd2hlbiBhbiBhcnJheSBvciBvYmplY3QgcmVmZXJlbmNlXG4gICAqIHJlbWFpbnMgdGhlIHNhbWUuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCB0aGUgZXZlbnQgdG8gY2hlY2tcbiAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgZXZlbnQgaXMgYSBwYXRoIGNoYW5nZSBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBpc1BhdGhDaGFuZ2UoZXZlbnQ6IEN1c3RvbUV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGVvZiBldmVudC5kZXRhaWwucGF0aCA9PT0gJ3N0cmluZyc7XG4gIH1cbn1cbiJdfQ==