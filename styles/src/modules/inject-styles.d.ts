import { NgModuleRef, Provider, RendererFactory2 } from '@angular/core';
/**
 * Provider that ensures `injectIncludeStyles()` will run on application
 * startup before components are created.
 */
export declare const INJECT_STYLES_PROVIDER: Provider;
/**
 * Provider that ensures `injectIncludeStyles()` will run on application
 * startup before components are created. This provider does _not_ require
 * @angular/router.
 */
export declare const INJECT_STYLES_NO_ROUTER_PROVIDER: Provider;
/**
 * Returns a callback that, when invoked, will use the provided `NgModuleRef`
 * to patch the renderer factory and scan the component factory resolver in
 * order to enable injecting Polymer style modules for components decorated with
 * `@IncludeStyles()`.
 *
 * This function will additionally listen to any lazy-loaded modules from
 * Angular's router and scan component factory resolvers that are added after
 * the app has initialized.
 *
 * @param ngModule the root `NgModule` reference
 * @returns a callback that will begin the injection process
 */
export declare function injectIncludeStyles(ngModule: NgModuleRef<any>): () => void;
/**
 * Returns a callback that, when invoked, will use the provided `NgModuleRef`
 * to patch the renderer factory and scan the component factory resolver in
 * order to enable injecting Polymer style modules for components decorated with
 * `@IncludeStyles()`.
 *
 * @param ngModule the root `NgModule` reference
 * @returns a callback that will begin the injection process
 */
export declare function injectIncludeStylesNoRouter(ngModule: NgModuleRef<any>): () => void;
/**
 * Patches a `RendererFactory2` to overwrite `createRenderer()` and add styles
 * imported from Polymer style modules according to `@IncludeStyles()`
 * decorators to the `RendererType2` data for the element.
 *
 * If the element type using emulated view encapsulation, the styles imported
 * will be converted to preserve encapsulation.
 *
 * @param factory the renderer factory to patch
 */
export declare function patchRendererFactory(factory: RendererFactory2): void;
