(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@polymer/polymer/lib/utils/style-gather'), require('@codebakery/origami/util'), require('@codebakery/origami/polyfills'), require('@angular/common'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@codebakery/origami/styles', ['exports', '@angular/core', '@angular/router', '@polymer/polymer/lib/utils/style-gather', '@codebakery/origami/util', '@codebakery/origami/polyfills', '@angular/common', '@angular/platform-browser'], factory) :
    (global = global || self, factory((global.codebakery = global.codebakery || {}, global.codebakery.origami = global.codebakery.origami || {}, global.codebakery.origami.styles = {}), global.ng.core, global.ng.router, global.styleGather, global.codebakery.origami.util, global.codebakery.origami.polyfills, global.ng.common, global.ng.platformBrowser));
}(this, (function (exports, core, router, styleGather, util, polyfills, common, platformBrowser) { 'use strict';

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
     * The <dom-module> constructor.
     */
    var cachedDomModule;
    /**
     * Style module CSS text cached by id.
     */
    var CACHED_STYLE_MODULES = new Map();
    /**
     * Imports a `<dom-module id="name">` style module by its id and returns the
     * `<style>` content for the module. Ensure that the module is imported and
     * added to the DOM before calling `importStyleModule()`.
     *
     * @deprecated Use stylesFromModule from
     *   `@polymer/polymer/lib/utils/style-gather`
     * @param styleModule the named id of the style module to import
     * @returns the style module's CSS text, or an empty string if the module does
     *   not exist
     */
    function importStyleModule(styleModule) {
        if (!CACHED_STYLE_MODULES.has(styleModule)) {
            if (!cachedDomModule) {
                cachedDomModule = customElements.get('dom-module');
            }
            var styleTemplate = (cachedDomModule.import(styleModule, 'template'));
            if (styleTemplate) {
                var styles = styleTemplate.content.querySelectorAll('style');
                CACHED_STYLE_MODULES.set(styleModule, Array.from(styles)
                    .map(function (style) { return style.innerText; })
                    .join('\n'));
            }
            else {
                CACHED_STYLE_MODULES.set(styleModule, '');
            }
        }
        return CACHED_STYLE_MODULES.get(styleModule);
    }
    /**
     * Resets the cache using by `importStyleModule()`, primarily used for testing.
     *
     * @deprecated clearStyleModuleCache will be removed in the next major release
     */
    function clearStyleModuleCache() {
        CACHED_STYLE_MODULES = new Map();
    }

    /**
     * Map of types to style modules.
     */
    var TYPE_STYLE_MODULES = new Map();
    /**
     * Decorator that registers style modules to be injected for a given component
     * type. One or more style modules may be specified.
     *
     * @param styleModule a style module to include
     * @param styleModules additional style modules to include
     * @returns a class decorator
     */
    function IncludeStyles() {
        var styleModules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            styleModules[_i] = arguments[_i];
        }
        return function (target) {
            TYPE_STYLE_MODULES.set(target, styleModules);
            return target;
        };
    }
    /**
     * Retrieves all types that have been decorated with `@IncludeStyles()`.
     *
     * @returns an array of all decorated types
     */
    function getRegisteredTypes() {
        return Array.from(TYPE_STYLE_MODULES.keys());
    }
    /**
     * Retrieves the style modules for a given type that was decorated with
     * `@IncludeStyles()`
     *
     * @param type the type to retrieve style modules for
     * @returns an array of style modules for the decorated type, or an empty
     *   array if the type was not decorated
     */
    function getStyleModulesFor(type) {
        return (type && TYPE_STYLE_MODULES.get(type)) || [];
    }
    /**
     * Resets all types decorated with `@IncludeStyles()`. Should only be used for
     * testing.
     */
    function resetIncludeStyles() {
        TYPE_STYLE_MODULES = new Map();
    }

    /**
     * Regex to find and replace `:host-context()` selectors.
     */
    var HOST_CONTEXT_REGEX = /:host-context\((.*)\)/g;
    /**
     * Regex to find and replace `:host` selectors.
     */
    var HOST_REGEX = /:host(?:\((.*)\))?/g;
    // from @angular/platform-browser
    var COMPONENT_VARIABLE = '%COMP%';
    var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
    var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
    /**
     * Converts the provided CSS string to an Angular emulated encapsulation string
     * for the given component id.
     *
     * @param style the CSS string to convert
     * @returns a CSS string that emulates encapsulation for the given component id
     */
    function styleToEmulatedEncapsulation(style) {
        var statements = parseStyleStatements(style);
        function addEmulation(statement) {
            if (Array.isArray(statement.statements)) {
                statement.statements.forEach(function (nested) { return addEmulation(nested); });
            }
            else {
                var selector = statement.selector;
                selector = selector.trim();
                selector = selector
                    .split(',')
                    .map(function (subSelector) {
                    return subSelector
                        .trim()
                        .split(' ')
                        .map(function (part) {
                        part = part.trim();
                        if (part.includes(':host')) {
                            return part;
                        }
                        else {
                            return part + "[" + CONTENT_ATTR + "]";
                        }
                    })
                        .join(' ');
                })
                    .join(',');
                selector = selector.replace(HOST_CONTEXT_REGEX, "*$1 [" + HOST_ATTR + "]");
                selector = selector.replace(HOST_REGEX, "[" + HOST_ATTR + "]$1");
                statement.selector = selector;
            }
        }
        statements.forEach(function (statement) {
            addEmulation(statement);
        });
        return statementsToString(statements);
    }
    /**
     * Parses a CSS string into an array of statements.
     *
     * @param style the CSS string to parse
     * @returns an array of CSS statements
     */
    function parseStyleStatements(style) {
        var inAtRule = false;
        var inSingleQuote = false;
        var inDoubleQuote = false;
        var inBlock = 0;
        var leavingBlock = false;
        var statements = [];
        var currentStatement = {
            selector: '',
            block: ''
        };
        for (var i = 0; i < style.length; i++) {
            var char = style[i];
            switch (char) {
                case '@':
                    inAtRule = true;
                    break;
                case "'":
                    inSingleQuote = !inSingleQuote;
                    break;
                case '"':
                    inDoubleQuote = !inDoubleQuote;
                    break;
                case '{':
                case '}':
                    if (!inSingleQuote && !inDoubleQuote) {
                        if (char == '{') {
                            inBlock++;
                        }
                        else {
                            inBlock--;
                            leavingBlock = inBlock === 0;
                        }
                    }
                    break;
            }
            if (inBlock) {
                currentStatement.block += char;
            }
            else if (leavingBlock) {
                currentStatement.block += char;
                if (inAtRule) {
                    currentStatement.statements = parseStyleStatements(currentStatement.block.substring(currentStatement.block.indexOf('{') + 1, currentStatement.block.lastIndexOf('}')));
                }
                currentStatement.selector = currentStatement.selector.trim();
                currentStatement.block = currentStatement.block.trim();
                statements.push(currentStatement);
                currentStatement = { selector: '', block: '' };
                leavingBlock = false;
            }
            else {
                currentStatement.selector += char;
            }
        }
        return statements;
    }
    /**
     * Converts an array of statements back into a single CSS string.
     *
     * @param statements the statements to convert
     * @returns a CSS string
     */
    function statementsToString(statements) {
        return statements
            .map(function (statement) {
            var block = Array.isArray(statement.statements)
                ? "{" + statementsToString(statement.statements) + "}"
                : statement.block;
            return statement.selector + " " + block;
        })
            .join('\n');
    }

    var SELECTOR_TO_TYPE = new Map();
    var TYPE_TO_SELECTOR = new Map();
    /**
     * Scans a `ComponentFactoryResolver` for types decorated with
     * `@IncludeStyles()` to build a map of types and selectors.
     *
     * @param resolver the `ComponentFactoryResolver` to scan
     */
    function scanComponentFactoryResolver(resolver) {
        Array.from(getRegisteredTypes()).forEach(function (type) {
            if (!TYPE_TO_SELECTOR.has(type)) {
                try {
                    var factory = resolver.resolveComponentFactory(type);
                    TYPE_TO_SELECTOR.set(type, factory.selector);
                    SELECTOR_TO_TYPE.set(factory.selector, type);
                }
                catch (err) {
                    // No component factory found
                }
            }
        });
    }
    /**
     * Retrieves the component type for a given selector string. The component must
     * have been decorated by `@IncludeStyles()` and scanned by
     * `scanComponentFactoryResolver()`.
     *
     * @param selector the selector of the component type
     * @returns the component type, or undefined if the type is not decorated or
     *   scanned
     */
    function getTypeFor(selector) {
        return SELECTOR_TO_TYPE.get(selector);
    }
    /**
     * Resets the type selector maps that were scanned by
     * `scanComponentFactoryResolver()`. This should only be used for testing.
     */
    function resetTypeSelectors() {
        SELECTOR_TO_TYPE = new Map();
        TYPE_TO_SELECTOR = new Map();
    }

    /**
     * Provider that ensures `injectIncludeStyles()` will run on application
     * startup before components are created.
     */
    var INJECT_STYLES_PROVIDER = {
        provide: core.APP_INITIALIZER,
        multi: true,
        useFactory: injectIncludeStyles,
        deps: [core.NgModuleRef]
    };
    /**
     * Provider that ensures `injectIncludeStyles()` will run on application
     * startup before components are created. This provider does _not_ require
     * @angular/router.
     */
    var INJECT_STYLES_NO_ROUTER_PROVIDER = {
        provide: core.APP_INITIALIZER,
        multi: true,
        useFactory: injectIncludeStylesNoRouter,
        deps: [core.NgModuleRef]
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
    function injectIncludeStyles(ngModule) {
        var injectStyles = injectIncludeStylesNoRouter(ngModule);
        return function () {
            injectStyles();
            var router$1 = ngModule.injector.get(router.Router);
            router$1.events.subscribe(function (e) {
                if ('route' in e && !e.route._loadedConfig) {
                    util.whenSet(e.route, '_loadedConfig', undefined, function (config) {
                        scanComponentFactoryResolver(config.module.injector.get(core.ComponentFactoryResolver));
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
    function injectIncludeStylesNoRouter(ngModule) {
        return function () {
            patchRendererFactory(ngModule.injector.get(core.RendererFactory2));
            scanComponentFactoryResolver(ngModule.injector.get(core.ComponentFactoryResolver));
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
    function patchRendererFactory(factory) {
        var $createRenderer = factory.createRenderer;
        factory.createRenderer = function (element, type) {
            var _a;
            var selector = element && element.localName;
            if (selector && type && INJECTED_SELECTORS.indexOf(selector) === -1) {
                var styleModules = getStyleModulesFor(getTypeFor(selector));
                var styles = styleModules.map(function (styleModule) {
                    var styleElements = styleGather.stylesFromModule(styleModule);
                    return styleElements.map(function (e) { return e.innerText; }).join('\n');
                });
                switch (type.encapsulation) {
                    case core.ViewEncapsulation.Emulated:
                    default:
                        styles = styles.map(function (style) { return styleToEmulatedEncapsulation(style); });
                        break;
                    case core.ViewEncapsulation.None:
                    case core.ViewEncapsulation.Native:
                    case core.ViewEncapsulation.ShadowDom:
                        break;
                }
                (_a = type.styles).push.apply(_a, __spread(styles));
                INJECTED_SELECTORS.push(selector);
            }
            return $createRenderer.apply(this, arguments);
        };
    }

    /**
     * Importing this module will add the ability for Angular components to include
     * Polymer style modules with the `@IncludeStyles()` decorator. This module
     * only needs to be imported once at the root component.
     *
     * This module does _not_ require `@angular/router` and will not inject styles
     * into lazy loaded components.
     */
    var IncludeStylesNoRouterModule = /** @class */ (function () {
        function IncludeStylesNoRouterModule() {
        }
        IncludeStylesNoRouterModule = __decorate([
            core.NgModule({
                providers: [INJECT_STYLES_NO_ROUTER_PROVIDER]
            })
        ], IncludeStylesNoRouterModule);
        return IncludeStylesNoRouterModule;
    }());

    /**
     * Importing this module will add the ability for Angular components to include
     * Polymer style modules with the `@IncludeStyles()` decorator. This module
     * only needs to be imported once at the root component.
     *
     * This module _requires_` @angular/router` in order to inject styles for lazy
     * loaded components. Use `InjectStylesNoRouterModule` if your application does
     * not use `@angular/router`.
     */
    var IncludeStylesModule = /** @class */ (function () {
        function IncludeStylesModule() {
        }
        IncludeStylesModule = __decorate([
            core.NgModule({
                providers: [INJECT_STYLES_PROVIDER]
            })
        ], IncludeStylesModule);
        return IncludeStylesModule;
    }());

    /**
     * By default, Origami will not parse or register styles with ShadyCSS if the
     * platform supports native CSS custom properties. However, ShadyCSS also
     * supports the deprecated `@apply` mixin proposal. If a project is using
     * `@apply` in CSS, this token should be provided with a true value.
     */
    var USING_APPLY = new core.InjectionToken('usingApply');
    /**
     * Processes all current document stylesheets added by Angular and registers
     * them with ShadyCSS.
     *
     * This function will also parse external `<link>` stylesheets if native
     * CSS custom properties are not supported, or if `usingApply` is set to true.
     *
     * @param usingApply if true, parse stylesheets regardless of native support,
     *   since no browser supports `@apply` natively
     * @returns a Promise when all stylesheets have been processed
     */
    function processStylesheets(usingApply) {
        return __awaiter(this, void 0, void 0, function () {
            var CustomStyleInterface;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        CustomStyleInterface = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
                        if (!(CustomStyleInterface && (!window.ShadyCSS.nativeCss || usingApply))) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(Array.from(document.styleSheets).map(function (stylesheet) {
                                var node = stylesheet.ownerNode;
                                if (isStyleNode(node) && !node.hasAttribute('scope')) {
                                    CustomStyleInterface.addCustomStyle(node);
                                    return Promise.resolve();
                                }
                                else if (stylesheet.href) {
                                    if (!stylesheet._fetching) {
                                        var href_1 = stylesheet.href;
                                        stylesheet._fetching = new Promise(function (resolve) {
                                            var xhr = new XMLHttpRequest();
                                            xhr.addEventListener('load', function () {
                                                var style = document.createElement('style');
                                                style.innerHTML = xhr.responseText;
                                                node.parentNode.insertBefore(style, node);
                                                node.parentNode.removeChild(node);
                                                CustomStyleInterface.addCustomStyle(style);
                                                resolve();
                                            });
                                            xhr.open('GET', href_1);
                                            xhr.send();
                                        });
                                    }
                                    return stylesheet._fetching;
                                }
                            }))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Returns true if the provided node is a `<style>` node.
     *
     * @param node the node to test
     * @returns true if the node is a `<style>` node
     */
    function isStyleNode(node) {
        return node.localName === 'style';
    }

    // First group is incorrect escape backslash, second group is rest of mixin detection
    var MIXIN_REGEX = /(?:\\)(--\w[\w-_]*:\s*{[^}]*})(;)?/g;
    /**
     * A `SharedStylesHost` that extends the default `DomSharedStylesHost` and will
     * pass styles to ShadyCSS for processing. This will allow the use of custom CSS
     * properties in Angular styles on browsers that do not support them.
     */
    var ShadyCSSSharedStylesHost = /** @class */ (function (_super) {
        __extends(ShadyCSSSharedStylesHost, _super);
        function ShadyCSSSharedStylesHost(document, usingApply) {
            var _this = 
            /* istanbul ignore next */
            _super.call(this, document) || this;
            _this.usingApply = usingApply;
            return _this;
        }
        ShadyCSSSharedStylesHost.prototype.addStyles = function (styles) {
            /**
             * Mixins are declared as
             *
             * html {
             *   --my-mixin: {
             *     color: blue;
             *   }
             * }
             *
             * But are incorrectly interpolated by the webpack CSS loader as
             *
             * html {
             *   \--my-mixin: {
             *     color: blue;
             *   }
             * }
             *
             * This regex will fix the added backslash.
             */
            _super.prototype.addStyles.call(this, styles.map(function (style) { return style.replace(MIXIN_REGEX, '$1'); }));
        };
        ShadyCSSSharedStylesHost.prototype.onStylesAdded = function (additions) {
            _super.prototype.onStylesAdded.call(this, additions);
            processStylesheets(this.usingApply);
        };
        ShadyCSSSharedStylesHost = __decorate([
            __param(0, core.Inject(common.DOCUMENT)),
            __param(1, core.Optional()),
            __param(1, core.Inject(USING_APPLY))
        ], ShadyCSSSharedStylesHost);
        return ShadyCSSSharedStylesHost;
    }(platformBrowser["ɵDomSharedStylesHost"]));
    /**
     * Factory to resolve runtime errors for Ivy compilation
     */
    function ShadyCSSSharedStylesHostFactory() {
        return new ShadyCSSSharedStylesHost(document);
    }
    /**
     * Provider that replaces the DomSharedStylesHost with ShadyCSSSharedStylesHost.
     */
    var SHADYCSS_SHARED_STYLES_HOST_PROVIDER = {
        provide: platformBrowser["ɵDomSharedStylesHost"],
        useFactory: ShadyCSSSharedStylesHostFactory
    };

    /**
     * Adds ShadyCSS support to Angular. This allows the use of CSS custom
     * properties in Angular styles on browsers that do not support them.
     *
     * The ShadyCSS polyfill must be imported separately. It may be imported from
     * `@webcomponents/shadycss/entrypoints/custom-style-interface.js`
     * or `@polymer/polymer/lib/elements/custom-style.js`.
     *
     * If using the deprecated `@apply` mixin proposal, import
     * `ShadyCSSModule.usingApply()` instead.
     */
    var ShadyCSSModule = /** @class */ (function () {
        function ShadyCSSModule() {
        }
        ShadyCSSModule_1 = ShadyCSSModule;
        /**
         * Forces Origami to register all stylesheets with ShadyCSS regardless of
         * native CSS custom property support. Import `ShadyCSSModule.usingApply()`
         * when using `@apply` mixins.
         */
        ShadyCSSModule.usingApply = function () {
            return {
                ngModule: ShadyCSSModule_1,
                providers: [
                    {
                        provide: USING_APPLY,
                        useValue: true
                    }
                ]
            };
        };
        var ShadyCSSModule_1;
        ShadyCSSModule = ShadyCSSModule_1 = __decorate([
            core.NgModule({
                imports: [polyfills.WebComponentsReadyModule],
                providers: [SHADYCSS_SHARED_STYLES_HOST_PROVIDER]
            })
        ], ShadyCSSModule);
        return ShadyCSSModule;
    }());

    exports.COMPONENT_VARIABLE = COMPONENT_VARIABLE;
    exports.CONTENT_ATTR = CONTENT_ATTR;
    exports.HOST_ATTR = HOST_ATTR;
    exports.HOST_CONTEXT_REGEX = HOST_CONTEXT_REGEX;
    exports.HOST_REGEX = HOST_REGEX;
    exports.INJECT_STYLES_NO_ROUTER_PROVIDER = INJECT_STYLES_NO_ROUTER_PROVIDER;
    exports.INJECT_STYLES_PROVIDER = INJECT_STYLES_PROVIDER;
    exports.IncludeStyles = IncludeStyles;
    exports.IncludeStylesModule = IncludeStylesModule;
    exports.IncludeStylesNoRouterModule = IncludeStylesNoRouterModule;
    exports.SHADYCSS_SHARED_STYLES_HOST_PROVIDER = SHADYCSS_SHARED_STYLES_HOST_PROVIDER;
    exports.ShadyCSSModule = ShadyCSSModule;
    exports.ShadyCSSSharedStylesHost = ShadyCSSSharedStylesHost;
    exports.ShadyCSSSharedStylesHostFactory = ShadyCSSSharedStylesHostFactory;
    exports.USING_APPLY = USING_APPLY;
    exports.clearStyleModuleCache = clearStyleModuleCache;
    exports.getRegisteredTypes = getRegisteredTypes;
    exports.getStyleModulesFor = getStyleModulesFor;
    exports.getTypeFor = getTypeFor;
    exports.importStyleModule = importStyleModule;
    exports.injectIncludeStyles = injectIncludeStyles;
    exports.injectIncludeStylesNoRouter = injectIncludeStylesNoRouter;
    exports.isStyleNode = isStyleNode;
    exports.parseStyleStatements = parseStyleStatements;
    exports.patchRendererFactory = patchRendererFactory;
    exports.processStylesheets = processStylesheets;
    exports.resetIncludeStyles = resetIncludeStyles;
    exports.resetTypeSelectors = resetTypeSelectors;
    exports.scanComponentFactoryResolver = scanComponentFactoryResolver;
    exports.statementsToString = statementsToString;
    exports.styleToEmulatedEncapsulation = styleToEmulatedEncapsulation;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=origami-styles.umd.js.map
