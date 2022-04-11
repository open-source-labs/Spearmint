/* eslint-disable linebreak-style */
import React, { useContext, useReducer, Fragment } from 'react';
import ReactModal from 'react-modal';
let styles = {};
import modalStyles from '../../components/Modals/Modal.module.scss';
import testStyles from './TestFile.module.scss'
Object.assign(styles, modalStyles, testStyles)
// import styles from '../../components/Modals/Modal.module.scss';

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

import {
  SvelteTestCaseContext,
  SvelteTestCaseState,
  SvelteTestCaseReducer
} from '../../context/reducers/svelteTestCaseReducer';
import SvelteTestCase from '../../components/TestCase/SvelteTestCase';

import { GlobalContext } from '../../context/reducers/globalReducer';
import { AiOutlineCloseCircle } from "react-icons/ai"
import { FaUniversalAccess, FaReact } from "react-icons/fa"
import { IoServer, IoLogoVue } from "react-icons/io5"
import { GiHook } from "react-icons/gi"
import { SiPuppeteer, SiRedux, SiSvelte } from "react-icons/si"
import { MdSecurity } from "react-icons/md"

import { Button } from '@material-ui/core';
import TestCard from './TestCard';
import {
    updateFile,
    setFilePath,
    toggleRightPanel,
    setTestCase, 
    toggleModal,
    setTabIndex,
} from '../../context/actions/globalActions';

import { IconContext } from "react-icons";
import { AiFillCloseSquare } from "react-icons/ai"


const TestFile = () => {
  let [{ testCase, isTestModalOpen, projectFilePath, file, exportBool, theme }, dispatchToGlobal] = useContext(GlobalContext);
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
  const [SvelteTestCase, dispatchToSvelteTestCase] = useReducer(
    SvelteTestCaseReducer,
    SvelteTestCaseState
  )

  const closeTestModal = () => {
    dispatchToGlobal(toggleModal());
  };

  const handleToggle = (test) => {
    dispatchToGlobal(setTestCase(test));
    closeTestModal();
  };

  const chooseTest = (test) => {
    dispatchToGlobal(setTestCase(test));
  };

  const modalStyles = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3,
    },
  };

  const testMappings = {
    'react': [<FaReact size={'1.25rem'}/>, 'React', 
              'Test React with rendering, actions, and assertions found in the React Testing Library'],
    'hooks': [<GiHook size={'1.25rem'}/>, 'Hooks', 
              'Make assertions to test your React hooks with available hook parameters and callback functions'],
    'puppeteer': [<SiPuppeteer size={'1.25rem'}/>, 'Puppeteer',
                  'Use the puppeteer node library to conduct headless browser testing on the Chrome Browser'],
    'redux': [<SiRedux size={'1.25rem'}/>, 'Redux', 
              'Test the pure functions of your Redux reducers, asynchronous and synchronous action creators, and the middleware logic'],
    'vue': [<IoLogoVue size={'1.25rem'}/>, 'Vue',
            'Vue tests allow for testing mounted Vue instances and single page components with Vue Test Utils'],
    'endpoint': [<IoServer size={'1.25rem'}/>, 'Endpoint',
                  'Make sure your HTTP routes are getting the correct response by testing your server with Supertest'],
    // 'acc': [<FaUniversalAccess size={'1.25rem'}/>, 'Accessibility',
    //         'Maintain a good accessibility score by testing the various attributes of your website'],
    'sec': [<MdSecurity size={'1.25rem'}/>, 'Security',
            'Evaluate security vulnerabilities using Synk'],

    'svelte': [<SiSvelte size={'1.25rem'}/>, 'Svelte',
            'Newly added Svelte testing' ],
  }

  const allButtons = (Object.keys(testMappings)).map((elem, idx) => {
    return (
      <Button 
        variant="outlined" 
        onClick={() => handleToggle(elem)}
        key={idx}
      >
        <span>{testMappings[elem][1]}</span>
        {testMappings[elem][0]}
      </Button>
    );
  })

  const allCards = (Object.keys(testMappings)).map((elem, idx) => {
    return (
      <TestCard 
        icon={testMappings[elem][0]}
        type={testMappings[elem][1]}
        description={testMappings[elem][2]}
        onClick={() => chooseTest(elem)}
        key={idx}
      />
    );
  })

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
        overlayClassName={styles[`modalOverlay${theme}`]}
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
              {allButtons}
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
        <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
          <ReactTestCase />
        </MockDataContext.Provider>
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

      {/* {testCase === 'acc' && (
        <section>
          <AccTestCaseContext.Provider value={[accTestCase, dispatchToAccTestCase]}>
            <AccTestCase />
          </AccTestCaseContext.Provider>
        </section>
      )} */}
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

      {testCase === 'svelte' && (
        <section>
          <MockDataCaseContext.Provider value={[mockData, dispatchToSvelteTestCase]}>
            <SvelteTestCase />
          </MockDataCaseContext.Provider >
        </section>
      )}

      {testCase === '' && (
          <Fragment>
            <div id={styles.testFileContainer}>
              <p id={styles.chooseTest}>CHOOSE A TEST</p>
              <div id={styles.testCardsContainer}>
                {allCards}
              </div>
            </div>
          </Fragment>
      )}
    </div>
  );
};

export default TestFile;