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
function Scripts() {
  const _store = {};

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
  function Load(url, onload, onerror) {
    let state = _store[url];
    // script is already loaded
    if (state === true) {
      if (onload) {
        onload();
      }
      return
    }
    // script is loaded but failed
    if (state === false) {
      if (onerror) {
        onerror();
      }
      return;
    }
    if (state) {
      if (onload) {
        state[0].push(onload);
      }
      if (onerror) {
        state[1].push(onerror);
      }
      return;
    }
    state = [[], []];
    if (onload) {
      state[0].push(onload);
    }
    if (onerror) {
      state[1].push(onerror);
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = () => {
      const state = _store[url];
      _store[url] = true;
      // run all onload functions
      for (let i = 0; i < state[0].length; i++) {
        state[0][i]();
      }
    }
    script.onerror = (error) => {
      const state = _store[url];
      _store[url] = false;
      // run all onerror functions
      for (let i = 0; i < state[1].length; i++) {
        state[1][i](error);
      }
    }
    document.getElementsByTagName('head')[0].appendChild(script);
    _store[url] = state;
  }

  /**
   * Check if a script is loaded
   * @param {string} url - url of the script
   * @returns {boolean}
   */
  function IsLoaded(url) {
    return _store[url] === true;
  }

  return {
    Load,
    IsLoaded,
  }
}

module.exports = Scripts;

