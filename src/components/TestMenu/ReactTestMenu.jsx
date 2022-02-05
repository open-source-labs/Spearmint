import React, { useEffect, useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { addDescribeBlock, createNewTest } from '../../context/actions/reactTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import {
  updateFile,
  setFilePath,
  toggleRightPanel,
  setValidCode,
  setTestCase,
  toggleModal,
  setTabIndex,
} from '../../context/actions/globalActions';
import { ReactTestCaseContext } from '../../context/reducers/reactTestCaseReducer';
import { useToggleModal } from './testMenuHooks';
import { Button } from '@material-ui/core';
import { AiFillFileAdd } from 'react-icons/ai'
import { BsFileEarmarkPlayFill } from 'react-icons/bs'
import { IoSave } from 'react-icons/io5';
import { MdOutlineHelp, MdPreview } from 'react-icons/md';
import TestMenuButtons from './TestMenuButtons';
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

const ReactTestMenu = () => {
  // React testing docs url
  const reactUrl = 'https://testing-library.com/docs/react-testing-library/example-intro';

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('react');
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [reactTestCase, dispatchToReactTestCase] = useContext(ReactTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen }, dispatchToGlobal] =
    useContext(GlobalContext);
  const generateTest = useGenerateTest('react', projectFilePath);

  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);

  const handleAddDescribeBlock = (e) => {
    dispatchToReactTestCase(addDescribeBlock());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(reactUrl));
  };

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest(reactTestCase, mockData)));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
  };

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest(reactTestCase, mockData)));

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
        dispatchMockData={dispatchToMockData}
        dispatchTestCase={dispatchToReactTestCase}
        createTest={createNewTest}
      />
    </>
      
      // {/* <div
      //   id={styles.right}
      //   style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      // >
      //   <button data-testid='addDescribeButton' onClick={handleAddDescribeBlock}>
      //     +Describe Block
      //   </button>
      // </div> */}

  );
};

export default ReactTestMenu;
