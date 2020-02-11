import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addContexts, addHookUpdates, addHookRender } from '../../../context/hooksTestCaseActions';
import HooksTestModal from '../../NavBar/Modals/HooksTestModal';

const HooksTestMenu = ({ dispatchToHooksTestCase }) => {
  const [isHooksModalOpen, setIsHooksModalOpen] = useState(false);

  const openHooksModal = () => {
    setIsHooksModalOpen(true);
  };

  const closeHooksModal = () => {
    setIsHooksModalOpen(false);
  };

  const handleAddContexts = e => {
    dispatchToHooksTestCase(addContexts());
  };

  const handleAddHookUpdates = e => {
    dispatchToHooksTestCase(addHookUpdates());
  };

  const handleAddHookRender = e => {
    dispatchToHooksTestCase(addHookRender());
  };

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openHooksModal}>New Test +</button>
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
          <button data-testid='hookRenderButton' onClick={handleAddHookRender}>
            Hook: Rendering
          </button>
          <button data-testid='hookUpdatesButton' onClick={handleAddHookUpdates}>
            Hook: Updates
          </button>
          <button data-testid='contextButton' onClick={handleAddContexts}>
            Context
          </button>
        </div>
      </div>
    </div>
  );
};

export default HooksTestMenu;
