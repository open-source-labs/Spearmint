import React, { useState } from 'react';
import styles from './TestMenu.module.scss';
import { addContexts, addHookUpdates, addHookRender } from '../../context/actions/hooksTestCaseActions';
import HooksTestModal from '../Modals/HooksTestModal';
import { HooksTestMenuProps } from '../../utils/hooks';

const HooksTestMenu = ({ dispatchToHooksTestCase }: HooksTestMenuProps) => {
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

  return (
    <div id="test">
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button type="button" onClick={openHooksModal}>New Test +</button>
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
          <button className="hookRenderButton" type="button" onClick={handleAddHookRender}>
            Hook: Rendering
          </button>
          <button className="hookUpdatesButton" type="button" onClick={handleAddHookUpdates}>
            Hook: Updates
          </button>
          <button className="contextButton" type="button" onClick={handleAddContexts}>
            Context
          </button>
        </div>
      </div>
    </div>
  );
};

export default HooksTestMenu;
