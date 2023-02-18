module.exports = {
  testEnviroment: "jsdom",
  testPathIgnorePatterns: ["/node_modules", "/.next/", "/.vscode/"],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.tsx", "!src/**/*.spec.tsx"],
  coverageReporters: ["json", "lcov"],
};