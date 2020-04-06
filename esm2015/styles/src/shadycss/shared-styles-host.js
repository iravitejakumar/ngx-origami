import { __decorate, __param } from "tslib";
import { Inject, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ɵDomSharedStylesHost as DomSharedStylesHost } from '@angular/platform-browser';
import { USING_APPLY, processStylesheets } from './process-stylesheets';
// First group is incorrect escape backslash, second group is rest of mixin detection
const MIXIN_REGEX = /(?:\\)(--\w[\w-_]*:\s*{[^}]*})(;)?/g;
/**
 * A `SharedStylesHost` that extends the default `DomSharedStylesHost` and will
 * pass styles to ShadyCSS for processing. This will allow the use of custom CSS
 * properties in Angular styles on browsers that do not support them.
 */
let ShadyCSSSharedStylesHost = class ShadyCSSSharedStylesHost extends DomSharedStylesHost {
    constructor(document, usingApply) {
        /* istanbul ignore next */
        super(document);
        this.usingApply = usingApply;
    }
    addStyles(styles) {
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
        super.addStyles(styles.map(style => style.replace(MIXIN_REGEX, '$1')));
    }
    onStylesAdded(additions) {
        super.onStylesAdded(additions);
        processStylesheets(this.usingApply);
    }
};
ShadyCSSSharedStylesHost = __decorate([
    __param(0, Inject(DOCUMENT)),
    __param(1, Optional()),
    __param(1, Inject(USING_APPLY))
], ShadyCSSSharedStylesHost);
export { ShadyCSSSharedStylesHost };
/**
 * Factory to resolve runtime errors for Ivy compilation
 */
export function ShadyCSSSharedStylesHostFactory() {
    return new ShadyCSSSharedStylesHost(document);
}
/**
 * Provider that replaces the DomSharedStylesHost with ShadyCSSSharedStylesHost.
 */
export const SHADYCSS_SHARED_STYLES_HOST_PROVIDER = {
    provide: DomSharedStylesHost,
    useFactory: ShadyCSSSharedStylesHostFactory
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLXN0eWxlcy1ob3N0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvZGViYWtlcnkvb3JpZ2FtaS9zdHlsZXMvIiwic291cmNlcyI6WyJzcmMvc2hhZHljc3Mvc2hhcmVkLXN0eWxlcy1ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXhFLHFGQUFxRjtBQUNyRixNQUFNLFdBQVcsR0FBRyxxQ0FBcUMsQ0FBQztBQUUxRDs7OztHQUlHO0FBQ0gsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxtQkFBbUI7SUFDL0QsWUFDb0IsUUFBa0IsRUFHNUIsVUFBb0I7UUFFNUIsMEJBQTBCO1FBQzFCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUhSLGVBQVUsR0FBVixVQUFVLENBQVU7SUFJOUIsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFnQjtRQUN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBa0JHO1FBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxhQUFhLENBQUMsU0FBc0I7UUFDbEMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNGLENBQUE7QUF0Q1ksd0JBQXdCO0lBRWhDLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hCLFdBQUEsUUFBUSxFQUFFLENBQUE7SUFDVixXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQUpYLHdCQUF3QixDQXNDcEM7U0F0Q1ksd0JBQXdCO0FBdUNyQzs7R0FFRztBQUNILE1BQU0sVUFBVSwrQkFBK0I7SUFDN0MsT0FBTyxJQUFJLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFDRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9DQUFvQyxHQUFhO0lBQzVELE9BQU8sRUFBRSxtQkFBbUI7SUFDNUIsVUFBVSxFQUFFLCtCQUErQjtDQUM1QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBPcHRpb25hbCwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IMm1RG9tU2hhcmVkU3R5bGVzSG9zdCBhcyBEb21TaGFyZWRTdHlsZXNIb3N0IH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBVU0lOR19BUFBMWSwgcHJvY2Vzc1N0eWxlc2hlZXRzIH0gZnJvbSAnLi9wcm9jZXNzLXN0eWxlc2hlZXRzJztcblxuLy8gRmlyc3QgZ3JvdXAgaXMgaW5jb3JyZWN0IGVzY2FwZSBiYWNrc2xhc2gsIHNlY29uZCBncm91cCBpcyByZXN0IG9mIG1peGluIGRldGVjdGlvblxuY29uc3QgTUlYSU5fUkVHRVggPSAvKD86XFxcXCkoLS1cXHdbXFx3LV9dKjpcXHMqe1tefV0qfSkoOyk/L2c7XG5cbi8qKlxuICogQSBgU2hhcmVkU3R5bGVzSG9zdGAgdGhhdCBleHRlbmRzIHRoZSBkZWZhdWx0IGBEb21TaGFyZWRTdHlsZXNIb3N0YCBhbmQgd2lsbFxuICogcGFzcyBzdHlsZXMgdG8gU2hhZHlDU1MgZm9yIHByb2Nlc3NpbmcuIFRoaXMgd2lsbCBhbGxvdyB0aGUgdXNlIG9mIGN1c3RvbSBDU1NcbiAqIHByb3BlcnRpZXMgaW4gQW5ndWxhciBzdHlsZXMgb24gYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCB0aGVtLlxuICovXG5leHBvcnQgY2xhc3MgU2hhZHlDU1NTaGFyZWRTdHlsZXNIb3N0IGV4dGVuZHMgRG9tU2hhcmVkU3R5bGVzSG9zdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoVVNJTkdfQVBQTFkpXG4gICAgcHJpdmF0ZSB1c2luZ0FwcGx5PzogYm9vbGVhblxuICApIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHN1cGVyKGRvY3VtZW50KTtcbiAgfVxuXG4gIGFkZFN0eWxlcyhzdHlsZXM6IHN0cmluZ1tdKSB7XG4gICAgLyoqXG4gICAgICogTWl4aW5zIGFyZSBkZWNsYXJlZCBhc1xuICAgICAqXG4gICAgICogaHRtbCB7XG4gICAgICogICAtLW15LW1peGluOiB7XG4gICAgICogICAgIGNvbG9yOiBibHVlO1xuICAgICAqICAgfVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEJ1dCBhcmUgaW5jb3JyZWN0bHkgaW50ZXJwb2xhdGVkIGJ5IHRoZSB3ZWJwYWNrIENTUyBsb2FkZXIgYXNcbiAgICAgKlxuICAgICAqIGh0bWwge1xuICAgICAqICAgXFwtLW15LW1peGluOiB7XG4gICAgICogICAgIGNvbG9yOiBibHVlO1xuICAgICAqICAgfVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIFRoaXMgcmVnZXggd2lsbCBmaXggdGhlIGFkZGVkIGJhY2tzbGFzaC5cbiAgICAgKi9cbiAgICBzdXBlci5hZGRTdHlsZXMoc3R5bGVzLm1hcChzdHlsZSA9PiBzdHlsZS5yZXBsYWNlKE1JWElOX1JFR0VYLCAnJDEnKSkpO1xuICB9XG5cbiAgb25TdHlsZXNBZGRlZChhZGRpdGlvbnM6IFNldDxzdHJpbmc+KSB7XG4gICAgc3VwZXIub25TdHlsZXNBZGRlZChhZGRpdGlvbnMpO1xuICAgIHByb2Nlc3NTdHlsZXNoZWV0cyh0aGlzLnVzaW5nQXBwbHkpO1xuICB9XG59XG4vKipcbiAqIEZhY3RvcnkgdG8gcmVzb2x2ZSBydW50aW1lIGVycm9ycyBmb3IgSXZ5IGNvbXBpbGF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTaGFkeUNTU1NoYXJlZFN0eWxlc0hvc3RGYWN0b3J5KCkge1xuICByZXR1cm4gbmV3IFNoYWR5Q1NTU2hhcmVkU3R5bGVzSG9zdChkb2N1bWVudCk7XG59XG4vKipcbiAqIFByb3ZpZGVyIHRoYXQgcmVwbGFjZXMgdGhlIERvbVNoYXJlZFN0eWxlc0hvc3Qgd2l0aCBTaGFkeUNTU1NoYXJlZFN0eWxlc0hvc3QuXG4gKi9cbmV4cG9ydCBjb25zdCBTSEFEWUNTU19TSEFSRURfU1RZTEVTX0hPU1RfUFJPVklERVI6IFByb3ZpZGVyID0ge1xuICBwcm92aWRlOiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICB1c2VGYWN0b3J5OiBTaGFkeUNTU1NoYXJlZFN0eWxlc0hvc3RGYWN0b3J5XG59O1xuIl19