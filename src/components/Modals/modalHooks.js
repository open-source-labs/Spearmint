import { useState, useRef, useContext } from 'react';
import { clearMockData } from '../../context/actions/mockDataActions';
import { toggleModal, setTestCase, updateFile } from '../../context/actions/globalActions';
import { GlobalContext } from '../../context/reducers/globalReducer';

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
      return `cd ${projectFilePath}\nnpm i -D jest supertest\nnpm run test`;
    case 'puppeteer':
      return `cd ${projectFilePath}\nnpm i -D jest puppeteer\nnpm run test`;
    default:
      return '';
    // code block
  }
}
