import { InjectionToken } from '@angular/core';
/**
 * Token that represents the Polymer host that `<template>` elements should
 * refer to for Polymer data binding. The token will be provided when using
 * `polymerHost()`.
 */
export var POLYMER_HOST = new InjectionToken('polymerHost');
/**
 * Creates a `Provider` that connects a components' Polymer `<template>`
 * elements' data binding system to the host component instance.
 *
 * This enables the use of event, one-way, and two-way Polymer data binding
 * within a `<template>` that refers to the host Angular component's methods and
 * properties.
 *
 * @param componentType the component type whose instances should be provided
 *   as the Polymer host to the instance's `<template>` elements.
 */
export function polymerHost(componentType) {
    return {
        provide: POLYMER_HOST,
        useFactory: patchPolymerHost,
        deps: [componentType]
    };
}
/**
 * Patch a data host instance with methods that are expected by Polymer's
 * `TemplateStamp` mixin. These methods are used to set up data bindings, and
 * are normally provided when a Polymer element extends from `TemplateStamp`.
 *
 * Angular components do not extend this mixin, which is why we need to patch
 * the required methods. Instances will automatically be patched when using
 * `polymerHost()`.
 *
 * @param dataHost the host to patch
 * @returns the patched dataHost
 */
export function patchPolymerHost(dataHost) {
    // Add methods from TemplateStamp that templatize instances expect
    if (!dataHost._addEventListenerToNode) {
        dataHost._addEventListenerToNode = function (node, eventName, handler) {
            node.addEventListener(eventName, handler);
        };
    }
    return dataHost;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seW1lckhvc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS90ZW1wbGF0ZXMvIiwic291cmNlcyI6WyJzcmMvcG9seW1lckhvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBa0IsTUFBTSxlQUFlLENBQUM7QUFFL0Q7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBTSxhQUFhLENBQUMsQ0FBQztBQUVuRTs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxhQUF3QjtJQUNsRCxPQUFPO1FBQ0wsT0FBTyxFQUFFLFlBQVk7UUFDckIsVUFBVSxFQUFFLGdCQUFnQjtRQUM1QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDdEIsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxRQUFhO0lBQzVDLGtFQUFrRTtJQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1FBQ3JDLFFBQVEsQ0FBQyx1QkFBdUIsR0FBRyxVQUNqQyxJQUFVLEVBQ1YsU0FBaUIsRUFDakIsT0FBMkI7WUFFM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUM7S0FDSDtJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgUHJvdmlkZXIsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUb2tlbiB0aGF0IHJlcHJlc2VudHMgdGhlIFBvbHltZXIgaG9zdCB0aGF0IGA8dGVtcGxhdGU+YCBlbGVtZW50cyBzaG91bGRcbiAqIHJlZmVyIHRvIGZvciBQb2x5bWVyIGRhdGEgYmluZGluZy4gVGhlIHRva2VuIHdpbGwgYmUgcHJvdmlkZWQgd2hlbiB1c2luZ1xuICogYHBvbHltZXJIb3N0KClgLlxuICovXG5leHBvcnQgY29uc3QgUE9MWU1FUl9IT1NUID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ3BvbHltZXJIb3N0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBQcm92aWRlcmAgdGhhdCBjb25uZWN0cyBhIGNvbXBvbmVudHMnIFBvbHltZXIgYDx0ZW1wbGF0ZT5gXG4gKiBlbGVtZW50cycgZGF0YSBiaW5kaW5nIHN5c3RlbSB0byB0aGUgaG9zdCBjb21wb25lbnQgaW5zdGFuY2UuXG4gKlxuICogVGhpcyBlbmFibGVzIHRoZSB1c2Ugb2YgZXZlbnQsIG9uZS13YXksIGFuZCB0d28td2F5IFBvbHltZXIgZGF0YSBiaW5kaW5nXG4gKiB3aXRoaW4gYSBgPHRlbXBsYXRlPmAgdGhhdCByZWZlcnMgdG8gdGhlIGhvc3QgQW5ndWxhciBjb21wb25lbnQncyBtZXRob2RzIGFuZFxuICogcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0gY29tcG9uZW50VHlwZSB0aGUgY29tcG9uZW50IHR5cGUgd2hvc2UgaW5zdGFuY2VzIHNob3VsZCBiZSBwcm92aWRlZFxuICogICBhcyB0aGUgUG9seW1lciBob3N0IHRvIHRoZSBpbnN0YW5jZSdzIGA8dGVtcGxhdGU+YCBlbGVtZW50cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvbHltZXJIb3N0KGNvbXBvbmVudFR5cGU6IFR5cGU8YW55Pik6IFByb3ZpZGVyIHtcbiAgcmV0dXJuIHtcbiAgICBwcm92aWRlOiBQT0xZTUVSX0hPU1QsXG4gICAgdXNlRmFjdG9yeTogcGF0Y2hQb2x5bWVySG9zdCxcbiAgICBkZXBzOiBbY29tcG9uZW50VHlwZV1cbiAgfTtcbn1cblxuLyoqXG4gKiBQYXRjaCBhIGRhdGEgaG9zdCBpbnN0YW5jZSB3aXRoIG1ldGhvZHMgdGhhdCBhcmUgZXhwZWN0ZWQgYnkgUG9seW1lcidzXG4gKiBgVGVtcGxhdGVTdGFtcGAgbWl4aW4uIFRoZXNlIG1ldGhvZHMgYXJlIHVzZWQgdG8gc2V0IHVwIGRhdGEgYmluZGluZ3MsIGFuZFxuICogYXJlIG5vcm1hbGx5IHByb3ZpZGVkIHdoZW4gYSBQb2x5bWVyIGVsZW1lbnQgZXh0ZW5kcyBmcm9tIGBUZW1wbGF0ZVN0YW1wYC5cbiAqXG4gKiBBbmd1bGFyIGNvbXBvbmVudHMgZG8gbm90IGV4dGVuZCB0aGlzIG1peGluLCB3aGljaCBpcyB3aHkgd2UgbmVlZCB0byBwYXRjaFxuICogdGhlIHJlcXVpcmVkIG1ldGhvZHMuIEluc3RhbmNlcyB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgcGF0Y2hlZCB3aGVuIHVzaW5nXG4gKiBgcG9seW1lckhvc3QoKWAuXG4gKlxuICogQHBhcmFtIGRhdGFIb3N0IHRoZSBob3N0IHRvIHBhdGNoXG4gKiBAcmV0dXJucyB0aGUgcGF0Y2hlZCBkYXRhSG9zdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hQb2x5bWVySG9zdChkYXRhSG9zdDogYW55KTogYW55IHtcbiAgLy8gQWRkIG1ldGhvZHMgZnJvbSBUZW1wbGF0ZVN0YW1wIHRoYXQgdGVtcGxhdGl6ZSBpbnN0YW5jZXMgZXhwZWN0XG4gIGlmICghZGF0YUhvc3QuX2FkZEV2ZW50TGlzdGVuZXJUb05vZGUpIHtcbiAgICBkYXRhSG9zdC5fYWRkRXZlbnRMaXN0ZW5lclRvTm9kZSA9IChcbiAgICAgIG5vZGU6IE5vZGUsXG4gICAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICAgIGhhbmRsZXI6IChlOiBFdmVudCkgPT4gdm9pZFxuICAgICkgPT4ge1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBkYXRhSG9zdDtcbn1cbiJdfQ==