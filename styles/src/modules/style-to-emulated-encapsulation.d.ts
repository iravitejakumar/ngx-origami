/**
 * Regex to find and replace `:host-context()` selectors.
 */
export declare const HOST_CONTEXT_REGEX: RegExp;
/**
 * Regex to find and replace `:host` selectors.
 */
export declare const HOST_REGEX: RegExp;
export declare const COMPONENT_VARIABLE = "%COMP%";
export declare const HOST_ATTR: string;
export declare const CONTENT_ATTR: string;
/**
 * Converts the provided CSS string to an Angular emulated encapsulation string
 * for the given component id.
 *
 * @param style the CSS string to convert
 * @returns a CSS string that emulates encapsulation for the given component id
 */
export declare function styleToEmulatedEncapsulation(style: string): string;
/**
 * Represents a single CSS statement.
 */
export interface StyleStatement {
    /**
     * The selector of the statement.
     */
    selector: string;
    /**
     * The body block of the statement.
     */
    block: string;
    /**
     * The body block statements. This is used for at-rule selectors such as
     * `@media {}`
     */
    statements?: StyleStatement[];
}
/**
 * Parses a CSS string into an array of statements.
 *
 * @param style the CSS string to parse
 * @returns an array of CSS statements
 */
export declare function parseStyleStatements(style: string): StyleStatement[];
/**
 * Converts an array of statements back into a single CSS string.
 *
 * @param statements the statements to convert
 * @returns a CSS string
 */
export declare function statementsToString(statements: StyleStatement[]): string;
