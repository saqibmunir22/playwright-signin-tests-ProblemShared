# Sauce Labs Sign-In Automation

Playwright + TypeScript test suite covering the Sign-In scenarios for https://www.saucedemo.com.

## Setup

You need Node.js 18+ installed. Then:

```bash
npm install
npx playwright install --with-deps
```

The second command downloads the browser binaries Playwright needs. It pulls Chromium and Firefox based on the config.

## Running the tests

```bash
# headless, all browsers
npm test

# headed (useful for watching what's happening)
npm run test:headed

# open the HTML report after a run
npm run test:report
```

To run a single browser only:

```bash
npx playwright test --project=chromium
```

## Project structure

```
├── pages/
│   ├── LoginPage.ts       # Page Object for the login screen
│   └── InventoryPage.ts   # Page Object for the post-login inventory page
├── tests/
│   └── login.spec.ts      # The three Sign-In test scenarios
├── utils/
│   └── testData.ts        # Credentials and expected error strings
├── playwright.config.ts
└── tsconfig.json
```

## Decisions I made and why

**Page Object Model** — I split the UI interactions into `LoginPage` and `InventoryPage`. Even for three tests this pays off quickly; if Sauce Labs ever changes a selector I fix it in one place. I kept the POs thin — they hold locators and actions, not assertions, except for the two `expect*` helper methods which felt natural to keep close to the page they relate to.

**`data-test` attributes for selectors** — Sauce Labs ships with `data-test` attributes on the key elements. Using those is the right call over CSS classes or XPath; they're stable and clearly intended for automation.

**Test data in one file** — Credentials and expected error strings live in `utils/testData.ts`. Hardcoding strings in test bodies is a maintenance headache I've been burned by before, so I centralise them early even on a small project.

**Two browsers in CI config** — I included Chromium and Firefox in `playwright.config.ts`. It adds maybe 30 seconds to a run and has caught real cross-browser issues for me in the past. Safari/WebKit is excluded here because it needs additional system dependencies that aren't always available; easy to add back.

**Retries set to 1** — One retry on failure catches the occasional network flake without masking real bugs. I wouldn't go higher than that.

**No test fixtures beyond `beforeEach`** — The setup is simple enough that a `beforeEach` block is readable and obvious. I'd introduce a custom fixture if the project grew and I found myself repeating the same setup across multiple spec files.

## What I'd do with more time

- Add a `.env` file (via `dotenv`) and read credentials from environment variables rather than a committed file. Fine for a demo app, not fine for anything real.
- Cover the remaining error cases: empty username, empty password, both empty. The error messages are slightly different for each and worth asserting.
- Add API-level teardown if tests ever create state (e.g. orders) — right now there's nothing to clean up.
- Wire it into a GitHub Actions workflow so every PR gets a test run automatically. The Playwright Docker image makes that straightforward.
- Look at visual regression testing with `expect(page).toHaveScreenshot()` for the login page — useful for catching unintended UI changes.
