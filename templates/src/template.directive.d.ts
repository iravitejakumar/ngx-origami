import { ElementRef, NgZone } from '@angular/core';
import { TemplateInfo } from '@polymer/polymer/interfaces';
/**
 * An HTMLTemplateElement that is processed by Polymer's templatizer.
 */
export interface PolymerTemplate extends HTMLTemplateElement {
    /**
     * Added by the `PropertyEffects` mixin to instruct templatize of the host
     * for the template. Effects that are not part of the template instance will
     * propagate to this host.
     */
    __dataHost?: any;
    /**
     * Template metadata generated from `TemplateStamp`.
     */
    _templateInfo?: TemplateInfo;
    /**
     * Host properties are defined as `_host_propName` by templatizer.
     */
    [hostProp: string]: any;
}
/**
 * This directive is attached to each `<template>` element. If a Polymer host
 * component is provided, this directive will enable Polymer's event and
 * two-way binding syntax styles.
 */
export declare class TemplateDirective {
    elementRef: ElementRef;
    polymerHost: any;
    private zone;
    ready: Promise<void>;
    constructor(elementRef: ElementRef, polymerHost: any, zone: NgZone);
    /**
     * Enables the use of Polymer event bindings. An event binding is declared
     * with the syntax `on-event-name="handler"`, where `event-name` is the
     * name of the event to listen to and `handler` is the name of the host's
     * method to call when the event is dispatched.
     *
     * @param template the Polymer template to enable event binding syntax for
     */
    enableEventBindings(template: PolymerTemplate): void;
    /**
     * Enables the use of Polymer property bindings. A property binding is
     * declared either as a one-way binding `value="[[propName]]"` or a two-way
     * binding `value="{{propName}}"`.
     *
     * @param template the Polymer template to enable data binding syntax for
     */
    enablePropertyBindings(template: PolymerTemplate): Promise<void>;
    /**
     * Retrieves the template info metadata for a Polymer template.
     *
     * @param template the Polymer template to retrieve template info for
     * @returns a Promise that resolves with the template's info
     */
    getTemplateInfo(template: PolymerTemplate): Promise<TemplateInfo>;
    /**
     * Indicates whether or not an event is a "splices" Polymer change event,
     * which has a detail value object that dictates what elements were changed if
     * the array reference remains the same.
     *
     * @param event the event to check
     * @returns true if the event is a splices change event
     */
    private isSplicesChange;
    /**
     * Indicates whether or not an event is a path Polymer change event, which
     * has a detail path property indicating the path of the value changed, and a
     * value of the path's value. This is used when an array or object reference
     * remains the same.
     *
     * @param event the event to check
     * @returns true if the event is a path change event
     */
    private isPathChange;
}
