import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { WebComponentsReadyModule } from '@codebakery/origami/polyfills';
import { USING_APPLY } from './process-stylesheets';
import { SHADYCSS_SHARED_STYLES_HOST_PROVIDER } from './shared-styles-host';
/**
 * Adds ShadyCSS support to Angular. This allows the use of CSS custom
 * properties in Angular styles on browsers that do not support them.
 *
 * The ShadyCSS polyfill must be imported separately. It may be imported from
 * `@webcomponents/shadycss/entrypoints/custom-style-interface.js`
 * or `@polymer/polymer/lib/elements/custom-style.js`.
 *
 * If using the deprecated `@apply` mixin proposal, import
 * `ShadyCSSModule.usingApply()` instead.
 */
var ShadyCSSModule = /** @class */ (function () {
    function ShadyCSSModule() {
    }
    ShadyCSSModule_1 = ShadyCSSModule;
    /**
     * Forces Origami to register all stylesheets with ShadyCSS regardless of
     * native CSS custom property support. Import `ShadyCSSModule.usingApply()`
     * when using `@apply` mixins.
     */
    ShadyCSSModule.usingApply = function () {
        return {
            ngModule: ShadyCSSModule_1,
            providers: [
                {
                    provide: USING_APPLY,
                    useValue: true
                }
            ]
        };
    };
    var ShadyCSSModule_1;
    ShadyCSSModule = ShadyCSSModule_1 = __decorate([
        NgModule({
            imports: [WebComponentsReadyModule],
            providers: [SHADYCSS_SHARED_STYLES_HOST_PROVIDER]
        })
    ], ShadyCSSModule);
    return ShadyCSSModule;
}());
export { ShadyCSSModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZHljc3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvZGViYWtlcnkvb3JpZ2FtaS9zdHlsZXMvIiwic291cmNlcyI6WyJzcmMvc2hhZHljc3Mvc2hhZHljc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFNUU7Ozs7Ozs7Ozs7R0FVRztBQUtIO0lBQUE7SUFpQkEsQ0FBQzt1QkFqQlksY0FBYztJQUN6Qjs7OztPQUlHO0lBQ0kseUJBQVUsR0FBakI7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsUUFBUSxFQUFFLElBQUk7aUJBQ2Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztJQWhCVSxjQUFjO1FBSjFCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ25DLFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO1NBQ2xELENBQUM7T0FDVyxjQUFjLENBaUIxQjtJQUFELHFCQUFDO0NBQUEsQUFqQkQsSUFpQkM7U0FqQlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXZWJDb21wb25lbnRzUmVhZHlNb2R1bGUgfSBmcm9tICdAY29kZWJha2VyeS9vcmlnYW1pL3BvbHlmaWxscyc7XG5pbXBvcnQgeyBVU0lOR19BUFBMWSB9IGZyb20gJy4vcHJvY2Vzcy1zdHlsZXNoZWV0cyc7XG5pbXBvcnQgeyBTSEFEWUNTU19TSEFSRURfU1RZTEVTX0hPU1RfUFJPVklERVIgfSBmcm9tICcuL3NoYXJlZC1zdHlsZXMtaG9zdCc7XG5cbi8qKlxuICogQWRkcyBTaGFkeUNTUyBzdXBwb3J0IHRvIEFuZ3VsYXIuIFRoaXMgYWxsb3dzIHRoZSB1c2Ugb2YgQ1NTIGN1c3RvbVxuICogcHJvcGVydGllcyBpbiBBbmd1bGFyIHN0eWxlcyBvbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IHRoZW0uXG4gKlxuICogVGhlIFNoYWR5Q1NTIHBvbHlmaWxsIG11c3QgYmUgaW1wb3J0ZWQgc2VwYXJhdGVseS4gSXQgbWF5IGJlIGltcG9ydGVkIGZyb21cbiAqIGBAd2ViY29tcG9uZW50cy9zaGFkeWNzcy9lbnRyeXBvaW50cy9jdXN0b20tc3R5bGUtaW50ZXJmYWNlLmpzYFxuICogb3IgYEBwb2x5bWVyL3BvbHltZXIvbGliL2VsZW1lbnRzL2N1c3RvbS1zdHlsZS5qc2AuXG4gKlxuICogSWYgdXNpbmcgdGhlIGRlcHJlY2F0ZWQgYEBhcHBseWAgbWl4aW4gcHJvcG9zYWwsIGltcG9ydFxuICogYFNoYWR5Q1NTTW9kdWxlLnVzaW5nQXBwbHkoKWAgaW5zdGVhZC5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1dlYkNvbXBvbmVudHNSZWFkeU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1NIQURZQ1NTX1NIQVJFRF9TVFlMRVNfSE9TVF9QUk9WSURFUl1cbn0pXG5leHBvcnQgY2xhc3MgU2hhZHlDU1NNb2R1bGUge1xuICAvKipcbiAgICogRm9yY2VzIE9yaWdhbWkgdG8gcmVnaXN0ZXIgYWxsIHN0eWxlc2hlZXRzIHdpdGggU2hhZHlDU1MgcmVnYXJkbGVzcyBvZlxuICAgKiBuYXRpdmUgQ1NTIGN1c3RvbSBwcm9wZXJ0eSBzdXBwb3J0LiBJbXBvcnQgYFNoYWR5Q1NTTW9kdWxlLnVzaW5nQXBwbHkoKWBcbiAgICogd2hlbiB1c2luZyBgQGFwcGx5YCBtaXhpbnMuXG4gICAqL1xuICBzdGF0aWMgdXNpbmdBcHBseSgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNoYWR5Q1NTTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBVU0lOR19BUFBMWSxcbiAgICAgICAgICB1c2VWYWx1ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19