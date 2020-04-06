import { __awaiter, __generator } from "tslib";
import { whenSet } from 'ngx-origami/util';
var shimPromise;
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
    var _this = this;
    if (!shimPromise) {
        var shim_1 = function () {
            // Angular's renderer will add children to a <template> instead of to its
            // content. This shim will force any children added to a <template> to be
            // added to its content instead.
            // https://github.com/angular/angular/issues/15557
            var nativeAppend = HTMLTemplateElement.prototype.appendChild;
            HTMLTemplateElement.prototype.appendChild = function (childNode) {
                if (this.content) {
                    return this.content.appendChild(childNode);
                }
                else {
                    return nativeAppend.apply(this, [childNode]);
                }
            };
        };
        shimPromise = new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, whenSet(window, 'HTMLTemplateElement')];
                    case 1:
                        _a.sent();
                        shim_1();
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbS10ZW1wbGF0ZS1hcHBlbmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS90ZW1wbGF0ZXMvIiwic291cmNlcyI6WyJzcmMvc2hpbS10ZW1wbGF0ZS1hcHBlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQVEzQyxJQUFJLFdBQXNDLENBQUM7QUFDM0M7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCO0lBQXRDLGlCQTJCQztJQTFCQyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2hCLElBQU0sTUFBSSxHQUFHO1lBQ1gseUVBQXlFO1lBQ3pFLHlFQUF5RTtZQUN6RSxnQ0FBZ0M7WUFDaEMsa0RBQWtEO1lBQ2xELElBQU0sWUFBWSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDL0QsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUMxQyxTQUFZO2dCQUVaLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDNUM7cUJBQU07b0JBQ0wsT0FBVSxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pEO1lBQ0gsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRUYsV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQU0sT0FBTzs7OzRCQUNyQyxxQkFBTSxPQUFPLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLEVBQUE7O3dCQUE1QyxTQUE0QyxDQUFDO3dCQUM3QyxNQUFJLEVBQUUsQ0FBQzt3QkFDUCxPQUFPLEVBQUUsQ0FBQzs7OzthQUNYLENBQUMsQ0FBQztLQUNKO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSwyQkFBMkI7SUFDekMsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUMxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd2hlblNldCB9IGZyb20gJ25neC1vcmlnYW1pL3V0aWwnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIEhUTUxUZW1wbGF0ZUVsZW1lbnQ6IHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICB9XG59XG5cbmxldCBzaGltUHJvbWlzZTogUHJvbWlzZTx2b2lkPiB8IHVuZGVmaW5lZDtcbi8qKlxuICogQW5ndWxhciBpbmNvcnJlY3RseSBhZGRzIGA8dGVtcGxhdGU+YCBjaGlsZHJlbiB0byB0aGUgZWxlbWVudCdzIGNoaWxkIG5vZGVcbiAqIGxpc3QgaW5zdGVhZCBvZiBpdHMgY29udGVudC4gVGhpcyBzaGltIGZvcmNlcyBjaGlsZHJlbiBhcHBlbmRlZCB0byBhXG4gKiBgPHRlbXBsYXRlPmAgdG8gYmUgYWRkZWQgdG8gaXRzIGNvbnRlbnQgaW5zdGVhZC5cbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNTU1N1xuICpcbiAqIEByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIEhUTUxUZW1wbGF0ZUVsZW1lbnQgaXMgc2hpbW1lZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hpbUhUTUxUZW1wbGF0ZUFwcGVuZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFzaGltUHJvbWlzZSkge1xuICAgIGNvbnN0IHNoaW0gPSAoKSA9PiB7XG4gICAgICAvLyBBbmd1bGFyJ3MgcmVuZGVyZXIgd2lsbCBhZGQgY2hpbGRyZW4gdG8gYSA8dGVtcGxhdGU+IGluc3RlYWQgb2YgdG8gaXRzXG4gICAgICAvLyBjb250ZW50LiBUaGlzIHNoaW0gd2lsbCBmb3JjZSBhbnkgY2hpbGRyZW4gYWRkZWQgdG8gYSA8dGVtcGxhdGU+IHRvIGJlXG4gICAgICAvLyBhZGRlZCB0byBpdHMgY29udGVudCBpbnN0ZWFkLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTU1NTdcbiAgICAgIGNvbnN0IG5hdGl2ZUFwcGVuZCA9IEhUTUxUZW1wbGF0ZUVsZW1lbnQucHJvdG90eXBlLmFwcGVuZENoaWxkO1xuICAgICAgSFRNTFRlbXBsYXRlRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGQgPSBmdW5jdGlvbjxUIGV4dGVuZHMgTm9kZT4oXG4gICAgICAgIGNoaWxkTm9kZTogVFxuICAgICAgKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGNoaWxkTm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIDxUPm5hdGl2ZUFwcGVuZC5hcHBseSh0aGlzLCBbY2hpbGROb2RlXSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIHNoaW1Qcm9taXNlID0gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB3aGVuU2V0KHdpbmRvdywgJ0hUTUxUZW1wbGF0ZUVsZW1lbnQnKTtcbiAgICAgIHNoaW0oKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBzaGltUHJvbWlzZTtcbn1cblxuLyoqXG4gKiBSZXNldHMgYHNoaW1IVE1MVGVtcGxhdGVBcHBlbmQoKWAgc28gdGhhdCBpdCB3aWxsIHJlLXNoaW0gdGhlIGNsYXNzIG5leHRcbiAqIHRpbWUgaXQgaXMgY2FsbGVkLiBUaGlzIGlzIHByaW1hcmlseSB1c2VkIGZvciB0ZXN0aW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRTaGltSFRNTFRlbXBsYXRlQXBwZW5kKCkge1xuICBzaGltUHJvbWlzZSA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==