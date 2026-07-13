# Manual Test Cases

Automated coverage (`npm test`) verifies logic in isolation. It cannot confirm
the Electron app actually renders, or that a real browser round-trips OAuth
correctly. Run this checklist by hand after any change that touches auth,
IPC, or the core test-generation UI — especially before a release.

Setup: `.env` populated per [README-dev.md](README-dev.md), then `npm run dev`.

## 1. App boots

- [ ] `npm run dev` produces no red text in the terminal (backend log should
      show `TEST Server listening on port: 3001` and
      `Connected to Mongo DB Successfully`).
- [ ] The Electron window opens and shows the "CHOOSE A TEST" screen with the
      framework cards (React, Redux, Vue, etc.), not a blank/white window.
- [ ] Open the DevTools console (uncomment the line noted in README-dev.md,
      or Cmd+Option+I) — no red errors on load.

## 2. Signup / login (username + password)

- [ ] From the login screen, sign up with a new username/password.
- [ ] Expect success and to land in the logged-in app state.
- [ ] Log out, then log back in with the same credentials — should succeed.
- [ ] Try logging in with a wrong password — should show an error, not a
      silent failure or a crash.
- [ ] Try signing up with a username that already exists — should show
      "Username already exists, please choose another one," not a generic
      error or a hang.

## 3. GitHub / Google OAuth

- [ ] Click "Login with GitHub." A new window should open to GitHub's
      real authorization page (not an error page).
- [ ] Approve access. The window should close and the app should show you
      as logged in.
- [ ] Repeat for "Login with Google."
- [ ] If you deliberately deny/cancel authorization partway through, the app
      should return to the login screen without crashing.

## 4. Opening a project folder

- [ ] Click "Open Folder" and pick a real local repo (or this Spearmint repo
      itself).
- [ ] The file tree should populate in the left panel.
- [ ] Expand/collapse a few folders — should toggle without lag or console
      errors.
- [ ] Click into a file — its contents should appear in the editor pane.

## 5. Generating a test (React)

- [ ] From "CHOOSE A TEST," pick **React**.
- [ ] Add a describe block, an `it` block, a render statement (with a
      component path from the folder you opened), an action, and an
      assertion.
- [ ] Confirm the generated code in the Code Editor pane updates live as you
      add each statement, and looks like valid Jest/RTL syntax.
- [ ] Export the test file and confirm it's written to disk at the path you
      chose.
- [ ] Switch the **Test Framework** dropdown to **Cypress** and confirm the
      generated code changes to `cy.`-style syntax instead of Jest's.

## 6. Terminal

- [ ] Open the embedded terminal tab.
- [ ] Run a trivial command (`ls`, `pwd`) and confirm output appears.
- [ ] Run `npm test` for the folder you opened (if it has tests) and confirm
      output streams in rather than appearing all at once at the end.

## 7. Security tab

- [ ] Open the Security tab.
- [ ] Click "Authenticate Snyk" — should switch to the terminal tab and send
      `snyk auth` (this will open a browser tab to Snyk if you have the CLI
      installed; if not, expect a command-not-found in the terminal, not an
      app crash).
- [ ] Note: "Test Dependencies," "Fix Dependencies," and "Test Application"
      currently all trigger the same handler as "Authenticate Snyk" — this is
      a known, pre-existing bug (copy-paste `onClick` handlers), not
      something to "test passing," just confirm it doesn't crash the app.

## 8. Logout / session

- [ ] Log out. Confirm you're returned to the login screen.
- [ ] Re-open the app (or reload) — confirm you are *not* still logged in
      (the session cookie should have been cleared, not just the in-memory
      state).
