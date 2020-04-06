import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { INJECT_STYLES_NO_ROUTER_PROVIDER } from './inject-styles';
/**
 * Importing this module will add the ability for Angular components to include
 * Polymer style modules with the `@IncludeStyles()` decorator. This module
 * only needs to be imported once at the root component.
 *
 * This module does _not_ require `@angular/router` and will not inject styles
 * into lazy loaded components.
 */
var IncludeStylesNoRouterModule = /** @class */ (function () {
    function IncludeStylesNoRouterModule() {
    }
    IncludeStylesNoRouterModule = __decorate([
        NgModule({
            providers: [INJECT_STYLES_NO_ROUTER_PROVIDER]
        })
    ], IncludeStylesNoRouterModule);
    return IncludeStylesNoRouterModule;
}());
export { IncludeStylesNoRouterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZS1zdHlsZXMtbm8tcm91dGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcmlnYW1pL3N0eWxlcy8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2luY2x1ZGUtc3R5bGVzLW5vLXJvdXRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbkU7Ozs7Ozs7R0FPRztBQUlIO0lBQUE7SUFBMEMsQ0FBQztJQUE5QiwyQkFBMkI7UUFIdkMsUUFBUSxDQUFDO1lBQ1IsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7U0FDOUMsQ0FBQztPQUNXLDJCQUEyQixDQUFHO0lBQUQsa0NBQUM7Q0FBQSxBQUEzQyxJQUEyQztTQUE5QiwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSU5KRUNUX1NUWUxFU19OT19ST1VURVJfUFJPVklERVIgfSBmcm9tICcuL2luamVjdC1zdHlsZXMnO1xuXG4vKipcbiAqIEltcG9ydGluZyB0aGlzIG1vZHVsZSB3aWxsIGFkZCB0aGUgYWJpbGl0eSBmb3IgQW5ndWxhciBjb21wb25lbnRzIHRvIGluY2x1ZGVcbiAqIFBvbHltZXIgc3R5bGUgbW9kdWxlcyB3aXRoIHRoZSBgQEluY2x1ZGVTdHlsZXMoKWAgZGVjb3JhdG9yLiBUaGlzIG1vZHVsZVxuICogb25seSBuZWVkcyB0byBiZSBpbXBvcnRlZCBvbmNlIGF0IHRoZSByb290IGNvbXBvbmVudC5cbiAqXG4gKiBUaGlzIG1vZHVsZSBkb2VzIF9ub3RfIHJlcXVpcmUgYEBhbmd1bGFyL3JvdXRlcmAgYW5kIHdpbGwgbm90IGluamVjdCBzdHlsZXNcbiAqIGludG8gbGF6eSBsb2FkZWQgY29tcG9uZW50cy5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbSU5KRUNUX1NUWUxFU19OT19ST1VURVJfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIEluY2x1ZGVTdHlsZXNOb1JvdXRlck1vZHVsZSB7fVxuIl19