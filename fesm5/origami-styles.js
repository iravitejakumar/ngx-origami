import { __spread, __decorate, __awaiter, __generator, __extends, __param } from 'tslib';
import { APP_INITIALIZER, NgModuleRef, RendererFactory2, ComponentFactoryResolver, ViewEncapsulation, NgModule, InjectionToken, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { stylesFromModule } from '@polymer/polymer/lib/utils/style-gather';
import { whenSet } from '@codebakery/origami/util';
import { WebComponentsReadyModule } from '@codebakery/origami/polyfills';
import { DOCUMENT } from '@angular/common';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';

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
var INJECT_STYLES_NO_ROUTER_PROVIDER = {
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
function injectIncludeStyles(ngModule) {
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
function injectIncludeStylesNoRouter(ngModule) {
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
function patchRendererFactory(factory) {
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
        NgModule({
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
        NgModule({
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
var USING_APPLY = new InjectionToken('usingApply');
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
        __param(0, Inject(DOCUMENT)),
        __param(1, Optional()),
        __param(1, Inject(USING_APPLY))
    ], ShadyCSSSharedStylesHost);
    return ShadyCSSSharedStylesHost;
}(ɵDomSharedStylesHost));
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
    provide: ɵDomSharedStylesHost,
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
        NgModule({
            imports: [WebComponentsReadyModule],
            providers: [SHADYCSS_SHARED_STYLES_HOST_PROVIDER]
        })
    ], ShadyCSSModule);
    return ShadyCSSModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { COMPONENT_VARIABLE, CONTENT_ATTR, HOST_ATTR, HOST_CONTEXT_REGEX, HOST_REGEX, INJECT_STYLES_NO_ROUTER_PROVIDER, INJECT_STYLES_PROVIDER, IncludeStyles, IncludeStylesModule, IncludeStylesNoRouterModule, SHADYCSS_SHARED_STYLES_HOST_PROVIDER, ShadyCSSModule, ShadyCSSSharedStylesHost, ShadyCSSSharedStylesHostFactory, USING_APPLY, clearStyleModuleCache, getRegisteredTypes, getStyleModulesFor, getTypeFor, importStyleModule, injectIncludeStyles, injectIncludeStylesNoRouter, isStyleNode, parseStyleStatements, patchRendererFactory, processStylesheets, resetIncludeStyles, resetTypeSelectors, scanComponentFactoryResolver, statementsToString, styleToEmulatedEncapsulation };
//# sourceMappingURL=origami-styles.js.map
