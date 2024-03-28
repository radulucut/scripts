declare module "@radulucut/scripts" {
  /**
   * Load scripts dynamically.
   *
   * @example
   * import Scripts from '@radlucut/scripts';
   *
   * const scripts = Scripts();
   *
   * scripts.Load('./script.js', () => {
   *   console.log('script loaded');
   * }, (error) => {
   *   console.error('Failed to load script', error);
   * });
   */
  function Scripts(): {
    /**
     * Load a script dynamically. If the script is already loaded, the onload function will be called immediately.
     * @param {string} url - url of the script
     * @param {function} [onload] - function to run when the script is loaded
     * @param {function} [onerror] - function to run when the script failed to load
     * @returns {void}
     * @example
     * import Scripts from '@radlucut/scripts';
     *
     * const scripts = Scripts();
     *
     * scripts.Load('./script.js', () => {
     *   console.log('script loaded');
     * }, (error) => {
     *   console.error('Failed to load script', error);
     * });
     *
     * scripts.Load('https://code.jquery.com/jquery-3.5.1.min.js', () => {
     *   console.log('jQuery loaded');
     * }, (error) => {
     *   console.error('Failed to load jQuery', error);
     * });
     */
    Load(
      url: string,
      onload?: () => void,
      onerror?: (error: Error) => void
    ): void;

    /**
     * Check if a script is loaded
     * @param {string} url - url of the script
     * @returns {boolean}
     */
    IsLoaded(url: string): boolean;
  };

  export = Scripts;
}
