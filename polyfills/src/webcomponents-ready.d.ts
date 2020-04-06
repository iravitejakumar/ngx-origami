declare global {
    interface Window {
        WebComponents: {
            ready: boolean;
        };
    }
}
/**
 * Returns a Promise that resolves when webcomponent polyfills are ready. If
 * this function is used *without* polyfills loaded, it will never resolve.
 *
 * @returns a Promise that resolves when webcomponents are ready
 */
export declare function webcomponentsReady(): Promise<void>;
/**
 * Resets the `webcomponentsReady()` function. Should only be used in testing.
 */
export declare function resetWebcomponentsReady(): void;
