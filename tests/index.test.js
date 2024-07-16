const { describe, it, mock } = require("node:test");
const assert = require("node:assert");

const Scripts = require("../index");

describe("Scripts", () => {
  describe("Load", () => {
    it("should load a script", (_, done) => {
      const url = "https://code.jquery.com/jquery-3.5.1.min.js";
      const documentMock = getDocumentMock();
      const scripts = Scripts(documentMock);
      scripts.Load(url, () => {
        assert.strictEqual(scripts.IsLoaded(url), true);
        assert.strictEqual(documentMock.createElement.mock.calls.length, 1);
        assert.strictEqual(documentMock.getElementsByTagName.mock.calls.length, 1);
        done();
      }, () => {
        assert.fail("Failed to load script");
      });
      scripts.Load(url, () => {
        assert.strictEqual(scripts.IsLoaded(url), true);
        assert.strictEqual(documentMock.createElement.mock.calls.length, 1);
        assert.strictEqual(documentMock.getElementsByTagName.mock.calls.length, 1);
      }, () => {
        assert.fail("Failed to load script");
      });
    });

    it("should load multiple scripts", (_, done) => {
      const url1 = "https://code.jquery.com/jquery-3.5.1.min.js";
      const documentMock = getDocumentMock();
      const scripts = Scripts(documentMock);
      scripts.Load(url1, () => {
        assert.strictEqual(scripts.IsLoaded(url1), true);
        assert.strictEqual(documentMock.createElement.mock.calls.length, 2);
        assert.strictEqual(documentMock.getElementsByTagName.mock.calls.length, 2);
      }, () => {
        assert.fail("Failed to load script");
      });
      const url2 = "./script.js";
      scripts.Load(url2, () => {
        assert.strictEqual(scripts.IsLoaded(url2), true);
        assert.strictEqual(documentMock.createElement.mock.calls.length, 2);
        assert.strictEqual(documentMock.getElementsByTagName.mock.calls.length, 2);
        done();
      }, (error) => {
        assert.fail("Failed to load script");
      });
    });

    it("should fail to load a script", (_, done) => {
      const url = "https://code.jquery.com/jquery-3.5.1.min.js";
      const documentMock = getDocumentMock(new Event("error"));
      const scripts = Scripts(documentMock);
      scripts.Load(url, () => {
        assert.fail("Script should not be loaded");
      }, (event) => {
        assert.strictEqual(event.type, "error");
        assert.strictEqual(documentMock.createElement.mock.calls.length, 1);
        assert.strictEqual(documentMock.getElementsByTagName.mock.calls.length, 1);
        done();
      });
      scripts.Load(url, () => {
        assert.fail("Script should not be loaded");
      }, (event) => {
        assert.strictEqual(event.type, "error");
        assert.strictEqual(documentMock.createElement.mock.calls.length, 1);
        assert.strictEqual(documentMock.getElementsByTagName.mock.calls.length, 1);
      });
    });
  });

  describe("IsLoaded", () => {
    it("should return false if script is not loaded", () => {
      const documentMock = getDocumentMock();
      const scripts = Scripts(documentMock);
      assert.strictEqual(scripts.IsLoaded("https://code.jquery.com/jquery-3.5.1.min.js"), false);
    });
  });
});

function getDocumentMock(errorEvent) {
  return {
    createElement: mock.fn(() => {
      const script = {
        type: "",
        src: "",
        onload: () => { },
        onerror: () => { },
      };
      setTimeout(() => {
        if (errorEvent) {
          script.onerror(errorEvent);
          return;
        }
        script.onload();
      }, 10);
      return script;
    }),
    getElementsByTagName: mock.fn(() => {
      return [
        {
          appendChild: () => { },
        },
      ];
    }),
  };
}

