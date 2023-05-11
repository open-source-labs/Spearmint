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
      "./__tests__",
      "./src",
      "./public",
      "./server",
    ],
}
