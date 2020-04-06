(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-origami/util'), require('@polymer/polymer/lib/utils/case-map'), require('ngx-origami/polyfills')) :
    typeof define === 'function' && define.amd ? define('ngx-origami/templates', ['exports', '@angular/core', 'ngx-origami/util', '@polymer/polymer/lib/utils/case-map', 'ngx-origami/polyfills'], factory) :
    (global = global || self, factory((global['ngx-origami'] = global['ngx-origami'] || {}, global['ngx-origami'].templates = {}), global.ng.core, global['ngx-origami'].util, global.Polymer.CaseMap, global['ngx-origami'].polyfills));
}(this, (function (exports, core, util, caseMap, polyfills) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * Token that represents the Polymer host that `<template>` elements should
     * refer to for Polymer data binding. The token will be provided when using
     * `polymerHost()`.
     */
    var POLYMER_HOST = new core.InjectionToken('polymerHost');
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
                        case 0: return [4 /*yield*/, util.whenSet(window, 'HTMLTemplateElement')];
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
                                    util.wrapAndDefineDescriptor(this_1.polymerHost, prop, {
                                        afterSet: function (changed, value) {
                                            if (changed) {
                                                template["_host_" + prop] = value;
                                            }
                                        }
                                    });
                                    this_1.polymerHost[prop] = initialValue;
                                    // Polymer -> Angular (two-way bindings)
                                    var eventName = "_host_" + caseMap.camelToDashCase(prop) + "-changed";
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
                        case 1: return [4 /*yield*/, util.whenSet(template, '_templateInfo')];
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
            { type: core.ElementRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [POLYMER_HOST,] }, { type: core.Optional }] },
            { type: core.NgZone }
        ]; };
        TemplateDirective = __decorate([
            core.Directive({
                selector: 'template'
            }),
            __param(1, core.Inject(POLYMER_HOST)),
            __param(1, core.Optional())
        ], TemplateDirective);
        return TemplateDirective;
    }());

    shimHTMLTemplateAppend();
    var ɵ0 = shimHTMLTemplateAppend;
    var TEMPLATES_READY_PROVIDER = {
        provide: core.APP_INITIALIZER,
        multi: true,
        useValue: ɵ0
    };
    var TemplateModule = /** @class */ (function () {
        function TemplateModule() {
        }
        TemplateModule = __decorate([
            core.NgModule({
                imports: [polyfills.WebComponentsReadyModule],
                declarations: [TemplateDirective],
                providers: [TEMPLATES_READY_PROVIDER],
                exports: [TemplateDirective]
            })
        ], TemplateModule);
        return TemplateModule;
    }());

    exports.POLYMER_HOST = POLYMER_HOST;
    exports.TEMPLATES_READY_PROVIDER = TEMPLATES_READY_PROVIDER;
    exports.TemplateDirective = TemplateDirective;
    exports.TemplateModule = TemplateModule;
    exports.patchPolymerHost = patchPolymerHost;
    exports.polymerHost = polymerHost;
    exports.resetShimHTMLTemplateAppend = resetShimHTMLTemplateAppend;
    exports.shimHTMLTemplateAppend = shimHTMLTemplateAppend;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=origami-templates.umd.js.map
