import { __decorate } from "tslib";
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { WebComponentsReadyModule } from 'ngx-origami/polyfills';
import { shimHTMLTemplateAppend } from './shim-template-append';
import { TemplateDirective } from './template.directive';
shimHTMLTemplateAppend();
var ɵ0 = shimHTMLTemplateAppend;
export var TEMPLATES_READY_PROVIDER = {
    provide: APP_INITIALIZER,
    multi: true,
    useValue: ɵ0
};
var TemplateModule = /** @class */ (function () {
    function TemplateModule() {
    }
    TemplateModule = __decorate([
        NgModule({
            imports: [WebComponentsReadyModule],
            declarations: [TemplateDirective],
            providers: [TEMPLATES_READY_PROVIDER],
            exports: [TemplateDirective]
        })
    ], TemplateModule);
    return TemplateModule;
}());
export { TemplateModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9yaWdhbWkvdGVtcGxhdGVzLyIsInNvdXJjZXMiOlsic3JjL3RlbXBsYXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBWSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFekQsc0JBQXNCLEVBQUUsQ0FBQztTQUtiLHNCQUFzQjtBQUhsQyxNQUFNLENBQUMsSUFBTSx3QkFBd0IsR0FBYTtJQUNoRCxPQUFPLEVBQUUsZUFBZTtJQUN4QixLQUFLLEVBQUUsSUFBSTtJQUNYLFFBQVEsSUFBd0I7Q0FDakMsQ0FBQztBQVFGO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixjQUFjO1FBTjFCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ25DLFlBQVksRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQ2pDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ3JDLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO1NBQzdCLENBQUM7T0FDVyxjQUFjLENBQUc7SUFBRCxxQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgUHJvdmlkZXIsIEFQUF9JTklUSUFMSVpFUiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2ViQ29tcG9uZW50c1JlYWR5TW9kdWxlIH0gZnJvbSAnbmd4LW9yaWdhbWkvcG9seWZpbGxzJztcbmltcG9ydCB7IHNoaW1IVE1MVGVtcGxhdGVBcHBlbmQgfSBmcm9tICcuL3NoaW0tdGVtcGxhdGUtYXBwZW5kJztcbmltcG9ydCB7IFRlbXBsYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi90ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuXG5zaGltSFRNTFRlbXBsYXRlQXBwZW5kKCk7XG5cbmV4cG9ydCBjb25zdCBURU1QTEFURVNfUkVBRFlfUFJPVklERVI6IFByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gIG11bHRpOiB0cnVlLFxuICB1c2VWYWx1ZTogc2hpbUhUTUxUZW1wbGF0ZUFwcGVuZFxufTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1dlYkNvbXBvbmVudHNSZWFkeU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1RlbXBsYXRlRGlyZWN0aXZlXSxcbiAgcHJvdmlkZXJzOiBbVEVNUExBVEVTX1JFQURZX1BST1ZJREVSXSxcbiAgZXhwb3J0czogW1RlbXBsYXRlRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZU1vZHVsZSB7fVxuIl19