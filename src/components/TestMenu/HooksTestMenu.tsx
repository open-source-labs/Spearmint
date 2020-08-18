import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import { updateFile, setFilePath, toggleRightPanel } from '../../context/actions/globalActions';
import {
  addContexts,
  addHookUpdates,
  addHookRender,
  createNewHooksTest,
} from '../../context/actions/hooksTestCaseActions';
import Modal from '../Modals/Modal';
import useGenerateTest from '../../context/useGenerateTest';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';

const HooksTestMenu = () => {
  // Hooks testing docs url
  const hooksUrl = 'https://react-hooks-testing-library.com/usage/basic-hooks';

  const [isHooksModalOpen, setIsHooksModalOpen] = useState(false);
  const [{ hooksTestStatement, hooksStatements }, dispatchToHooksTestCase] = useContext(
    HooksTestCaseContext
  );
  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext<any>(GlobalContext);
  const openHooksModal = () => {
    setIsHooksModalOpen(true);
  };

  const closeHooksModal = () => {
    setIsHooksModalOpen(false);
  };

  const handleAddContexts = () => {
    dispatchToHooksTestCase(addContexts());
  };

  const handleAddHookUpdates = () => {
    dispatchToHooksTestCase(addHookUpdates());
  };

  const handleAddHookRender = () => {
    dispatchToHooksTestCase(addHookRender());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(hooksUrl));
  };

  const generateTest = useGenerateTest('hooks', projectFilePath);

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest({ hooksTestStatement, hooksStatements })));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
  };

  if (!file && exportBool)
    dispatchToGlobal(updateFile(generateTest({ hooksTestStatement, hooksStatements })));

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button type='button' onClick={openHooksModal}>
            New Test +
          </button>
          <button id={styles.example} onClick={fileHandle}>
            Preview
          </button>
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
          <Modal
            // passing methods down as props to be used when Modal is opened
            dispatchToMockData={null}
            isModalOpen={isHooksModalOpen}
            closeModal={closeHooksModal}
            dispatchTestCase={dispatchToHooksTestCase}
            createTest={createNewHooksTest}
          />
        </div>
        <div
          id={styles.right}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button className='hookRenderButton' type='button' onClick={handleAddHookRender}>
            Hook: Rendering
          </button>
          <button className='hookUpdatesButton' type='button' onClick={handleAddHookUpdates}>
            Hook: Updates
          </button>
          <button className='contextButton' type='button' onClick={handleAddContexts}>
            Context
          </button>
        </div>
      </div>
    </div>
  );
};

export default HooksTestMenu;
