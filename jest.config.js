module.exports = {
  moduleDirectories: [
    "node_modules"
  ],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "\\.tsx?$": "ts-jest",
    "^.+\\.ts?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.json"
    }
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$"
  ],
}
