import React, { useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { addDescribeBlock, createNewTest } from '../../context/actions/reactTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import { MockDataContext } from '../../context/reducers/mockDataReducer';
import { updateFile, setFilePath, toggleRightPanel } from '../../context/actions/globalActions';
import { ReactTestCaseContext } from '../../context/reducers/reactTestCaseReducer';
import { useToggleModal } from './testMenuHooks';

const ReactTestMenu = () => {
  // React testing docs url
  const reactUrl = 'https://testing-library.com/docs/react-testing-library/example-intro';

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('react');
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [reactTestCase, dispatchToReactTestCase] = useContext(ReactTestCaseContext);
  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext(GlobalContext);
  const generateTest = useGenerateTest('react', projectFilePath);

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
  };

  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest(reactTestCase, mockData)));

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openModal}>New Test +</button>
          <button onClick={fileHandle}>Preview</button>
          <button id={styles.example} onClick={openScriptModal}>
            Run Test
          </button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          <Modal
            title={title}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchMockData={dispatchToMockData}
            dispatchTestCase={dispatchToReactTestCase}
            createTest={createNewTest}
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
