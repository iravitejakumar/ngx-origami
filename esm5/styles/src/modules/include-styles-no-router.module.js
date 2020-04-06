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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZS1zdHlsZXMtbm8tcm91dGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RlYmFrZXJ5L29yaWdhbWkvc3R5bGVzLyIsInNvdXJjZXMiOlsic3JjL21vZHVsZXMvaW5jbHVkZS1zdHlsZXMtbm8tcm91dGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVuRTs7Ozs7OztHQU9HO0FBSUg7SUFBQTtJQUEwQyxDQUFDO0lBQTlCLDJCQUEyQjtRQUh2QyxRQUFRLENBQUM7WUFDUixTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUM5QyxDQUFDO09BQ1csMkJBQTJCLENBQUc7SUFBRCxrQ0FBQztDQUFBLEFBQTNDLElBQTJDO1NBQTlCLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJTkpFQ1RfU1RZTEVTX05PX1JPVVRFUl9QUk9WSURFUiB9IGZyb20gJy4vaW5qZWN0LXN0eWxlcyc7XG5cbi8qKlxuICogSW1wb3J0aW5nIHRoaXMgbW9kdWxlIHdpbGwgYWRkIHRoZSBhYmlsaXR5IGZvciBBbmd1bGFyIGNvbXBvbmVudHMgdG8gaW5jbHVkZVxuICogUG9seW1lciBzdHlsZSBtb2R1bGVzIHdpdGggdGhlIGBASW5jbHVkZVN0eWxlcygpYCBkZWNvcmF0b3IuIFRoaXMgbW9kdWxlXG4gKiBvbmx5IG5lZWRzIHRvIGJlIGltcG9ydGVkIG9uY2UgYXQgdGhlIHJvb3QgY29tcG9uZW50LlxuICpcbiAqIFRoaXMgbW9kdWxlIGRvZXMgX25vdF8gcmVxdWlyZSBgQGFuZ3VsYXIvcm91dGVyYCBhbmQgd2lsbCBub3QgaW5qZWN0IHN0eWxlc1xuICogaW50byBsYXp5IGxvYWRlZCBjb21wb25lbnRzLlxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtJTkpFQ1RfU1RZTEVTX05PX1JPVVRFUl9QUk9WSURFUl1cbn0pXG5leHBvcnQgY2xhc3MgSW5jbHVkZVN0eWxlc05vUm91dGVyTW9kdWxlIHt9XG4iXX0=