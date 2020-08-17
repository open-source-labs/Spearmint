import React, { useState, useContext, useReducer } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addDescribeBlock, openInfoModal } from '../../context/actions/reactTestCaseActions';
import NewTestModal from '../Modals/NewTestModal';
import { GlobalContext } from '../../context/reducers/globalReducer';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import { updateFile, setFilePath, toggleRightPanel } from '../../context/actions/globalActions';
import {
  reactTestCaseState,
  reactTestCaseReducer,
} from '../../context/reducers/reactTestCaseReducer';

const ReactTestMenu = ({ dispatchToTestCase, dispatchToMockData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [{ mockData }] = useContext(MockDataContext);
  const [reactTestCase] = useReducer(reactTestCaseReducer, reactTestCaseState);
  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext(GlobalContext);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddDescribeBlock = (e) => {
    dispatchToTestCase(addDescribeBlock());
  };

  const modalOpener = () => {
    dispatchToTestCase(openInfoModal());
  };

  const generateTest = useGenerateTest('react', projectFilePath);

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest(reactTestCase, mockData)));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
  };

  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest(reactTestCase, mockData)));

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openModal}>New Test +</button>
          <button onClick={fileHandle}>Preview</button>
          <button id={styles.example} onClick={modalOpener}>
            Need Help?
          </button>
          <NewTestModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchToMockData={dispatchToMockData}
            dispatchToTestCase={dispatchToTestCase}
          />
        </div>

        <div
          id={styles.right}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button data-testid='addDescribeButton' onClick={handleAddDescribeBlock}>
            +Describe Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactTestMenu;
