import { __decorate, __extends, __param } from "tslib";
import { Inject, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ɵDomSharedStylesHost as DomSharedStylesHost } from '@angular/platform-browser';
import { USING_APPLY, processStylesheets } from './process-stylesheets';
// First group is incorrect escape backslash, second group is rest of mixin detection
var MIXIN_REGEX = /(?:\\)(--\w[\w-_]*:\s*{[^}]*})(;)?/g;
/**
 * A `SharedStylesHost` that extends the default `DomSharedStylesHost` and will
 * pass styles to ShadyCSS for processing. This will allow the use of custom CSS
 * properties in Angular styles on browsers that do not support them.
 */
var ShadyCSSSharedStylesHost = /** @class */ (function (_super) {
    __extends(ShadyCSSSharedStylesHost, _super);
    function ShadyCSSSharedStylesHost(document, usingApply) {
        var _this = 
        /* istanbul ignore next */
        _super.call(this, document) || this;
        _this.usingApply = usingApply;
        return _this;
    }
    ShadyCSSSharedStylesHost.prototype.addStyles = function (styles) {
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
        _super.prototype.addStyles.call(this, styles.map(function (style) { return style.replace(MIXIN_REGEX, '$1'); }));
    };
    ShadyCSSSharedStylesHost.prototype.onStylesAdded = function (additions) {
        _super.prototype.onStylesAdded.call(this, additions);
        processStylesheets(this.usingApply);
    };
    ShadyCSSSharedStylesHost = __decorate([
        __param(0, Inject(DOCUMENT)),
        __param(1, Optional()),
        __param(1, Inject(USING_APPLY))
    ], ShadyCSSSharedStylesHost);
    return ShadyCSSSharedStylesHost;
}(DomSharedStylesHost));
export { ShadyCSSSharedStylesHost };
/**
 * Factory that creates a new ShadyCSSSharedStylesHost.
 */
export function ShadyCSSSharedStylesHostFactory() {
    return new ShadyCSSSharedStylesHost(document);
}
/**
 * Provider that replaces the DomSharedStylesHost with ShadyCSSSharedStylesHost.
 */
export var SHADYCSS_SHARED_STYLES_HOST_PROVIDER = {
    provide: DomSharedStylesHost,
    useFactory: ShadyCSSSharedStylesHostFactory
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLXN0eWxlcy1ob3N0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9yaWdhbWkvc3R5bGVzLyIsInNvdXJjZXMiOlsic3JjL3NoYWR5Y3NzL3NoYXJlZC1zdHlsZXMtaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RSxxRkFBcUY7QUFDckYsSUFBTSxXQUFXLEdBQUcscUNBQXFDLENBQUM7QUFFMUQ7Ozs7R0FJRztBQUNIO0lBQThDLDRDQUFtQjtJQUMvRCxrQ0FDb0IsUUFBa0IsRUFHNUIsVUFBb0I7UUFKOUI7UUFNRSwwQkFBMEI7UUFDMUIsa0JBQU0sUUFBUSxDQUFDLFNBQ2hCO1FBSlMsZ0JBQVUsR0FBVixVQUFVLENBQVU7O0lBSTlCLENBQUM7SUFFRCw0Q0FBUyxHQUFULFVBQVUsTUFBZ0I7UUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWtCRztRQUNILGlCQUFNLFNBQVMsWUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxnREFBYSxHQUFiLFVBQWMsU0FBc0I7UUFDbEMsaUJBQU0sYUFBYSxZQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBckNVLHdCQUF3QjtRQUVoQyxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNoQixXQUFBLFFBQVEsRUFBRSxDQUFBO1FBQ1YsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0FKWCx3QkFBd0IsQ0FzQ3BDO0lBQUQsK0JBQUM7Q0FBQSxBQXRDRCxDQUE4QyxtQkFBbUIsR0FzQ2hFO1NBdENZLHdCQUF3QjtBQXVDckM7O0dBRUc7QUFDSCxNQUFNLFVBQVUsK0JBQStCO0lBQzdDLE9BQU8sSUFBSSx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBQ0Q7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxvQ0FBb0MsR0FBYTtJQUM1RCxPQUFPLEVBQUUsbUJBQW1CO0lBQzVCLFVBQVUsRUFBRSwrQkFBK0I7Q0FDNUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgT3B0aW9uYWwsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyDJtURvbVNoYXJlZFN0eWxlc0hvc3QgYXMgRG9tU2hhcmVkU3R5bGVzSG9zdCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgVVNJTkdfQVBQTFksIHByb2Nlc3NTdHlsZXNoZWV0cyB9IGZyb20gJy4vcHJvY2Vzcy1zdHlsZXNoZWV0cyc7XG5cbi8vIEZpcnN0IGdyb3VwIGlzIGluY29ycmVjdCBlc2NhcGUgYmFja3NsYXNoLCBzZWNvbmQgZ3JvdXAgaXMgcmVzdCBvZiBtaXhpbiBkZXRlY3Rpb25cbmNvbnN0IE1JWElOX1JFR0VYID0gLyg/OlxcXFwpKC0tXFx3W1xcdy1fXSo6XFxzKntbXn1dKn0pKDspPy9nO1xuXG4vKipcbiAqIEEgYFNoYXJlZFN0eWxlc0hvc3RgIHRoYXQgZXh0ZW5kcyB0aGUgZGVmYXVsdCBgRG9tU2hhcmVkU3R5bGVzSG9zdGAgYW5kIHdpbGxcbiAqIHBhc3Mgc3R5bGVzIHRvIFNoYWR5Q1NTIGZvciBwcm9jZXNzaW5nLiBUaGlzIHdpbGwgYWxsb3cgdGhlIHVzZSBvZiBjdXN0b20gQ1NTXG4gKiBwcm9wZXJ0aWVzIGluIEFuZ3VsYXIgc3R5bGVzIG9uIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgdGhlbS5cbiAqL1xuZXhwb3J0IGNsYXNzIFNoYWR5Q1NTU2hhcmVkU3R5bGVzSG9zdCBleHRlbmRzIERvbVNoYXJlZFN0eWxlc0hvc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KFVTSU5HX0FQUExZKVxuICAgIHByaXZhdGUgdXNpbmdBcHBseT86IGJvb2xlYW5cbiAgKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBzdXBlcihkb2N1bWVudCk7XG4gIH1cblxuICBhZGRTdHlsZXMoc3R5bGVzOiBzdHJpbmdbXSkge1xuICAgIC8qKlxuICAgICAqIE1peGlucyBhcmUgZGVjbGFyZWQgYXNcbiAgICAgKlxuICAgICAqIGh0bWwge1xuICAgICAqICAgLS1teS1taXhpbjoge1xuICAgICAqICAgICBjb2xvcjogYmx1ZTtcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBCdXQgYXJlIGluY29ycmVjdGx5IGludGVycG9sYXRlZCBieSB0aGUgd2VicGFjayBDU1MgbG9hZGVyIGFzXG4gICAgICpcbiAgICAgKiBodG1sIHtcbiAgICAgKiAgIFxcLS1teS1taXhpbjoge1xuICAgICAqICAgICBjb2xvcjogYmx1ZTtcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBUaGlzIHJlZ2V4IHdpbGwgZml4IHRoZSBhZGRlZCBiYWNrc2xhc2guXG4gICAgICovXG4gICAgc3VwZXIuYWRkU3R5bGVzKHN0eWxlcy5tYXAoc3R5bGUgPT4gc3R5bGUucmVwbGFjZShNSVhJTl9SRUdFWCwgJyQxJykpKTtcbiAgfVxuXG4gIG9uU3R5bGVzQWRkZWQoYWRkaXRpb25zOiBTZXQ8c3RyaW5nPikge1xuICAgIHN1cGVyLm9uU3R5bGVzQWRkZWQoYWRkaXRpb25zKTtcbiAgICBwcm9jZXNzU3R5bGVzaGVldHModGhpcy51c2luZ0FwcGx5KTtcbiAgfVxufVxuLyoqXG4gKiBGYWN0b3J5IHRoYXQgY3JlYXRlcyBhIG5ldyBTaGFkeUNTU1NoYXJlZFN0eWxlc0hvc3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTaGFkeUNTU1NoYXJlZFN0eWxlc0hvc3RGYWN0b3J5KCkge1xuICByZXR1cm4gbmV3IFNoYWR5Q1NTU2hhcmVkU3R5bGVzSG9zdChkb2N1bWVudCk7XG59XG4vKipcbiAqIFByb3ZpZGVyIHRoYXQgcmVwbGFjZXMgdGhlIERvbVNoYXJlZFN0eWxlc0hvc3Qgd2l0aCBTaGFkeUNTU1NoYXJlZFN0eWxlc0hvc3QuXG4gKi9cbmV4cG9ydCBjb25zdCBTSEFEWUNTU19TSEFSRURfU1RZTEVTX0hPU1RfUFJPVklERVI6IFByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICB1c2VGYWN0b3J5OiBTaGFkeUNTU1NoYXJlZFN0eWxlc0hvc3RGYWN0b3J5XG59O1xuIl19