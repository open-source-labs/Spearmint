import React, { useState, useContext } from 'react';
import styles from './TestMenu.module.scss';
import { updateFile, setFilePath, toggleRightPanel } from '../../context/actions/globalActions';
import {
  addContexts,
  addHookUpdates,
  addHookRender,
  openInfoModal,
} from '../../context/actions/hooksTestCaseActions';
import HooksTestModal from '../Modals/HooksTestModal';
import { HooksTestMenuProps } from '../../utils/hooksTypes';
import useGenerateTest from '../../context/useGenerateTest';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';

const HooksTestMenu = ({ dispatchToHooksTestCase }: HooksTestMenuProps) => {
  const [isHooksModalOpen, setIsHooksModalOpen] = useState(false);
  const [{ hooksTestStatement, hooksStatements }] = useContext(HooksTestCaseContext);
  const [projectFilePath, dispatchToGlobal] = useContext<any>(GlobalContext);
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

  const helpModalOpener = () => {
    dispatchToHooksTestCase(openInfoModal());
  };

  const generateTest = useGenerateTest('hooks', projectFilePath);

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest({ hooksTestStatement, hooksStatements })));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
  };

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
          <button id={styles.example} onClick={helpModalOpener}>
            Need Help?
          </button>
          <HooksTestModal
            isHooksModalOpen={isHooksModalOpen}
            closeHooksModal={closeHooksModal}
            dispatchToHooksTestCase={dispatchToHooksTestCase}
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
