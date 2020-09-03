import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  openBrowserDocs,
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  toggleExportBool,
} from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import { addHookUpdates, createNewHooksTest } from '../../context/actions/hooksTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { useToggleModal, validateInputs } from './testMenuHooks';

const HooksTestMenu = () => {
  // Hooks testing docs url
  const hooksUrl = 'https://react-hooks-testing-library.com/usage/basic-hooks';
  let valid;
  const [{ hooksTestStatement, hooksStatements }, dispatchToHooksTestCase] = useContext(
    HooksTestCaseContext
  );
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('hooks');
  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const generateTest = useGenerateTest('hooks', projectFilePath);

  useEffect(() => {
    dispatchToGlobal(setValidCode(false));
  }, []);

  const handleAddHookUpdates = () => {
    dispatchToHooksTestCase(addHookUpdates());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(hooksUrl));
  };

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest({ hooksTestStatement, hooksStatements })));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
  };

  if (exportBool) {
    valid = validateInputs('hooks', hooksStatements);
    valid ? dispatchToGlobal(setValidCode(true)) : dispatchToGlobal(setValidCode(false));
    dispatchToGlobal(toggleExportBool());
    if (valid && !file) dispatchToGlobal(updateFile(generateTest(hooksStatements)));
  }

  if (!file && exportBool) {
    validateInputs('hooks', hooksStatements)
      ? dispatchToGlobal(setValidCode(true))
      : dispatchToGlobal(setValidCode(false));
    dispatchToGlobal(updateFile(generateTest({ hooksTestStatement, hooksStatements })));
  }
  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button type='button' onClick={openModal}>
            New Test +
          </button>
          <button id={styles.example} onClick={fileHandle}>
            Preview
          </button>
          <button id={styles.example} onClick={openScriptModal}>
            Run Test
          </button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          <Modal
            // passing methods down as props to be used when Modal is opened
            title={title}
            dispatchToMockData={null}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchTestCase={title === 'New Test' ? dispatchToHooksTestCase : null}
            createTest={title === 'New Test' ? createNewHooksTest : null}
          />
        </div>
        <div
          id={styles.right}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button className='hookUpdatesButton' type='button' onClick={handleAddHookUpdates}>
            Hooks
          </button>
        </div>
      </div>
    </div>
  );
};

export default HooksTestMenu;
