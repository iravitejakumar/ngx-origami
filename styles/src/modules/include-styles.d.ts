import { Type } from '@angular/core';
/**
 * Decorator that registers style modules to be injected for a given component
 * type. One or more style modules may be specified.
 *
 * @param styleModule a style module to include
 * @param styleModules additional style modules to include
 * @returns a class decorator
 */
export declare function IncludeStyles(...styleModules: string[]): ClassDecorator;
/**
 * Retrieves all types that have been decorated with `@IncludeStyles()`.
 *
 * @returns an array of all decorated types
 */
export declare function getRegisteredTypes(): Array<Type<any>>;
/**
 * Retrieves the style modules for a given type that was decorated with
 * `@IncludeStyles()`
 *
 * @param type the type to retrieve style modules for
 * @returns an array of style modules for the decorated type, or an empty
 *   array if the type was not decorated
 */
export declare function getStyleModulesFor(type?: Type<any>): string[];
/**
 * Resets all types decorated with `@IncludeStyles()`. Should only be used for
 * testing.
 */
export declare function resetIncludeStyles(): void;
