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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZS1zdHlsZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9yaWdhbWkvc3R5bGVzLyIsInNvdXJjZXMiOlsic3JjL21vZHVsZXMvaW5jbHVkZS1zdHlsZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpEOzs7Ozs7OztHQVFHO0FBSUg7SUFBQTtJQUFrQyxDQUFDO0lBQXRCLG1CQUFtQjtRQUgvQixRQUFRLENBQUM7WUFDUixTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNwQyxDQUFDO09BQ1csbUJBQW1CLENBQUc7SUFBRCwwQkFBQztDQUFBLEFBQW5DLElBQW1DO1NBQXRCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJTkpFQ1RfU1RZTEVTX1BST1ZJREVSIH0gZnJvbSAnLi9pbmplY3Qtc3R5bGVzJztcblxuLyoqXG4gKiBJbXBvcnRpbmcgdGhpcyBtb2R1bGUgd2lsbCBhZGQgdGhlIGFiaWxpdHkgZm9yIEFuZ3VsYXIgY29tcG9uZW50cyB0byBpbmNsdWRlXG4gKiBQb2x5bWVyIHN0eWxlIG1vZHVsZXMgd2l0aCB0aGUgYEBJbmNsdWRlU3R5bGVzKClgIGRlY29yYXRvci4gVGhpcyBtb2R1bGVcbiAqIG9ubHkgbmVlZHMgdG8gYmUgaW1wb3J0ZWQgb25jZSBhdCB0aGUgcm9vdCBjb21wb25lbnQuXG4gKlxuICogVGhpcyBtb2R1bGUgX3JlcXVpcmVzX2AgQGFuZ3VsYXIvcm91dGVyYCBpbiBvcmRlciB0byBpbmplY3Qgc3R5bGVzIGZvciBsYXp5XG4gKiBsb2FkZWQgY29tcG9uZW50cy4gVXNlIGBJbmplY3RTdHlsZXNOb1JvdXRlck1vZHVsZWAgaWYgeW91ciBhcHBsaWNhdGlvbiBkb2VzXG4gKiBub3QgdXNlIGBAYW5ndWxhci9yb3V0ZXJgLlxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtJTkpFQ1RfU1RZTEVTX1BST1ZJREVSXVxufSlcbmV4cG9ydCBjbGFzcyBJbmNsdWRlU3R5bGVzTW9kdWxlIHt9XG4iXX0=