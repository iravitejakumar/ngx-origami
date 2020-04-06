import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { OrigamiFormsModule } from '@codebakery/origami/forms';
import { IncludeStylesModule, ShadyCSSModule } from '@codebakery/origami/styles';
import { TemplateModule } from '@codebakery/origami/templates';
import { WebComponentsReadyModule } from '@codebakery/origami/polyfills';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JpZ2FtaS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kZWJha2VyeS9vcmlnYW1pLyIsInNvdXJjZXMiOlsic3JjL29yaWdhbWkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFDTCxtQkFBbUIsRUFDbkIsY0FBYyxFQUNmLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpFOztHQUVHO0FBaUJIO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixhQUFhO1FBaEJ6QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1Asa0JBQWtCO2dCQUNsQixtQkFBbUI7Z0JBQ25CLGNBQWM7Z0JBQ2QsY0FBYztnQkFDZCx3QkFBd0I7YUFDekI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1Asa0JBQWtCO2dCQUNsQixtQkFBbUI7Z0JBQ25CLGNBQWM7Z0JBQ2QsY0FBYztnQkFDZCx3QkFBd0I7YUFDekI7U0FDRixDQUFDO09BQ1csYUFBYSxDQUFHO0lBQUQsb0JBQUM7Q0FBQSxBQUE3QixJQUE2QjtTQUFoQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9yaWdhbWlGb3Jtc01vZHVsZSB9IGZyb20gJ0Bjb2RlYmFrZXJ5L29yaWdhbWkvZm9ybXMnO1xuaW1wb3J0IHtcbiAgSW5jbHVkZVN0eWxlc01vZHVsZSxcbiAgU2hhZHlDU1NNb2R1bGVcbn0gZnJvbSAnQGNvZGViYWtlcnkvb3JpZ2FtaS9zdHlsZXMnO1xuaW1wb3J0IHsgVGVtcGxhdGVNb2R1bGUgfSBmcm9tICdAY29kZWJha2VyeS9vcmlnYW1pL3RlbXBsYXRlcyc7XG5pbXBvcnQgeyBXZWJDb21wb25lbnRzUmVhZHlNb2R1bGUgfSBmcm9tICdAY29kZWJha2VyeS9vcmlnYW1pL3BvbHlmaWxscyc7XG5cbi8qKlxuICogUHJvdmlkZXMgYWxsIGZlYXR1cmVzIG9mIE9yaWdhbWkgaW4gb25lIG1vZHVsZS5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE9yaWdhbWlGb3Jtc01vZHVsZSxcbiAgICBJbmNsdWRlU3R5bGVzTW9kdWxlLFxuICAgIFNoYWR5Q1NTTW9kdWxlLFxuICAgIFRlbXBsYXRlTW9kdWxlLFxuICAgIFdlYkNvbXBvbmVudHNSZWFkeU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgT3JpZ2FtaUZvcm1zTW9kdWxlLFxuICAgIEluY2x1ZGVTdHlsZXNNb2R1bGUsXG4gICAgU2hhZHlDU1NNb2R1bGUsXG4gICAgVGVtcGxhdGVNb2R1bGUsXG4gICAgV2ViQ29tcG9uZW50c1JlYWR5TW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgT3JpZ2FtaU1vZHVsZSB7fVxuIl19