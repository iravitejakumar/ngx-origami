/**
 * Regex to find and replace `:host-context()` selectors.
 */
export const HOST_CONTEXT_REGEX = /:host-context\((.*)\)/g;
/**
 * Regex to find and replace `:host` selectors.
 */
export const HOST_REGEX = /:host(?:\((.*)\))?/g;
// from @angular/platform-browser
export const COMPONENT_VARIABLE = '%COMP%';
export const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
export const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
/**
 * Converts the provided CSS string to an Angular emulated encapsulation string
 * for the given component id.
 *
 * @param style the CSS string to convert
 * @returns a CSS string that emulates encapsulation for the given component id
 */
export function styleToEmulatedEncapsulation(style) {
    const statements = parseStyleStatements(style);
    function addEmulation(statement) {
        if (Array.isArray(statement.statements)) {
            statement.statements.forEach(nested => addEmulation(nested));
        }
        else {
            let { selector } = statement;
            selector = selector.trim();
            selector = selector
                .split(',')
                .map(subSelector => {
                return subSelector
                    .trim()
                    .split(' ')
                    .map(part => {
                    part = part.trim();
                    if (part.includes(':host')) {
                        return part;
                    }
                    else {
                        return `${part}[${CONTENT_ATTR}]`;
                    }
                })
                    .join(' ');
            })
                .join(',');
            selector = selector.replace(HOST_CONTEXT_REGEX, `*$1 [${HOST_ATTR}]`);
            selector = selector.replace(HOST_REGEX, `[${HOST_ATTR}]$1`);
            statement.selector = selector;
        }
    }
    statements.forEach(statement => {
        addEmulation(statement);
    });
    return statementsToString(statements);
}
/**
 * Parses a CSS string into an array of statements.
 *
 * @param style the CSS string to parse
 * @returns an array of CSS statements
 */
export function parseStyleStatements(style) {
    let inAtRule = false;
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let inBlock = 0;
    let leavingBlock = false;
    const statements = [];
    let currentStatement = {
        selector: '',
        block: ''
    };
    for (let i = 0; i < style.length; i++) {
        const char = style[i];
        switch (char) {
            case '@':
                inAtRule = true;
                break;
            case "'":
                inSingleQuote = !inSingleQuote;
                break;
            case '"':
                inDoubleQuote = !inDoubleQuote;
                break;
            case '{':
            case '}':
                if (!inSingleQuote && !inDoubleQuote) {
                    if (char == '{') {
                        inBlock++;
                    }
                    else {
                        inBlock--;
                        leavingBlock = inBlock === 0;
                    }
                }
                break;
        }
        if (inBlock) {
            currentStatement.block += char;
        }
        else if (leavingBlock) {
            currentStatement.block += char;
            if (inAtRule) {
                currentStatement.statements = parseStyleStatements(currentStatement.block.substring(currentStatement.block.indexOf('{') + 1, currentStatement.block.lastIndexOf('}')));
            }
            currentStatement.selector = currentStatement.selector.trim();
            currentStatement.block = currentStatement.block.trim();
            statements.push(currentStatement);
            currentStatement = { selector: '', block: '' };
            leavingBlock = false;
        }
        else {
            currentStatement.selector += char;
        }
    }
    return statements;
}
/**
 * Converts an array of statements back into a single CSS string.
 *
 * @param statements the statements to convert
 * @returns a CSS string
 */
export function statementsToString(statements) {
    return statements
        .map(statement => {
        const block = Array.isArray(statement.statements)
            ? `{${statementsToString(statement.statements)}}`
            : statement.block;
        return `${statement.selector} ${block}`;
    })
        .join('\n');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtdG8tZW11bGF0ZWQtZW5jYXBzdWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcmlnYW1pL3N0eWxlcy8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL3N0eWxlLXRvLWVtdWxhdGVkLWVuY2Fwc3VsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyx3QkFBd0IsQ0FBQztBQUMzRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztBQUVoRCxpQ0FBaUM7QUFDakMsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDO0FBQzNDLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxXQUFXLGtCQUFrQixFQUFFLENBQUM7QUFDekQsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLGNBQWMsa0JBQWtCLEVBQUUsQ0FBQztBQUUvRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsS0FBYTtJQUN4RCxNQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxTQUFTLFlBQVksQ0FBQyxTQUF5QjtRQUM3QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDOUQ7YUFBTTtZQUNMLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxTQUFTLENBQUM7WUFDN0IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixRQUFRLEdBQUcsUUFBUTtpQkFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU8s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QyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUN4QyxDQUNGLENBQUM7YUFDSDtZQUVELGdCQUFnQixDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0QsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2RCxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDbEMsZ0JBQWdCLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUMvQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO2FBQU07WUFDTCxnQkFBZ0IsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1NBQ25DO0tBQ0Y7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsVUFBNEI7SUFDN0QsT0FBTyxVQUFVO1NBQ2QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ2YsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1lBQy9DLENBQUMsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRztZQUNqRCxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUNwQixPQUFPLEdBQUcsU0FBUyxDQUFDLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUMxQyxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVnZXggdG8gZmluZCBhbmQgcmVwbGFjZSBgOmhvc3QtY29udGV4dCgpYCBzZWxlY3RvcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBIT1NUX0NPTlRFWFRfUkVHRVggPSAvOmhvc3QtY29udGV4dFxcKCguKilcXCkvZztcbi8qKlxuICogUmVnZXggdG8gZmluZCBhbmQgcmVwbGFjZSBgOmhvc3RgIHNlbGVjdG9ycy5cbiAqL1xuZXhwb3J0IGNvbnN0IEhPU1RfUkVHRVggPSAvOmhvc3QoPzpcXCgoLiopXFwpKT8vZztcblxuLy8gZnJvbSBAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UX1ZBUklBQkxFID0gJyVDT01QJSc7XG5leHBvcnQgY29uc3QgSE9TVF9BVFRSID0gYF9uZ2hvc3QtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcbmV4cG9ydCBjb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBwcm92aWRlZCBDU1Mgc3RyaW5nIHRvIGFuIEFuZ3VsYXIgZW11bGF0ZWQgZW5jYXBzdWxhdGlvbiBzdHJpbmdcbiAqIGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50IGlkLlxuICpcbiAqIEBwYXJhbSBzdHlsZSB0aGUgQ1NTIHN0cmluZyB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyBhIENTUyBzdHJpbmcgdGhhdCBlbXVsYXRlcyBlbmNhcHN1bGF0aW9uIGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50IGlkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVRvRW11bGF0ZWRFbmNhcHN1bGF0aW9uKHN0eWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBzdGF0ZW1lbnRzID0gcGFyc2VTdHlsZVN0YXRlbWVudHMoc3R5bGUpO1xuICBmdW5jdGlvbiBhZGRFbXVsYXRpb24oc3RhdGVtZW50OiBTdHlsZVN0YXRlbWVudCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN0YXRlbWVudC5zdGF0ZW1lbnRzKSkge1xuICAgICAgc3RhdGVtZW50LnN0YXRlbWVudHMuZm9yRWFjaChuZXN0ZWQgPT4gYWRkRW11bGF0aW9uKG5lc3RlZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgeyBzZWxlY3RvciB9ID0gc3RhdGVtZW50O1xuICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci50cmltKCk7XG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yXG4gICAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAgIC5tYXAoc3ViU2VsZWN0b3IgPT4ge1xuICAgICAgICAgIHJldHVybiBzdWJTZWxlY3RvclxuICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgIC5tYXAocGFydCA9PiB7XG4gICAgICAgICAgICAgIHBhcnQgPSBwYXJ0LnRyaW0oKTtcbiAgICAgICAgICAgICAgaWYgKHBhcnQuaW5jbHVkZXMoJzpob3N0JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFydDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7cGFydH1bJHtDT05URU5UX0FUVFJ9XWA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignICcpO1xuICAgICAgICB9KVxuICAgICAgICAuam9pbignLCcpO1xuXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoSE9TVF9DT05URVhUX1JFR0VYLCBgKiQxIFske0hPU1RfQVRUUn1dYCk7XG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoSE9TVF9SRUdFWCwgYFske0hPU1RfQVRUUn1dJDFgKTtcbiAgICAgIHN0YXRlbWVudC5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlbWVudHMuZm9yRWFjaChzdGF0ZW1lbnQgPT4ge1xuICAgIGFkZEVtdWxhdGlvbihzdGF0ZW1lbnQpO1xuICB9KTtcblxuICByZXR1cm4gc3RhdGVtZW50c1RvU3RyaW5nKHN0YXRlbWVudHMpO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaW5nbGUgQ1NTIHN0YXRlbWVudC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdHlsZVN0YXRlbWVudCB7XG4gIC8qKlxuICAgKiBUaGUgc2VsZWN0b3Igb2YgdGhlIHN0YXRlbWVudC5cbiAgICovXG4gIHNlbGVjdG9yOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgYm9keSBibG9jayBvZiB0aGUgc3RhdGVtZW50LlxuICAgKi9cbiAgYmxvY2s6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBib2R5IGJsb2NrIHN0YXRlbWVudHMuIFRoaXMgaXMgdXNlZCBmb3IgYXQtcnVsZSBzZWxlY3RvcnMgc3VjaCBhc1xuICAgKiBgQG1lZGlhIHt9YFxuICAgKi9cbiAgc3RhdGVtZW50cz86IFN0eWxlU3RhdGVtZW50W107XG59XG5cbi8qKlxuICogUGFyc2VzIGEgQ1NTIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHN0YXRlbWVudHMuXG4gKlxuICogQHBhcmFtIHN0eWxlIHRoZSBDU1Mgc3RyaW5nIHRvIHBhcnNlXG4gKiBAcmV0dXJucyBhbiBhcnJheSBvZiBDU1Mgc3RhdGVtZW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdHlsZVN0YXRlbWVudHMoc3R5bGU6IHN0cmluZyk6IFN0eWxlU3RhdGVtZW50W10ge1xuICBsZXQgaW5BdFJ1bGUgPSBmYWxzZTtcbiAgbGV0IGluU2luZ2xlUXVvdGUgPSBmYWxzZTtcbiAgbGV0IGluRG91YmxlUXVvdGUgPSBmYWxzZTtcbiAgbGV0IGluQmxvY2sgPSAwO1xuICBsZXQgbGVhdmluZ0Jsb2NrID0gZmFsc2U7XG5cbiAgY29uc3Qgc3RhdGVtZW50czogU3R5bGVTdGF0ZW1lbnRbXSA9IFtdO1xuICBsZXQgY3VycmVudFN0YXRlbWVudDogU3R5bGVTdGF0ZW1lbnQgPSB7XG4gICAgc2VsZWN0b3I6ICcnLFxuICAgIGJsb2NrOiAnJ1xuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGUubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyID0gc3R5bGVbaV07XG4gICAgc3dpdGNoIChjaGFyKSB7XG4gICAgICBjYXNlICdAJzpcbiAgICAgICAgaW5BdFJ1bGUgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCInXCI6XG4gICAgICAgIGluU2luZ2xlUXVvdGUgPSAhaW5TaW5nbGVRdW90ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdcIic6XG4gICAgICAgIGluRG91YmxlUXVvdGUgPSAhaW5Eb3VibGVRdW90ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd7JzpcbiAgICAgIGNhc2UgJ30nOlxuICAgICAgICBpZiAoIWluU2luZ2xlUXVvdGUgJiYgIWluRG91YmxlUXVvdGUpIHtcbiAgICAgICAgICBpZiAoY2hhciA9PSAneycpIHtcbiAgICAgICAgICAgIGluQmxvY2srKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5CbG9jay0tO1xuICAgICAgICAgICAgbGVhdmluZ0Jsb2NrID0gaW5CbG9jayA9PT0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoaW5CbG9jaykge1xuICAgICAgY3VycmVudFN0YXRlbWVudC5ibG9jayArPSBjaGFyO1xuICAgIH0gZWxzZSBpZiAobGVhdmluZ0Jsb2NrKSB7XG4gICAgICBjdXJyZW50U3RhdGVtZW50LmJsb2NrICs9IGNoYXI7XG4gICAgICBpZiAoaW5BdFJ1bGUpIHtcbiAgICAgICAgY3VycmVudFN0YXRlbWVudC5zdGF0ZW1lbnRzID0gcGFyc2VTdHlsZVN0YXRlbWVudHMoXG4gICAgICAgICAgY3VycmVudFN0YXRlbWVudC5ibG9jay5zdWJzdHJpbmcoXG4gICAgICAgICAgICBjdXJyZW50U3RhdGVtZW50LmJsb2NrLmluZGV4T2YoJ3snKSArIDEsXG4gICAgICAgICAgICBjdXJyZW50U3RhdGVtZW50LmJsb2NrLmxhc3RJbmRleE9mKCd9JylcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRTdGF0ZW1lbnQuc2VsZWN0b3IgPSBjdXJyZW50U3RhdGVtZW50LnNlbGVjdG9yLnRyaW0oKTtcbiAgICAgIGN1cnJlbnRTdGF0ZW1lbnQuYmxvY2sgPSBjdXJyZW50U3RhdGVtZW50LmJsb2NrLnRyaW0oKTtcbiAgICAgIHN0YXRlbWVudHMucHVzaChjdXJyZW50U3RhdGVtZW50KTtcbiAgICAgIGN1cnJlbnRTdGF0ZW1lbnQgPSB7IHNlbGVjdG9yOiAnJywgYmxvY2s6ICcnIH07XG4gICAgICBsZWF2aW5nQmxvY2sgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudFN0YXRlbWVudC5zZWxlY3RvciArPSBjaGFyO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdGF0ZW1lbnRzO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGFuIGFycmF5IG9mIHN0YXRlbWVudHMgYmFjayBpbnRvIGEgc2luZ2xlIENTUyBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHN0YXRlbWVudHMgdGhlIHN0YXRlbWVudHMgdG8gY29udmVydFxuICogQHJldHVybnMgYSBDU1Mgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGF0ZW1lbnRzVG9TdHJpbmcoc3RhdGVtZW50czogU3R5bGVTdGF0ZW1lbnRbXSk6IHN0cmluZyB7XG4gIHJldHVybiBzdGF0ZW1lbnRzXG4gICAgLm1hcChzdGF0ZW1lbnQgPT4ge1xuICAgICAgY29uc3QgYmxvY2sgPSBBcnJheS5pc0FycmF5KHN0YXRlbWVudC5zdGF0ZW1lbnRzKVxuICAgICAgICA/IGB7JHtzdGF0ZW1lbnRzVG9TdHJpbmcoc3RhdGVtZW50LnN0YXRlbWVudHMpfX1gXG4gICAgICAgIDogc3RhdGVtZW50LmJsb2NrO1xuICAgICAgcmV0dXJuIGAke3N0YXRlbWVudC5zZWxlY3Rvcn0gJHtibG9ja31gO1xuICAgIH0pXG4gICAgLmpvaW4oJ1xcbicpO1xufVxuIl19