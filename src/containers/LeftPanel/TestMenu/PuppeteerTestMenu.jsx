import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import PuppeteerTestModal from '../../NavBar/Modals/PuppeteerTestModal';
import { addPuppeteerForm, addPuppeteerPaintTiming } from '../../../context/puppeteerTestCaseActions';

const PuppeteerTestMenu = ({ dispatchToPuppeteerTestCase }) => {
  const [isPuppeteerModalOpen, setIsPuppeteerModalOpen] = useState(false);

  const openPuppeteerModal = () => {
    setIsPuppeteerModalOpen(true);
  };

  const closePuppeteerModal = () => {
    setIsPuppeteerModalOpen(false);
  };

  const handleAddPuppeteerForm = e => {
    dispatchToPuppeteerTestCase(addPuppeteerForm());
  };

  const handleAddPuppeteerPaintTiming = e => {
    dispatchToPuppeteerTestCase(addPuppeteerPaintTiming());
  };

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openPuppeteerModal}>New Test +</button>
          <PuppeteerTestModal
            isPuppeteerModalOpen={isPuppeteerModalOpen}
            closePuppeteerModal={closePuppeteerModal}
            dispatchToPuppeteerTestCase={dispatchToPuppeteerTestCase}
          />
        </div>
        <div id={styles.right}>
          <button data-testid='puppeteerFormButton' onClick={handleAddPuppeteerForm}>
            Form
          </button>
          <button data-testid='puppeteerPaintTimingButton' onClick={handleAddPuppeteerPaintTiming}>
            Paint Timing
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuppeteerTestMenu;
