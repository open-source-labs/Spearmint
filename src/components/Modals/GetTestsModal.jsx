import React, { useState, useEffect, useContext } from 'react';
import { AccTestCaseContext } from '../../context/reducers/accTestCaseReducer';
import { accReplaceTest } from '../../context/actions/accTestCaseActions';
import { EndpointTestCaseContext } from '../../context/reducers/endpointTestCaseReducer';
import { endpointReplaceTest } from '../../context/actions/endpointTestCaseActions';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { hooksReplaceTest } from '../../context/actions/hooksTestCaseActions';
import { PuppeteerTestCaseContext } from '../../context/reducers/puppeteerTestCaseReducer';
import { puppeteerReplaceTest } from '../../context/actions/puppeteerTestCaseActions';
import { ReactTestCaseContext } from '../../context/reducers/reactTestCaseReducer';
import { reactReplaceTest } from '../../context/actions/reactTestCaseActions';
import { ReduxTestCaseContext } from '../../context/reducers/reduxTestCaseReducer';
import { reduxReplaceTest } from '../../context/actions/reduxTestCaseActions';

import ReactModal from 'react-modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styles from './Modal.module.scss';

const GetTestsModal = ({ getTestsModalIsOpen, setGetTestsModalIsOpen, testType }) => {
  const [tests, setTests] = useState([]);
  const [accTestCase, dispatchToAccTestCase] = useContext(AccTestCaseContext);
  const [endpointTestCase, dispatchToEndpointTestCase] = useContext(EndpointTestCaseContext);
  const [hooksTestCase, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);
  const [puppeteerTestCase, dispatchToPuppeteerTestCase] = useContext(PuppeteerTestCaseContext);
  const [reactTestCase, dispatchToReactTestCase] = useContext(ReactTestCaseContext);
  const [reduxTestCase, dispatchToReduxTestCase] = useContext(ReduxTestCaseContext);

  useEffect(() => {
    let isMounted = true;
    handleGetTests(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

  const closeGetTestsModal = () => {
    setGetTestsModalIsOpen(false);
  };

  const handleGetTests = (isMounted) => {
    fetch('/getTests/' + testType)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setTests(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectTest = (i) => {
    switch (testType) {
      case 'acc':
        dispatchToAccTestCase(accReplaceTest(tests[i].testState));
      case 'react':
        dispatchToReactTestCase(reactReplaceTest(tests[i].testState));
      case 'redux':
        dispatchToReduxTestCase(reduxReplaceTest(tests[i].testState));
      case 'hooks':
        dispatchToHooksTestCase(hooksReplaceTest(tests[i].testState));
      case 'endpoint test':
        dispatchToEndpointTestCase(endpointReplaceTest(tests[i].testState));
      case 'puppeteer':
        dispatchToPuppeteerTestCase(puppeteerReplaceTest(tests[i].testState));
      case 'default':
        console.log('Incorrect input');
    }
    closeGetTestsModal();
  };

  const modalStyles = {
    overlay: {
      zIndex: 3,
    },
  };

  const renderTestsArray = [];
  for (let i = 0; i < tests.length; i++) {
    renderTestsArray.push(
      <ListItem button>
        <ListItemText primary={tests[i].testName} onClick={() => handleSelectTest(i)} />
      </ListItem>
    );
  }

  return (
    <ReactModal
      className={styles.modal}
      isOpen={getTestsModalIsOpen}
      onRequestClose={closeGetTestsModal}
      contentLabel='Get saved tests'
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={modalStyles}
    >
      <div id={styles.title}>
        <p>Saved Tests</p>
        <svg id={styles.close} onClick={closeGetTestsModal}>
          <path d='M19,3H16.3H7.7H5A2,2 0 0,0 3,5V7.7V16.4V19A2,2 0 0,0 5,21H7.7H16.4H19A2,2 0 0,0 21,19V16.3V7.7V5A2,2 0 0,0 19,3M15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4L13.4,12L17,15.6L15.6,17Z' />
        </svg>
      </div>
      <div id={styles.body}>
        <div className={styles.root}>
          <List component='nav' aria-label='saved tests'>
            {renderTestsArray}
          </List>
        </div>
      </div>
    </ReactModal>
  );
};

export default GetTestsModal;
