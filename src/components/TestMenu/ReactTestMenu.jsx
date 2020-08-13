import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import { addDescribeBlock, openInfoModal } from '../../context/actions/reactTestCaseActions';
import NewTestModal from '../Modals/NewTestModal';

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
          />
          <button id={styles.example} onClick={modalOpener}>
<<<<<<< HEAD
            example
=======
            Need Help?
>>>>>>> 0698f4709fc4a74a66f12c08ce4b9ade580ddc28
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
