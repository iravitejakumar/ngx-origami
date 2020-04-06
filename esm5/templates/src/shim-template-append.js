import { __awaiter, __generator } from "tslib";
import { whenSet } from '@codebakery/origami/util';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbS10ZW1wbGF0ZS1hcHBlbmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kZWJha2VyeS9vcmlnYW1pL3RlbXBsYXRlcy8iLCJzb3VyY2VzIjpbInNyYy9zaGltLXRlbXBsYXRlLWFwcGVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUW5ELElBQUksV0FBc0MsQ0FBQztBQUMzQzs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxzQkFBc0I7SUFBdEMsaUJBMkJDO0lBMUJDLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDaEIsSUFBTSxNQUFJLEdBQUc7WUFDWCx5RUFBeUU7WUFDekUseUVBQXlFO1lBQ3pFLGdDQUFnQztZQUNoQyxrREFBa0Q7WUFDbEQsSUFBTSxZQUFZLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUMvRCxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFVBQzFDLFNBQVk7Z0JBRVosSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUM1QztxQkFBTTtvQkFDTCxPQUFVLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztpQkFDakQ7WUFDSCxDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7UUFFRixXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBTSxPQUFPOzs7NEJBQ3JDLHFCQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUscUJBQXFCLENBQUMsRUFBQTs7d0JBQTVDLFNBQTRDLENBQUM7d0JBQzdDLE1BQUksRUFBRSxDQUFDO3dCQUNQLE9BQU8sRUFBRSxDQUFDOzs7O2FBQ1gsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQjtJQUN6QyxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBQzFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3aGVuU2V0IH0gZnJvbSAnQGNvZGViYWtlcnkvb3JpZ2FtaS91dGlsJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBIVE1MVGVtcGxhdGVFbGVtZW50OiB0eXBlb2YgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgfVxufVxuXG5sZXQgc2hpbVByb21pc2U6IFByb21pc2U8dm9pZD4gfCB1bmRlZmluZWQ7XG4vKipcbiAqIEFuZ3VsYXIgaW5jb3JyZWN0bHkgYWRkcyBgPHRlbXBsYXRlPmAgY2hpbGRyZW4gdG8gdGhlIGVsZW1lbnQncyBjaGlsZCBub2RlXG4gKiBsaXN0IGluc3RlYWQgb2YgaXRzIGNvbnRlbnQuIFRoaXMgc2hpbSBmb3JjZXMgY2hpbGRyZW4gYXBwZW5kZWQgdG8gYVxuICogYDx0ZW1wbGF0ZT5gIHRvIGJlIGFkZGVkIHRvIGl0cyBjb250ZW50IGluc3RlYWQuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTU1NTdcbiAqXG4gKiBAcmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBIVE1MVGVtcGxhdGVFbGVtZW50IGlzIHNoaW1tZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoaW1IVE1MVGVtcGxhdGVBcHBlbmQoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmICghc2hpbVByb21pc2UpIHtcbiAgICBjb25zdCBzaGltID0gKCkgPT4ge1xuICAgICAgLy8gQW5ndWxhcidzIHJlbmRlcmVyIHdpbGwgYWRkIGNoaWxkcmVuIHRvIGEgPHRlbXBsYXRlPiBpbnN0ZWFkIG9mIHRvIGl0c1xuICAgICAgLy8gY29udGVudC4gVGhpcyBzaGltIHdpbGwgZm9yY2UgYW55IGNoaWxkcmVuIGFkZGVkIHRvIGEgPHRlbXBsYXRlPiB0byBiZVxuICAgICAgLy8gYWRkZWQgdG8gaXRzIGNvbnRlbnQgaW5zdGVhZC5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE1NTU3XG4gICAgICBjb25zdCBuYXRpdmVBcHBlbmQgPSBIVE1MVGVtcGxhdGVFbGVtZW50LnByb3RvdHlwZS5hcHBlbmRDaGlsZDtcbiAgICAgIEhUTUxUZW1wbGF0ZUVsZW1lbnQucHJvdG90eXBlLmFwcGVuZENoaWxkID0gZnVuY3Rpb248VCBleHRlbmRzIE5vZGU+KFxuICAgICAgICBjaGlsZE5vZGU6IFRcbiAgICAgICkge1xuICAgICAgICBpZiAodGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChjaGlsZE5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiA8VD5uYXRpdmVBcHBlbmQuYXBwbHkodGhpcywgW2NoaWxkTm9kZV0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBzaGltUHJvbWlzZSA9IG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgd2hlblNldCh3aW5kb3csICdIVE1MVGVtcGxhdGVFbGVtZW50Jyk7XG4gICAgICBzaGltKCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gc2hpbVByb21pc2U7XG59XG5cbi8qKlxuICogUmVzZXRzIGBzaGltSFRNTFRlbXBsYXRlQXBwZW5kKClgIHNvIHRoYXQgaXQgd2lsbCByZS1zaGltIHRoZSBjbGFzcyBuZXh0XG4gKiB0aW1lIGl0IGlzIGNhbGxlZC4gVGhpcyBpcyBwcmltYXJpbHkgdXNlZCBmb3IgdGVzdGluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0U2hpbUhUTUxUZW1wbGF0ZUFwcGVuZCgpIHtcbiAgc2hpbVByb21pc2UgPSB1bmRlZmluZWQ7XG59XG4iXX0=