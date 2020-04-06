import { whenSet } from 'ngx-origami/util';
import { __decorate } from 'tslib';
import { APP_INITIALIZER, NgModule } from '@angular/core';

let readyPromise;
/**
 * Returns a Promise that resolves when webcomponent polyfills are ready. If
 * this function is used *without* polyfills loaded, it will never resolve.
 *
 * @returns a Promise that resolves when webcomponents are ready
 */
function webcomponentsReady() {
    if (!readyPromise) {
        readyPromise = new Promise(resolve => {
            whenSet(window, 'WebComponents', undefined, WebComponents => {
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
        const ceMap = {};
        const ceWhenDefined = {};
        const ceUpgrade = [];
        class CustomElementRegistryShim {
            constructor() {
                // instruct webcomponentsjs to ignore this shim
                this.forcePolyfill = true;
            }
            get(name) {
                return ceMap[name] && ceMap[name][0];
            }
            define(name, constructor, options) {
                ceMap[name] = [constructor, options];
            }
            whenDefined(name) {
                if (!Array.isArray(ceWhenDefined[name])) {
                    ceWhenDefined[name] = [];
                    ceWhenDefined[name][0] = new Promise(resolve => {
                        ceWhenDefined[name][1] = resolve;
                    });
                }
                return ceWhenDefined[name][0];
            }
            upgrade(root) {
                ceUpgrade.push(root);
            }
        }
        window.customElements = new CustomElementRegistryShim();
        window.CustomElementRegistry = CustomElementRegistryShim;
        webcomponentsReady().then(() => {
            Object.keys(ceWhenDefined).forEach(name => {
                window.customElements.whenDefined(name).then(() => {
                    ceWhenDefined[name][1]();
                });
            });
            Object.keys(ceMap).forEach(name => {
                const [constructor, options] = ceMap[name];
                window.customElements.define(name, constructor, options);
            });
            ceUpgrade.forEach(root => window.customElements.upgrade(root));
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
        const HTMLElementFn = function () { };
        HTMLElementFn.prototype = HTMLElement.prototype;
        window.HTMLElement = HTMLElementFn;
    }
}

shimCustomElements();
shimHtmlElementClass();
const ɵ0 = webcomponentsReady;
const WEBCOMPONENTS_READY_PROVIDER = {
    provide: APP_INITIALIZER,
    multi: true,
    useValue: ɵ0
};
let WebComponentsReadyModule = class WebComponentsReadyModule {
};
WebComponentsReadyModule = __decorate([
    NgModule({
        providers: [WEBCOMPONENTS_READY_PROVIDER]
    })
], WebComponentsReadyModule);

/**
 * Generated bundle index. Do not edit.
 */

export { WEBCOMPONENTS_READY_PROVIDER, WebComponentsReadyModule, resetWebcomponentsReady, shimCustomElements, webcomponentsReady, ɵ0 };
//# sourceMappingURL=origami-polyfills.js.map
