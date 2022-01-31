/* eslint-disable linebreak-style */
import React, { useContext, useReducer, Fragment } from 'react';
import ReactModal from 'react-modal';
import styles from '../../components/Modals/Modal.module.scss';
import Draggable from 'react-draggable';
// A simple JavaScript utility for conditionally joining classNames together
import cn from 'classnames';

// may be able to delete toggleReact, etc. from their respective action files
import ReactTestCase from '../../components/TestCase/ReactTestCase';

import {
  ReduxTestCaseContext,
  reduxTestCaseState,
  reduxTestCaseReducer,
} from '../../context/reducers/reduxTestCaseReducer';
import ReduxTestCase from '../../components/TestCase/ReduxTestCase';

import {
  HooksTestCaseContext,
  hooksTestCaseState,
  hooksTestCaseReducer,
} from '../../context/reducers/hooksTestCaseReducer';
import HooksTestCase from '../../components/TestCase/HooksTestCase';

import {
  EndpointTestCaseContext,
  endpointTestCaseState,
  endpointTestCaseReducer,
} from '../../context/reducers/endpointTestCaseReducer';
import EndpointTestCase from '../../components/TestCase/EndpointTestCase';

import {
  puppeteerTestCaseState,
  puppeteerTestCaseReducer,
  PuppeteerTestCaseContext,
} from '../../context/reducers/puppeteerTestCaseReducer';
import PuppeteerTestCase from '../../components/TestCase/PuppeteerTestCase';

import {
  MockDataContext,
  mockDataState,
  mockDataReducer,
} from '../../context/reducers/mockDataReducer';

import {
  AccTestCaseContext,
  accTestCaseState,
  accTestCaseReducer,
} from '../../context/reducers/accTestCaseReducer';
import AccTestCase from '../../components/TestCase/AccTestCase';

import {
  SecTestCaseContext,
  secTestCaseState,
  secTestCaseReducer,
} from '../../context/reducers/secTestCaseReducer';
import SecTestCase from '../../components/TestCase/SecTestCase';

import {
  VueTestCaseContext,
  vueTestCaseState,
  vueTestCaseReducer,
} from '../../context/reducers/vueTestCaseReducer';
import VueTestCase from '../../components/TestCase/VueTestCase';

import { GlobalContext } from '../../context/reducers/globalReducer';
import { setTestCase, toggleModal } from '../../context/actions/globalActions';
import { AiOutlineCloseCircle } from "react-icons/ai"
import { FaUniversalAccess, FaReact } from "react-icons/fa"
import { IoServer, IoLogoVue } from "react-icons/io5"
import { GiHook } from "react-icons/gi"
import { SiPuppeteer, SiRedux } from "react-icons/si"
import { MdSecurity } from "react-icons/md"

import { Button } from '@material-ui/core';


const TestFile = () => {
  let [{ testCase, isTestModalOpen }, dispatchToGlobal] = useContext(GlobalContext);
  const [mockData, dispatchToMockData] = useReducer(mockDataReducer, mockDataState);

  const [endpointTestCase, dispatchToEndpointTestCase] = useReducer(
    endpointTestCaseReducer,
    endpointTestCaseState
  );

  const [reduxTestCase, dispatchToReduxTestCase] = useReducer(
    reduxTestCaseReducer,
    reduxTestCaseState
  );
  const [hooksTestCase, dispatchToHooksTestCase] = useReducer(
    hooksTestCaseReducer,
    hooksTestCaseState
  );
  const [puppeteerTestCase, dispatchToPuppeteerTestCase] = useReducer(
    puppeteerTestCaseReducer,
    puppeteerTestCaseState
  );
  const [accTestCase, dispatchToAccTestCase] = useReducer(
    accTestCaseReducer,
    accTestCaseState
  );
  const [secTestCase, dispatchToSecTestCase] = useReducer(
    secTestCaseReducer,
    secTestCaseState
  );

  const closeTestModal = () => {
    dispatchToGlobal(toggleModal());
  };

  const handleToggle = (test) => {
    dispatchToGlobal(setTestCase(test));
    closeTestModal();
  };

  const modalStyles = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3,
    },
  };

  return (
    // landing modal which displays button choices
    <div>
      <ReactModal
        className={styles.modal}
        isOpen={isTestModalOpen}
        onRequestClose={closeTestModal}
        contentLabel='Save?'
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        overlayClassName={styles.modalOverlay}
      >
        <Draggable>
          <div id={styles.container}>
            <AiOutlineCloseCircle
              tabIndex={0}
              id={styles.escapeButton} 
              onKeyPress={closeTestModal}
              onClick={closeTestModal}
            />  
            <div id={styles.body}>
              <p id={styles.text}>What would you like to test?</p>
              <div id={styles.newTestButtons}>
                <Button 
                  variant="outlined" 
                  onClick={() => handleToggle('react')}
                >
                  <span>React</span>
                  <FaReact size={'1.25rem'}/>
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => handleToggle('hooks')}
                >
                  <span>Hooks</span>
                  <GiHook size={'1.25rem'}/>
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => handleToggle('puppeteer')}
                >
                  <span>Puppeteer</span>
                  <SiPuppeteer size={'1.25rem'}/>
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => handleToggle('redux')}
                >
                  <span>Redux</span>
                  <SiRedux size={'1.25rem'}/>
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => handleToggle('vue')}
                >
                  <span>Vue</span>
                  <IoLogoVue size={'1.25rem'}/>
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => handleToggle('endpoint')}
                >
                  <span>Endpoint</span>
                  <IoServer size={'1.25rem'}/>
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => handleToggle('acc')}
                >
                  <span>Accessibility</span>
                  <FaUniversalAccess size={'1.25rem'}/>
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => handleToggle('sec')}
                >
                  <span>Security</span>
                  <MdSecurity size={'1.25rem'}/>
                </Button>
              </div>
            </div>
          </div>
        </Draggable>
      </ReactModal>
      {/* instantiate context for each test option */}
      {testCase === 'redux' && (
        <section>
          <ReduxTestCaseContext.Provider value={[reduxTestCase, dispatchToReduxTestCase]}>
            <ReduxTestCase />
          </ReduxTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'react' && (
        <section>
          <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
            <ReactTestCase />
          </MockDataContext.Provider>
        </section>
      )}

      {testCase === 'endpoint' && (
        <section>
          <EndpointTestCaseContext.Provider value={[endpointTestCase, dispatchToEndpointTestCase]}>
            <EndpointTestCase />
          </EndpointTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'hooks' && (
        <section>
          <HooksTestCaseContext.Provider value={[hooksTestCase, dispatchToHooksTestCase]}>
            <HooksTestCase />
          </HooksTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'puppeteer' && (
        <section>
          <PuppeteerTestCaseContext.Provider
            value={[puppeteerTestCase, dispatchToPuppeteerTestCase]}
          >
            <PuppeteerTestCase />
          </PuppeteerTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'acc' && (
        <section>
          <AccTestCaseContext.Provider value={[accTestCase, dispatchToAccTestCase]}>
            <AccTestCase />
          </AccTestCaseContext.Provider>
        </section>
      )}
      {testCase === 'sec' && (
        <section>
          <SecTestCaseContext.Provider value={[secTestCase, dispatchToSecTestCase]}>
            <SecTestCase />
          </SecTestCaseContext.Provider>
        </section>
      )}
      {
        testCase === 'vue' && (
          <section>
            <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
              <VueTestCase />
            </MockDataContext.Provider>
          </section>
        )
      }

      {/* {testCase === '' && (
        <Fragment>
          <div id={styles.left}>
            <h2>Click on New Test below to get started!</h2>
          </div>
          <div id={styles.testMenu}>
            <div id={styles.left}>
              <button id={styles.newTestBtn} onClick={closeTestModal}>
                New Test +
              </button>
            </div>
          </div>
        </Fragment>
      )} */}
    </div>
  );
};

export default TestFile;