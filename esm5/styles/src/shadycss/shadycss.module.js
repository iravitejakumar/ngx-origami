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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZHljc3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9yaWdhbWkvc3R5bGVzLyIsInNvdXJjZXMiOlsic3JjL3NoYWR5Y3NzL3NoYWR5Y3NzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTVFOzs7Ozs7Ozs7O0dBVUc7QUFLSDtJQUFBO0lBaUJBLENBQUM7dUJBakJZLGNBQWM7SUFDekI7Ozs7T0FJRztJQUNJLHlCQUFVLEdBQWpCO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFoQlUsY0FBYztRQUoxQixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztZQUNuQyxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztTQUNsRCxDQUFDO09BQ1csY0FBYyxDQWlCMUI7SUFBRCxxQkFBQztDQUFBLEFBakJELElBaUJDO1NBakJZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2ViQ29tcG9uZW50c1JlYWR5TW9kdWxlIH0gZnJvbSAnbmd4LW9yaWdhbWkvcG9seWZpbGxzJztcbmltcG9ydCB7IFVTSU5HX0FQUExZIH0gZnJvbSAnLi9wcm9jZXNzLXN0eWxlc2hlZXRzJztcbmltcG9ydCB7IFNIQURZQ1NTX1NIQVJFRF9TVFlMRVNfSE9TVF9QUk9WSURFUiB9IGZyb20gJy4vc2hhcmVkLXN0eWxlcy1ob3N0JztcblxuLyoqXG4gKiBBZGRzIFNoYWR5Q1NTIHN1cHBvcnQgdG8gQW5ndWxhci4gVGhpcyBhbGxvd3MgdGhlIHVzZSBvZiBDU1MgY3VzdG9tXG4gKiBwcm9wZXJ0aWVzIGluIEFuZ3VsYXIgc3R5bGVzIG9uIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgdGhlbS5cbiAqXG4gKiBUaGUgU2hhZHlDU1MgcG9seWZpbGwgbXVzdCBiZSBpbXBvcnRlZCBzZXBhcmF0ZWx5LiBJdCBtYXkgYmUgaW1wb3J0ZWQgZnJvbVxuICogYEB3ZWJjb21wb25lbnRzL3NoYWR5Y3NzL2VudHJ5cG9pbnRzL2N1c3RvbS1zdHlsZS1pbnRlcmZhY2UuanNgXG4gKiBvciBgQHBvbHltZXIvcG9seW1lci9saWIvZWxlbWVudHMvY3VzdG9tLXN0eWxlLmpzYC5cbiAqXG4gKiBJZiB1c2luZyB0aGUgZGVwcmVjYXRlZCBgQGFwcGx5YCBtaXhpbiBwcm9wb3NhbCwgaW1wb3J0XG4gKiBgU2hhZHlDU1NNb2R1bGUudXNpbmdBcHBseSgpYCBpbnN0ZWFkLlxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbV2ViQ29tcG9uZW50c1JlYWR5TW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbU0hBRFlDU1NfU0hBUkVEX1NUWUxFU19IT1NUX1BST1ZJREVSXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFkeUNTU01vZHVsZSB7XG4gIC8qKlxuICAgKiBGb3JjZXMgT3JpZ2FtaSB0byByZWdpc3RlciBhbGwgc3R5bGVzaGVldHMgd2l0aCBTaGFkeUNTUyByZWdhcmRsZXNzIG9mXG4gICAqIG5hdGl2ZSBDU1MgY3VzdG9tIHByb3BlcnR5IHN1cHBvcnQuIEltcG9ydCBgU2hhZHlDU1NNb2R1bGUudXNpbmdBcHBseSgpYFxuICAgKiB3aGVuIHVzaW5nIGBAYXBwbHlgIG1peGlucy5cbiAgICovXG4gIHN0YXRpYyB1c2luZ0FwcGx5KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU2hhZHlDU1NNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFVTSU5HX0FQUExZLFxuICAgICAgICAgIHVzZVZhbHVlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=