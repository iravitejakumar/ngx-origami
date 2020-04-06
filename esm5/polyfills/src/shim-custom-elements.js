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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbS1jdXN0b20tZWxlbWVudHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kZWJha2VyeS9vcmlnYW1pL3BvbHlmaWxscy8iLCJzb3VyY2VzIjpbInNyYy9zaGltLWN1c3RvbS1lbGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFXM0Q7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sVUFBVSxrQkFBa0I7SUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7UUFDMUIsSUFBTSxPQUFLLEdBS1AsRUFBRSxDQUFDO1FBRVAsSUFBTSxlQUFhLEdBRWYsRUFBRSxDQUFDO1FBRVAsSUFBTSxXQUFTLEdBQVcsRUFBRSxDQUFDO1FBRTdCO1lBQUE7Z0JBQ0UsK0NBQStDO2dCQUMvQyxrQkFBYSxHQUFHLElBQUksQ0FBQztZQTRCdkIsQ0FBQztZQTFCQyx1Q0FBRyxHQUFILFVBQUksSUFBWTtnQkFDZCxPQUFPLE9BQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUVELDBDQUFNLEdBQU4sVUFDRSxJQUFZLEVBQ1osV0FBa0MsRUFDbEMsT0FBa0M7Z0JBRWxDLE9BQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBRUQsK0NBQVcsR0FBWCxVQUFZLElBQVk7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUN2QyxlQUFhLENBQUMsSUFBSSxDQUFDLEdBQVEsRUFBRSxDQUFDO29CQUM5QixlQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPO3dCQUMxQyxlQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO29CQUNuQyxDQUFDLENBQUMsQ0FBQztpQkFDSjtnQkFFRCxPQUFPLGVBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQsMkNBQU8sR0FBUCxVQUFRLElBQVU7Z0JBQ2hCLFdBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUNILGdDQUFDO1FBQUQsQ0FBQyxBQTlCRCxJQThCQztRQUVELE1BQU0sQ0FBQyxjQUFjLEdBQUcsSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxxQkFBcUIsR0FBRyx5QkFBeUIsQ0FBQztRQUV6RCxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQztZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ3JDLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDM0MsZUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ3ZCLElBQUEsNkJBQW9DLEVBQW5DLG1CQUFXLEVBQUUsZUFBc0IsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUMsQ0FBQztZQUVILFdBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd2ViY29tcG9uZW50c1JlYWR5IH0gZnJvbSAnLi93ZWJjb21wb25lbnRzLXJlYWR5JztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBDdXN0b21FbGVtZW50UmVnaXN0cnk6IHtcbiAgICAgIG5ldyAoKTogQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5O1xuICAgICAgcHJvdG90eXBlOiBDdXN0b21FbGVtZW50UmVnaXN0cnk7XG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIFNoaW1zIGB3aW5kb3cuY3VzdG9tRWxlbWVudHNgIHdpdGggYSBwbGFjZWhvbGRlciB0aGF0IGFsbG93cyBjdXN0b20gZWxlbWVudHNcbiAqIHRvIGRlZmluZSB0aGVtc2VsdmVzIGJlZm9yZSB0aGUgV2ViQ29tcG9uZW50cyBwb2x5ZmlsbCBpcyByZWFkeS4gV2hlbiB0aGVcbiAqIHBvbHlmaWxsIGxvYWRzLCB0aGUgZWxlbWVudCBkZWZpbml0aW9ucyB3aWxsIGJlIGRlZmluZWQgd2l0aCB0aGUgcG9seWZpbGxlZFxuICogYGN1c3RvbUVsZW1lbnRzYC5cbiAqXG4gKiBUaGlzIGFsbG93cyB0aGUgZGV2ZWxvcGVyIHRvIGltcG9ydCBmaWxlcyB0aGF0IGNhbGwgYGN1c3RvbUVsZW1lbnRzLmRlZmluZSgpYFxuICogd2l0aG91dCBoYXZpbmcgdG8gZGVsYXkgbG9hZGluZyB0aGUgYXBwIHZpYSBgd2ViY29tcG9uZW50c1JlYWR5KClgLlxuICpcbiAqIFRoaXMgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgYnkgT3JpZ2FtaS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoaW1DdXN0b21FbGVtZW50cygpIHtcbiAgaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMpIHtcbiAgICBjb25zdCBjZU1hcDoge1xuICAgICAgW25hbWU6IHN0cmluZ106IFtcbiAgICAgICAgbmV3ICgpID0+IEhUTUxFbGVtZW50LFxuICAgICAgICBFbGVtZW50RGVmaW5pdGlvbk9wdGlvbnMgfCB1bmRlZmluZWRcbiAgICAgIF07XG4gICAgfSA9IHt9O1xuXG4gICAgY29uc3QgY2VXaGVuRGVmaW5lZDoge1xuICAgICAgW25hbWU6IHN0cmluZ106IFtQcm9taXNlPHZvaWQ+LCBGdW5jdGlvbl07XG4gICAgfSA9IHt9O1xuXG4gICAgY29uc3QgY2VVcGdyYWRlOiBOb2RlW10gPSBbXTtcblxuICAgIGNsYXNzIEN1c3RvbUVsZW1lbnRSZWdpc3RyeVNoaW0ge1xuICAgICAgLy8gaW5zdHJ1Y3Qgd2ViY29tcG9uZW50c2pzIHRvIGlnbm9yZSB0aGlzIHNoaW1cbiAgICAgIGZvcmNlUG9seWZpbGwgPSB0cnVlO1xuXG4gICAgICBnZXQobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIGNlTWFwW25hbWVdICYmIGNlTWFwW25hbWVdWzBdO1xuICAgICAgfVxuXG4gICAgICBkZWZpbmUoXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgY29uc3RydWN0b3I6IG5ldyAoKSA9PiBIVE1MRWxlbWVudCxcbiAgICAgICAgb3B0aW9ucz86IEVsZW1lbnREZWZpbml0aW9uT3B0aW9uc1xuICAgICAgKSB7XG4gICAgICAgIGNlTWFwW25hbWVdID0gW2NvbnN0cnVjdG9yLCBvcHRpb25zXTtcbiAgICAgIH1cblxuICAgICAgd2hlbkRlZmluZWQobmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjZVdoZW5EZWZpbmVkW25hbWVdKSkge1xuICAgICAgICAgIGNlV2hlbkRlZmluZWRbbmFtZV0gPSA8YW55PltdO1xuICAgICAgICAgIGNlV2hlbkRlZmluZWRbbmFtZV1bMF0gPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGNlV2hlbkRlZmluZWRbbmFtZV1bMV0gPSByZXNvbHZlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNlV2hlbkRlZmluZWRbbmFtZV1bMF07XG4gICAgICB9XG5cbiAgICAgIHVwZ3JhZGUocm9vdDogTm9kZSkge1xuICAgICAgICBjZVVwZ3JhZGUucHVzaChyb290KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMgPSBuZXcgQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5U2hpbSgpO1xuICAgIHdpbmRvdy5DdXN0b21FbGVtZW50UmVnaXN0cnkgPSBDdXN0b21FbGVtZW50UmVnaXN0cnlTaGltO1xuXG4gICAgd2ViY29tcG9uZW50c1JlYWR5KCkudGhlbigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhjZVdoZW5EZWZpbmVkKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMud2hlbkRlZmluZWQobmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgY2VXaGVuRGVmaW5lZFtuYW1lXVsxXSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBPYmplY3Qua2V5cyhjZU1hcCkuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgY29uc3QgW2NvbnN0cnVjdG9yLCBvcHRpb25zXSA9IGNlTWFwW25hbWVdO1xuICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKG5hbWUsIGNvbnN0cnVjdG9yLCBvcHRpb25zKTtcbiAgICAgIH0pO1xuXG4gICAgICBjZVVwZ3JhZGUuZm9yRWFjaChyb290ID0+IHdpbmRvdy5jdXN0b21FbGVtZW50cy51cGdyYWRlKHJvb3QpKTtcbiAgICB9KTtcbiAgfVxufVxuIl19