declare global {
    interface Window {
        HTMLTemplateElement: typeof HTMLTemplateElement;
    }
}
/**
 * Angular incorrectly adds `<template>` children to the element's child node
 * list instead of its content. This shim forces children appended to a
 * `<template>` to be added to its content instead.
 *
 * https://github.com/angular/angular/issues/15557
 *
 * @returns a Promise that resolves when the HTMLTemplateElement is shimmed
 */
export declare function shimHTMLTemplateAppend(): Promise<void>;
/**
 * Resets `shimHTMLTemplateAppend()` so that it will re-shim the class next
 * time it is called. This is primarily used for testing.
 */
export declare function resetShimHTMLTemplateAppend(): void;
