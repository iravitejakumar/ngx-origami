var ShadyCSSModule_1;
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { WebComponentsReadyModule } from 'ngx-origami/polyfills';
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
let ShadyCSSModule = ShadyCSSModule_1 = class ShadyCSSModule {
    /**
     * Forces Origami to register all stylesheets with ShadyCSS regardless of
     * native CSS custom property support. Import `ShadyCSSModule.usingApply()`
     * when using `@apply` mixins.
     */
    static usingApply() {
        return {
            ngModule: ShadyCSSModule_1,
            providers: [
                {
                    provide: USING_APPLY,
                    useValue: true
                }
            ]
        };
    }
};
ShadyCSSModule = ShadyCSSModule_1 = __decorate([
    NgModule({
        imports: [WebComponentsReadyModule],
        providers: [SHADYCSS_SHARED_STYLES_HOST_PROVIDER]
    })
], ShadyCSSModule);
export { ShadyCSSModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZHljc3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9yaWdhbWkvc3R5bGVzLyIsInNvdXJjZXMiOlsic3JjL3NoYWR5Y3NzL3NoYWR5Y3NzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU1RTs7Ozs7Ozs7OztHQVVHO0FBS0gsSUFBYSxjQUFjLHNCQUEzQixNQUFhLGNBQWM7SUFDekI7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVO1FBQ2YsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFqQlksY0FBYztJQUoxQixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztRQUNuQyxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztLQUNsRCxDQUFDO0dBQ1csY0FBYyxDQWlCMUI7U0FqQlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXZWJDb21wb25lbnRzUmVhZHlNb2R1bGUgfSBmcm9tICduZ3gtb3JpZ2FtaS9wb2x5ZmlsbHMnO1xuaW1wb3J0IHsgVVNJTkdfQVBQTFkgfSBmcm9tICcuL3Byb2Nlc3Mtc3R5bGVzaGVldHMnO1xuaW1wb3J0IHsgU0hBRFlDU1NfU0hBUkVEX1NUWUxFU19IT1NUX1BST1ZJREVSIH0gZnJvbSAnLi9zaGFyZWQtc3R5bGVzLWhvc3QnO1xuXG4vKipcbiAqIEFkZHMgU2hhZHlDU1Mgc3VwcG9ydCB0byBBbmd1bGFyLiBUaGlzIGFsbG93cyB0aGUgdXNlIG9mIENTUyBjdXN0b21cbiAqIHByb3BlcnRpZXMgaW4gQW5ndWxhciBzdHlsZXMgb24gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCB0aGVtLlxuICpcbiAqIFRoZSBTaGFkeUNTUyBwb2x5ZmlsbCBtdXN0IGJlIGltcG9ydGVkIHNlcGFyYXRlbHkuIEl0IG1heSBiZSBpbXBvcnRlZCBmcm9tXG4gKiBgQHdlYmNvbXBvbmVudHMvc2hhZHljc3MvZW50cnlwb2ludHMvY3VzdG9tLXN0eWxlLWludGVyZmFjZS5qc2BcbiAqIG9yIGBAcG9seW1lci9wb2x5bWVyL2xpYi9lbGVtZW50cy9jdXN0b20tc3R5bGUuanNgLlxuICpcbiAqIElmIHVzaW5nIHRoZSBkZXByZWNhdGVkIGBAYXBwbHlgIG1peGluIHByb3Bvc2FsLCBpbXBvcnRcbiAqIGBTaGFkeUNTU01vZHVsZS51c2luZ0FwcGx5KClgIGluc3RlYWQuXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtXZWJDb21wb25lbnRzUmVhZHlNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtTSEFEWUNTU19TSEFSRURfU1RZTEVTX0hPU1RfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIFNoYWR5Q1NTTW9kdWxlIHtcbiAgLyoqXG4gICAqIEZvcmNlcyBPcmlnYW1pIHRvIHJlZ2lzdGVyIGFsbCBzdHlsZXNoZWV0cyB3aXRoIFNoYWR5Q1NTIHJlZ2FyZGxlc3Mgb2ZcbiAgICogbmF0aXZlIENTUyBjdXN0b20gcHJvcGVydHkgc3VwcG9ydC4gSW1wb3J0IGBTaGFkeUNTU01vZHVsZS51c2luZ0FwcGx5KClgXG4gICAqIHdoZW4gdXNpbmcgYEBhcHBseWAgbWl4aW5zLlxuICAgKi9cbiAgc3RhdGljIHVzaW5nQXBwbHkoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTaGFkeUNTU01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVVNJTkdfQVBQTFksXG4gICAgICAgICAgdXNlVmFsdWU6IHRydWVcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==