import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { INJECT_STYLES_PROVIDER } from './inject-styles';
/**
 * Importing this module will add the ability for Angular components to include
 * Polymer style modules with the `@IncludeStyles()` decorator. This module
 * only needs to be imported once at the root component.
 *
 * This module _requires_` @angular/router` in order to inject styles for lazy
 * loaded components. Use `InjectStylesNoRouterModule` if your application does
 * not use `@angular/router`.
 */
var IncludeStylesModule = /** @class */ (function () {
    function IncludeStylesModule() {
    }
    IncludeStylesModule = __decorate([
        NgModule({
            providers: [INJECT_STYLES_PROVIDER]
        })
    ], IncludeStylesModule);
    return IncludeStylesModule;
}());
export { IncludeStylesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZS1zdHlsZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvZGViYWtlcnkvb3JpZ2FtaS9zdHlsZXMvIiwic291cmNlcyI6WyJzcmMvbW9kdWxlcy9pbmNsdWRlLXN0eWxlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFekQ7Ozs7Ozs7O0dBUUc7QUFJSDtJQUFBO0lBQWtDLENBQUM7SUFBdEIsbUJBQW1CO1FBSC9CLFFBQVEsQ0FBQztZQUNSLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3BDLENBQUM7T0FDVyxtQkFBbUIsQ0FBRztJQUFELDBCQUFDO0NBQUEsQUFBbkMsSUFBbUM7U0FBdEIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElOSkVDVF9TVFlMRVNfUFJPVklERVIgfSBmcm9tICcuL2luamVjdC1zdHlsZXMnO1xuXG4vKipcbiAqIEltcG9ydGluZyB0aGlzIG1vZHVsZSB3aWxsIGFkZCB0aGUgYWJpbGl0eSBmb3IgQW5ndWxhciBjb21wb25lbnRzIHRvIGluY2x1ZGVcbiAqIFBvbHltZXIgc3R5bGUgbW9kdWxlcyB3aXRoIHRoZSBgQEluY2x1ZGVTdHlsZXMoKWAgZGVjb3JhdG9yLiBUaGlzIG1vZHVsZVxuICogb25seSBuZWVkcyB0byBiZSBpbXBvcnRlZCBvbmNlIGF0IHRoZSByb290IGNvbXBvbmVudC5cbiAqXG4gKiBUaGlzIG1vZHVsZSBfcmVxdWlyZXNfYCBAYW5ndWxhci9yb3V0ZXJgIGluIG9yZGVyIHRvIGluamVjdCBzdHlsZXMgZm9yIGxhenlcbiAqIGxvYWRlZCBjb21wb25lbnRzLiBVc2UgYEluamVjdFN0eWxlc05vUm91dGVyTW9kdWxlYCBpZiB5b3VyIGFwcGxpY2F0aW9uIGRvZXNcbiAqIG5vdCB1c2UgYEBhbmd1bGFyL3JvdXRlcmAuXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW0lOSkVDVF9TVFlMRVNfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIEluY2x1ZGVTdHlsZXNNb2R1bGUge31cbiJdfQ==