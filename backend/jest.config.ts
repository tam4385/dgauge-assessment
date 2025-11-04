// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"], // adjust if your code lives elsewhere
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  // you can map TS paths if you use "paths" in tsconfig
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    // add as needed
  },
};

export default config;
