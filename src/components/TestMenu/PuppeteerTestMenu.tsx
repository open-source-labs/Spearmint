import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import NewTestModal from '../Modals/NewTestModal';
import {
  addPuppeteerPaintTiming,
  createNewPuppeteerTest,
} from '../../context/actions/puppeteerTestCaseActions';
import { PuppeteerTestMenuProps } from '../../utils/puppeteerTypes';

const PuppeteerTestMenu = ({ dispatchToPuppeteerTestCase }: PuppeteerTestMenuProps) => {
  const [dispatchToGlobal] = useContext<any>(GlobalContext);
  // puppeteer testing docs url
  const puppeteerUrl = 'https://devdocs.io/puppeteer/';

  const [isPuppeteerModalOpen, setIsPuppeteerModalOpen] = useState(false);

  const openPuppeteerModal = () => {
    setIsPuppeteerModalOpen(true);
  };

  const closePuppeteerModal = () => {
    setIsPuppeteerModalOpen(false);
  };

  const handleAddPuppeteerPaintTiming = () => {
    dispatchToPuppeteerTestCase(addPuppeteerPaintTiming());
  };

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(puppeteerUrl));
  };

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button type='button' data-testid='puppeteerNewTestButton' onClick={openPuppeteerModal}>
            New Test +
          </button>
          <NewTestModal
            dispatchToMockData={null}
            createNewTest={createNewPuppeteerTest}
            isModalOpen={isPuppeteerModalOpen}
            closeModal={closePuppeteerModal}
            dispatchToTestCase={dispatchToPuppeteerTestCase}
          />
          <button id={styles.example} onClick={openDocs}>
            Need Help?
          </button>
        </div>
        <div id={styles.right}>
          <button
            type='button'
            data-testid='puppeteerPaintTimingButton'
            onClick={handleAddPuppeteerPaintTiming}
          >
            Paint Timing
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuppeteerTestMenu;
