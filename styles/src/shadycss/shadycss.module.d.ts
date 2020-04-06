import { ModuleWithProviders } from '@angular/core';
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
export declare class ShadyCSSModule {
    /**
     * Forces Origami to register all stylesheets with ShadyCSS regardless of
     * native CSS custom property support. Import `ShadyCSSModule.usingApply()`
     * when using `@apply` mixins.
     */
    static usingApply(): ModuleWithProviders;
}
