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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbS1jdXN0b20tZWxlbWVudHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3JpZ2FtaS9wb2x5ZmlsbHMvIiwic291cmNlcyI6WyJzcmMvc2hpbS1jdXN0b20tZWxlbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFXM0Q7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sVUFBVSxrQkFBa0I7SUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7UUFDMUIsTUFBTSxLQUFLLEdBS1AsRUFBRSxDQUFDO1FBRVAsTUFBTSxhQUFhLEdBRWYsRUFBRSxDQUFDO1FBRVAsTUFBTSxTQUFTLEdBQVcsRUFBRSxDQUFDO1FBRTdCLE1BQU0seUJBQXlCO1lBQS9CO2dCQUNFLCtDQUErQztnQkFDL0Msa0JBQWEsR0FBRyxJQUFJLENBQUM7WUE0QnZCLENBQUM7WUExQkMsR0FBRyxDQUFDLElBQVk7Z0JBQ2QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7WUFFRCxNQUFNLENBQ0osSUFBWSxFQUNaLFdBQWtDLEVBQ2xDLE9BQWtDO2dCQUVsQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUVELFdBQVcsQ0FBQyxJQUFZO2dCQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDdkMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFRLEVBQUUsQ0FBQztvQkFDOUIsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUM3QyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO29CQUNuQyxDQUFDLENBQUMsQ0FBQztpQkFDSjtnQkFFRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQsT0FBTyxDQUFDLElBQVU7Z0JBQ2hCLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQztTQUNGO1FBRUQsTUFBTSxDQUFDLGNBQWMsR0FBRyxJQUFJLHlCQUF5QixFQUFFLENBQUM7UUFDeEQsTUFBTSxDQUFDLHFCQUFxQixHQUFHLHlCQUF5QixDQUFDO1FBRXpELGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDaEQsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEMsTUFBTSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdlYmNvbXBvbmVudHNSZWFkeSB9IGZyb20gJy4vd2ViY29tcG9uZW50cy1yZWFkeSc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5OiB7XG4gICAgICBuZXcgKCk6IEN1c3RvbUVsZW1lbnRSZWdpc3RyeTtcbiAgICAgIHByb3RvdHlwZTogQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5O1xuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBTaGltcyBgd2luZG93LmN1c3RvbUVsZW1lbnRzYCB3aXRoIGEgcGxhY2Vob2xkZXIgdGhhdCBhbGxvd3MgY3VzdG9tIGVsZW1lbnRzXG4gKiB0byBkZWZpbmUgdGhlbXNlbHZlcyBiZWZvcmUgdGhlIFdlYkNvbXBvbmVudHMgcG9seWZpbGwgaXMgcmVhZHkuIFdoZW4gdGhlXG4gKiBwb2x5ZmlsbCBsb2FkcywgdGhlIGVsZW1lbnQgZGVmaW5pdGlvbnMgd2lsbCBiZSBkZWZpbmVkIHdpdGggdGhlIHBvbHlmaWxsZWRcbiAqIGBjdXN0b21FbGVtZW50c2AuXG4gKlxuICogVGhpcyBhbGxvd3MgdGhlIGRldmVsb3BlciB0byBpbXBvcnQgZmlsZXMgdGhhdCBjYWxsIGBjdXN0b21FbGVtZW50cy5kZWZpbmUoKWBcbiAqIHdpdGhvdXQgaGF2aW5nIHRvIGRlbGF5IGxvYWRpbmcgdGhlIGFwcCB2aWEgYHdlYmNvbXBvbmVudHNSZWFkeSgpYC5cbiAqXG4gKiBUaGlzIGlzIGF1dG9tYXRpY2FsbHkgY2FsbGVkIGJ5IE9yaWdhbWkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGltQ3VzdG9tRWxlbWVudHMoKSB7XG4gIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzKSB7XG4gICAgY29uc3QgY2VNYXA6IHtcbiAgICAgIFtuYW1lOiBzdHJpbmddOiBbXG4gICAgICAgIG5ldyAoKSA9PiBIVE1MRWxlbWVudCxcbiAgICAgICAgRWxlbWVudERlZmluaXRpb25PcHRpb25zIHwgdW5kZWZpbmVkXG4gICAgICBdO1xuICAgIH0gPSB7fTtcblxuICAgIGNvbnN0IGNlV2hlbkRlZmluZWQ6IHtcbiAgICAgIFtuYW1lOiBzdHJpbmddOiBbUHJvbWlzZTx2b2lkPiwgRnVuY3Rpb25dO1xuICAgIH0gPSB7fTtcblxuICAgIGNvbnN0IGNlVXBncmFkZTogTm9kZVtdID0gW107XG5cbiAgICBjbGFzcyBDdXN0b21FbGVtZW50UmVnaXN0cnlTaGltIHtcbiAgICAgIC8vIGluc3RydWN0IHdlYmNvbXBvbmVudHNqcyB0byBpZ25vcmUgdGhpcyBzaGltXG4gICAgICBmb3JjZVBvbHlmaWxsID0gdHJ1ZTtcblxuICAgICAgZ2V0KG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiBjZU1hcFtuYW1lXSAmJiBjZU1hcFtuYW1lXVswXTtcbiAgICAgIH1cblxuICAgICAgZGVmaW5lKFxuICAgICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICAgIGNvbnN0cnVjdG9yOiBuZXcgKCkgPT4gSFRNTEVsZW1lbnQsXG4gICAgICAgIG9wdGlvbnM/OiBFbGVtZW50RGVmaW5pdGlvbk9wdGlvbnNcbiAgICAgICkge1xuICAgICAgICBjZU1hcFtuYW1lXSA9IFtjb25zdHJ1Y3Rvciwgb3B0aW9uc107XG4gICAgICB9XG5cbiAgICAgIHdoZW5EZWZpbmVkKG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2VXaGVuRGVmaW5lZFtuYW1lXSkpIHtcbiAgICAgICAgICBjZVdoZW5EZWZpbmVkW25hbWVdID0gPGFueT5bXTtcbiAgICAgICAgICBjZVdoZW5EZWZpbmVkW25hbWVdWzBdID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBjZVdoZW5EZWZpbmVkW25hbWVdWzFdID0gcmVzb2x2ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjZVdoZW5EZWZpbmVkW25hbWVdWzBdO1xuICAgICAgfVxuXG4gICAgICB1cGdyYWRlKHJvb3Q6IE5vZGUpIHtcbiAgICAgICAgY2VVcGdyYWRlLnB1c2gocm9vdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LmN1c3RvbUVsZW1lbnRzID0gbmV3IEN1c3RvbUVsZW1lbnRSZWdpc3RyeVNoaW0oKTtcbiAgICB3aW5kb3cuQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5ID0gQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5U2hpbTtcblxuICAgIHdlYmNvbXBvbmVudHNSZWFkeSgpLnRoZW4oKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMoY2VXaGVuRGVmaW5lZCkuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLndoZW5EZWZpbmVkKG5hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNlV2hlbkRlZmluZWRbbmFtZV1bMV0oKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgT2JqZWN0LmtleXMoY2VNYXApLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IFtjb25zdHJ1Y3Rvciwgb3B0aW9uc10gPSBjZU1hcFtuYW1lXTtcbiAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShuYW1lLCBjb25zdHJ1Y3Rvciwgb3B0aW9ucyk7XG4gICAgICB9KTtcblxuICAgICAgY2VVcGdyYWRlLmZvckVhY2gocm9vdCA9PiB3aW5kb3cuY3VzdG9tRWxlbWVudHMudXBncmFkZShyb290KSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==