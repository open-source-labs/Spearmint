# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Bumped in-range patch/minor dependencies via `npm update` (no major versions — Electron, React, Express, Mongoose, etc. are unchanged; that's separate, larger follow-up work). Pinned the transitive `@types/node` dependency to `22.14.0` via an npm `overrides` entry: it isn't declared directly anywhere in this project, but floated to `26.1.1` after the update, and that version's `ffi.d.ts` uses syntax our pinned TypeScript (4.9.5) can't parse, producing 50 spurious typecheck errors entirely inside `node_modules`.
- Pinned `@uiw/react-codemirror` to `4.23.10` (was `^4.19.7`, floated to `4.25.11`), which broke the actual production frontend build — it fails to resolve `react/jsx-runtime` under the also-bumped webpack, even though that file genuinely exists. This was missed initially: the update had only been checked with `jest`/`lint`/`typecheck`, never a real `webpack` build, so the break went unnoticed until a build was actually run. Verified after both pins: production build compiles clean (0 errors), full test suite unchanged (339 passing, 0 failing), lint unchanged (0 errors), typecheck back to only the pre-existing frontend backlog (0 errors in `node_modules`).

### Security

- Removed hardcoded GitHub and Google OAuth client secrets from `server/config/passport.js` (live in source since 2022). Added `CredentialStore`, a single module all credential reads go through, loading from environment variables and failing fast with a named-variable error if one is missing. Added `.env.example` documenting every required variable.
- Stopped tracking `.env` in git — it was gitignored and committed at the same time.
- Closed a NoSQL operator-injection hole on `/login` and `/signup` (e.g. `{"username": {"$ne": null}}` payloads reaching Mongoose unvalidated). Added `InputSanitizer`, middleware that rejects any non-string username/password before it reaches a query.
- Replaced the session cookie — previously the user's raw MongoDB `_id`, with no cookie flags — with a cryptographically random 256-bit token via a new `SessionManager`, and added `httpOnly`, `secure`, and `sameSite` flags to the session cookie.
- Fixed the login/OAuth-callback routes setting the session cookie before the session token was actually created.
- Wired `cookieController.deleteCookie` into `/logout`, which previously ended the database session but never cleared the browser cookie.

### Fixed

- Fixed `/signup` and `/login` throwing `ReferenceError: username is not defined` on every request — the intended query values had been written inside a comment instead of as code, leaving a bare, undefined `username` reference. Present in the repo since at least 2022.
- Fixed `.eslintrc`, which referenced a typo'd config name and an ESLint plugin that was never installed — ESLint had never successfully run in this repo. Fixed the ~30 real lint errors it surfaced once working.
- Fixed `jest.config.js` silently collecting a mock file (`styleMock.js`) as a failing test suite.

- Fixed a crash-on-import bug in `Visit.tsx` (the Cypress "visit URL" step builder): `window.require('electron')` ran at module load time, which works inside the real Electron app but hard-crashed in any other context — including Jest, which took down two whole test suites (`TestFile.test.jsx`, `reactTestCase.test.js`) that couldn't even load. Now lazily loaded inside the click handler.
- Fixed `reactReducer.test.js`, whose `ADD_ACTION`/`ADD_ASSERTION`/`ADD_RENDER` expectations had gone stale after the Cypress work added new fields (`commandChain`, `selectorMethod`, `selectorValue`, `statementType`, `objectType`, `visits`) to those statement shapes — the tests were never updated to match.
- Fixed `jest.config.js` collecting `wdio.conf.js` (a WebdriverIO config, not a test) as a failing suite — same issue class as `styleMock.js`.

### Removed

- Removed `test/mochaTest.js`: not valid JavaScript (invalid import identifiers), depended on packages that were never installed, wasn't wired to any test runner, and duplicated coverage that already exists and passes in `reactTestCase.test.js`.
- Removed `useGenerateTest backup.jsx` (an unreferenced 1833-line backup file committed to source control) and `CypressTestCase.tsx` (unreferenced, unreachable from the UI).

### Changed

- Renamed `NOT_USED_Render.tsx` to `Render.tsx` — despite the name, it was actively imported by two files; just confusingly named mid-refactor.

### Added

- Added the first backend test coverage in this project's history: 26 tests across `CredentialStore`, `InputSanitizer`, and `SessionManager`.
- Added a GitHub Actions CI workflow: lint and test run (and block) on every pull request; typecheck runs and reports but doesn't yet block, pending a separate pass at the frontend's pre-existing type errors.

### Known issues (found, not fixed in this pass)

- `testStateController.js` (the "save test to your account" backend) has the same class of bug as the login `ReferenceError` fixed above — it writes `String`/`Object` constructors instead of the real request values. Its frontend (`UploadTest.ts`) is fully commented out and unreachable from the UI, so this is dead code rather than a live vulnerability. Left as-is; reviving this feature is out of scope for this pass.
