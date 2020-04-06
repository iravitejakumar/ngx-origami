import { __awaiter, __generator } from "tslib";
import { InjectionToken } from '@angular/core';
/**
 * By default, Origami will not parse or register styles with ShadyCSS if the
 * platform supports native CSS custom properties. However, ShadyCSS also
 * supports the deprecated `@apply` mixin proposal. If a project is using
 * `@apply` in CSS, this token should be provided with a true value.
 */
export var USING_APPLY = new InjectionToken('usingApply');
/**
 * Processes all current document stylesheets added by Angular and registers
 * them with ShadyCSS.
 *
 * This function will also parse external `<link>` stylesheets if native
 * CSS custom properties are not supported, or if `usingApply` is set to true.
 *
 * @param usingApply if true, parse stylesheets regardless of native support,
 *   since no browser supports `@apply` natively
 * @returns a Promise when all stylesheets have been processed
 */
export function processStylesheets(usingApply) {
    return __awaiter(this, void 0, void 0, function () {
        var CustomStyleInterface;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    CustomStyleInterface = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
                    if (!(CustomStyleInterface && (!window.ShadyCSS.nativeCss || usingApply))) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.all(Array.from(document.styleSheets).map(function (stylesheet) {
                            var node = stylesheet.ownerNode;
                            if (isStyleNode(node) && !node.hasAttribute('scope')) {
                                CustomStyleInterface.addCustomStyle(node);
                                return Promise.resolve();
                            }
                            else if (stylesheet.href) {
                                if (!stylesheet._fetching) {
                                    var href_1 = stylesheet.href;
                                    stylesheet._fetching = new Promise(function (resolve) {
                                        var xhr = new XMLHttpRequest();
                                        xhr.addEventListener('load', function () {
                                            var style = document.createElement('style');
                                            style.innerHTML = xhr.responseText;
                                            node.parentNode.insertBefore(style, node);
                                            node.parentNode.removeChild(node);
                                            CustomStyleInterface.addCustomStyle(style);
                                            resolve();
                                        });
                                        xhr.open('GET', href_1);
                                        xhr.send();
                                    });
                                }
                                return stylesheet._fetching;
                            }
                        }))];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
/**
 * Returns true if the provided node is a `<style>` node.
 *
 * @param node the node to test
 * @returns true if the node is a `<style>` node
 */
export function isStyleNode(node) {
    return node.localName === 'style';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy1zdHlsZXNoZWV0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RlYmFrZXJ5L29yaWdhbWkvc3R5bGVzLyIsInNvdXJjZXMiOlsic3JjL3NoYWR5Y3NzL3Byb2Nlc3Mtc3R5bGVzaGVldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0M7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsSUFBTSxXQUFXLEdBQUcsSUFBSSxjQUFjLENBQVUsWUFBWSxDQUFDLENBQUM7QUFFckU7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sVUFBZ0Isa0JBQWtCLENBQUMsVUFBb0I7Ozs7OztvQkFDckQsb0JBQW9CLEdBQ3hCLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQzt5QkFDdEQsQ0FBQSxvQkFBb0IsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDLENBQUEsRUFBbEUsd0JBQWtFO29CQUNwRSxxQkFBTSxPQUFPLENBQUMsR0FBRyxDQUNmLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFVBQVU7NEJBQzdDLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7NEJBQ2xDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQ0FDcEQsb0JBQW9CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUMxQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs2QkFDMUI7aUNBQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFO2dDQUMxQixJQUFJLENBQU8sVUFBVyxDQUFDLFNBQVMsRUFBRTtvQ0FDaEMsSUFBTSxNQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztvQ0FDdkIsVUFBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBTyxVQUFBLE9BQU87d0NBQ3JELElBQU0sR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7d0NBQ2pDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7NENBQzNCLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7NENBQzlDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQzs0Q0FDbkMsSUFBSSxDQUFDLFVBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOzRDQUMzQyxJQUFJLENBQUMsVUFBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0Q0FDbkMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRDQUMzQyxPQUFPLEVBQUUsQ0FBQzt3Q0FDWixDQUFDLENBQUMsQ0FBQzt3Q0FFSCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFJLENBQUMsQ0FBQzt3Q0FDdEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO29DQUNiLENBQUMsQ0FBQyxDQUFDO2lDQUNKO2dDQUVELE9BQWEsVUFBVyxDQUFDLFNBQVMsQ0FBQzs2QkFDcEM7d0JBQ0gsQ0FBQyxDQUFDLENBQ0gsRUFBQTs7b0JBNUJELFNBNEJDLENBQUM7Ozs7OztDQUVMO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLElBQVU7SUFDcEMsT0FBMEIsSUFBSyxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUM7QUFDeEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQnkgZGVmYXVsdCwgT3JpZ2FtaSB3aWxsIG5vdCBwYXJzZSBvciByZWdpc3RlciBzdHlsZXMgd2l0aCBTaGFkeUNTUyBpZiB0aGVcbiAqIHBsYXRmb3JtIHN1cHBvcnRzIG5hdGl2ZSBDU1MgY3VzdG9tIHByb3BlcnRpZXMuIEhvd2V2ZXIsIFNoYWR5Q1NTIGFsc29cbiAqIHN1cHBvcnRzIHRoZSBkZXByZWNhdGVkIGBAYXBwbHlgIG1peGluIHByb3Bvc2FsLiBJZiBhIHByb2plY3QgaXMgdXNpbmdcbiAqIGBAYXBwbHlgIGluIENTUywgdGhpcyB0b2tlbiBzaG91bGQgYmUgcHJvdmlkZWQgd2l0aCBhIHRydWUgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBVU0lOR19BUFBMWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPigndXNpbmdBcHBseScpO1xuXG4vKipcbiAqIFByb2Nlc3NlcyBhbGwgY3VycmVudCBkb2N1bWVudCBzdHlsZXNoZWV0cyBhZGRlZCBieSBBbmd1bGFyIGFuZCByZWdpc3RlcnNcbiAqIHRoZW0gd2l0aCBTaGFkeUNTUy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYWxzbyBwYXJzZSBleHRlcm5hbCBgPGxpbms+YCBzdHlsZXNoZWV0cyBpZiBuYXRpdmVcbiAqIENTUyBjdXN0b20gcHJvcGVydGllcyBhcmUgbm90IHN1cHBvcnRlZCwgb3IgaWYgYHVzaW5nQXBwbHlgIGlzIHNldCB0byB0cnVlLlxuICpcbiAqIEBwYXJhbSB1c2luZ0FwcGx5IGlmIHRydWUsIHBhcnNlIHN0eWxlc2hlZXRzIHJlZ2FyZGxlc3Mgb2YgbmF0aXZlIHN1cHBvcnQsXG4gKiAgIHNpbmNlIG5vIGJyb3dzZXIgc3VwcG9ydHMgYEBhcHBseWAgbmF0aXZlbHlcbiAqIEByZXR1cm5zIGEgUHJvbWlzZSB3aGVuIGFsbCBzdHlsZXNoZWV0cyBoYXZlIGJlZW4gcHJvY2Vzc2VkXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9jZXNzU3R5bGVzaGVldHModXNpbmdBcHBseT86IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgQ3VzdG9tU3R5bGVJbnRlcmZhY2UgPVxuICAgIHdpbmRvdy5TaGFkeUNTUyAmJiB3aW5kb3cuU2hhZHlDU1MuQ3VzdG9tU3R5bGVJbnRlcmZhY2U7XG4gIGlmIChDdXN0b21TdHlsZUludGVyZmFjZSAmJiAoIXdpbmRvdy5TaGFkeUNTUy5uYXRpdmVDc3MgfHwgdXNpbmdBcHBseSkpIHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQuc3R5bGVTaGVldHMpLm1hcChzdHlsZXNoZWV0ID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0eWxlc2hlZXQub3duZXJOb2RlO1xuICAgICAgICBpZiAoaXNTdHlsZU5vZGUobm9kZSkgJiYgIW5vZGUuaGFzQXR0cmlidXRlKCdzY29wZScpKSB7XG4gICAgICAgICAgQ3VzdG9tU3R5bGVJbnRlcmZhY2UuYWRkQ3VzdG9tU3R5bGUobm9kZSk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKHN0eWxlc2hlZXQuaHJlZikge1xuICAgICAgICAgIGlmICghKDxhbnk+c3R5bGVzaGVldCkuX2ZldGNoaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBocmVmID0gc3R5bGVzaGVldC5ocmVmO1xuICAgICAgICAgICAgKDxhbnk+c3R5bGVzaGVldCkuX2ZldGNoaW5nID0gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUhLmluc2VydEJlZm9yZShzdHlsZSwgbm9kZSk7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgICAgICAgICBDdXN0b21TdHlsZUludGVyZmFjZS5hZGRDdXN0b21TdHlsZShzdHlsZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICB4aHIub3BlbignR0VUJywgaHJlZik7XG4gICAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gKDxhbnk+c3R5bGVzaGVldCkuX2ZldGNoaW5nO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHByb3ZpZGVkIG5vZGUgaXMgYSBgPHN0eWxlPmAgbm9kZS5cbiAqXG4gKiBAcGFyYW0gbm9kZSB0aGUgbm9kZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBub2RlIGlzIGEgYDxzdHlsZT5gIG5vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3R5bGVOb2RlKG5vZGU6IE5vZGUpOiBub2RlIGlzIEhUTUxTdHlsZUVsZW1lbnQge1xuICByZXR1cm4gKDxIVE1MU3R5bGVFbGVtZW50Pm5vZGUpLmxvY2FsTmFtZSA9PT0gJ3N0eWxlJztcbn1cbiJdfQ==