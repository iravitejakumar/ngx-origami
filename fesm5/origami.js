import { __decorate } from 'tslib';
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

/**
 * Generated bundle index. Do not edit.
 */

export { OrigamiModule };
//# sourceMappingURL=origami.js.map
