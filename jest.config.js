module.exports = {
  moduleDirectories: [
    "node_modules"
  ],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/tests/styleMock.js',
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.(ts|js)x?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.json"
    }
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$"
  ],
  testEnvironment: 'jsdom',
}
