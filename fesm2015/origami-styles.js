import { __decorate, __awaiter, __param } from 'tslib';
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
let cachedDomModule;
/**
 * Style module CSS text cached by id.
 */
let CACHED_STYLE_MODULES = new Map();
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
        const styleTemplate = (cachedDomModule.import(styleModule, 'template'));
        if (styleTemplate) {
            const styles = styleTemplate.content.querySelectorAll('style');
            CACHED_STYLE_MODULES.set(styleModule, Array.from(styles)
                .map(style => style.innerText)
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
let TYPE_STYLE_MODULES = new Map();
/**
 * Decorator that registers style modules to be injected for a given component
 * type. One or more style modules may be specified.
 *
 * @param styleModule a style module to include
 * @param styleModules additional style modules to include
 * @returns a class decorator
 */
function IncludeStyles(...styleModules) {
    return (target) => {
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
const HOST_CONTEXT_REGEX = /:host-context\((.*)\)/g;
/**
 * Regex to find and replace `:host` selectors.
 */
const HOST_REGEX = /:host(?:\((.*)\))?/g;
// from @angular/platform-browser
const COMPONENT_VARIABLE = '%COMP%';
const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
/**
 * Converts the provided CSS string to an Angular emulated encapsulation string
 * for the given component id.
 *
 * @param style the CSS string to convert
 * @returns a CSS string that emulates encapsulation for the given component id
 */
function styleToEmulatedEncapsulation(style) {
    const statements = parseStyleStatements(style);
    function addEmulation(statement) {
        if (Array.isArray(statement.statements)) {
            statement.statements.forEach(nested => addEmulation(nested));
        }
        else {
            let { selector } = statement;
            selector = selector.trim();
            selector = selector
                .split(',')
                .map(subSelector => {
                return subSelector
                    .trim()
                    .split(' ')
                    .map(part => {
                    part = part.trim();
                    if (part.includes(':host')) {
                        return part;
                    }
                    else {
                        return `${part}[${CONTENT_ATTR}]`;
                    }
                })
                    .join(' ');
            })
                .join(',');
            selector = selector.replace(HOST_CONTEXT_REGEX, `*$1 [${HOST_ATTR}]`);
            selector = selector.replace(HOST_REGEX, `[${HOST_ATTR}]$1`);
            statement.selector = selector;
        }
    }
    statements.forEach(statement => {
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
    let inAtRule = false;
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let inBlock = 0;
    let leavingBlock = false;
    const statements = [];
    let currentStatement = {
        selector: '',
        block: ''
    };
    for (let i = 0; i < style.length; i++) {
        const char = style[i];
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
        .map(statement => {
        const block = Array.isArray(statement.statements)
            ? `{${statementsToString(statement.statements)}}`
            : statement.block;
        return `${statement.selector} ${block}`;
    })
        .join('\n');
}

let SELECTOR_TO_TYPE = new Map();
let TYPE_TO_SELECTOR = new Map();
/**
 * Scans a `ComponentFactoryResolver` for types decorated with
 * `@IncludeStyles()` to build a map of types and selectors.
 *
 * @param resolver the `ComponentFactoryResolver` to scan
 */
function scanComponentFactoryResolver(resolver) {
    Array.from(getRegisteredTypes()).forEach(type => {
        if (!TYPE_TO_SELECTOR.has(type)) {
            try {
                const factory = resolver.resolveComponentFactory(type);
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
const INJECT_STYLES_PROVIDER = {
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
const INJECT_STYLES_NO_ROUTER_PROVIDER = {
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
    const injectStyles = injectIncludeStylesNoRouter(ngModule);
    return () => {
        injectStyles();
        const router = ngModule.injector.get(Router);
        router.events.subscribe(e => {
            if ('route' in e && !e.route._loadedConfig) {
                whenSet(e.route, '_loadedConfig', undefined, config => {
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
    return () => {
        patchRendererFactory(ngModule.injector.get(RendererFactory2));
        scanComponentFactoryResolver(ngModule.injector.get(ComponentFactoryResolver));
    };
}
const INJECTED_SELECTORS = [];
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
    const $createRenderer = factory.createRenderer;
    factory.createRenderer = function (element, type) {
        const selector = element && element.localName;
        if (selector && type && INJECTED_SELECTORS.indexOf(selector) === -1) {
            const styleModules = getStyleModulesFor(getTypeFor(selector));
            let styles = styleModules.map(styleModule => {
                const styleElements = stylesFromModule(styleModule);
                return styleElements.map(e => e.innerText).join('\n');
            });
            switch (type.encapsulation) {
                case ViewEncapsulation.Emulated:
                default:
                    styles = styles.map(style => styleToEmulatedEncapsulation(style));
                    break;
                case ViewEncapsulation.None:
                case ViewEncapsulation.Native:
                case ViewEncapsulation.ShadowDom:
                    break;
            }
            type.styles.push(...styles);
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
let IncludeStylesNoRouterModule = class IncludeStylesNoRouterModule {
};
IncludeStylesNoRouterModule = __decorate([
    NgModule({
        providers: [INJECT_STYLES_NO_ROUTER_PROVIDER]
    })
], IncludeStylesNoRouterModule);

/**
 * Importing this module will add the ability for Angular components to include
 * Polymer style modules with the `@IncludeStyles()` decorator. This module
 * only needs to be imported once at the root component.
 *
 * This module _requires_` @angular/router` in order to inject styles for lazy
 * loaded components. Use `InjectStylesNoRouterModule` if your application does
 * not use `@angular/router`.
 */
let IncludeStylesModule = class IncludeStylesModule {
};
IncludeStylesModule = __decorate([
    NgModule({
        providers: [INJECT_STYLES_PROVIDER]
    })
], IncludeStylesModule);

/**
 * By default, Origami will not parse or register styles with ShadyCSS if the
 * platform supports native CSS custom properties. However, ShadyCSS also
 * supports the deprecated `@apply` mixin proposal. If a project is using
 * `@apply` in CSS, this token should be provided with a true value.
 */
const USING_APPLY = new InjectionToken('usingApply');
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
    return __awaiter(this, void 0, void 0, function* () {
        const CustomStyleInterface = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
        if (CustomStyleInterface && (!window.ShadyCSS.nativeCss || usingApply)) {
            yield Promise.all(Array.from(document.styleSheets).map(stylesheet => {
                const node = stylesheet.ownerNode;
                if (isStyleNode(node) && !node.hasAttribute('scope')) {
                    CustomStyleInterface.addCustomStyle(node);
                    return Promise.resolve();
                }
                else if (stylesheet.href) {
                    if (!stylesheet._fetching) {
                        const href = stylesheet.href;
                        stylesheet._fetching = new Promise(resolve => {
                            const xhr = new XMLHttpRequest();
                            xhr.addEventListener('load', () => {
                                const style = document.createElement('style');
                                style.innerHTML = xhr.responseText;
                                node.parentNode.insertBefore(style, node);
                                node.parentNode.removeChild(node);
                                CustomStyleInterface.addCustomStyle(style);
                                resolve();
                            });
                            xhr.open('GET', href);
                            xhr.send();
                        });
                    }
                    return stylesheet._fetching;
                }
            }));
        }
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
const MIXIN_REGEX = /(?:\\)(--\w[\w-_]*:\s*{[^}]*})(;)?/g;
/**
 * A `SharedStylesHost` that extends the default `DomSharedStylesHost` and will
 * pass styles to ShadyCSS for processing. This will allow the use of custom CSS
 * properties in Angular styles on browsers that do not support them.
 */
let ShadyCSSSharedStylesHost = class ShadyCSSSharedStylesHost extends ɵDomSharedStylesHost {
    constructor(document, usingApply) {
        /* istanbul ignore next */
        super(document);
        this.usingApply = usingApply;
    }
    addStyles(styles) {
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
        super.addStyles(styles.map(style => style.replace(MIXIN_REGEX, '$1')));
    }
    onStylesAdded(additions) {
        super.onStylesAdded(additions);
        processStylesheets(this.usingApply);
    }
};
ShadyCSSSharedStylesHost = __decorate([
    __param(0, Inject(DOCUMENT)),
    __param(1, Optional()),
    __param(1, Inject(USING_APPLY))
], ShadyCSSSharedStylesHost);
/**
 * Factory to resolve runtime errors for Ivy compilation
 */
function ShadyCSSSharedStylesHostFactory() {
    return new ShadyCSSSharedStylesHost(document);
}
/**
 * Provider that replaces the DomSharedStylesHost with ShadyCSSSharedStylesHost.
 */
const SHADYCSS_SHARED_STYLES_HOST_PROVIDER = {
    provide: ɵDomSharedStylesHost,
    useFactory: ShadyCSSSharedStylesHostFactory
};

var ShadyCSSModule_1;
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
let ShadyCSSModule = ShadyCSSModule_1 = class ShadyCSSModule {
    /**
     * Forces Origami to register all stylesheets with ShadyCSS regardless of
     * native CSS custom property support. Import `ShadyCSSModule.usingApply()`
     * when using `@apply` mixins.
     */
    static usingApply() {
        return {
            ngModule: ShadyCSSModule_1,
            providers: [
                {
                    provide: USING_APPLY,
                    useValue: true
                }
            ]
        };
    }
};
ShadyCSSModule = ShadyCSSModule_1 = __decorate([
    NgModule({
        imports: [WebComponentsReadyModule],
        providers: [SHADYCSS_SHARED_STYLES_HOST_PROVIDER]
    })
], ShadyCSSModule);

/**
 * Generated bundle index. Do not edit.
 */

export { COMPONENT_VARIABLE, CONTENT_ATTR, HOST_ATTR, HOST_CONTEXT_REGEX, HOST_REGEX, INJECT_STYLES_NO_ROUTER_PROVIDER, INJECT_STYLES_PROVIDER, IncludeStyles, IncludeStylesModule, IncludeStylesNoRouterModule, SHADYCSS_SHARED_STYLES_HOST_PROVIDER, ShadyCSSModule, ShadyCSSSharedStylesHost, ShadyCSSSharedStylesHostFactory, USING_APPLY, clearStyleModuleCache, getRegisteredTypes, getStyleModulesFor, getTypeFor, importStyleModule, injectIncludeStyles, injectIncludeStylesNoRouter, isStyleNode, parseStyleStatements, patchRendererFactory, processStylesheets, resetIncludeStyles, resetTypeSelectors, scanComponentFactoryResolver, statementsToString, styleToEmulatedEncapsulation };
//# sourceMappingURL=origami-styles.js.map
