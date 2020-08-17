import React, { useState } from 'react';
import styles from '../TestMenu/TestMenu.module.scss';
import EndpointTestModal from '../Modals/EndpointTestModal';
import { addEndpoint, openInfoModal } from '../../context/actions/endpointTestCaseActions';
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
          <button id={styles.preview}>Preview</button>
          <EndpointTestModal
            // passing methods down as props to be used when EndpointTestModal is opened
            isEndpointModalOpen={isEndpointModalOpen}
            closeEndpointModal={closeEndpointModal}
            dispatchToEndpointTestCase={dispatchToEndpointTestCase}
          />
          <button id={styles.example} onClick={modalOpener}>
            Need Help?
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
