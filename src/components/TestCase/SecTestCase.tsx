import React, { useContext } from 'react';
import { setTabIndex } from '../../context/actions/globalActions';

import { GlobalContext } from '../../context/reducers/globalReducer';

import styles from './TestCase.module.scss';
import SecTestMenu from '../TestMenu/SecTestMenu';
import { Button } from '@mui/material';

const ipc = require('electron').ipcRenderer;
const os = require('os');

const SecTestCase = () => {
  interface Ref {
    isFileDirectoryOpen?: null | Boolean;
    theme?: string | null;
    // dispatchToGlobal?: Function;
  }

  const [{ isFileDirectoryOpen, theme }, dispatchToGlobal] =
    useContext(GlobalContext);

  // Change execute command based on os platform
  let execute = '\n';
  if (os.platform() === 'win32') {
    execute = '\r';
  }

  // sends user to webpage to authenticate use of snyk in terminal
  const snykAuth = () => {
    if (os.platform() === 'win32') {
      ipc.send(
        'terminal.toTerm',
        `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted ${execute}`
      );
    }
    ipc.send('terminal.toTerm', `snyk auth ${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };

  const dependencyTest = () => {
    ipc.send('terminal.toTerm', `snyk test ${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };

  const applicationTest = () => {
    ipc.send('terminal.toTerm', `snyk code test ${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };

  const snykWizard = () => {
    ipc.send('terminal.toTerm', `snyk wizard ${execute}`);
    dispatchToGlobal(setTabIndex(2));
  };

  // sends user to snyk settings in default browser to enable Snyk Code
  const enableSnykCode = () => {
    require('electron').shell.openExternal(
      'https://app.snyk.io/manage/snyk-code'
    );
  };

  return (
    <div>
      <div id="head">
        <h2 id={styles[`testName${theme}`]}>Security Testing</h2>
        <SecTestMenu />
      </div>
      <br />
      <br />
      <br />
      <br />
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        id={styles[`SecTestCase${theme}`]}
      >
        <div id={styles.secInfo}>
          <p>
            Spearmint leverages Snyk testing in order to evaluate security
            vulnerabilities.
            <br />
            The below button will send you to Snyk's website to grant
            permission.
          </p>
        </div>
        <br />
        <Button
          variant="contained"
          type="button"
          id={styles.secTestBtn}
          onClick={snykAuth}
        >
          Authenticate Snyk
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          type="button"
          id={styles.secTestBtn}
          onClick={snykAuth}
        >
          Test Dependencies
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          type="button"
          id={styles.secTestBtn}
          onClick={snykAuth}
        >
          Fix Dependencies
        </Button>
        <br />
        <br />
        <br />
        <br />
        <div id={styles.secInfo}>
          <p>
            To utilize Snyk's application-wide testing tool, Snyk Code must be
            enabled.
            <br />
            The below button will send you to Snyk's website to update your
            settings.
          </p>
        </div>
        <br />
        <Button
          variant="contained"
          type="button"
          id={styles.secTestBtn}
          onClick={enableSnykCode}
        >
          Enable Snyk Code
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          type="button"
          id={styles.secTestBtn}
          onClick={snykAuth}
        >
          Test Application
        </Button>
        <br />
        <br />
      </section>
    </div>
  );
};

export default SecTestCase;
