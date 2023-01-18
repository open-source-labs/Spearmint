import React, { useContext, useReducer, Fragment } from 'react';
let styles = {};
import modalStyles from '../../components/Modals/Modal.module.scss';
import testStyles from './TestFile.module.scss'
Object.assign(styles, modalStyles, testStyles)

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

import VueTestCase from '../../components/TestCase/VueTestCase';

import SvelteTestCase from '../../components/TestCase/SvelteTestCase';

import SolidTestCase from '../../components/TestCase/SolidTestCase';

import {
  DenoTestCaseContext,
  denoTestCaseState, 
  denoTestCaseReducer
} from '../../context/reducers/denoTestCaseReducer';
import DenoTestCase from '../../components/TestCase/DenoTestCase'


import {
  GraphQLTestCaseContext,
  graphQLTestCaseState,
  graphQLTestCaseReducer
} from '../../context/reducers/graphQLTestCaseReducer';
import GraphQLTestCase from '../../components/TestCase/GraphQLTestCase';

import { GlobalContext } from '../../context/reducers/globalReducer';
import { FaUniversalAccess, FaReact } from "react-icons/fa"
import { IoServer, IoLogoVue } from "react-icons/io5"
import { GiHook } from "react-icons/gi"
import { SiPuppeteer, SiRedux, SiSvelte, SiGraphql, SiDeno } from "react-icons/si"
import { MdSecurity } from "react-icons/md"
import TestCard from './TestCard';
import {
    updateFile,
    setFilePath,
    toggleRightPanel,
    setTestCase, 
    toggleModal,
    setTabIndex,
} from '../../context/actions/globalActions';

const TestFile = ({accTestType, handleAccChange}) => {
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
  const [graphQLTestCase, dispatchToGraphQLTestCase] = useReducer(
    graphQLTestCaseReducer,
    graphQLTestCaseState
  );

  const [denoTestCase, dispatchToDenoTestCase] = useReducer(
    denoTestCaseReducer,
    denoTestCaseState
  );

  const filterFileType = (files, acceptedFileTypes) => {
    // files is an array of the keys in filePathMap
    const output = [];
    for (let file of files) {
      const splitName =  file.split('.');
      const fileType = splitName[splitName.length - 1];
      if(acceptedFileTypes.includes(fileType)) output.push(file);
    }
    return output;
  }

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

  const cardSize = '1rem';

  const testMappings = {
    'react': [<FaReact size={cardSize}/>, 'React'],         
    'redux': [<SiRedux size={cardSize}/>, 'Redux'],
    'svelte': [<SiSvelte size={cardSize}/>, 'Svelte'],
    'solid': [<>
                <svg fill="white" width={cardSize} height={cardSize} viewBox='-3 0 27 27'>
                  <path d="M11.558.788A9.082 9.082 0 0 0 9.776.99l-.453.15c-.906.303-1.656.755-2.1 1.348l-.301.452-2.035 3.528c.426-.387.974-.698 1.643-.894h.001l.613-.154h.001a8.82 8.82 0 0 1 1.777-.206c2.916-.053 6.033 1.148 8.423 2.36 2.317 1.175 3.888 2.32 3.987 2.39L24 5.518c-.082-.06-1.66-1.21-3.991-2.386-2.393-1.206-5.521-2.396-8.45-2.343zM8.924 5.366a8.634 8.634 0 0 0-1.745.203l-.606.151c-1.278.376-2.095 1.16-2.43 2.108-.334.948-.188 2.065.487 3.116.33.43.747.813 1.216 1.147L12.328 10h.001a6.943 6.943 0 0 1 6.013 1.013l2.844-.963c-.17-.124-1.663-1.2-3.91-2.34-2.379-1.206-5.479-2.396-8.352-2.344zm5.435 4.497a6.791 6.791 0 0 0-1.984.283L2.94 13.189 0 18.334l9.276-2.992a6.945 6.945 0 0 1 7.408 2.314v.001c.695.903.89 1.906.66 2.808l2.572-4.63c.595-1.041.45-2.225-.302-3.429a6.792 6.792 0 0 0-5.255-2.543zm-3.031 5.341a6.787 6.787 0 0 0-2.006.283L.008 18.492c.175.131 2.02 1.498 4.687 2.768 2.797 1.332 6.37 2.467 9.468 1.712l.454-.152h.002c1.278-.376 2.134-1.162 2.487-2.09.353-.93.207-2.004-.541-2.978a6.791 6.791 0 0 0-5.237-2.548z"></path>
                </svg>
              </>, 'Solid'],
    'hooks': [<GiHook size={cardSize}/>, 'Hooks'],
    'vue': [<IoLogoVue size={cardSize}/>, 'Vue'],
    'deno': [<SiDeno size={cardSize}/>, 'Deno'],
    'puppeteer': [<SiPuppeteer size={cardSize}/>, 'Puppeteer'],
    'endpoint': [<IoServer size={cardSize}/>, 'Endpoint'],
    'acc': [<FaUniversalAccess size={cardSize}/>, 'Accessibility'],
    'sec': [<MdSecurity size={cardSize}/>, 'Security'],
    'graphQL': [<SiGraphql size={cardSize}/>, 'GraphQL'],
  }

  const allCards = (Object.keys(testMappings)).map((elem, idx) => {
    return (
      <TestCard 
        icon={testMappings[elem][0]}
        type={testMappings[elem][1]}
        onClick={() => chooseTest(elem)}
        key={idx}
      />
    );
  })

  return (
    // Displays each interactable test case EX: React, Redux, Svelte, Deno, Etc.
    <div>
      {/* instantiate context for each test option */}
      {testCase === 'redux' && (
        <section>
          <ReduxTestCaseContext.Provider value={[reduxTestCase, dispatchToReduxTestCase]}>
            <ReduxTestCase/>
          </ReduxTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'react' && (
        <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
          <ReactTestCase filterFileType = {filterFileType}/>
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


      {testCase === 'acc' && (
        <section>
          <AccTestCaseContext.Provider value={[accTestCase, dispatchToAccTestCase]}>
            <AccTestCase 
            accTestType={accTestType}
            handleAccChange={handleAccChange}/>
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
              <VueTestCase filterFileType = {filterFileType} />
            </MockDataContext.Provider>
          </section>
        )
      }

      {testCase === 'svelte' && (
        <section>
          <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
            <SvelteTestCase filterFileType = {filterFileType} />
          </MockDataContext.Provider >
        </section>
      )}

      {testCase === 'graphQL' && (
        <section>
          <GraphQLTestCaseContext.Provider value={[graphQLTestCase, dispatchToGraphQLTestCase]}>
            <GraphQLTestCase filterFileType = {filterFileType} />
          </GraphQLTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'solid' && (
        <section>
          <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
            <SolidTestCase filterFileType = {filterFileType} />
          </MockDataContext.Provider >
        </section>
      )}

      {testCase === 'deno' && (
        <section>
          <DenoTestCaseContext.Provider value={[denoTestCase, dispatchToDenoTestCase]}>
            <DenoTestCase filterFileType = {filterFileType} />
          </DenoTestCaseContext.Provider>
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