declare global {
    interface Window {
        HTMLElement: typeof HTMLElement;
    }
}
/**
 * Fixes issues where HTMLElement is an object and not a function in browsers,
 * which causes extending them using Typescript's `__extend` to break.
 *
 * See https://github.com/webcomponents/custom-elements/issues/109
 */
export declare function shimHtmlElementClass(): void;
