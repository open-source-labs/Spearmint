import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import {
  addContexts,
  addHookUpdates,
  addHookRender,
  createNewHooksTest,
} from '../../context/actions/hooksTestCaseActions';
import { HooksTestMenuProps } from '../../utils/hooksTypes';
import NewTestModal from '../Modals/NewTestModal';

const HooksTestMenu = ({ dispatchToHooksTestCase }: HooksTestMenuProps) => {
  const [_, dispatchToGlobal] = useContext<any>(GlobalContext);
  // Hooks testing docs url
  const hooksUrl = 'https://react-hooks-testing-library.com/usage/basic-hooks';

  const [isHooksModalOpen, setIsHooksModalOpen] = useState(false);

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

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button type='button' onClick={openHooksModal}>
            New Test +
          </button>
          <NewTestModal
            dispatchToMockData={null}
            createNewTest={createNewHooksTest}
            isModalOpen={isHooksModalOpen}
            closeModal={closeHooksModal}
            dispatchToTestCase={dispatchToHooksTestCase}
          />
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
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
