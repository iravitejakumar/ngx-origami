import { ComponentFactoryResolver, Type } from '@angular/core';
/**
 * Scans a `ComponentFactoryResolver` for types decorated with
 * `@IncludeStyles()` to build a map of types and selectors.
 *
 * @param resolver the `ComponentFactoryResolver` to scan
 */
export declare function scanComponentFactoryResolver(resolver: ComponentFactoryResolver): void;
/**
 * Retrieves the component type for a given selector string. The component must
 * have been decorated by `@IncludeStyles()` and scanned by
 * `scanComponentFactoryResolver()`.
 *
 * @param selector the selector of the component type
 * @returns the component type, or undefined if the type is not decorated or
 *   scanned
 */
export declare function getTypeFor(selector: string): Type<any> | undefined;
/**
 * Resets the type selector maps that were scanned by
 * `scanComponentFactoryResolver()`. This should only be used for testing.
 */
export declare function resetTypeSelectors(): void;
