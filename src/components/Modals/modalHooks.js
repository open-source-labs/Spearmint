import React, { useState, useRef, useContext } from 'react';
import { clearMockData } from '../../context/actions/mockDataActions';
import { toggleModal, setTestCase, updateFile } from '../../context/actions/globalActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import styles from './Modal.module.scss';

export function useCopy() {
  const [copySuccess, setCopySuccess] = useState(false);
  const codeRef = useRef(null);

  const handleCopy = async (e) => {
    const code = document.createRange();
    code.setStartBefore(codeRef.current);
    code.setEndAfter(codeRef.current);
    window.getSelection().empty();
    window.getSelection().addRange(code);
    document.execCommand('copy');
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 800);
  };

  return { copySuccess, codeRef, handleCopy };
}

export function useNewTest(dispatchToMockData, dispatchTestCase, createTest, closeModal) {
  const [, dispatchToGlobal] = useContext(GlobalContext);
  const handleNewTest = (e) => {
    if (dispatchToMockData) dispatchToMockData(clearMockData());
    dispatchTestCase(createTest());
    closeModal();
    dispatchToGlobal(setTestCase(''));
    dispatchToGlobal(toggleModal());
    dispatchToGlobal(updateFile(''));
  };
  return { handleNewTest };
}

export function useGenerateScript(test, testType = null, puppeteerUrl = 'sample.io') {
  const [{ projectFilePath }] = useContext(GlobalContext);
  switch (test) {
    case 'acc':
      if (testType === 'html') {
        return {
          cd: `cd ${projectFilePath}`,
          install: 'npm i -D axe-core regenerator-runtime jest',
        };
      }
      if (testType === 'react') {
        return {
          cd: `cd ${projectFilePath}`,
          install: 'npm i -D axe-core regenerator-runtime jest enzyme enzyme-adapter-react-16',
        };
      }
      if (testType === 'puppeteer') {
        return {
          cd: `cd ${projectFilePath}`,
          install: 'npm i -D axe-core puppeteer',
        };
      }
      return 'error';
    case 'react':
      return {
        cd: `cd ${projectFilePath}`,
        install: `npm i -D @testing-library/jest-dom @testing-library/react test-data-bot jest`,
      };
    case 'redux':
      return {
        cd: `cd ${projectFilePath}`,
        install:
          'npm i -D @testing-library/jest-dom @testing-library/react test-data-bot redux-mock-store redux-thunk fetch-mock node-fetch jest',
      };
    case 'hooks':
      return {
        cd: `cd ${projectFilePath}`,
        install:
          'npm i -D @testing-library/jest-dom @testing-library/react test-data-bot @testing-library/react-hooks jest',
      };
    case 'endpoint':
      const endPointGuide = {
        1: `1. Please follow these steps to configure your files correctly. The tests will not run properly if you skip these steps.`,
        2: `2. Your server file MUST export your server object.`,
        3: `3. Comment out or remove the appropriate lines of code where the call to the server's listen method takes place.`,
        4: `4. If you are testing a route that involves querying a database, you must import the file where your database instance is created.`,
        5: `5. In that file, you must export your database instance object.`,
        '5a': `5a. PostgreSQL: Pool, Client, or pg object.`,
        '5b': `5b. MongoDB: MongoClient instance.`,
        '5c': `5c. Mongoose: mongoose instance.`,
      };
      return {
        endPointGuide: endPointGuide,
        cd: `cd ${projectFilePath}`,
        install: 'npm i -D jest supertest regenerator-runtime',
      };
    case 'puppeteer':
      return {
        cd: `cd ${projectFilePath}`,
        install: 'npm i -D puppeteer',
      };
    case 'vue':
      return {
        cd: `cd ${projectFilePath}`,
        install: 'vue add unit-jest',
      };
    case 'svelte':
      return {
        cd: `cd ${projectFilePath}`,
        install: 'npm i -D @testing-library/svelte @testing-library/user-event @testing-library/jest-dom @babel/preset-env svelte-jester jest msw babel-jest'
      }
    default:
      return '';
    // code block
  }
}
