import React, { useEffect, useContext } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { addDescribeBlock, createNewTest } from '../../context/actions/vueTestCaseActions';
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
import { VueTestCaseContext } from '../../context/reducers/vueTestCaseReducer';
import { useToggleModal } from './testMenuHooks';
// import UploadTest from '../UploadTest/UploadTest';
// import GetTests from '../GetTests/GetTests';

const VueTestMenu = () => {
  // Vue testing docs url
  const vueUrl = 'https://testing-library.com/docs/react-testing-library/example-intro';

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, isModalOpen, openModal, openScriptModal, closeModal } = useToggleModal('vue');
  const [{ mockData }, dispatchToMockData] = useContext(MockDataContext);
  const [vueTestCase, dispatchToVueTestCase] = useContext(VueTestCaseContext);
  const [{ projectFilePath, file, exportBool, isTestModalOpen }, dispatchToGlobal] =
    useContext(GlobalContext);
  const generateTest = useGenerateTest('vue', projectFilePath);

  useEffect(() => {
    dispatchToGlobal(setValidCode(true));
  }, []);

  const handleAddDescribeBlock = (e) => {
    dispatchToVueTestCase(addDescribeBlock());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(vueUrl));
  };

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest(vueTestCase, mockData)));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
    dispatchToGlobal(setTabIndex(0));
  };

  const openNewTestModal = () => {
    if (!isTestModalOpen) dispatchToGlobal(toggleModal());
  };

  if (!file && exportBool) dispatchToGlobal(updateFile(generateTest(vueTestCase, mockData)));

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openModal} autoFocus>
            New Test +
          </button>
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
            dispatchTestCase={dispatchToVueTestCase}
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

export default VueTestMenu;
