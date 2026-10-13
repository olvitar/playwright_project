# Project rules

These rules describe patterns already present in this repository.

## Playwright tests

- Keep end-to-end tests under `tests/` and use Playwright Test's `test` and `expect` from `@playwright/test`.
- Define each scenario with `test(...)` and use the provided `page` fixture for browser actions.
- Navigate using the shared URL constants in `Common/URLs.js`.
- Await page navigation, locator actions, and assertions.
- Follow the locator style already used by the test being changed. The suite contains both accessible Playwright locators (such as `getByRole` and `getByLabel`) and XPath locators; do not convert unrelated tests as part of a focused change.
- Use `expect` for visible UI outcomes and other test assertions.
- Use existing shared helpers for recurring behavior, such as `Common/ConsentPopup.js`, where the test already follows that pattern.

## Shared data and page objects

- Keep reusable test values in `Common/TestData.js`; credentials are read from environment variables there.
- Existing page objects are in `PageObjects/`. Follow a page object's current pattern when extending it: store locators on the class and expose async methods for repeated interactions or assertions.
- Keep site URLs in `Common/URLs.js` rather than duplicating them in tests.

## Project commands and configuration

- Run the configured test command with `npm test`; it invokes `playwright test --headed`.
- Playwright is configured in `playwright.config.js`, with tests in `tests/` and Chromium as the enabled project.
- Environment values are loaded through dotenv in `playwright.config.js`, using `.env` by default or `.env.<TEST_ENV>` when `TEST_ENV` is set. Keep credentials and other secrets in environment files, not source code.
- Preserve the current project dependencies and test configuration unless the requested change specifically requires modifying them.

## Existing style

- The repository contains both CommonJS and ES module imports, and formatting varies between test files. Preserve the conventions of the file being edited instead of applying broad style or module-format changes.
