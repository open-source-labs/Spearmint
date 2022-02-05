import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  openBrowserDocs,
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  toggleExportBool,
  setTestCase,
  toggleModal,
  setTabIndex,
} from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import { addHookUpdates, createNewHooksTest } from '../../context/actions/hooksTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { useToggleModal, validateInputs } from './testMenuHooks';
import TestMenuButtons from './TestMenuButtons';
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

const HooksTestMenu = () => {
  // Hooks testing docs url
  const hooksUrl = 'https://react-hooks-testing-library.com/usage/basic-hooks';
  const [{ hooksTestStatement, hooksStatements }, dispatchToHooksTestCase] = useContext(
    HooksTestCaseContext
  );
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('hooks');
  const [{ projectFilePath, file, exportBool, isTestModalOpen }, dispatchToGlobal] = useContext<any>(GlobalContext);
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
    dispatchToGlobal(setTabIndex(0));
  };

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  if (exportBool) {
    const valid = validateInputs('hooks', hooksStatements);
    dispatchToGlobal(setValidCode(valid));
    dispatchToGlobal(toggleExportBool());
    if (valid && !file) dispatchToGlobal(updateFile(generateTest(hooksStatements)));
  }

  if (!file && exportBool) {
    const valid = validateInputs('hooks', hooksStatements);
    dispatchToGlobal(setValidCode(valid));
    dispatchToGlobal(updateFile(generateTest({ hooksTestStatement, hooksStatements })));
  }
  return (

    <>
      <TestMenuButtons 
        openModal={openModal}
        fileHandle={fileHandle}
        openScriptModal={openScriptModal}
        saveTest={openModal}
        openDocs={openDocs}
      />
      <Modal
        // passing methods down as props to be used when Modal is opened
        title={title}
        dispatchToMockData={null}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        dispatchTestCase={title === 'New Test' ? dispatchToHooksTestCase : null}
        createTest={title === 'New Test' ? createNewHooksTest : null}
      />
    </>

    //       {/* <UploadTest testType="hooks" />
    //       <GetTests testType="hooks" /> */}
    //     <div
    //       id={styles.right}
    //       style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    //     >
    //       <button className='hookUpdatesButton' type='button' onClick={handleAddHookUpdates}>
    //         Hooks
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default HooksTestMenu;
