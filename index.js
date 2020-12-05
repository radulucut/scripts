class ScriptStore {
  constructor() {
    this.store = {};
  }

  load(url) {
    let scriptState = this.store[url];

    if (scriptState) {
      if (typeof scriptState === 'boolean') {
        return new Promise((resolve, reject) => resolve());
      }

      return scriptState;
    }

    scriptState = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = () => {
        this.store[url] = true;

        resolve();
      }
      script.onerror = (error) => {
        this.store[url] = false;

        reject(error);
      }

      document.getElementsByTagName('head')[0].appendChild(script);
    });

    this.store[url] = scriptState;

    return scriptState;
  }

  isLoaded(url) {
    return !!this.store[url];
  }
}

module.exports = ScriptStore;

