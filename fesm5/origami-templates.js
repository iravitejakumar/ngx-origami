import { InjectionToken, ElementRef, Inject, Optional, NgZone, Directive, APP_INITIALIZER, NgModule } from '@angular/core';
import { __awaiter, __generator, __decorate, __param } from 'tslib';
import { whenSet, wrapAndDefineDescriptor } from 'ngx-origami/util';
import { camelToDashCase } from '@polymer/polymer/lib/utils/case-map';
import { WebComponentsReadyModule } from 'ngx-origami/polyfills';

/**
 * Token that represents the Polymer host that `<template>` elements should
 * refer to for Polymer data binding. The token will be provided when using
 * `polymerHost()`.
 */
var POLYMER_HOST = new InjectionToken('polymerHost');
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
        dataHost._addEventListenerToNode = function (node, eventName, handler) {
            node.addEventListener(eventName, handler);
        };
    }
    return dataHost;
}

var shimPromise;
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
    var _this = this;
    if (!shimPromise) {
        var shim_1 = function () {
            // Angular's renderer will add children to a <template> instead of to its
            // content. This shim will force any children added to a <template> to be
            // added to its content instead.
            // https://github.com/angular/angular/issues/15557
            var nativeAppend = HTMLTemplateElement.prototype.appendChild;
            HTMLTemplateElement.prototype.appendChild = function (childNode) {
                if (this.content) {
                    return this.content.appendChild(childNode);
                }
                else {
                    return nativeAppend.apply(this, [childNode]);
                }
            };
        };
        shimPromise = new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, whenSet(window, 'HTMLTemplateElement')];
                    case 1:
                        _a.sent();
                        shim_1();
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
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
var TemplateDirective = /** @class */ (function () {
    function TemplateDirective(elementRef, polymerHost, zone) {
        var _this = this;
        this.elementRef = elementRef;
        this.polymerHost = polymerHost;
        this.zone = zone;
        this.ready = (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.polymerHost) return [3 /*break*/, 2];
                        this.enableEventBindings(elementRef.nativeElement);
                        return [4 /*yield*/, this.enablePropertyBindings(elementRef.nativeElement)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); })();
    }
    /**
     * Enables the use of Polymer event bindings. An event binding is declared
     * with the syntax `on-event-name="handler"`, where `event-name` is the
     * name of the event to listen to and `handler` is the name of the host's
     * method to call when the event is dispatched.
     *
     * @param template the Polymer template to enable event binding syntax for
     */
    TemplateDirective.prototype.enableEventBindings = function (template) {
        // When templatize looks for a PropertyEffects host, it will use the
        // template's __dataHost property. This is the _methodHost for a template
        // instance and is used to add event listener bindings.
        template.__dataHost = this.polymerHost;
    };
    /**
     * Enables the use of Polymer property bindings. A property binding is
     * declared either as a one-way binding `value="[[propName]]"` or a two-way
     * binding `value="{{propName}}"`.
     *
     * @param template the Polymer template to enable data binding syntax for
     */
    TemplateDirective.prototype.enablePropertyBindings = function (template) {
        return __awaiter(this, void 0, void 0, function () {
            var hostProps, _loop_1, this_1, prop;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTemplateInfo(template)];
                    case 1:
                        hostProps = (_a.sent()).hostProps;
                        if (hostProps) {
                            _loop_1 = function (prop) {
                                // Angular -> Polymer (one-way bindings)
                                var initialValue = this_1.polymerHost[prop];
                                wrapAndDefineDescriptor(this_1.polymerHost, prop, {
                                    afterSet: function (changed, value) {
                                        if (changed) {
                                            template["_host_" + prop] = value;
                                        }
                                    }
                                });
                                this_1.polymerHost[prop] = initialValue;
                                // Polymer -> Angular (two-way bindings)
                                var eventName = "_host_" + camelToDashCase(prop) + "-changed";
                                template.addEventListener(eventName, function (event) {
                                    if (!_this.isSplicesChange(event) &&
                                        !_this.isPathChange(event)) {
                                        _this.zone.run(function () {
                                            _this.polymerHost[prop] = event.detail.value;
                                        });
                                    }
                                });
                            };
                            this_1 = this;
                            for (prop in hostProps) {
                                _loop_1(prop);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves the template info metadata for a Polymer template.
     *
     * @param template the Polymer template to retrieve template info for
     * @returns a Promise that resolves with the template's info
     */
    TemplateDirective.prototype.getTemplateInfo = function (template) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!template._templateInfo) return [3 /*break*/, 1];
                        return [2 /*return*/, template._templateInfo];
                    case 1: return [4 /*yield*/, whenSet(template, '_templateInfo')];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Indicates whether or not an event is a "splices" Polymer change event,
     * which has a detail value object that dictates what elements were changed if
     * the array reference remains the same.
     *
     * @param event the event to check
     * @returns true if the event is a splices change event
     */
    TemplateDirective.prototype.isSplicesChange = function (event) {
        var value = event.detail.value;
        return value && Array.isArray(value.indexSplices);
    };
    /**
     * Indicates whether or not an event is a path Polymer change event, which
     * has a detail path property indicating the path of the value changed, and a
     * value of the path's value. This is used when an array or object reference
     * remains the same.
     *
     * @param event the event to check
     * @returns true if the event is a path change event
     */
    TemplateDirective.prototype.isPathChange = function (event) {
        return typeof event.detail.path === 'string';
    };
    TemplateDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [POLYMER_HOST,] }, { type: Optional }] },
        { type: NgZone }
    ]; };
    TemplateDirective = __decorate([
        Directive({
            selector: 'template'
        }),
        __param(1, Inject(POLYMER_HOST)),
        __param(1, Optional())
    ], TemplateDirective);
    return TemplateDirective;
}());

shimHTMLTemplateAppend();
var ɵ0 = shimHTMLTemplateAppend;
var TEMPLATES_READY_PROVIDER = {
    provide: APP_INITIALIZER,
    multi: true,
    useValue: ɵ0
};
var TemplateModule = /** @class */ (function () {
    function TemplateModule() {
    }
    TemplateModule = __decorate([
        NgModule({
            imports: [WebComponentsReadyModule],
            declarations: [TemplateDirective],
            providers: [TEMPLATES_READY_PROVIDER],
            exports: [TemplateDirective]
        })
    ], TemplateModule);
    return TemplateModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { POLYMER_HOST, TEMPLATES_READY_PROVIDER, TemplateDirective, TemplateModule, patchPolymerHost, polymerHost, resetShimHTMLTemplateAppend, shimHTMLTemplateAppend, ɵ0 };
//# sourceMappingURL=origami-templates.js.map
