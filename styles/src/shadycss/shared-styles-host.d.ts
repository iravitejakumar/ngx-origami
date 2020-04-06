import { Provider } from '@angular/core';
import { ɵDomSharedStylesHost as DomSharedStylesHost } from '@angular/platform-browser';
/**
 * A `SharedStylesHost` that extends the default `DomSharedStylesHost` and will
 * pass styles to ShadyCSS for processing. This will allow the use of custom CSS
 * properties in Angular styles on browsers that do not support them.
 */
export declare class ShadyCSSSharedStylesHost extends DomSharedStylesHost {
    private usingApply?;
    constructor(document: Document, usingApply?: boolean);
    addStyles(styles: string[]): void;
    onStylesAdded(additions: Set<string>): void;
}
/**
 * Factory to resolve runtime errors for Ivy compilation
 */
export declare function ShadyCSSSharedStylesHostFactory(): ShadyCSSSharedStylesHost;
/**
 * Provider that replaces the DomSharedStylesHost with ShadyCSSSharedStylesHost.
 */
export declare const SHADYCSS_SHARED_STYLES_HOST_PROVIDER: Provider;
