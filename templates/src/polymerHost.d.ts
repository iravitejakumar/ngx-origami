import { InjectionToken, Provider, Type } from '@angular/core';
/**
 * Token that represents the Polymer host that `<template>` elements should
 * refer to for Polymer data binding. The token will be provided when using
 * `polymerHost()`.
 */
export declare const POLYMER_HOST: InjectionToken<any>;
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
export declare function polymerHost(componentType: Type<any>): Provider;
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
export declare function patchPolymerHost(dataHost: any): any;
