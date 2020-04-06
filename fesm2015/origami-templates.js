import { InjectionToken, ElementRef, Inject, Optional, NgZone, Directive, APP_INITIALIZER, NgModule } from '@angular/core';
import { __awaiter, __decorate, __param } from 'tslib';
import { whenSet, wrapAndDefineDescriptor } from 'ngx-origami/util';
import { camelToDashCase } from '@polymer/polymer/lib/utils/case-map';
import { WebComponentsReadyModule } from 'ngx-origami/polyfills';

/**
 * Token that represents the Polymer host that `<template>` elements should
 * refer to for Polymer data binding. The token will be provided when using
 * `polymerHost()`.
 */
const POLYMER_HOST = new InjectionToken('polymerHost');
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
function polymerHost(componentType) {
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
function patchPolymerHost(dataHost) {
    // Add methods from TemplateStamp that templatize instances expect
    if (!dataHost._addEventListenerToNode) {
        dataHost._addEventListenerToNode = (node, eventName, handler) => {
            node.addEventListener(eventName, handler);
        };
    }
    return dataHost;
}

let shimPromise;
/**
 * Angular incorrectly adds `<template>` children to the element's child node
 * list instead of its content. This shim forces children appended to a
 * `<template>` to be added to its content instead.
 *
 * https://github.com/angular/angular/issues/15557
 *
 * @returns a Promise that resolves when the HTMLTemplateElement is shimmed
 */
function shimHTMLTemplateAppend() {
    if (!shimPromise) {
        const shim = () => {
            // Angular's renderer will add children to a <template> instead of to its
            // content. This shim will force any children added to a <template> to be
            // added to its content instead.
            // https://github.com/angular/angular/issues/15557
            const nativeAppend = HTMLTemplateElement.prototype.appendChild;
            HTMLTemplateElement.prototype.appendChild = function (childNode) {
                if (this.content) {
                    return this.content.appendChild(childNode);
                }
                else {
                    return nativeAppend.apply(this, [childNode]);
                }
            };
        };
        shimPromise = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield whenSet(window, 'HTMLTemplateElement');
            shim();
            resolve();
        }));
    }
    return shimPromise;
}
/**
 * Resets `shimHTMLTemplateAppend()` so that it will re-shim the class next
 * time it is called. This is primarily used for testing.
 */
function resetShimHTMLTemplateAppend() {
    shimPromise = undefined;
}

/**
 * This directive is attached to each `<template>` element. If a Polymer host
 * component is provided, this directive will enable Polymer's event and
 * two-way binding syntax styles.
 */
let TemplateDirective = class TemplateDirective {
    constructor(elementRef, polymerHost, zone) {
        this.elementRef = elementRef;
        this.polymerHost = polymerHost;
        this.zone = zone;
        this.ready = (() => __awaiter(this, void 0, void 0, function* () {
            if (this.polymerHost) {
                this.enableEventBindings(elementRef.nativeElement);
                yield this.enablePropertyBindings(elementRef.nativeElement);
            }
        }))();
    }
    /**
     * Enables the use of Polymer event bindings. An event binding is declared
     * with the syntax `on-event-name="handler"`, where `event-name` is the
     * name of the event to listen to and `handler` is the name of the host's
     * method to call when the event is dispatched.
     *
     * @param template the Polymer template to enable event binding syntax for
     */
    enableEventBindings(template) {
        // When templatize looks for a PropertyEffects host, it will use the
        // template's __dataHost property. This is the _methodHost for a template
        // instance and is used to add event listener bindings.
        template.__dataHost = this.polymerHost;
    }
    /**
     * Enables the use of Polymer property bindings. A property binding is
     * declared either as a one-way binding `value="[[propName]]"` or a two-way
     * binding `value="{{propName}}"`.
     *
     * @param template the Polymer template to enable data binding syntax for
     */
    enablePropertyBindings(template) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hostProps } = yield this.getTemplateInfo(template);
            if (hostProps) {
                for (let prop in hostProps) {
                    // Angular -> Polymer (one-way bindings)
                    const initialValue = this.polymerHost[prop];
                    wrapAndDefineDescriptor(this.polymerHost, prop, {
                        afterSet(changed, value) {
                            if (changed) {
                                template[`_host_${prop}`] = value;
                            }
                        }
                    });
                    this.polymerHost[prop] = initialValue;
                    // Polymer -> Angular (two-way bindings)
                    const eventName = `_host_${camelToDashCase(prop)}-changed`;
                    template.addEventListener(eventName, event => {
                        if (!this.isSplicesChange(event) &&
                            !this.isPathChange(event)) {
                            this.zone.run(() => {
                                this.polymerHost[prop] = event.detail.value;
                            });
                        }
                    });
                }
            }
        });
    }
    /**
     * Retrieves the template info metadata for a Polymer template.
     *
     * @param template the Polymer template to retrieve template info for
     * @returns a Promise that resolves with the template's info
     */
    getTemplateInfo(template) {
        return __awaiter(this, void 0, void 0, function* () {
            if (template._templateInfo) {
                return template._templateInfo;
            }
            else {
                return yield whenSet(template, '_templateInfo');
            }
        });
    }
    /**
     * Indicates whether or not an event is a "splices" Polymer change event,
     * which has a detail value object that dictates what elements were changed if
     * the array reference remains the same.
     *
     * @param event the event to check
     * @returns true if the event is a splices change event
     */
    isSplicesChange(event) {
        const value = event.detail.value;
        return value && Array.isArray(value.indexSplices);
    }
    /**
     * Indicates whether or not an event is a path Polymer change event, which
     * has a detail path property indicating the path of the value changed, and a
     * value of the path's value. This is used when an array or object reference
     * remains the same.
     *
     * @param event the event to check
     * @returns true if the event is a path change event
     */
    isPathChange(event) {
        return typeof event.detail.path === 'string';
    }
};
TemplateDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [POLYMER_HOST,] }, { type: Optional }] },
    { type: NgZone }
];
TemplateDirective = __decorate([
    Directive({
        selector: 'template'
    }),
    __param(1, Inject(POLYMER_HOST)),
    __param(1, Optional())
], TemplateDirective);

shimHTMLTemplateAppend();
const ɵ0 = shimHTMLTemplateAppend;
const TEMPLATES_READY_PROVIDER = {
    provide: APP_INITIALIZER,
    multi: true,
    useValue: ɵ0
};
let TemplateModule = class TemplateModule {
};
TemplateModule = __decorate([
    NgModule({
        imports: [WebComponentsReadyModule],
        declarations: [TemplateDirective],
        providers: [TEMPLATES_READY_PROVIDER],
        exports: [TemplateDirective]
    })
], TemplateModule);

/**
 * Generated bundle index. Do not edit.
 */

export { POLYMER_HOST, TEMPLATES_READY_PROVIDER, TemplateDirective, TemplateModule, patchPolymerHost, polymerHost, resetShimHTMLTemplateAppend, shimHTMLTemplateAppend, ɵ0 };
//# sourceMappingURL=origami-templates.js.map
