import { __awaiter } from "tslib";
import { whenSet } from 'ngx-origami/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbS10ZW1wbGF0ZS1hcHBlbmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS90ZW1wbGF0ZXMvIiwic291cmNlcyI6WyJzcmMvc2hpbS10ZW1wbGF0ZS1hcHBlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQVEzQyxJQUFJLFdBQXNDLENBQUM7QUFDM0M7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCO0lBQ3BDLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDaEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1lBQ2hCLHlFQUF5RTtZQUN6RSx5RUFBeUU7WUFDekUsZ0NBQWdDO1lBQ2hDLGtEQUFrRDtZQUNsRCxNQUFNLFlBQVksR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1lBQy9ELG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsVUFDMUMsU0FBWTtnQkFFWixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzVDO3FCQUFNO29CQUNMLE9BQVUsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2lCQUNqRDtZQUNILENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVGLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFNLE9BQU8sRUFBQyxFQUFFO1lBQ3hDLE1BQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQzdDLElBQUksRUFBRSxDQUFDO1lBQ1AsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUEsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQjtJQUN6QyxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBQzFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3aGVuU2V0IH0gZnJvbSAnbmd4LW9yaWdhbWkvdXRpbCc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgSFRNTFRlbXBsYXRlRWxlbWVudDogdHlwZW9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIH1cbn1cblxubGV0IHNoaW1Qcm9taXNlOiBQcm9taXNlPHZvaWQ+IHwgdW5kZWZpbmVkO1xuLyoqXG4gKiBBbmd1bGFyIGluY29ycmVjdGx5IGFkZHMgYDx0ZW1wbGF0ZT5gIGNoaWxkcmVuIHRvIHRoZSBlbGVtZW50J3MgY2hpbGQgbm9kZVxuICogbGlzdCBpbnN0ZWFkIG9mIGl0cyBjb250ZW50LiBUaGlzIHNoaW0gZm9yY2VzIGNoaWxkcmVuIGFwcGVuZGVkIHRvIGFcbiAqIGA8dGVtcGxhdGU+YCB0byBiZSBhZGRlZCB0byBpdHMgY29udGVudCBpbnN0ZWFkLlxuICpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE1NTU3XG4gKlxuICogQHJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgSFRNTFRlbXBsYXRlRWxlbWVudCBpcyBzaGltbWVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGltSFRNTFRlbXBsYXRlQXBwZW5kKCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoIXNoaW1Qcm9taXNlKSB7XG4gICAgY29uc3Qgc2hpbSA9ICgpID0+IHtcbiAgICAgIC8vIEFuZ3VsYXIncyByZW5kZXJlciB3aWxsIGFkZCBjaGlsZHJlbiB0byBhIDx0ZW1wbGF0ZT4gaW5zdGVhZCBvZiB0byBpdHNcbiAgICAgIC8vIGNvbnRlbnQuIFRoaXMgc2hpbSB3aWxsIGZvcmNlIGFueSBjaGlsZHJlbiBhZGRlZCB0byBhIDx0ZW1wbGF0ZT4gdG8gYmVcbiAgICAgIC8vIGFkZGVkIHRvIGl0cyBjb250ZW50IGluc3RlYWQuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNTU1N1xuICAgICAgY29uc3QgbmF0aXZlQXBwZW5kID0gSFRNTFRlbXBsYXRlRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGQ7XG4gICAgICBIVE1MVGVtcGxhdGVFbGVtZW50LnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uPFQgZXh0ZW5kcyBOb2RlPihcbiAgICAgICAgY2hpbGROb2RlOiBUXG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQoY2hpbGROb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gPFQ+bmF0aXZlQXBwZW5kLmFwcGx5KHRoaXMsIFtjaGlsZE5vZGVdKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2hpbVByb21pc2UgPSBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGF3YWl0IHdoZW5TZXQod2luZG93LCAnSFRNTFRlbXBsYXRlRWxlbWVudCcpO1xuICAgICAgc2hpbSgpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHNoaW1Qcm9taXNlO1xufVxuXG4vKipcbiAqIFJlc2V0cyBgc2hpbUhUTUxUZW1wbGF0ZUFwcGVuZCgpYCBzbyB0aGF0IGl0IHdpbGwgcmUtc2hpbSB0aGUgY2xhc3MgbmV4dFxuICogdGltZSBpdCBpcyBjYWxsZWQuIFRoaXMgaXMgcHJpbWFyaWx5IHVzZWQgZm9yIHRlc3RpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldFNoaW1IVE1MVGVtcGxhdGVBcHBlbmQoKSB7XG4gIHNoaW1Qcm9taXNlID0gdW5kZWZpbmVkO1xufVxuIl19