import { __read, __decorate } from 'tslib';
import { whenSet } from '@codebakery/origami/util';
import { APP_INITIALIZER, NgModule } from '@angular/core';

var readyPromise;
/**
 * Returns a Promise that resolves when webcomponent polyfills are ready. If
 * this function is used *without* polyfills loaded, it will never resolve.
 *
 * @returns a Promise that resolves when webcomponents are ready
 */
function webcomponentsReady() {
    if (!readyPromise) {
        readyPromise = new Promise(function (resolve) {
            whenSet(window, 'WebComponents', undefined, function (WebComponents) {
                if (WebComponents && !WebComponents.ready) {
                    document.addEventListener('WebComponentsReady', function onready() {
                        document.removeEventListener('WebComponentsReady', onready);
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        });
    }
    return readyPromise;
}
/**
 * Resets the `webcomponentsReady()` function. Should only be used in testing.
 */
function resetWebcomponentsReady() {
    readyPromise = undefined;
}

/**
 * Shims `window.customElements` with a placeholder that allows custom elements
 * to define themselves before the WebComponents polyfill is ready. When the
 * polyfill loads, the element definitions will be defined with the polyfilled
 * `customElements`.
 *
 * This allows the developer to import files that call `customElements.define()`
 * without having to delay loading the app via `webcomponentsReady()`.
 *
 * This is automatically called by Origami.
 */
function shimCustomElements() {
    if (!window.customElements) {
        var ceMap_1 = {};
        var ceWhenDefined_1 = {};
        var ceUpgrade_1 = [];
        var CustomElementRegistryShim = /** @class */ (function () {
            function CustomElementRegistryShim() {
                // instruct webcomponentsjs to ignore this shim
                this.forcePolyfill = true;
            }
            CustomElementRegistryShim.prototype.get = function (name) {
                return ceMap_1[name] && ceMap_1[name][0];
            };
            CustomElementRegistryShim.prototype.define = function (name, constructor, options) {
                ceMap_1[name] = [constructor, options];
            };
            CustomElementRegistryShim.prototype.whenDefined = function (name) {
                if (!Array.isArray(ceWhenDefined_1[name])) {
                    ceWhenDefined_1[name] = [];
                    ceWhenDefined_1[name][0] = new Promise(function (resolve) {
                        ceWhenDefined_1[name][1] = resolve;
                    });
                }
                return ceWhenDefined_1[name][0];
            };
            CustomElementRegistryShim.prototype.upgrade = function (root) {
                ceUpgrade_1.push(root);
            };
            return CustomElementRegistryShim;
        }());
        window.customElements = new CustomElementRegistryShim();
        window.CustomElementRegistry = CustomElementRegistryShim;
        webcomponentsReady().then(function () {
            Object.keys(ceWhenDefined_1).forEach(function (name) {
                window.customElements.whenDefined(name).then(function () {
                    ceWhenDefined_1[name][1]();
                });
            });
            Object.keys(ceMap_1).forEach(function (name) {
                var _a = __read(ceMap_1[name], 2), constructor = _a[0], options = _a[1];
                window.customElements.define(name, constructor, options);
            });
            ceUpgrade_1.forEach(function (root) { return window.customElements.upgrade(root); });
        });
    }
}

/**
 * Fixes issues where HTMLElement is an object and not a function in browsers,
 * which causes extending them using Typescript's `__extend` to break.
 *
 * See https://github.com/webcomponents/custom-elements/issues/109
 */
function shimHtmlElementClass() {
    if (typeof HTMLElement === 'object') {
        var HTMLElementFn = function () { };
        HTMLElementFn.prototype = HTMLElement.prototype;
        window.HTMLElement = HTMLElementFn;
    }
}

shimCustomElements();
shimHtmlElementClass();
var ɵ0 = webcomponentsReady;
var WEBCOMPONENTS_READY_PROVIDER = {
    provide: APP_INITIALIZER,
    multi: true,
    useValue: ɵ0
};
var WebComponentsReadyModule = /** @class */ (function () {
    function WebComponentsReadyModule() {
    }
    WebComponentsReadyModule = __decorate([
        NgModule({
            providers: [WEBCOMPONENTS_READY_PROVIDER]
        })
    ], WebComponentsReadyModule);
    return WebComponentsReadyModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { WEBCOMPONENTS_READY_PROVIDER, WebComponentsReadyModule, resetWebcomponentsReady, shimCustomElements, webcomponentsReady, ɵ0 };
//# sourceMappingURL=origami-polyfills.js.map
