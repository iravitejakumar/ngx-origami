import { __read, __spread } from "tslib";
import { APP_INITIALIZER, ComponentFactoryResolver, NgModuleRef, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { stylesFromModule } from '@polymer/polymer/lib/utils/style-gather';
import { whenSet } from '@codebakery/origami/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LXN0eWxlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RlYmFrZXJ5L29yaWdhbWkvc3R5bGVzLyIsInNvdXJjZXMiOlsic3JjL21vZHVsZXMvaW5qZWN0LXN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGVBQWUsRUFDZix3QkFBd0IsRUFDeEIsV0FBVyxFQUVYLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsVUFBVSxFQUFFLDRCQUE0QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFNUU7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sc0JBQXNCLEdBQWE7SUFDOUMsT0FBTyxFQUFFLGVBQWU7SUFDeEIsS0FBSyxFQUFFLElBQUk7SUFDWCxVQUFVLEVBQUUsbUJBQW1CO0lBQy9CLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztDQUNwQixDQUFDO0FBRUY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLGdDQUFnQyxHQUFhO0lBQ3hELE9BQU8sRUFBRSxlQUFlO0lBQ3hCLEtBQUssRUFBRSxJQUFJO0lBQ1gsVUFBVSxFQUFFLDJCQUEyQjtJQUN2QyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7Q0FDcEIsQ0FBQztBQUVGOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxRQUEwQjtJQUM1RCxJQUFNLFlBQVksR0FBRywyQkFB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IEFQUF9JTklUSUFMSVpFUixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBOZ01vZHVsZVJlZixcbiAgUHJvdmlkZXIsXG4gIFJlbmRlcmVyRmFjdG9yeTIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IHN0eWxlc0Zyb21Nb2R1bGUgfSBmcm9tICdAcG9seW1lci9wb2x5bWVyL2xpYi91dGlscy9zdHlsZS1nYXRoZXInO1xuaW1wb3J0IHsgd2hlblNldCB9IGZyb20gJ0Bjb2RlYmFrZXJ5L29yaWdhbWkvdXRpbCc7XG5pbXBvcnQgeyBnZXRTdHlsZU1vZHVsZXNGb3IgfSBmcm9tICcuL2luY2x1ZGUtc3R5bGVzJztcbmltcG9ydCB7IHN0eWxlVG9FbXVsYXRlZEVuY2Fwc3VsYXRpb24gfSBmcm9tICcuL3N0eWxlLXRvLWVtdWxhdGVkLWVuY2Fwc3VsYXRpb24nO1xuaW1wb3J0IHsgZ2V0VHlwZUZvciwgc2NhbkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJy4vdHlwZS1zZWxlY3RvcnMnO1xuXG4vKipcbiAqIFByb3ZpZGVyIHRoYXQgZW5zdXJlcyBgaW5qZWN0SW5jbHVkZVN0eWxlcygpYCB3aWxsIHJ1biBvbiBhcHBsaWNhdGlvblxuICogc3RhcnR1cCBiZWZvcmUgY29tcG9uZW50cyBhcmUgY3JlYXRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IElOSkVDVF9TVFlMRVNfUFJPVklERVI6IFByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gIG11bHRpOiB0cnVlLFxuICB1c2VGYWN0b3J5OiBpbmplY3RJbmNsdWRlU3R5bGVzLFxuICBkZXBzOiBbTmdNb2R1bGVSZWZdXG59O1xuXG4vKipcbiAqIFByb3ZpZGVyIHRoYXQgZW5zdXJlcyBgaW5qZWN0SW5jbHVkZVN0eWxlcygpYCB3aWxsIHJ1biBvbiBhcHBsaWNhdGlvblxuICogc3RhcnR1cCBiZWZvcmUgY29tcG9uZW50cyBhcmUgY3JlYXRlZC4gVGhpcyBwcm92aWRlciBkb2VzIF9ub3RfIHJlcXVpcmVcbiAqIEBhbmd1bGFyL3JvdXRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IElOSkVDVF9TVFlMRVNfTk9fUk9VVEVSX1BST1ZJREVSOiBQcm92aWRlciA9IHtcbiAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICBtdWx0aTogdHJ1ZSxcbiAgdXNlRmFjdG9yeTogaW5qZWN0SW5jbHVkZVN0eWxlc05vUm91dGVyLFxuICBkZXBzOiBbTmdNb2R1bGVSZWZdXG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBjYWxsYmFjayB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgdXNlIHRoZSBwcm92aWRlZCBgTmdNb2R1bGVSZWZgXG4gKiB0byBwYXRjaCB0aGUgcmVuZGVyZXIgZmFjdG9yeSBhbmQgc2NhbiB0aGUgY29tcG9uZW50IGZhY3RvcnkgcmVzb2x2ZXIgaW5cbiAqIG9yZGVyIHRvIGVuYWJsZSBpbmplY3RpbmcgUG9seW1lciBzdHlsZSBtb2R1bGVzIGZvciBjb21wb25lbnRzIGRlY29yYXRlZCB3aXRoXG4gKiBgQEluY2x1ZGVTdHlsZXMoKWAuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGFkZGl0aW9uYWxseSBsaXN0ZW4gdG8gYW55IGxhenktbG9hZGVkIG1vZHVsZXMgZnJvbVxuICogQW5ndWxhcidzIHJvdXRlciBhbmQgc2NhbiBjb21wb25lbnQgZmFjdG9yeSByZXNvbHZlcnMgdGhhdCBhcmUgYWRkZWQgYWZ0ZXJcbiAqIHRoZSBhcHAgaGFzIGluaXRpYWxpemVkLlxuICpcbiAqIEBwYXJhbSBuZ01vZHVsZSB0aGUgcm9vdCBgTmdNb2R1bGVgIHJlZmVyZW5jZVxuICogQHJldHVybnMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmVnaW4gdGhlIGluamVjdGlvbiBwcm9jZXNzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RJbmNsdWRlU3R5bGVzKG5nTW9kdWxlOiBOZ01vZHVsZVJlZjxhbnk+KTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IGluamVjdFN0eWxlcyA9IGluamVjdEluY2x1ZGVTdHlsZXNOb1JvdXRlcihuZ01vZHVsZSk7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgaW5qZWN0U3R5bGVzKCk7XG4gICAgY29uc3Qgcm91dGVyID0gPFJvdXRlcj5uZ01vZHVsZS5pbmplY3Rvci5nZXQoUm91dGVyKTtcbiAgICByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZShlID0+IHtcbiAgICAgIGlmICgncm91dGUnIGluIGUgJiYgISg8YW55PmUucm91dGUpLl9sb2FkZWRDb25maWcpIHtcbiAgICAgICAgd2hlblNldCg8YW55PmUucm91dGUsICdfbG9hZGVkQ29uZmlnJywgdW5kZWZpbmVkLCBjb25maWcgPT4ge1xuICAgICAgICAgIHNjYW5Db21wb25lbnRGYWN0b3J5UmVzb2x2ZXIoXG4gICAgICAgICAgICBjb25maWcubW9kdWxlLmluamVjdG9yLmdldChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGNhbGxiYWNrIHRoYXQsIHdoZW4gaW52b2tlZCwgd2lsbCB1c2UgdGhlIHByb3ZpZGVkIGBOZ01vZHVsZVJlZmBcbiAqIHRvIHBhdGNoIHRoZSByZW5kZXJlciBmYWN0b3J5IGFuZCBzY2FuIHRoZSBjb21wb25lbnQgZmFjdG9yeSByZXNvbHZlciBpblxuICogb3JkZXIgdG8gZW5hYmxlIGluamVjdGluZyBQb2x5bWVyIHN0eWxlIG1vZHVsZXMgZm9yIGNvbXBvbmVudHMgZGVjb3JhdGVkIHdpdGhcbiAqIGBASW5jbHVkZVN0eWxlcygpYC5cbiAqXG4gKiBAcGFyYW0gbmdNb2R1bGUgdGhlIHJvb3QgYE5nTW9kdWxlYCByZWZlcmVuY2VcbiAqIEByZXR1cm5zIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlZ2luIHRoZSBpbmplY3Rpb24gcHJvY2Vzc1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0SW5jbHVkZVN0eWxlc05vUm91dGVyKFxuICBuZ01vZHVsZTogTmdNb2R1bGVSZWY8YW55PlxuKTogKCkgPT4gdm9pZCB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgcGF0Y2hSZW5kZXJlckZhY3RvcnkobmdNb2R1bGUuaW5qZWN0b3IuZ2V0KFJlbmRlcmVyRmFjdG9yeTIpKTtcbiAgICBzY2FuQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKFxuICAgICAgbmdNb2R1bGUuaW5qZWN0b3IuZ2V0KENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcilcbiAgICApO1xuICB9O1xufVxuXG5jb25zdCBJTkpFQ1RFRF9TRUxFQ1RPUlM6IHN0cmluZ1tdID0gW107XG5cbi8qKlxuICogUGF0Y2hlcyBhIGBSZW5kZXJlckZhY3RvcnkyYCB0byBvdmVyd3JpdGUgYGNyZWF0ZVJlbmRlcmVyKClgIGFuZCBhZGQgc3R5bGVzXG4gKiBpbXBvcnRlZCBmcm9tIFBvbHltZXIgc3R5bGUgbW9kdWxlcyBhY2NvcmRpbmcgdG8gYEBJbmNsdWRlU3R5bGVzKClgXG4gKiBkZWNvcmF0b3JzIHRvIHRoZSBgUmVuZGVyZXJUeXBlMmAgZGF0YSBmb3IgdGhlIGVsZW1lbnQuXG4gKlxuICogSWYgdGhlIGVsZW1lbnQgdHlwZSB1c2luZyBlbXVsYXRlZCB2aWV3IGVuY2Fwc3VsYXRpb24sIHRoZSBzdHlsZXMgaW1wb3J0ZWRcbiAqIHdpbGwgYmUgY29udmVydGVkIHRvIHByZXNlcnZlIGVuY2Fwc3VsYXRpb24uXG4gKlxuICogQHBhcmFtIGZhY3RvcnkgdGhlIHJlbmRlcmVyIGZhY3RvcnkgdG8gcGF0Y2hcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoUmVuZGVyZXJGYWN0b3J5KGZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHtcbiAgY29uc3QgJGNyZWF0ZVJlbmRlcmVyID0gZmFjdG9yeS5jcmVhdGVSZW5kZXJlcjtcbiAgZmFjdG9yeS5jcmVhdGVSZW5kZXJlciA9IGZ1bmN0aW9uKGVsZW1lbnQsIHR5cGUpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGVsZW1lbnQgJiYgZWxlbWVudC5sb2NhbE5hbWU7XG4gICAgaWYgKHNlbGVjdG9yICYmIHR5cGUgJiYgSU5KRUNURURfU0VMRUNUT1JTLmluZGV4T2Yoc2VsZWN0b3IpID09PSAtMSkge1xuICAgICAgY29uc3Qgc3R5bGVNb2R1bGVzID0gZ2V0U3R5bGVNb2R1bGVzRm9yKGdldFR5cGVGb3Ioc2VsZWN0b3IpKTtcbiAgICAgIGxldCBzdHlsZXMgPSBzdHlsZU1vZHVsZXMubWFwKHN0eWxlTW9kdWxlID0+IHtcbiAgICAgICAgY29uc3Qgc3R5bGVFbGVtZW50cyA9IHN0eWxlc0Zyb21Nb2R1bGUoc3R5bGVNb2R1bGUpO1xuICAgICAgICByZXR1cm4gc3R5bGVFbGVtZW50cy5tYXAoZSA9PiBlLmlubmVyVGV4dCkuam9pbignXFxuJyk7XG4gICAgICB9KTtcbiAgICAgIHN3aXRjaCAodHlwZS5lbmNhcHN1bGF0aW9uKSB7XG4gICAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWQ6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgc3R5bGVzID0gc3R5bGVzLm1hcChzdHlsZSA9PiBzdHlsZVRvRW11bGF0ZWRFbmNhcHN1bGF0aW9uKHN0eWxlKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uTm9uZTpcbiAgICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5OYXRpdmU6XG4gICAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB0eXBlLnN0eWxlcy5wdXNoKC4uLnN0eWxlcyk7XG4gICAgICBJTkpFQ1RFRF9TRUxFQ1RPUlMucHVzaChzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuICRjcmVhdGVSZW5kZXJlci5hcHBseSh0aGlzLCA8YW55PmFyZ3VtZW50cyk7XG4gIH07XG59XG4iXX0=