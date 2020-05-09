import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import PuppeteerTestModal from '../../NavBar/Modals/PuppeteerTestModal';
import { addPuppeteerForm } from '../../../context/puppeteerTestCaseActions';

const PuppeteerTestMenu = ({ dispatchToPuppeteerTestCase }) => {
  const [isPuppeteerModalOpen, setIsPuppeteerModalOpen] = useState(false);

  const openPuppeteerModal = () => {
    console.log('inside openPuppeteerModal')
    setIsPuppeteerModalOpen(true);
  };

  const closePuppeteerModal = () => {
    setIsPuppeteerModalOpen(false);
  };

  const handleAddPuppeteerForm = e => {
    console.log('in handleAddPuppeteerForm')
    dispatchToPuppeteerTestCase(addPuppeteerForm());
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
        </div>
      </div>
    </div>
  );
};

export default PuppeteerTestMenu;
