import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import styles from '../TestMenu/TestMenu.module.scss';
import NewTestModal from '../Modals/NewTestModal';
import { addEndpoint, createNewEndpointTest } from '../../context/actions/endpointTestCaseActions';
// child component of EndPointTest menu. has NewTest and Endpoint buttons
const EndpointTestMenu = ({ dispatchToEndpointTestCase }) => {
  const [_, dispatchToGlobal] = useContext(GlobalContext);
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
          <NewTestModal
            // passing methods down as props to be used when EndpointTestModal is opened
            dispatchToMockData={null}
            createNewTest={createNewEndpointTest}
            isModalOpen={isEndpointModalOpen}
            closeModal={closeEndpointModal}
            dispatchToTestCase={dispatchToEndpointTestCase}
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
