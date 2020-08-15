import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addDescribeBlock, openInfoModal } from '../../context/actions/reactTestCaseActions';
import NewTestModal from '../Modals/NewTestModal';
import { createNewTest } from '../../context/actions/reactTestCaseActions';

const ReactTestMenu = ({ dispatchToTestCase, dispatchToMockData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddDescribeBlock = (e) => {
    dispatchToTestCase(addDescribeBlock());
  };

  const modalOpener = () => {
    dispatchToTestCase(openInfoModal());
  };

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openModal}>New Test +</button>
          <NewTestModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            dispatchToMockData={dispatchToMockData}
            dispatchToTestCase={dispatchToTestCase}
            createNewTest={createNewTest}
          />
          <button id={styles.example} onClick={modalOpener}>
            Need Help?
          </button>
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
