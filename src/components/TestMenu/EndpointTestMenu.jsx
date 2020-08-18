import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import {
  openBrowserDocs,
  toggleRightPanel,
  updateFile,
  setFilePath,
} from '../../context/actions/globalActions';
import styles from '../TestMenu/TestMenu.module.scss';
import Modal from '../Modals/Modal';
import { addEndpoint, createNewEndpointTest } from '../../context/actions/endpointTestCaseActions';
import useGenerateTest from '../../context/useGenerateTest.jsx';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';

// child component of EndPointTest menu. has NewTest and Endpoint buttons
const EndpointTestMenu = () => {
  const [{ endpointStatements, endpointTestStatement }, dispatchToEndpointTestCase] = useContext(
    EndpointTestCaseContext
  );
  console.log(endpointStatements, endpointTestStatement);
  const [{ projectFilePath, file, exportBool }, dispatchToGlobal] = useContext(GlobalContext);
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

  const generateTest = useGenerateTest('endpoint', projectFilePath);

  const fileHandle = () => {
    dispatchToGlobal(updateFile(generateTest({ endpointTestStatement, endpointStatements })));
    dispatchToGlobal(toggleRightPanel('codeEditorView'));
    dispatchToGlobal(setFilePath(''));
  };

  if (!file && exportBool)
    dispatchToGlobal(updateFile(generateTest({ endpointTestStatement, endpointStatements })));

  return (
    <div id='test'>
      <div id={styles.testMenu}>
        <div id={styles.left}>
          <button onClick={openEndpointModal}>New Test +</button>
          <button id={styles.preview} onClick={fileHandle}>
            Preview
          </button>
          <Modal
            // passing methods down as props to be used when TestModal is opened
            isModalOpen={isEndpointModalOpen}
            closeModal={closeEndpointModal}
            dispatchTestCase={dispatchToEndpointTestCase}
            createTest={createNewEndpointTest}
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
