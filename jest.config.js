/**
 * @author winjolu
 */
module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__tests__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)':'<rootDir>/src/__tests__/styleMock.js',
  },
  "collectCoverage": true,
  "collectCoverageFrom": [
    "./src/components/**",
    "./src/context/**",
    "./src/pages/**",
    "./src/components/**",
    "./src/utils/**",
    "./src/**",
    "./public/**",
    "./server/**",
    "!**/*.json"
  ],
  "roots": [
      "./src/__tests__",
      "./src",
      "./public",
      "./server",
    ],
  /**
   * styleMock.js is a mock module, not a test, and gets picked up as an
   * (empty, failing) test suite otherwise. spec.e2e.js and spec.integra.js
   * are Spectron/ChromeDriver E2E tests that need a real Electron/Chrome
   * browser session — not viable in a standard CI runner, and already
   * effectively disabled upstream (spec.e2e.js's own describe block is
   * wrapped in xdescribe). wdio.conf.js is a WebdriverIO config (ESM,
   * uses import.meta.url), not a test. Excluded from collection rather
   * than deleted.
   * @author winjolu
   */
  "testPathIgnorePatterns": [
    "/node_modules/",
    "<rootDir>/src/__tests__/styleMock.js",
    "<rootDir>/src/__tests__/spec.e2e.js",
    "<rootDir>/src/__tests__/spec.integra.js",
    "<rootDir>/src/__tests__/wdio.conf.js",
  ],
}
