import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import styles from './TestMenu.module.scss';
import EndpointTestModal from '../Modals/EndpointTestModal';
import { addEndpoint } from '../../context/actions/endpointTestCaseActions';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';

// child component of EndPointTest menu. has NewTest and Endpoint buttons
const EndpointTestMenu = () => {
  const [, dispatchToGlobal] = useContext(GlobalContext);
  const [, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);
  // Endpoint testing docs url
  const endpointUrl = 'https://www.npmjs.com/package/supertest';

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

  const openDocs = () => {
    dispatchToGlobal(openBrowserDocs(endpointUrl));
  };

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openEndpointModal}>New Test +</button>
          <EndpointTestModal
            // passing methods down as props to be used when EndpointTestModal is opened
            isEndpointModalOpen={isEndpointModalOpen}
            closeEndpointModal={closeEndpointModal}
          />
          <button id={styles.example} onClick={openDocs}>
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
