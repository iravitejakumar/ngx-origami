import { __decorate } from 'tslib';
import { NgModule } from '@angular/core';
import { OrigamiFormsModule } from '@codebakery/origami/forms';
import { IncludeStylesModule, ShadyCSSModule } from '@codebakery/origami/styles';
import { TemplateModule } from '@codebakery/origami/templates';
import { WebComponentsReadyModule } from '@codebakery/origami/polyfills';

/**
 * Provides all features of Origami in one module.
 */
let OrigamiModule = class OrigamiModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { OrigamiModule };
//# sourceMappingURL=origami.js.map
