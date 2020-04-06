import { __read, __spread } from "tslib";
import { APP_INITIALIZER, ComponentFactoryResolver, NgModuleRef, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { stylesFromModule } from '@polymer/polymer/lib/utils/style-gather';
import { whenSet } from 'ngx-origami/util';
import { getStyleModulesFor } from './include-styles';
import { styleToEmulatedEncapsulation } from './style-to-emulated-encapsulation';
import { getTypeFor, scanComponentFactoryResolver } from './type-selectors';
/**
 * Provider that ensures `injectIncludeStyles()` will run on application
 * startup before components are created.
 */
export var INJECT_STYLES_PROVIDER = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: injectIncludeStyles,
    deps: [NgModuleRef]
};
/**
 * Provider that ensures `injectIncludeStyles()` will run on application
 * startup before components are created. This provider does _not_ require
 * @angular/router.
 */
export var INJECT_STYLES_NO_ROUTER_PROVIDER = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: injectIncludeStylesNoRouter,
    deps: [NgModuleRef]
};
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
export function injectIncludeStyles(ngModule) {
    var injectStyles = injectIncludeStylesNoRouter(ngModule);
    return function () {
        injectStyles();
        var router = ngModule.injector.get(Router);
        router.events.subscribe(function (e) {
            if ('route' in e && !e.route._loadedConfig) {
                whenSet(e.route, '_loadedConfig', undefined, function (config) {
                    scanComponentFactoryResolver(config.module.injector.get(ComponentFactoryResolver));
                });
            }
        });
    };
}
/**
 * Returns a callback that, when invoked, will use the provided `NgModuleRef`
 * to patch the renderer factory and scan the component factory resolver in
 * order to enable injecting Polymer style modules for components decorated with
 * `@IncludeStyles()`.
 *
 * @param ngModule the root `NgModule` reference
 * @returns a callback that will begin the injection process
 */
export function injectIncludeStylesNoRouter(ngModule) {
    return function () {
        patchRendererFactory(ngModule.injector.get(RendererFactory2));
        scanComponentFactoryResolver(ngModule.injector.get(ComponentFactoryResolver));
    };
}
var INJECTED_SELECTORS = [];
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
export function patchRendererFactory(factory) {
    var $createRenderer = factory.createRenderer;
    factory.createRenderer = function (element, type) {
        var _a;
        var selector = element && element.localName;
        if (selector && type && INJECTED_SELECTORS.indexOf(selector) === -1) {
            var styleModules = getStyleModulesFor(getTypeFor(selector));
            var styles = styleModules.map(function (styleModule) {
                var styleElements = stylesFromModule(styleModule);
                return styleElements.map(function (e) { return e.innerText; }).join('\n');
            });
            switch (type.encapsulation) {
                case ViewEncapsulation.Emulated:
                default:
                    styles = styles.map(function (style) { return styleToEmulatedEncapsulation(style); });
                    break;
                case ViewEncapsulation.None:
                case ViewEncapsulation.Native:
                case ViewEncapsulation.ShadowDom:
                    break;
            }
            (_a = type.styles).push.apply(_a, __spread(styles));
            INJECTED_SELECTORS.push(selector);
        }
        return $createRenderer.apply(this, arguments);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LXN0eWxlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcmlnYW1pL3N0eWxlcy8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2luamVjdC1zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxlQUFlLEVBQ2Ysd0JBQXdCLEVBQ3hCLFdBQVcsRUFFWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdEQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLFVBQVUsRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTVFOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLHNCQUFzQixHQUFhO0lBQzlDLE9BQU8sRUFBRSxlQUFlO0lBQ3hCLEtBQUssRUFBRSxJQUFJO0lBQ1gsVUFBVSxFQUFFLG1CQUFtQjtJQUMvQixJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7Q0FDcEIsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsSUFBTSxnQ0FBZ0MsR0FBYTtJQUN4RCxPQUFPLEVBQUUsZUFBZTtJQUN4QixLQUFLLEVBQUUsSUFBSTtJQUNYLFVBQVUsRUFBRSwyQkFBMkI7SUFDdkMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO0NBQ3BCLENBQUM7QUFFRjs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsUUFBMEI7SUFDNUQsSUFBTSxZQUFZLEdBQUcsMkJBQTJCLENBQUMs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VElBTElaRVIsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgTmdNb2R1bGVSZWYsXG4gIFByb3ZpZGVyLFxuICBSZW5kZXJlckZhY3RvcnkyLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBzdHlsZXNGcm9tTW9kdWxlIH0gZnJvbSAnQHBvbHltZXIvcG9seW1lci9saWIvdXRpbHMvc3R5bGUtZ2F0aGVyJztcbmltcG9ydCB7IHdoZW5TZXQgfSBmcm9tICduZ3gtb3JpZ2FtaS91dGlsJztcbmltcG9ydCB7IGdldFN0eWxlTW9kdWxlc0ZvciB9IGZyb20gJy4vaW5jbHVkZS1zdHlsZXMnO1xuaW1wb3J0IHsgc3R5bGVUb0VtdWxhdGVkRW5jYXBzdWxhdGlvbiB9IGZyb20gJy4vc3R5bGUtdG8tZW11bGF0ZWQtZW5jYXBzdWxhdGlvbic7XG5pbXBvcnQgeyBnZXRUeXBlRm9yLCBzY2FuQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnLi90eXBlLXNlbGVjdG9ycyc7XG5cbi8qKlxuICogUHJvdmlkZXIgdGhhdCBlbnN1cmVzIGBpbmplY3RJbmNsdWRlU3R5bGVzKClgIHdpbGwgcnVuIG9uIGFwcGxpY2F0aW9uXG4gKiBzdGFydHVwIGJlZm9yZSBjb21wb25lbnRzIGFyZSBjcmVhdGVkLlxuICovXG5leHBvcnQgY29uc3QgSU5KRUNUX1NUWUxFU19QUk9WSURFUjogUHJvdmlkZXIgPSB7XG4gIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgbXVsdGk6IHRydWUsXG4gIHVzZUZhY3Rvcnk6IGluamVjdEluY2x1ZGVTdHlsZXMsXG4gIGRlcHM6IFtOZ01vZHVsZVJlZl1cbn07XG5cbi8qKlxuICogUHJvdmlkZXIgdGhhdCBlbnN1cmVzIGBpbmplY3RJbmNsdWRlU3R5bGVzKClgIHdpbGwgcnVuIG9uIGFwcGxpY2F0aW9uXG4gKiBzdGFydHVwIGJlZm9yZSBjb21wb25lbnRzIGFyZSBjcmVhdGVkLiBUaGlzIHByb3ZpZGVyIGRvZXMgX25vdF8gcmVxdWlyZVxuICogQGFuZ3VsYXIvcm91dGVyLlxuICovXG5leHBvcnQgY29uc3QgSU5KRUNUX1NUWUxFU19OT19ST1VURVJfUFJPVklERVI6IFByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gIG11bHRpOiB0cnVlLFxuICB1c2VGYWN0b3J5OiBpbmplY3RJbmNsdWRlU3R5bGVzTm9Sb3V0ZXIsXG4gIGRlcHM6IFtOZ01vZHVsZVJlZl1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGNhbGxiYWNrIHRoYXQsIHdoZW4gaW52b2tlZCwgd2lsbCB1c2UgdGhlIHByb3ZpZGVkIGBOZ01vZHVsZVJlZmBcbiAqIHRvIHBhdGNoIHRoZSByZW5kZXJlciBmYWN0b3J5IGFuZCBzY2FuIHRoZSBjb21wb25lbnQgZmFjdG9yeSByZXNvbHZlciBpblxuICogb3JkZXIgdG8gZW5hYmxlIGluamVjdGluZyBQb2x5bWVyIHN0eWxlIG1vZHVsZXMgZm9yIGNvbXBvbmVudHMgZGVjb3JhdGVkIHdpdGhcbiAqIGBASW5jbHVkZVN0eWxlcygpYC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYWRkaXRpb25hbGx5IGxpc3RlbiB0byBhbnkgbGF6eS1sb2FkZWQgbW9kdWxlcyBmcm9tXG4gKiBBbmd1bGFyJ3Mgcm91dGVyIGFuZCBzY2FuIGNvbXBvbmVudCBmYWN0b3J5IHJlc29sdmVycyB0aGF0IGFyZSBhZGRlZCBhZnRlclxuICogdGhlIGFwcCBoYXMgaW5pdGlhbGl6ZWQuXG4gKlxuICogQHBhcmFtIG5nTW9kdWxlIHRoZSByb290IGBOZ01vZHVsZWAgcmVmZXJlbmNlXG4gKiBAcmV0dXJucyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZWdpbiB0aGUgaW5qZWN0aW9uIHByb2Nlc3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEluY2x1ZGVTdHlsZXMobmdNb2R1bGU6IE5nTW9kdWxlUmVmPGFueT4pOiAoKSA9PiB2b2lkIHtcbiAgY29uc3QgaW5qZWN0U3R5bGVzID0gaW5qZWN0SW5jbHVkZVN0eWxlc05vUm91dGVyKG5nTW9kdWxlKTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBpbmplY3RTdHlsZXMoKTtcbiAgICBjb25zdCByb3V0ZXIgPSA8Um91dGVyPm5nTW9kdWxlLmluamVjdG9yLmdldChSb3V0ZXIpO1xuICAgIHJvdXRlci5ldmVudHMuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgaWYgKCdyb3V0ZScgaW4gZSAmJiAhKDxhbnk+ZS5yb3V0ZSkuX2xvYWRlZENvbmZpZykge1xuICAgICAgICB3aGVuU2V0KDxhbnk+ZS5yb3V0ZSwgJ19sb2FkZWRDb25maWcnLCB1bmRlZmluZWQsIGNvbmZpZyA9PiB7XG4gICAgICAgICAgc2NhbkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcihcbiAgICAgICAgICAgIGNvbmZpZy5tb2R1bGUuaW5qZWN0b3IuZ2V0KENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcilcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY2FsbGJhY2sgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIHVzZSB0aGUgcHJvdmlkZWQgYE5nTW9kdWxlUmVmYFxuICogdG8gcGF0Y2ggdGhlIHJlbmRlcmVyIGZhY3RvcnkgYW5kIHNjYW4gdGhlIGNvbXBvbmVudCBmYWN0b3J5IHJlc29sdmVyIGluXG4gKiBvcmRlciB0byBlbmFibGUgaW5qZWN0aW5nIFBvbHltZXIgc3R5bGUgbW9kdWxlcyBmb3IgY29tcG9uZW50cyBkZWNvcmF0ZWQgd2l0aFxuICogYEBJbmNsdWRlU3R5bGVzKClgLlxuICpcbiAqIEBwYXJhbSBuZ01vZHVsZSB0aGUgcm9vdCBgTmdNb2R1bGVgIHJlZmVyZW5jZVxuICogQHJldHVybnMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmVnaW4gdGhlIGluamVjdGlvbiBwcm9jZXNzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RJbmNsdWRlU3R5bGVzTm9Sb3V0ZXIoXG4gIG5nTW9kdWxlOiBOZ01vZHVsZVJlZjxhbnk+XG4pOiAoKSA9PiB2b2lkIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBwYXRjaFJlbmRlcmVyRmFjdG9yeShuZ01vZHVsZS5pbmplY3Rvci5nZXQoUmVuZGVyZXJGYWN0b3J5MikpO1xuICAgIHNjYW5Db21wb25lbnRGYWN0b3J5UmVzb2x2ZXIoXG4gICAgICBuZ01vZHVsZS5pbmplY3Rvci5nZXQoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKVxuICAgICk7XG4gIH07XG59XG5cbmNvbnN0IElOSkVDVEVEX1NFTEVDVE9SUzogc3RyaW5nW10gPSBbXTtcblxuLyoqXG4gKiBQYXRjaGVzIGEgYFJlbmRlcmVyRmFjdG9yeTJgIHRvIG92ZXJ3cml0ZSBgY3JlYXRlUmVuZGVyZXIoKWAgYW5kIGFkZCBzdHlsZXNcbiAqIGltcG9ydGVkIGZyb20gUG9seW1lciBzdHlsZSBtb2R1bGVzIGFjY29yZGluZyB0byBgQEluY2x1ZGVTdHlsZXMoKWBcbiAqIGRlY29yYXRvcnMgdG8gdGhlIGBSZW5kZXJlclR5cGUyYCBkYXRhIGZvciB0aGUgZWxlbWVudC5cbiAqXG4gKiBJZiB0aGUgZWxlbWVudCB0eXBlIHVzaW5nIGVtdWxhdGVkIHZpZXcgZW5jYXBzdWxhdGlvbiwgdGhlIHN0eWxlcyBpbXBvcnRlZFxuICogd2lsbCBiZSBjb252ZXJ0ZWQgdG8gcHJlc2VydmUgZW5jYXBzdWxhdGlvbi5cbiAqXG4gKiBAcGFyYW0gZmFjdG9yeSB0aGUgcmVuZGVyZXIgZmFjdG9yeSB0byBwYXRjaFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hSZW5kZXJlckZhY3RvcnkoZmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5Mikge1xuICBjb25zdCAkY3JlYXRlUmVuZGVyZXIgPSBmYWN0b3J5LmNyZWF0ZVJlbmRlcmVyO1xuICBmYWN0b3J5LmNyZWF0ZVJlbmRlcmVyID0gZnVuY3Rpb24oZWxlbWVudCwgdHlwZSkge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gZWxlbWVudCAmJiBlbGVtZW50LmxvY2FsTmFtZTtcbiAgICBpZiAoc2VsZWN0b3IgJiYgdHlwZSAmJiBJTkpFQ1RFRF9TRUxFQ1RPUlMuaW5kZXhPZihzZWxlY3RvcikgPT09IC0xKSB7XG4gICAgICBjb25zdCBzdHlsZU1vZHVsZXMgPSBnZXRTdHlsZU1vZHVsZXNGb3IoZ2V0VHlwZUZvcihzZWxlY3RvcikpO1xuICAgICAgbGV0IHN0eWxlcyA9IHN0eWxlTW9kdWxlcy5tYXAoc3R5bGVNb2R1bGUgPT4ge1xuICAgICAgICBjb25zdCBzdHlsZUVsZW1lbnRzID0gc3R5bGVzRnJvbU1vZHVsZShzdHlsZU1vZHVsZSk7XG4gICAgICAgIHJldHVybiBzdHlsZUVsZW1lbnRzLm1hcChlID0+IGUuaW5uZXJUZXh0KS5qb2luKCdcXG4nKTtcbiAgICAgIH0pO1xuICAgICAgc3dpdGNoICh0eXBlLmVuY2Fwc3VsYXRpb24pIHtcbiAgICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBzdHlsZXMgPSBzdHlsZXMubWFwKHN0eWxlID0+IHN0eWxlVG9FbXVsYXRlZEVuY2Fwc3VsYXRpb24oc3R5bGUpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lOlxuICAgICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLk5hdGl2ZTpcbiAgICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb206XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHR5cGUuc3R5bGVzLnB1c2goLi4uc3R5bGVzKTtcbiAgICAgIElOSkVDVEVEX1NFTEVDVE9SUy5wdXNoKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJGNyZWF0ZVJlbmRlcmVyLmFwcGx5KHRoaXMsIDxhbnk+YXJndW1lbnRzKTtcbiAgfTtcbn1cbiJdfQ==