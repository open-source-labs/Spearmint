import React, { useState, useContext, useReducer } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { addDescribeBlock, openInfoModal } from '../../context/actions/reactTestCaseActions';
import NewTestModal from '../Modals/NewTestModal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import { updateFile, setFilePath, toggleRightPanel } from '../../context/actions/globalActions';
import {
  reactTestCaseState,
  reactTestCaseReducer,
  ReactTestCaseContext,
} from '../../context/reducers/reactTestCaseReducer';

const ReactTestMenu = () => {
  // React testing docs url
  const reactUrl = 'https://testing-library.com/docs/react-testing-library/example-intro';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [reactTestCase, dispatchToReactTestCase] = useContext(ReactTestCaseContext);
  console.log('reactTestCase', reactTestCase);
  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext(GlobalContext);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddDescribeBlock = (e) => {
    dispatchToReactTestCase(addDescribeBlock());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(reactUrl));
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
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          <NewTestModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchToMockData={dispatchToMockData}
            dispatchToTestCase={dispatchToReactTestCase}
          />
          {/* Just send user to docs on button click */}
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
