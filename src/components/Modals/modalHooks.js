import React, { useState, useRef, useContext } from 'react';
import { clearMockData } from '../../context/actions/mockDataActions';
import { toggleModal, setTestCase, updateFile } from '../../context/actions/globalActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import styles from './ExportFileModal.module.scss';

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

export function useGenerateScript(test) {
  const [{ projectFilePath }] = useContext(GlobalContext);
  switch (test) {
    case 'react':
      return (
        `cd ${projectFilePath}\n` +
        'npm i -D jest @testing-library/jest-dom @testing-library/react test-data-bot\n' +
        'npm run test'
      );
    case 'redux':
      return (
        `cd ${projectFilePath}\n` +
        'npm i -D jest @testing-library/jest-dom @testing-library/react test-data-bot redux-mock-store redux-thunk fetch-mock\n' +
        'npm run test'
      );
    case 'hooks':
      return (
        `cd ${projectFilePath}\n` +
        'npm i -D jest @testing-library/jest-dom @testing-library/react test-data-bot @testing-library/react-hooks\n' +
        'npm run test'
      );
    case 'endpoint':
      return (
        <>
          <p id={styles.endpoint}>
            Please follow these steps to configure your files correctly. The tests will not run
            properly if you skip these steps!
            <br></br>
            <br></br> 1. Your server file MUST export your server object.
            <br></br> 2. Comment out or remove the appropriate lines of code where the call to the
            server's listen method takes place
            <br></br>
            <span>Example</span>
            <br></br>3. If your are testing a route that involves querying a database, you must
            import the file where your database instance is created.
            <br></br>
            <ul>
              4. In that file, you must export your database instance object
              <li>PostgreSQL: Pool, Client, or pg object</li>
              <li>MongoDB: MongoClient instance</li>
              <li>Mongoose: mongoose instance</li>
            </ul>
            5. Make sure to add "jest" to the test script in the package.json file.
          </p>
          <br></br>
          <code>npm i -D jest supertest</code>
          <br></br>
          <code>npm run test</code>
        </>
      );
    case 'puppeteer':
      return `cd ${projectFilePath}\nnpm i -D jest puppeteer\nnpm run test`;
    default:
      return '';
    // code block
  }
}
