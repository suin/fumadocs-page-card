import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "bun:test" {
  interface Matchers<T> extends TestingLibraryMatchers<T, void> {}
  interface AsymmetricMatchers extends TestingLibraryMatchers<unknown, void> {}
}
