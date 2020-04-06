import { __read } from "tslib";
import { webcomponentsReady } from './webcomponents-ready';
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
export function shimCustomElements() {
    if (!window.customElements) {
        var ceMap_1 = {};
        var ceWhenDefined_1 = {};
        var ceUpgrade_1 = [];
        var CustomElementRegistryShim = /** @class */ (function () {
            function CustomElementRegistryShim() {
                // instruct webcomponentsjs to ignore this shim
                this.forcePolyfill = true;
            }
            CustomElementRegistryShim.prototype.get = function (name) {
                return ceMap_1[name] && ceMap_1[name][0];
            };
            CustomElementRegistryShim.prototype.define = function (name, constructor, options) {
                ceMap_1[name] = [constructor, options];
            };
            CustomElementRegistryShim.prototype.whenDefined = function (name) {
                if (!Array.isArray(ceWhenDefined_1[name])) {
                    ceWhenDefined_1[name] = [];
                    ceWhenDefined_1[name][0] = new Promise(function (resolve) {
                        ceWhenDefined_1[name][1] = resolve;
                    });
                }
                return ceWhenDefined_1[name][0];
            };
            CustomElementRegistryShim.prototype.upgrade = function (root) {
                ceUpgrade_1.push(root);
            };
            return CustomElementRegistryShim;
        }());
        window.customElements = new CustomElementRegistryShim();
        window.CustomElementRegistry = CustomElementRegistryShim;
        webcomponentsReady().then(function () {
            Object.keys(ceWhenDefined_1).forEach(function (name) {
                window.customElements.whenDefined(name).then(function () {
                    ceWhenDefined_1[name][1]();
                });
            });
            Object.keys(ceMap_1).forEach(function (name) {
                var _a = __read(ceMap_1[name], 2), constructor = _a[0], options = _a[1];
                window.customElements.define(name, constructor, options);
            });
            ceUpgrade_1.forEach(function (root) { return window.customElements.upgrade(root); });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbS1jdXN0b20tZWxlbWVudHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS9wb2x5ZmlsbHMvIiwic291cmNlcyI6WyJzcmMvc2hpbS1jdXN0b20tZWxlbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBVzNEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO1FBQzFCLElBQU0sT0FBSyxHQUtQLEVBQUUsQ0FBQztRQUVQLElBQU0sZUFBYSxHQUVmLEVBQUUsQ0FBQztRQUVQLElBQU0sV0FBUyxHQUFXLEVBQUUsQ0FBQztRQUU3QjtZQUFBO2dCQUNFLCtDQUErQztnQkFDL0Msa0JBQWEsR0FBRyxJQUFJLENBQUM7WUE0QnZCLENBQUM7WUExQkMsdUNBQUcsR0FBSCxVQUFJLElBQVk7Z0JBQ2QsT0FBTyxPQUFLLENBQUMsSUFBSSxDQUFDLElBQUksT0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7WUFFRCwwQ0FBTSxHQUFOLFVBQ0UsSUFBWSxFQUNaLFdBQWtDLEVBQ2xDLE9BQWtDO2dCQUVsQyxPQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUVELCtDQUFXLEdBQVgsVUFBWSxJQUFZO2dCQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDdkMsZUFBYSxDQUFDLElBQUksQ0FBQyxHQUFRLEVBQUUsQ0FBQztvQkFDOUIsZUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTzt3QkFDMUMsZUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztvQkFDbkMsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7Z0JBRUQsT0FBTyxlQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUVELDJDQUFPLEdBQVAsVUFBUSxJQUFVO2dCQUNoQixXQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7WUFDSCxnQ0FBQztRQUFELENBQUMsQUE5QkQsSUE4QkM7UUFFRCxNQUFNLENBQUMsY0FBYyxHQUFHLElBQUkseUJBQXlCLEVBQUUsQ0FBQztRQUN4RCxNQUFNLENBQUMscUJBQXFCLEdBQUcseUJBQXlCLENBQUM7UUFFekQsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUNyQyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzNDLGVBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUN2QixJQUFBLDZCQUFvQyxFQUFuQyxtQkFBVyxFQUFFLGVBQXNCLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxXQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdlYmNvbXBvbmVudHNSZWFkeSB9IGZyb20gJy4vd2ViY29tcG9uZW50cy1yZWFkeSc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5OiB7XG4gICAgICBuZXcgKCk6IEN1c3RvbUVsZW1lbnRSZWdpc3RyeTtcbiAgICAgIHByb3RvdHlwZTogQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5O1xuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBTaGltcyBgd2luZG93LmN1c3RvbUVsZW1lbnRzYCB3aXRoIGEgcGxhY2Vob2xkZXIgdGhhdCBhbGxvd3MgY3VzdG9tIGVsZW1lbnRzXG4gKiB0byBkZWZpbmUgdGhlbXNlbHZlcyBiZWZvcmUgdGhlIFdlYkNvbXBvbmVudHMgcG9seWZpbGwgaXMgcmVhZHkuIFdoZW4gdGhlXG4gKiBwb2x5ZmlsbCBsb2FkcywgdGhlIGVsZW1lbnQgZGVmaW5pdGlvbnMgd2lsbCBiZSBkZWZpbmVkIHdpdGggdGhlIHBvbHlmaWxsZWRcbiAqIGBjdXN0b21FbGVtZW50c2AuXG4gKlxuICogVGhpcyBhbGxvd3MgdGhlIGRldmVsb3BlciB0byBpbXBvcnQgZmlsZXMgdGhhdCBjYWxsIGBjdXN0b21FbGVtZW50cy5kZWZpbmUoKWBcbiAqIHdpdGhvdXQgaGF2aW5nIHRvIGRlbGF5IGxvYWRpbmcgdGhlIGFwcCB2aWEgYHdlYmNvbXBvbmVudHNSZWFkeSgpYC5cbiAqXG4gKiBUaGlzIGlzIGF1dG9tYXRpY2FsbHkgY2FsbGVkIGJ5IE9yaWdhbWkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGltQ3VzdG9tRWxlbWVudHMoKSB7XG4gIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzKSB7XG4gICAgY29uc3QgY2VNYXA6IHtcbiAgICAgIFtuYW1lOiBzdHJpbmddOiBbXG4gICAgICAgIG5ldyAoKSA9PiBIVE1MRWxlbWVudCxcbiAgICAgICAgRWxlbWVudERlZmluaXRpb25PcHRpb25zIHwgdW5kZWZpbmVkXG4gICAgICBdO1xuICAgIH0gPSB7fTtcblxuICAgIGNvbnN0IGNlV2hlbkRlZmluZWQ6IHtcbiAgICAgIFtuYW1lOiBzdHJpbmddOiBbUHJvbWlzZTx2b2lkPiwgRnVuY3Rpb25dO1xuICAgIH0gPSB7fTtcblxuICAgIGNvbnN0IGNlVXBncmFkZTogTm9kZVtdID0gW107XG5cbiAgICBjbGFzcyBDdXN0b21FbGVtZW50UmVnaXN0cnlTaGltIHtcbiAgICAgIC8vIGluc3RydWN0IHdlYmNvbXBvbmVudHNqcyB0byBpZ25vcmUgdGhpcyBzaGltXG4gICAgICBmb3JjZVBvbHlmaWxsID0gdHJ1ZTtcblxuICAgICAgZ2V0KG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiBjZU1hcFtuYW1lXSAmJiBjZU1hcFtuYW1lXVswXTtcbiAgICAgIH1cblxuICAgICAgZGVmaW5lKFxuICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgIGNvbnN0cnVjdG9yOiBuZXcgKCkgPT4gSFRNTEVsZW1lbnQsXG4gICAgICAgIG9wdGlvbnM/OiBFbGVtZW50RGVmaW5pdGlvbk9wdGlvbnNcbiAgICAgICkge1xuICAgICAgICBjZU1hcFtuYW1lXSA9IFtjb25zdHJ1Y3Rvciwgb3B0aW9uc107XG4gICAgICB9XG5cbiAgICAgIHdoZW5EZWZpbmVkKG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2VXaGVuRGVmaW5lZFtuYW1lXSkpIHtcbiAgICAgICAgICBjZVdoZW5EZWZpbmVkW25hbWVdID0gPGFueT5bXTtcbiAgICAgICAgICBjZVdoZW5EZWZpbmVkW25hbWVdWzBdID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBjZVdoZW5EZWZpbmVkW25hbWVdWzFdID0gcmVzb2x2ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjZVdoZW5EZWZpbmVkW25hbWVdWzBdO1xuICAgICAgfVxuXG4gICAgICB1cGdyYWRlKHJvb3Q6IE5vZGUpIHtcbiAgICAgICAgY2VVcGdyYWRlLnB1c2gocm9vdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LmN1c3RvbUVsZW1lbnRzID0gbmV3IEN1c3RvbUVsZW1lbnRSZWdpc3RyeVNoaW0oKTtcbiAgICB3aW5kb3cuQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5ID0gQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5U2hpbTtcblxuICAgIHdlYmNvbXBvbmVudHNSZWFkeSgpLnRoZW4oKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMoY2VXaGVuRGVmaW5lZCkuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLndoZW5EZWZpbmVkKG5hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNlV2hlbkRlZmluZWRbbmFtZV1bMV0oKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgT2JqZWN0LmtleXMoY2VNYXApLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IFtjb25zdHJ1Y3Rvciwgb3B0aW9uc10gPSBjZU1hcFtuYW1lXTtcbiAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShuYW1lLCBjb25zdHJ1Y3Rvciwgb3B0aW9ucyk7XG4gICAgICB9KTtcblxuICAgICAgY2VVcGdyYWRlLmZvckVhY2gocm9vdCA9PiB3aW5kb3cuY3VzdG9tRWxlbWVudHMudXBncmFkZShyb290KSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==