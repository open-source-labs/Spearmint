import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import NewTestModal from '../Modals/NewTestModal';
import {
  addEndpoint,
  openInfoModal,
  createNewEndpointTest,
} from '../../context/actions/endpointTestCaseActions';
// child component of EndPointTest menu. has NewTest and Endpoint buttons
const EndpointTestMenu = ({ dispatchToEndpointTestCase }) => {
  const [isEndpointModalOpen, setIsEndpointModalOpen] = useState(false);

  const openEndpointModal = () => {
    setIsEndpointModalOpen(true);
  };

  const closeEndpointModal = () => {
    setIsEndpointModalOpen(false);
  };

  const handleAddEndpoint = (e) => {
    dispatchToEndpointTestCase(addEndpoint());
  };

  const modalOpener = () => {
    dispatchToEndpointTestCase(openInfoModal());
  };

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openEndpointModal}>New Test +</button>
          <NewTestModal
            // passing methods down as props to be used when EndpointTestModal is opened
            dispatchToMockData={null}
            createNewTest={createNewEndpointTest}
            isModalOpen={isEndpointModalOpen}
            closeModal={closeEndpointModal}
            dispatchToTestCase={dispatchToEndpointTestCase}
          />
          <button id={styles.example} onClick={modalOpener}>
            example
          </button>
        </div>
        <div id={styles.right}>
          <button data-testid='endPointButton' onClick={handleAddEndpoint}>
            Endpoint
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndpointTestMenu;
