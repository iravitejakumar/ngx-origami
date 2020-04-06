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
        const ceMap = {};
        const ceWhenDefined = {};
        const ceUpgrade = [];
        class CustomElementRegistryShim {
            constructor() {
                // instruct webcomponentsjs to ignore this shim
                this.forcePolyfill = true;
            }
            get(name) {
                return ceMap[name] && ceMap[name][0];
            }
            define(name, constructor, options) {
                ceMap[name] = [constructor, options];
            }
            whenDefined(name) {
                if (!Array.isArray(ceWhenDefined[name])) {
                    ceWhenDefined[name] = [];
                    ceWhenDefined[name][0] = new Promise(resolve => {
                        ceWhenDefined[name][1] = resolve;
                    });
                }
                return ceWhenDefined[name][0];
            }
            upgrade(root) {
                ceUpgrade.push(root);
            }
        }
        window.customElements = new CustomElementRegistryShim();
        window.CustomElementRegistry = CustomElementRegistryShim;
        webcomponentsReady().then(() => {
            Object.keys(ceWhenDefined).forEach(name => {
                window.customElements.whenDefined(name).then(() => {
                    ceWhenDefined[name][1]();
                });
            });
            Object.keys(ceMap).forEach(name => {
                const [constructor, options] = ceMap[name];
                window.customElements.define(name, constructor, options);
            });
            ceUpgrade.forEach(root => window.customElements.upgrade(root));
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbS1jdXN0b20tZWxlbWVudHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY29kZWJha2VyeS9vcmlnYW1pL3BvbHlmaWxscy8iLCJzb3VyY2VzIjpbInNyYy9zaGltLWN1c3RvbS1lbGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQVczRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQjtJQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtRQUMxQixNQUFNLEtBQUssR0FLUCxFQUFFLENBQUM7UUFFUCxNQUFNLGFBQWEsR0FFZixFQUFFLENBQUM7UUFFUCxNQUFNLFNBQVMsR0FBVyxFQUFFLENBQUM7UUFFN0IsTUFBTSx5QkFBeUI7WUFBL0I7Z0JBQ0UsK0NBQStDO2dCQUMvQyxrQkFBYSxHQUFHLElBQUksQ0FBQztZQTRCdkIsQ0FBQztZQTFCQyxHQUFHLENBQUMsSUFBWTtnQkFDZCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUVELE1BQU0sQ0FDSixJQUFZLEVBQ1osV0FBa0MsRUFDbEMsT0FBa0M7Z0JBRWxDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBRUQsV0FBVyxDQUFDLElBQVk7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUN2QyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQVEsRUFBRSxDQUFDO29CQUM5QixhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQzdDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7b0JBQ25DLENBQUMsQ0FBQyxDQUFDO2lCQUNKO2dCQUVELE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFFRCxPQUFPLENBQUMsSUFBVTtnQkFDaEIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDO1NBQ0Y7UUFFRCxNQUFNLENBQUMsY0FBYyxHQUFHLElBQUkseUJBQXlCLEVBQUUsQ0FBQztRQUN4RCxNQUFNLENBQUMscUJBQXFCLEdBQUcseUJBQXlCLENBQUM7UUFFekQsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNoRCxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNoQyxNQUFNLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUMsQ0FBQztZQUVILFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd2ViY29tcG9uZW50c1JlYWR5IH0gZnJvbSAnLi93ZWJjb21wb25lbnRzLXJlYWR5JztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBDdXN0b21FbGVtZW50UmVnaXN0cnk6IHtcbiAgICAgIG5ldyAoKTogQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5O1xuICAgICAgcHJvdG90eXBlOiBDdXN0b21FbGVtZW50UmVnaXN0cnk7XG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIFNoaW1zIGB3aW5kb3cuY3VzdG9tRWxlbWVudHNgIHdpdGggYSBwbGFjZWhvbGRlciB0aGF0IGFsbG93cyBjdXN0b20gZWxlbWVudHNcbiAqIHRvIGRlZmluZSB0aGVtc2VsdmVzIGJlZm9yZSB0aGUgV2ViQ29tcG9uZW50cyBwb2x5ZmlsbCBpcyByZWFkeS4gV2hlbiB0aGVcbiAqIHBvbHlmaWxsIGxvYWRzLCB0aGUgZWxlbWVudCBkZWZpbml0aW9ucyB3aWxsIGJlIGRlZmluZWQgd2l0aCB0aGUgcG9seWZpbGxlZFxuICogYGN1c3RvbUVsZW1lbnRzYC5cbiAqXG4gKiBUaGlzIGFsbG93cyB0aGUgZGV2ZWxvcGVyIHRvIGltcG9ydCBmaWxlcyB0aGF0IGNhbGwgYGN1c3RvbUVsZW1lbnRzLmRlZmluZSgpYFxuICogd2l0aG91dCBoYXZpbmcgdG8gZGVsYXkgbG9hZGluZyB0aGUgYXBwIHZpYSBgd2ViY29tcG9uZW50c1JlYWR5KClgLlxuICpcbiAqIFRoaXMgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgYnkgT3JpZ2FtaS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoaW1DdXN0b21FbGVtZW50cygpIHtcbiAgaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMpIHtcbiAgICBjb25zdCBjZU1hcDoge1xuICAgICAgW25hbWU6IHN0cmluZ106IFtcbiAgICAgICAgbmV3ICgpID0+IEhUTUxFbGVtZW50LFxuICAgICAgICBFbGVtZW50RGVmaW5pdGlvbk9wdGlvbnMgfCB1bmRlZmluZWRcbiAgICAgIF07XG4gICAgfSA9IHt9O1xuXG4gICAgY29uc3QgY2VXaGVuRGVmaW5lZDoge1xuICAgICAgW25hbWU6IHN0cmluZ106IFtQcm9taXNlPHZvaWQ+LCBGdW5jdGlvbl07XG4gICAgfSA9IHt9O1xuXG4gICAgY29uc3QgY2VVcGdyYWRlOiBOb2RlW10gPSBbXTtcblxuICAgIGNsYXNzIEN1c3RvbUVsZW1lbnRSZWdpc3RyeVNoaW0ge1xuICAgICAgLy8gaW5zdHJ1Y3Qgd2ViY29tcG9uZW50c2pzIHRvIGlnbm9yZSB0aGlzIHNoaW1cbiAgICAgIGZvcmNlUG9seWZpbGwgPSB0cnVlO1xuXG4gICAgICBnZXQobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIGNlTWFwW25hbWVdICYmIGNlTWFwW25hbWVdWzBdO1xuICAgICAgfVxuXG4gICAgICBkZWZpbmUoXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgY29uc3RydWN0b3I6IG5ldyAoKSA9PiBIVE1MRWxlbWVudCxcbiAgICAgICAgb3B0aW9ucz86IEVsZW1lbnREZWZpbml0aW9uT3B0aW9uc1xuICAgICAgKSB7XG4gICAgICAgIGNlTWFwW25hbWVdID0gW2NvbnN0cnVjdG9yLCBvcHRpb25zXTtcbiAgICAgIH1cblxuICAgICAgd2hlbkRlZmluZWQobmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjZVdoZW5EZWZpbmVkW25hbWVdKSkge1xuICAgICAgICAgIGNlV2hlbkRlZmluZWRbbmFtZV0gPSA8YW55PltdO1xuICAgICAgICAgIGNlV2hlbkRlZmluZWRbbmFtZV1bMF0gPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGNlV2hlbkRlZmluZWRbbmFtZV1bMV0gPSByZXNvbHZlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNlV2hlbkRlZmluZWRbbmFtZV1bMF07XG4gICAgICB9XG5cbiAgICAgIHVwZ3JhZGUocm9vdDogTm9kZSkge1xuICAgICAgICBjZVVwZ3JhZGUucHVzaChyb290KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMgPSBuZXcgQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5U2hpbSgpO1xuICAgIHdpbmRvdy5DdXN0b21FbGVtZW50UmVnaXN0cnkgPSBDdXN0b21FbGVtZW50UmVnaXN0cnlTaGltO1xuXG4gICAgd2ViY29tcG9uZW50c1JlYWR5KCkudGhlbigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhjZVdoZW5EZWZpbmVkKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMud2hlbkRlZmluZWQobmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgY2VXaGVuRGVmaW5lZFtuYW1lXVsxXSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBPYmplY3Qua2V5cyhjZU1hcCkuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgY29uc3QgW2NvbnN0cnVjdG9yLCBvcHRpb25zXSA9IGNlTWFwW25hbWVdO1xuICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKG5hbWUsIGNvbnN0cnVjdG9yLCBvcHRpb25zKTtcbiAgICAgIH0pO1xuXG4gICAgICBjZVVwZ3JhZGUuZm9yRWFjaChyb290ID0+IHdpbmRvdy5jdXN0b21FbGVtZW50cy51cGdyYWRlKHJvb3QpKTtcbiAgICB9KTtcbiAgfVxufVxuIl19