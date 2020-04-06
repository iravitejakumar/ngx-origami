import { __awaiter } from "tslib";
import { InjectionToken } from '@angular/core';
/**
 * By default, Origami will not parse or register styles with ShadyCSS if the
 * platform supports native CSS custom properties. However, ShadyCSS also
 * supports the deprecated `@apply` mixin proposal. If a project is using
 * `@apply` in CSS, this token should be provided with a true value.
 */
export const USING_APPLY = new InjectionToken('usingApply');
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
    return __awaiter(this, void 0, void 0, function* () {
        const CustomStyleInterface = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
        if (CustomStyleInterface && (!window.ShadyCSS.nativeCss || usingApply)) {
            yield Promise.all(Array.from(document.styleSheets).map(stylesheet => {
                const node = stylesheet.ownerNode;
                if (isStyleNode(node) && !node.hasAttribute('scope')) {
                    CustomStyleInterface.addCustomStyle(node);
                    return Promise.resolve();
                }
                else if (stylesheet.href) {
                    if (!stylesheet._fetching) {
                        const href = stylesheet.href;
                        stylesheet._fetching = new Promise(resolve => {
                            const xhr = new XMLHttpRequest();
                            xhr.addEventListener('load', () => {
                                const style = document.createElement('style');
                                style.innerHTML = xhr.responseText;
                                node.parentNode.insertBefore(style, node);
                                node.parentNode.removeChild(node);
                                CustomStyleInterface.addCustomStyle(style);
                                resolve();
                            });
                            xhr.open('GET', href);
                            xhr.send();
                        });
                    }
                    return stylesheet._fetching;
                }
            }));
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy1zdHlsZXNoZWV0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcmlnYW1pL3N0eWxlcy8iLCJzb3VyY2VzIjpbInNyYy9zaGFkeWNzcy9wcm9jZXNzLXN0eWxlc2hlZXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9DOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLElBQUksY0FBYyxDQUFVLFlBQVksQ0FBQyxDQUFDO0FBRXJFOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQWdCLGtCQUFrQixDQUFDLFVBQW9COztRQUMzRCxNQUFNLG9CQUFvQixHQUN4QixNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUM7UUFDMUQsSUFBSSxvQkFBb0IsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLElBQUksVUFBVSxDQUFDLEVBQUU7WUFDdEUsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNmLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDaEQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztnQkFDbEMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNwRCxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzFDLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUMxQjtxQkFBTSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUU7b0JBQzFCLElBQUksQ0FBTyxVQUFXLENBQUMsU0FBUyxFQUFFO3dCQUNoQyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO3dCQUN2QixVQUFXLENBQUMsU0FBUyxHQUFHLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFOzRCQUN4RCxNQUFNLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDOzRCQUNqQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQ0FDaEMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDOUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO2dDQUNuQyxJQUFJLENBQUMsVUFBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0NBQzNDLElBQUksQ0FBQyxVQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNuQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQzNDLE9BQU8sRUFBRSxDQUFDOzRCQUNaLENBQUMsQ0FBQyxDQUFDOzRCQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUN0QixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2IsQ0FBQyxDQUFDLENBQUM7cUJBQ0o7b0JBRUQsT0FBYSxVQUFXLENBQUMsU0FBUyxDQUFDO2lCQUNwQztZQUNILENBQUMsQ0FBQyxDQUNILENBQUM7U0FDSDtJQUNILENBQUM7Q0FBQTtBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxJQUFVO0lBQ3BDLE9BQTBCLElBQUssQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDO0FBQ3hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEJ5IGRlZmF1bHQsIE9yaWdhbWkgd2lsbCBub3QgcGFyc2Ugb3IgcmVnaXN0ZXIgc3R5bGVzIHdpdGggU2hhZHlDU1MgaWYgdGhlXG4gKiBwbGF0Zm9ybSBzdXBwb3J0cyBuYXRpdmUgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzLiBIb3dldmVyLCBTaGFkeUNTUyBhbHNvXG4gKiBzdXBwb3J0cyB0aGUgZGVwcmVjYXRlZCBgQGFwcGx5YCBtaXhpbiBwcm9wb3NhbC4gSWYgYSBwcm9qZWN0IGlzIHVzaW5nXG4gKiBgQGFwcGx5YCBpbiBDU1MsIHRoaXMgdG9rZW4gc2hvdWxkIGJlIHByb3ZpZGVkIHdpdGggYSB0cnVlIHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgVVNJTkdfQVBQTFkgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ3VzaW5nQXBwbHknKTtcblxuLyoqXG4gKiBQcm9jZXNzZXMgYWxsIGN1cnJlbnQgZG9jdW1lbnQgc3R5bGVzaGVldHMgYWRkZWQgYnkgQW5ndWxhciBhbmQgcmVnaXN0ZXJzXG4gKiB0aGVtIHdpdGggU2hhZHlDU1MuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGFsc28gcGFyc2UgZXh0ZXJuYWwgYDxsaW5rPmAgc3R5bGVzaGVldHMgaWYgbmF0aXZlXG4gKiBDU1MgY3VzdG9tIHByb3BlcnRpZXMgYXJlIG5vdCBzdXBwb3J0ZWQsIG9yIGlmIGB1c2luZ0FwcGx5YCBpcyBzZXQgdG8gdHJ1ZS5cbiAqXG4gKiBAcGFyYW0gdXNpbmdBcHBseSBpZiB0cnVlLCBwYXJzZSBzdHlsZXNoZWV0cyByZWdhcmRsZXNzIG9mIG5hdGl2ZSBzdXBwb3J0LFxuICogICBzaW5jZSBubyBicm93c2VyIHN1cHBvcnRzIGBAYXBwbHlgIG5hdGl2ZWx5XG4gKiBAcmV0dXJucyBhIFByb21pc2Ugd2hlbiBhbGwgc3R5bGVzaGVldHMgaGF2ZSBiZWVuIHByb2Nlc3NlZFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc1N0eWxlc2hlZXRzKHVzaW5nQXBwbHk/OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IEN1c3RvbVN0eWxlSW50ZXJmYWNlID1cbiAgICB3aW5kb3cuU2hhZHlDU1MgJiYgd2luZG93LlNoYWR5Q1NTLkN1c3RvbVN0eWxlSW50ZXJmYWNlO1xuICBpZiAoQ3VzdG9tU3R5bGVJbnRlcmZhY2UgJiYgKCF3aW5kb3cuU2hhZHlDU1MubmF0aXZlQ3NzIHx8IHVzaW5nQXBwbHkpKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBBcnJheS5mcm9tKGRvY3VtZW50LnN0eWxlU2hlZXRzKS5tYXAoc3R5bGVzaGVldCA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdHlsZXNoZWV0Lm93bmVyTm9kZTtcbiAgICAgICAgaWYgKGlzU3R5bGVOb2RlKG5vZGUpICYmICFub2RlLmhhc0F0dHJpYnV0ZSgnc2NvcGUnKSkge1xuICAgICAgICAgIEN1c3RvbVN0eWxlSW50ZXJmYWNlLmFkZEN1c3RvbVN0eWxlKG5vZGUpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHlsZXNoZWV0LmhyZWYpIHtcbiAgICAgICAgICBpZiAoISg8YW55PnN0eWxlc2hlZXQpLl9mZXRjaGluZykge1xuICAgICAgICAgICAgY29uc3QgaHJlZiA9IHN0eWxlc2hlZXQuaHJlZjtcbiAgICAgICAgICAgICg8YW55PnN0eWxlc2hlZXQpLl9mZXRjaGluZyA9IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlIS5pbnNlcnRCZWZvcmUoc3R5bGUsIG5vZGUpO1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICAgICAgQ3VzdG9tU3R5bGVJbnRlcmZhY2UuYWRkQ3VzdG9tU3R5bGUoc3R5bGUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIGhyZWYpO1xuICAgICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICg8YW55PnN0eWxlc2hlZXQpLl9mZXRjaGluZztcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBwcm92aWRlZCBub2RlIGlzIGEgYDxzdHlsZT5gIG5vZGUuXG4gKlxuICogQHBhcmFtIG5vZGUgdGhlIG5vZGUgdG8gdGVzdFxuICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgbm9kZSBpcyBhIGA8c3R5bGU+YCBub2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0eWxlTm9kZShub2RlOiBOb2RlKTogbm9kZSBpcyBIVE1MU3R5bGVFbGVtZW50IHtcbiAgcmV0dXJuICg8SFRNTFN0eWxlRWxlbWVudD5ub2RlKS5sb2NhbE5hbWUgPT09ICdzdHlsZSc7XG59XG4iXX0=