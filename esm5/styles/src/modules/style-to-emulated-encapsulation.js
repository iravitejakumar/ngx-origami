/**
 * Regex to find and replace `:host-context()` selectors.
 */
export var HOST_CONTEXT_REGEX = /:host-context\((.*)\)/g;
/**
 * Regex to find and replace `:host` selectors.
 */
export var HOST_REGEX = /:host(?:\((.*)\))?/g;
// from @angular/platform-browser
export var COMPONENT_VARIABLE = '%COMP%';
export var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
export var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
/**
 * Converts the provided CSS string to an Angular emulated encapsulation string
 * for the given component id.
 *
 * @param style the CSS string to convert
 * @returns a CSS string that emulates encapsulation for the given component id
 */
export function styleToEmulatedEncapsulation(style) {
    var statements = parseStyleStatements(style);
    function addEmulation(statement) {
        if (Array.isArray(statement.statements)) {
            statement.statements.forEach(function (nested) { return addEmulation(nested); });
        }
        else {
            var selector = statement.selector;
            selector = selector.trim();
            selector = selector
                .split(',')
                .map(function (subSelector) {
                return subSelector
                    .trim()
                    .split(' ')
                    .map(function (part) {
                    part = part.trim();
                    if (part.includes(':host')) {
                        return part;
                    }
                    else {
                        return part + "[" + CONTENT_ATTR + "]";
                    }
                })
                    .join(' ');
            })
                .join(',');
            selector = selector.replace(HOST_CONTEXT_REGEX, "*$1 [" + HOST_ATTR + "]");
            selector = selector.replace(HOST_REGEX, "[" + HOST_ATTR + "]$1");
            statement.selector = selector;
        }
    }
    statements.forEach(function (statement) {
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
    var inAtRule = false;
    var inSingleQuote = false;
    var inDoubleQuote = false;
    var inBlock = 0;
    var leavingBlock = false;
    var statements = [];
    var currentStatement = {
        selector: '',
        block: ''
    };
    for (var i = 0; i < style.length; i++) {
        var char = style[i];
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
        .map(function (statement) {
        var block = Array.isArray(statement.statements)
            ? "{" + statementsToString(statement.statements) + "}"
            : statement.block;
        return statement.selector + " " + block;
    })
        .join('\n');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtdG8tZW11bGF0ZWQtZW5jYXBzdWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcmlnYW1pL3N0eWxlcy8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL3N0eWxlLXRvLWVtdWxhdGVkLWVuY2Fwc3VsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxrQkFBa0IsR0FBRyx3QkFBd0IsQ0FBQztBQUMzRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztBQUVoRCxpQ0FBaUM7QUFDakMsTUFBTSxDQUFDLElBQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDO0FBQzNDLE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBRyxhQUFXLGtCQUFvQixDQUFDO0FBQ3pELE1BQU0sQ0FBQyxJQUFNLFlBQVksR0FBRyxnQkFBYyxrQkFBb0IsQ0FBQztBQUUvRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsS0FBYTtJQUN4RCxJQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxTQUFTLFlBQVksQ0FBQyxTQUF5QjtRQUM3QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUM7U0FDOUQ7YUFBTTtZQUNDLElBQUEsNkJBQVEsQ0FBZTtZQUM3QixRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNCLFFBQVEsR0FBRyxRQUFRO2lCQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLEdBQUcsQ0FBQyxVQUFBLFdBQVc7Z0JBQ2QsT0FBTyxXQUFXO3FCQUNmLElBQUksRUFBRTtx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RyxDQUFDLENBQ3hDLENBQ0YsQ0FBQzthQUNIO1lBRUQsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3RCxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZELFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNsQyxnQkFBZ0IsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQy9DLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDdEI7YUFBTTtZQUNMLGdCQUFnQixDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7U0FDbkM7S0FDRjtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxVQUE0QjtJQUM3RCxPQUFPLFVBQVU7U0FDZCxHQUFHLENBQUMsVUFBQSxTQUFTO1FBQ1osSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1lBQy9DLENBQUMsQ0FBQyxNQUFJLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBRztZQUNqRCxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUNwQixPQUFVLFNBQVMsQ0FBQyxRQUFRLFNBQUksS0FBTyxDQUFDO0lBQzFDLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZWdleCB0byBmaW5kIGFuZCByZXBsYWNlIGA6aG9zdC1jb250ZXh0KClgIHNlbGVjdG9ycy5cbiAqL1xuZXhwb3J0IGNvbnN0IEhPU1RfQ09OVEVYVF9SRUdFWCA9IC86aG9zdC1jb250ZXh0XFwoKC4qKVxcKS9nO1xuLyoqXG4gKiBSZWdleCB0byBmaW5kIGFuZCByZXBsYWNlIGA6aG9zdGAgc2VsZWN0b3JzLlxuICovXG5leHBvcnQgY29uc3QgSE9TVF9SRUdFWCA9IC86aG9zdCg/OlxcKCguKilcXCkpPy9nO1xuXG4vLyBmcm9tIEBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcbmV4cG9ydCBjb25zdCBDT01QT05FTlRfVkFSSUFCTEUgPSAnJUNPTVAlJztcbmV4cG9ydCBjb25zdCBIT1NUX0FUVFIgPSBgX25naG9zdC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQVRUUiA9IGBfbmdjb250ZW50LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5cbi8qKlxuICogQ29udmVydHMgdGhlIHByb3ZpZGVkIENTUyBzdHJpbmcgdG8gYW4gQW5ndWxhciBlbXVsYXRlZCBlbmNhcHN1bGF0aW9uIHN0cmluZ1xuICogZm9yIHRoZSBnaXZlbiBjb21wb25lbnQgaWQuXG4gKlxuICogQHBhcmFtIHN0eWxlIHRoZSBDU1Mgc3RyaW5nIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIGEgQ1NTIHN0cmluZyB0aGF0IGVtdWxhdGVzIGVuY2Fwc3VsYXRpb24gZm9yIHRoZSBnaXZlbiBjb21wb25lbnQgaWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlVG9FbXVsYXRlZEVuY2Fwc3VsYXRpb24oc3R5bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHN0YXRlbWVudHMgPSBwYXJzZVN0eWxlU3RhdGVtZW50cyhzdHlsZSk7XG4gIGZ1bmN0aW9uIGFkZEVtdWxhdGlvbihzdGF0ZW1lbnQ6IFN0eWxlU3RhdGVtZW50KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3RhdGVtZW50LnN0YXRlbWVudHMpKSB7XG4gICAgICBzdGF0ZW1lbnQuc3RhdGVtZW50cy5mb3JFYWNoKG5lc3RlZCA9PiBhZGRFbXVsYXRpb24obmVzdGVkKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB7IHNlbGVjdG9yIH0gPSBzdGF0ZW1lbnQ7XG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnRyaW0oKTtcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3JcbiAgICAgICAgLnNwbGl0KCcsJylcbiAgICAgICAgLm1hcChzdWJTZWxlY3RvciA9PiB7XG4gICAgICAgICAgcmV0dXJuIHN1YlNlbGVjdG9yXG4gICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAgICAgLm1hcChwYXJ0ID0+IHtcbiAgICAgICAgICAgICAgcGFydCA9IHBhcnQudHJpbSgpO1xuICAgICAgICAgICAgICBpZiAocGFydC5pbmNsdWRlcygnOmhvc3QnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJ0O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtwYXJ0fVske0NPTlRFTlRfQVRUUn1dYDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcgJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCcsJyk7XG5cbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZShIT1NUX0NPTlRFWFRfUkVHRVgsIGAqJDEgWyR7SE9TVF9BVFRSfV1gKTtcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZShIT1NUX1JFR0VYLCBgWyR7SE9TVF9BVFRSfV0kMWApO1xuICAgICAgc3RhdGVtZW50LnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgfVxuICB9XG5cbiAgc3RhdGVtZW50cy5mb3JFYWNoKHN0YXRlbWVudCA9PiB7XG4gICAgYWRkRW11bGF0aW9uKHN0YXRlbWVudCk7XG4gIH0pO1xuXG4gIHJldHVybiBzdGF0ZW1lbnRzVG9TdHJpbmcoc3RhdGVtZW50cyk7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNpbmdsZSBDU1Mgc3RhdGVtZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFN0eWxlU3RhdGVtZW50IHtcbiAgLyoqXG4gICAqIFRoZSBzZWxlY3RvciBvZiB0aGUgc3RhdGVtZW50LlxuICAgKi9cbiAgc2VsZWN0b3I6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBib2R5IGJsb2NrIG9mIHRoZSBzdGF0ZW1lbnQuXG4gICAqL1xuICBibG9jazogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGJvZHkgYmxvY2sgc3RhdGVtZW50cy4gVGhpcyBpcyB1c2VkIGZvciBhdC1ydWxlIHNlbGVjdG9ycyBzdWNoIGFzXG4gICAqIGBAbWVkaWEge31gXG4gICAqL1xuICBzdGF0ZW1lbnRzPzogU3R5bGVTdGF0ZW1lbnRbXTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgYSBDU1Mgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygc3RhdGVtZW50cy5cbiAqXG4gKiBAcGFyYW0gc3R5bGUgdGhlIENTUyBzdHJpbmcgdG8gcGFyc2VcbiAqIEByZXR1cm5zIGFuIGFycmF5IG9mIENTUyBzdGF0ZW1lbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0eWxlU3RhdGVtZW50cyhzdHlsZTogc3RyaW5nKTogU3R5bGVTdGF0ZW1lbnRbXSB7XG4gIGxldCBpbkF0UnVsZSA9IGZhbHNlO1xuICBsZXQgaW5TaW5nbGVRdW90ZSA9IGZhbHNlO1xuICBsZXQgaW5Eb3VibGVRdW90ZSA9IGZhbHNlO1xuICBsZXQgaW5CbG9jayA9IDA7XG4gIGxldCBsZWF2aW5nQmxvY2sgPSBmYWxzZTtcblxuICBjb25zdCBzdGF0ZW1lbnRzOiBTdHlsZVN0YXRlbWVudFtdID0gW107XG4gIGxldCBjdXJyZW50U3RhdGVtZW50OiBTdHlsZVN0YXRlbWVudCA9IHtcbiAgICBzZWxlY3RvcjogJycsXG4gICAgYmxvY2s6ICcnXG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXIgPSBzdHlsZVtpXTtcbiAgICBzd2l0Y2ggKGNoYXIpIHtcbiAgICAgIGNhc2UgJ0AnOlxuICAgICAgICBpbkF0UnVsZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIidcIjpcbiAgICAgICAgaW5TaW5nbGVRdW90ZSA9ICFpblNpbmdsZVF1b3RlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1wiJzpcbiAgICAgICAgaW5Eb3VibGVRdW90ZSA9ICFpbkRvdWJsZVF1b3RlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3snOlxuICAgICAgY2FzZSAnfSc6XG4gICAgICAgIGlmICghaW5TaW5nbGVRdW90ZSAmJiAhaW5Eb3VibGVRdW90ZSkge1xuICAgICAgICAgIGlmIChjaGFyID09ICd7Jykge1xuICAgICAgICAgICAgaW5CbG9jaysrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbkJsb2NrLS07XG4gICAgICAgICAgICBsZWF2aW5nQmxvY2sgPSBpbkJsb2NrID09PSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChpbkJsb2NrKSB7XG4gICAgICBjdXJyZW50U3RhdGVtZW50LmJsb2NrICs9IGNoYXI7XG4gICAgfSBlbHNlIGlmIChsZWF2aW5nQmxvY2spIHtcbiAgICAgIGN1cnJlbnRTdGF0ZW1lbnQuYmxvY2sgKz0gY2hhcjtcbiAgICAgIGlmIChpbkF0UnVsZSkge1xuICAgICAgICBjdXJyZW50U3RhdGVtZW50LnN0YXRlbWVudHMgPSBwYXJzZVN0eWxlU3RhdGVtZW50cyhcbiAgICAgICAgICBjdXJyZW50U3RhdGVtZW50LmJsb2NrLnN1YnN0cmluZyhcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZW1lbnQuYmxvY2suaW5kZXhPZigneycpICsgMSxcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZW1lbnQuYmxvY2subGFzdEluZGV4T2YoJ30nKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFN0YXRlbWVudC5zZWxlY3RvciA9IGN1cnJlbnRTdGF0ZW1lbnQuc2VsZWN0b3IudHJpbSgpO1xuICAgICAgY3VycmVudFN0YXRlbWVudC5ibG9jayA9IGN1cnJlbnRTdGF0ZW1lbnQuYmxvY2sudHJpbSgpO1xuICAgICAgc3RhdGVtZW50cy5wdXNoKGN1cnJlbnRTdGF0ZW1lbnQpO1xuICAgICAgY3VycmVudFN0YXRlbWVudCA9IHsgc2VsZWN0b3I6ICcnLCBibG9jazogJycgfTtcbiAgICAgIGxlYXZpbmdCbG9jayA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50U3RhdGVtZW50LnNlbGVjdG9yICs9IGNoYXI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0YXRlbWVudHM7XG59XG5cbi8qKlxuICogQ29udmVydHMgYW4gYXJyYXkgb2Ygc3RhdGVtZW50cyBiYWNrIGludG8gYSBzaW5nbGUgQ1NTIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gc3RhdGVtZW50cyB0aGUgc3RhdGVtZW50cyB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyBhIENTUyBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlbWVudHNUb1N0cmluZyhzdGF0ZW1lbnRzOiBTdHlsZVN0YXRlbWVudFtdKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0YXRlbWVudHNcbiAgICAubWFwKHN0YXRlbWVudCA9PiB7XG4gICAgICBjb25zdCBibG9jayA9IEFycmF5LmlzQXJyYXkoc3RhdGVtZW50LnN0YXRlbWVudHMpXG4gICAgICAgID8gYHske3N0YXRlbWVudHNUb1N0cmluZyhzdGF0ZW1lbnQuc3RhdGVtZW50cyl9fWBcbiAgICAgICAgOiBzdGF0ZW1lbnQuYmxvY2s7XG4gICAgICByZXR1cm4gYCR7c3RhdGVtZW50LnNlbGVjdG9yfSAke2Jsb2NrfWA7XG4gICAgfSlcbiAgICAuam9pbignXFxuJyk7XG59XG4iXX0=