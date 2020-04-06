import { __awaiter } from "tslib";
import { whenSet } from '@codebakery/origami/util';
let shimPromise;
/**
 * Angular incorrectly adds `<template>` children to the element's child node
 * list instead of its content. This shim forces children appended to a
 * `<template>` to be added to its content instead.
 *
 * https://github.com/angular/angular/issues/15557
 *
 * @returns a Promise that resolves when the HTMLTemplateElement is shimmed
 */
export function shimHTMLTemplateAppend() {
    if (!shimPromise) {
        const shim = () => {
            // Angular's renderer will add children to a <template> instead of to its
            // content. This shim will force any children added to a <template> to be
            // added to its content instead.
            // https://github.com/angular/angular/issues/15557
            const nativeAppend = HTMLTemplateElement.prototype.appendChild;
            HTMLTemplateElement.prototype.appendChild = function (childNode) {
                if (this.content) {
                    return this.content.appendChild(childNode);
                }
                else {
                    return nativeAppend.apply(this, [childNode]);
                }
            };
        };
        shimPromise = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield whenSet(window, 'HTMLTemplateElement');
            shim();
            resolve();
        }));
    }
    return shimPromise;
}
/**
 * Resets `shimHTMLTemplateAppend()` so that it will re-shim the class next
 * time it is called. This is primarily used for testing.
 */
export function resetShimHTMLTemplateAppend() {
    shimPromise = undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbS10ZW1wbGF0ZS1hcHBlbmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kZWJha2VyeS9vcmlnYW1pL3RlbXBsYXRlcy8iLCJzb3VyY2VzIjpbInNyYy9zaGltLXRlbXBsYXRlLWFwcGVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUW5ELElBQUksV0FBc0MsQ0FBQztBQUMzQzs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxzQkFBc0I7SUFDcEMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7WUFDaEIseUVBQXlFO1lBQ3pFLHlFQUF5RTtZQUN6RSxnQ0FBZ0M7WUFDaEMsa0RBQWtEO1lBQ2xELE1BQU0sWUFBWSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDL0QsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUMxQyxTQUFZO2dCQUVaLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDNUM7cUJBQU07b0JBQ0wsT0FBVSxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pEO1lBQ0gsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRUYsV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLENBQU0sT0FBTyxFQUFDLEVBQUU7WUFDeEMsTUFBTSxPQUFPLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLENBQUM7WUFDN0MsSUFBSSxFQUFFLENBQUM7WUFDUCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQSxDQUFDLENBQUM7S0FDSjtJQUVELE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsMkJBQTJCO0lBQ3pDLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdoZW5TZXQgfSBmcm9tICdAY29kZWJha2VyeS9vcmlnYW1pL3V0aWwnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIEhUTUxUZW1wbGF0ZUVsZW1lbnQ6IHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICB9XG59XG5cbmxldCBzaGltUHJvbWlzZTogUHJvbWlzZTx2b2lkPiB8IHVuZGVmaW5lZDtcbi8qKlxuICogQW5ndWxhciBpbmNvcnJlY3RseSBhZGRzIGA8dGVtcGxhdGU+YCBjaGlsZHJlbiB0byB0aGUgZWxlbWVudCdzIGNoaWxkIG5vZGVcbiAqIGxpc3QgaW5zdGVhZCBvZiBpdHMgY29udGVudC4gVGhpcyBzaGltIGZvcmNlcyBjaGlsZHJlbiBhcHBlbmRlZCB0byBhXG4gKiBgPHRlbXBsYXRlPmAgdG8gYmUgYWRkZWQgdG8gaXRzIGNvbnRlbnQgaW5zdGVhZC5cbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNTU1N1xuICpcbiAqIEByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIEhUTUxUZW1wbGF0ZUVsZW1lbnQgaXMgc2hpbW1lZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hpbUhUTUxUZW1wbGF0ZUFwcGVuZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFzaGltUHJvbWlzZSkge1xuICAgIGNvbnN0IHNoaW0gPSAoKSA9PiB7XG4gICAgICAvLyBBbmd1bGFyJ3MgcmVuZGVyZXIgd2lsbCBhZGQgY2hpbGRyZW4gdG8gYSA8dGVtcGxhdGU+IGluc3RlYWQgb2YgdG8gaXRzXG4gICAgICAvLyBjb250ZW50LiBUaGlzIHNoaW0gd2lsbCBmb3JjZSBhbnkgY2hpbGRyZW4gYWRkZWQgdG8gYSA8dGVtcGxhdGU+IHRvIGJlXG4gICAgICAvLyBhZGRlZCB0byBpdHMgY29udGVudCBpbnN0ZWFkLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTU1NTdcbiAgICAgIGNvbnN0IG5hdGl2ZUFwcGVuZCA9IEhUTUxUZW1wbGF0ZUVsZW1lbnQucHJvdG90eXBlLmFwcGVuZENoaWxkO1xuICAgICAgSFRNTFRlbXBsYXRlRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGQgPSBmdW5jdGlvbjxUIGV4dGVuZHMgTm9kZT4oXG4gICAgICAgIGNoaWxkTm9kZTogVFxuICAgICAgKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGNoaWxkTm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIDxUPm5hdGl2ZUFwcGVuZC5hcHBseSh0aGlzLCBbY2hpbGROb2RlXSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIHNoaW1Qcm9taXNlID0gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB3aGVuU2V0KHdpbmRvdywgJ0hUTUxUZW1wbGF0ZUVsZW1lbnQnKTtcbiAgICAgIHNoaW0oKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBzaGltUHJvbWlzZTtcbn1cblxuLyoqXG4gKiBSZXNldHMgYHNoaW1IVE1MVGVtcGxhdGVBcHBlbmQoKWAgc28gdGhhdCBpdCB3aWxsIHJlLXNoaW0gdGhlIGNsYXNzIG5leHRcbiAqIHRpbWUgaXQgaXMgY2FsbGVkLiBUaGlzIGlzIHByaW1hcmlseSB1c2VkIGZvciB0ZXN0aW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRTaGltSFRNTFRlbXBsYXRlQXBwZW5kKCkge1xuICBzaGltUHJvbWlzZSA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==