var ShadyCSSModule_1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZHljc3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvZGViYWtlcnkvb3JpZ2FtaS9zdHlsZXMvIiwic291cmNlcyI6WyJzcmMvc2hhZHljc3Mvc2hhZHljc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTVFOzs7Ozs7Ozs7O0dBVUc7QUFLSCxJQUFhLGNBQWMsc0JBQTNCLE1BQWEsY0FBYztJQUN6Qjs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVU7UUFDZixPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsUUFBUSxFQUFFLElBQUk7aUJBQ2Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQWpCWSxjQUFjO0lBSjFCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO1FBQ25DLFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO0tBQ2xELENBQUM7R0FDVyxjQUFjLENBaUIxQjtTQWpCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdlYkNvbXBvbmVudHNSZWFkeU1vZHVsZSB9IGZyb20gJ0Bjb2RlYmFrZXJ5L29yaWdhbWkvcG9seWZpbGxzJztcbmltcG9ydCB7IFVTSU5HX0FQUExZIH0gZnJvbSAnLi9wcm9jZXNzLXN0eWxlc2hlZXRzJztcbmltcG9ydCB7IFNIQURZQ1NTX1NIQVJFRF9TVFlMRVNfSE9TVF9QUk9WSURFUiB9IGZyb20gJy4vc2hhcmVkLXN0eWxlcy1ob3N0JztcblxuLyoqXG4gKiBBZGRzIFNoYWR5Q1NTIHN1cHBvcnQgdG8gQW5ndWxhci4gVGhpcyBhbGxvd3MgdGhlIHVzZSBvZiBDU1MgY3VzdG9tXG4gKiBwcm9wZXJ0aWVzIGluIEFuZ3VsYXIgc3R5bGVzIG9uIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgdGhlbS5cbiAqXG4gKiBUaGUgU2hhZHlDU1MgcG9seWZpbGwgbXVzdCBiZSBpbXBvcnRlZCBzZXBhcmF0ZWx5LiBJdCBtYXkgYmUgaW1wb3J0ZWQgZnJvbVxuICogYEB3ZWJjb21wb25lbnRzL3NoYWR5Y3NzL2VudHJ5cG9pbnRzL2N1c3RvbS1zdHlsZS1pbnRlcmZhY2UuanNgXG4gKiBvciBgQHBvbHltZXIvcG9seW1lci9saWIvZWxlbWVudHMvY3VzdG9tLXN0eWxlLmpzYC5cbiAqXG4gKiBJZiB1c2luZyB0aGUgZGVwcmVjYXRlZCBgQGFwcGx5YCBtaXhpbiBwcm9wb3NhbCwgaW1wb3J0XG4gKiBgU2hhZHlDU1NNb2R1bGUudXNpbmdBcHBseSgpYCBpbnN0ZWFkLlxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbV2ViQ29tcG9uZW50c1JlYWR5TW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbU0hBRFlDU1NfU0hBUkVEX1NUWUxFU19IT1NUX1BST1ZJREVSXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFkeUNTU01vZHVsZSB7XG4gIC8qKlxuICAgKiBGb3JjZXMgT3JpZ2FtaSB0byByZWdpc3RlciBhbGwgc3R5bGVzaGVldHMgd2l0aCBTaGFkeUNTUyByZWdhcmRsZXNzIG9mXG4gICAqIG5hdGl2ZSBDU1MgY3VzdG9tIHByb3BlcnR5IHN1cHBvcnQuIEltcG9ydCBgU2hhZHlDU1NNb2R1bGUudXNpbmdBcHBseSgpYFxuICAgKiB3aGVuIHVzaW5nIGBAYXBwbHlgIG1peGlucy5cbiAgICovXG4gIHN0YXRpYyB1c2luZ0FwcGx5KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU2hhZHlDU1NNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFVTSU5HX0FQUExZLFxuICAgICAgICAgIHVzZVZhbHVlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=