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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtdG8tZW11bGF0ZWQtZW5jYXBzdWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjb2RlYmFrZXJ5L29yaWdhbWkvc3R5bGVzLyIsInNvdXJjZXMiOlsic3JjL21vZHVsZXMvc3R5bGUtdG8tZW11bGF0ZWQtZW5jYXBzdWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE1BQU0sQ0FBQyxJQUFNLGtCQUFrQixHQUFHLHdCQUF3QixDQUFDO0FBQzNEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLHFCQUFxQixDQUFDO0FBRWhELGlDQUFpQztBQUNqQyxNQUFNLENBQUMsSUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUM7QUFDM0MsTUFBTSxDQUFDLElBQU0sU0FBUyxHQUFHLGFBQVcsa0JBQW9CLENBQUM7QUFDekQsTUFBTSxDQUFDLElBQU0sWUFBWSxHQUFHLGdCQUFjLGtCQUFvQixDQUFDO0FBRS9EOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxLQUFhO0lBQ3hELElBQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLFNBQVMsWUFBWSxDQUFDLFNBQXlCO1FBQzdDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQztTQUM5RDthQUFNO1lBQ0MsSUFBQSw2QkFBUSxDQUFlO1lBQzdCLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0IsUUFBUSxHQUFHLFFBQVE7aUJBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsR0FBRyxDQUFDLFVBQUEsV0FBVztnQkFDZCxPQUFPLFdBQVc7cUJBQ2YsSUFB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Q0FBQyxHQUFHLENBQUMsQ0FDeEMsQ0FDRixDQUFDO2FBQ0g7WUFFRCxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdELGdCQUFnQixDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkQsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2xDLGdCQUFnQixHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDL0MsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUN0QjthQUFNO1lBQ0wsZ0JBQWdCLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztTQUNuQztLQUNGO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFVBQTRCO0lBQzdELE9BQU8sVUFBVTtTQUNkLEdBQUcsQ0FBQyxVQUFBLFNBQVM7UUFDWixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7WUFDL0MsQ0FBQyxDQUFDLE1BQUksa0JBQWtCLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFHO1lBQ2pELENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE9BQVUsU0FBUyxDQUFDLFFBQVEsU0FBSSxLQUFPLENBQUM7SUFDMUMsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJlZ2V4IHRvIGZpbmQgYW5kIHJlcGxhY2UgYDpob3N0LWNvbnRleHQoKWAgc2VsZWN0b3JzLlxuICovXG5leHBvcnQgY29uc3QgSE9TVF9DT05URVhUX1JFR0VYID0gLzpob3N0LWNvbnRleHRcXCgoLiopXFwpL2c7XG4vKipcbiAqIFJlZ2V4IHRvIGZpbmQgYW5kIHJlcGxhY2UgYDpob3N0YCBzZWxlY3RvcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBIT1NUX1JFR0VYID0gLzpob3N0KD86XFwoKC4qKVxcKSk/L2c7XG5cbi8vIGZyb20gQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclxuZXhwb3J0IGNvbnN0IENPTVBPTkVOVF9WQVJJQUJMRSA9ICclQ09NUCUnO1xuZXhwb3J0IGNvbnN0IEhPU1RfQVRUUiA9IGBfbmdob3N0LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9BVFRSID0gYF9uZ2NvbnRlbnQtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgcHJvdmlkZWQgQ1NTIHN0cmluZyB0byBhbiBBbmd1bGFyIGVtdWxhdGVkIGVuY2Fwc3VsYXRpb24gc3RyaW5nXG4gKiBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudCBpZC5cbiAqXG4gKiBAcGFyYW0gc3R5bGUgdGhlIENTUyBzdHJpbmcgdG8gY29udmVydFxuICogQHJldHVybnMgYSBDU1Mgc3RyaW5nIHRoYXQgZW11bGF0ZXMgZW5jYXBzdWxhdGlvbiBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudCBpZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVUb0VtdWxhdGVkRW5jYXBzdWxhdGlvbihzdHlsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3Qgc3RhdGVtZW50cyA9IHBhcnNlU3R5bGVTdGF0ZW1lbnRzKHN0eWxlKTtcbiAgZnVuY3Rpb24gYWRkRW11bGF0aW9uKHN0YXRlbWVudDogU3R5bGVTdGF0ZW1lbnQpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdGF0ZW1lbnQuc3RhdGVtZW50cykpIHtcbiAgICAgIHN0YXRlbWVudC5zdGF0ZW1lbnRzLmZvckVhY2gobmVzdGVkID0+IGFkZEVtdWxhdGlvbihuZXN0ZWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHsgc2VsZWN0b3IgfSA9IHN0YXRlbWVudDtcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IudHJpbSgpO1xuICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvclxuICAgICAgICAuc3BsaXQoJywnKVxuICAgICAgICAubWFwKHN1YlNlbGVjdG9yID0+IHtcbiAgICAgICAgICByZXR1cm4gc3ViU2VsZWN0b3JcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgICAubWFwKHBhcnQgPT4ge1xuICAgICAgICAgICAgICBwYXJ0ID0gcGFydC50cmltKCk7XG4gICAgICAgICAgICAgIGlmIChwYXJ0LmluY2x1ZGVzKCc6aG9zdCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3BhcnR9WyR7Q09OVEVOVF9BVFRSfV1gO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJyAnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oJywnKTtcblxuICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5yZXBsYWNlKEhPU1RfQ09OVEVYVF9SRUdFWCwgYCokMSBbJHtIT1NUX0FUVFJ9XWApO1xuICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5yZXBsYWNlKEhPU1RfUkVHRVgsIGBbJHtIT1NUX0FUVFJ9XSQxYCk7XG4gICAgICBzdGF0ZW1lbnQuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICB9XG4gIH1cblxuICBzdGF0ZW1lbnRzLmZvckVhY2goc3RhdGVtZW50ID0+IHtcbiAgICBhZGRFbXVsYXRpb24oc3RhdGVtZW50KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHN0YXRlbWVudHNUb1N0cmluZyhzdGF0ZW1lbnRzKTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2luZ2xlIENTUyBzdGF0ZW1lbnQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3R5bGVTdGF0ZW1lbnQge1xuICAvKipcbiAgICogVGhlIHNlbGVjdG9yIG9mIHRoZSBzdGF0ZW1lbnQuXG4gICAqL1xuICBzZWxlY3Rvcjogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGJvZHkgYmxvY2sgb2YgdGhlIHN0YXRlbWVudC5cbiAgICovXG4gIGJsb2NrOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgYm9keSBibG9jayBzdGF0ZW1lbnRzLiBUaGlzIGlzIHVzZWQgZm9yIGF0LXJ1bGUgc2VsZWN0b3JzIHN1Y2ggYXNcbiAgICogYEBtZWRpYSB7fWBcbiAgICovXG4gIHN0YXRlbWVudHM/OiBTdHlsZVN0YXRlbWVudFtdO1xufVxuXG4vKipcbiAqIFBhcnNlcyBhIENTUyBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBzdGF0ZW1lbnRzLlxuICpcbiAqIEBwYXJhbSBzdHlsZSB0aGUgQ1NTIHN0cmluZyB0byBwYXJzZVxuICogQHJldHVybnMgYW4gYXJyYXkgb2YgQ1NTIHN0YXRlbWVudHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3R5bGVTdGF0ZW1lbnRzKHN0eWxlOiBzdHJpbmcpOiBTdHlsZVN0YXRlbWVudFtdIHtcbiAgbGV0IGluQXRSdWxlID0gZmFsc2U7XG4gIGxldCBpblNpbmdsZVF1b3RlID0gZmFsc2U7XG4gIGxldCBpbkRvdWJsZVF1b3RlID0gZmFsc2U7XG4gIGxldCBpbkJsb2NrID0gMDtcbiAgbGV0IGxlYXZpbmdCbG9jayA9IGZhbHNlO1xuXG4gIGNvbnN0IHN0YXRlbWVudHM6IFN0eWxlU3RhdGVtZW50W10gPSBbXTtcbiAgbGV0IGN1cnJlbnRTdGF0ZW1lbnQ6IFN0eWxlU3RhdGVtZW50ID0ge1xuICAgIHNlbGVjdG9yOiAnJyxcbiAgICBibG9jazogJydcbiAgfTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhciA9IHN0eWxlW2ldO1xuICAgIHN3aXRjaCAoY2hhcikge1xuICAgICAgY2FzZSAnQCc6XG4gICAgICAgIGluQXRSdWxlID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiJ1wiOlxuICAgICAgICBpblNpbmdsZVF1b3RlID0gIWluU2luZ2xlUXVvdGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnXCInOlxuICAgICAgICBpbkRvdWJsZVF1b3RlID0gIWluRG91YmxlUXVvdGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAneyc6XG4gICAgICBjYXNlICd9JzpcbiAgICAgICAgaWYgKCFpblNpbmdsZVF1b3RlICYmICFpbkRvdWJsZVF1b3RlKSB7XG4gICAgICAgICAgaWYgKGNoYXIgPT0gJ3snKSB7XG4gICAgICAgICAgICBpbkJsb2NrKys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluQmxvY2stLTtcbiAgICAgICAgICAgIGxlYXZpbmdCbG9jayA9IGluQmxvY2sgPT09IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGluQmxvY2spIHtcbiAgICAgIGN1cnJlbnRTdGF0ZW1lbnQuYmxvY2sgKz0gY2hhcjtcbiAgICB9IGVsc2UgaWYgKGxlYXZpbmdCbG9jaykge1xuICAgICAgY3VycmVudFN0YXRlbWVudC5ibG9jayArPSBjaGFyO1xuICAgICAgaWYgKGluQXRSdWxlKSB7XG4gICAgICAgIGN1cnJlbnRTdGF0ZW1lbnQuc3RhdGVtZW50cyA9IHBhcnNlU3R5bGVTdGF0ZW1lbnRzKFxuICAgICAgICAgIGN1cnJlbnRTdGF0ZW1lbnQuYmxvY2suc3Vic3RyaW5nKFxuICAgICAgICAgICAgY3VycmVudFN0YXRlbWVudC5ibG9jay5pbmRleE9mKCd7JykgKyAxLFxuICAgICAgICAgICAgY3VycmVudFN0YXRlbWVudC5ibG9jay5sYXN0SW5kZXhPZignfScpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50U3RhdGVtZW50LnNlbGVjdG9yID0gY3VycmVudFN0YXRlbWVudC5zZWxlY3Rvci50cmltKCk7XG4gICAgICBjdXJyZW50U3RhdGVtZW50LmJsb2NrID0gY3VycmVudFN0YXRlbWVudC5ibG9jay50cmltKCk7XG4gICAgICBzdGF0ZW1lbnRzLnB1c2goY3VycmVudFN0YXRlbWVudCk7XG4gICAgICBjdXJyZW50U3RhdGVtZW50ID0geyBzZWxlY3RvcjogJycsIGJsb2NrOiAnJyB9O1xuICAgICAgbGVhdmluZ0Jsb2NrID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnRTdGF0ZW1lbnQuc2VsZWN0b3IgKz0gY2hhcjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RhdGVtZW50cztcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhcnJheSBvZiBzdGF0ZW1lbnRzIGJhY2sgaW50byBhIHNpbmdsZSBDU1Mgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSBzdGF0ZW1lbnRzIHRoZSBzdGF0ZW1lbnRzIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIGEgQ1NTIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhdGVtZW50c1RvU3RyaW5nKHN0YXRlbWVudHM6IFN0eWxlU3RhdGVtZW50W10pOiBzdHJpbmcge1xuICByZXR1cm4gc3RhdGVtZW50c1xuICAgIC5tYXAoc3RhdGVtZW50ID0+IHtcbiAgICAgIGNvbnN0IGJsb2NrID0gQXJyYXkuaXNBcnJheShzdGF0ZW1lbnQuc3RhdGVtZW50cylcbiAgICAgICAgPyBgeyR7c3RhdGVtZW50c1RvU3RyaW5nKHN0YXRlbWVudC5zdGF0ZW1lbnRzKX19YFxuICAgICAgICA6IHN0YXRlbWVudC5ibG9jaztcbiAgICAgIHJldHVybiBgJHtzdGF0ZW1lbnQuc2VsZWN0b3J9ICR7YmxvY2t9YDtcbiAgICB9KVxuICAgIC5qb2luKCdcXG4nKTtcbn1cbiJdfQ==