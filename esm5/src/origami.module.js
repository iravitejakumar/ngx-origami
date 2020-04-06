import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { OrigamiFormsModule } from 'ngx-origami/forms';
import { IncludeStylesModule, ShadyCSSModule } from 'ngx-origami/styles';
import { TemplateModule } from 'ngx-origami/templates';
import { WebComponentsReadyModule } from 'ngx-origami/polyfills';
/**
 * Provides all features of Origami in one module.
 */
var OrigamiModule = /** @class */ (function () {
    function OrigamiModule() {
    }
    OrigamiModule = __decorate([
        NgModule({
            imports: [
                OrigamiFormsModule,
                IncludeStylesModule,
                ShadyCSSModule,
                TemplateModule,
                WebComponentsReadyModule
            ],
            exports: [
                OrigamiFormsModule,
                IncludeStylesModule,
                ShadyCSSModule,
                TemplateModule,
                WebComponentsReadyModule
            ]
        })
    ], OrigamiModule);
    return OrigamiModule;
}());
export { OrigamiModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JpZ2FtaS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS8iLCJzb3VyY2VzIjpbInNyYy9vcmlnYW1pLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN2RCxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGNBQWMsRUFDZixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRTs7R0FFRztBQWlCSDtJQUFBO0lBQTRCLENBQUM7SUFBaEIsYUFBYTtRQWhCekIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQixjQUFjO2dCQUNkLGNBQWM7Z0JBQ2Qsd0JBQXdCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQixjQUFjO2dCQUNkLGNBQWM7Z0JBQ2Qsd0JBQXdCO2FBQ3pCO1NBQ0YsQ0FBQztPQUNXLGFBQWEsQ0FBRztJQUFELG9CQUFDO0NBQUEsQUFBN0IsSUFBNkI7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmlnYW1pRm9ybXNNb2R1bGUgfSBmcm9tICduZ3gtb3JpZ2FtaS9mb3Jtcyc7XG5pbXBvcnQge1xuICBJbmNsdWRlU3R5bGVzTW9kdWxlLFxuICBTaGFkeUNTU01vZHVsZVxufSBmcm9tICduZ3gtb3JpZ2FtaS9zdHlsZXMnO1xuaW1wb3J0IHsgVGVtcGxhdGVNb2R1bGUgfSBmcm9tICduZ3gtb3JpZ2FtaS90ZW1wbGF0ZXMnO1xuaW1wb3J0IHsgV2ViQ29tcG9uZW50c1JlYWR5TW9kdWxlIH0gZnJvbSAnbmd4LW9yaWdhbWkvcG9seWZpbGxzJztcblxuLyoqXG4gKiBQcm92aWRlcyBhbGwgZmVhdHVyZXMgb2YgT3JpZ2FtaSBpbiBvbmUgbW9kdWxlLlxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgT3JpZ2FtaUZvcm1zTW9kdWxlLFxuICAgIEluY2x1ZGVTdHlsZXNNb2R1bGUsXG4gICAgU2hhZHlDU1NNb2R1bGUsXG4gICAgVGVtcGxhdGVNb2R1bGUsXG4gICAgV2ViQ29tcG9uZW50c1JlYWR5TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBPcmlnYW1pRm9ybXNNb2R1bGUsXG4gICAgSW5jbHVkZVN0eWxlc01vZHVsZSxcbiAgICBTaGFkeUNTU01vZHVsZSxcbiAgICBUZW1wbGF0ZU1vZHVsZSxcbiAgICBXZWJDb21wb25lbnRzUmVhZHlNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBPcmlnYW1pTW9kdWxlIHt9XG4iXX0=