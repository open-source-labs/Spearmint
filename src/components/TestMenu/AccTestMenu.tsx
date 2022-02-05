import React, { useEffect, useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs, setTabIndex } from '../../context/actions/globalActions';
import { addDescribeBlock, createNewTest } from '../../context/actions/accTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  setTestCase,
  toggleModal,
} from '../../context/actions/globalActions';
import { AccTestCaseContext } from '../../context/reducers/accTestCaseReducer';
import { useToggleModal } from './testMenuHooks';
import TestMenuButtons from './TestMenuButtons';
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

const AccTestMenu = () => {
  // link to accessibility testing docs url
  const accUrl = 'https://www.deque.com/axe/core-documentation/api-documentation/';

  // initialize hooks
  const { title, isModalOpen, openModal, openScriptModal, closeModal, } = useToggleModal('acc');
  const [accTestCase, dispatchToAccTestCase] = useContext(AccTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const generateTest = useGenerateTest('acc', projectFilePath);

  // setValidCode to true on load.
  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);

  // handle change to add a Describe Block
  const handleAddDescribeBlock = () => {
    dispatchToAccTestCase(addDescribeBlock());
  };

  // handle change to open accessibility URL docs on right panel
  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(accUrl));
  };

  // handle change for 'preview' button to generate test
  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest(accTestCase)));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
  };

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  if (!file && exportBool) {dispatchToGlobal(updateFile(generateTest(accTestCase)))};
 
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
        title={title}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        dispatchToMockData={null}
        dispatchTestCase={dispatchToAccTestCase}
        createTest={createNewTest}
        testType={accTestCase.testType}
        puppeteerUrl={accTestCase.puppeteerUrl}
      />
    </>
    
    //       {/* <UploadTest testType="acc" />
    //       <GetTests testType="acc" /> */}
          


    //     <div
    //       id={styles.right}
    //       style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    //     >
    //       <button data-testid='addDescribeButton' onClick={handleAddDescribeBlock}>
    //         +Describe Block
    //       </button>
    //     </div>
    //   </div>
    // </div >
  );
}

export default AccTestMenu;