/* eslint-disable linebreak-style */
import React, { useContext, useReducer, Fragment } from 'react';
import ReactModal from 'react-modal';
import styles from '../../components/Modals/Modal.module.scss';
// A simple JavaScript utility for conditionally joining classNames together
import cn from 'classnames';
import Draggable from 'react-draggable';

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

import { GlobalContext } from '../../context/reducers/globalReducer';
import { setTestCase, toggleModal } from '../../context/actions/globalActions';

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
      zIndex: 3,
    },
  };

  const styleOverrides = {
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    content: {
      bottom: "unset",
      overflow: "visible",
      padding: 0,
      border: "none",
      borderRadius: 0,
      position: "static",
      background: "none",
      pointerEvents: "none"
    }
  };

  const DraggableModal = ({
    isTestModalOpen,
    children,
    onRequestClose,
    defaultPosition,
    onDragStop
  }) => {
    return (
      <ReactModal
        onRequestClose={closeTestModal}
        isOpen={isTestModalOpen}
        style={styleOverrides}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <Draggable handle=".handle" >

            <React.Fragment>
              <div className="handle" 
                style={handle 
                  {
                    height: 10px;
                    background: #ddd;
                    border-bottom: 5px solid white;
                    cursor: move;
                    width: 200%;
                    margin-left: -50%;
                  }
                }/>
              {children}
            </React.Fragment>

        </Draggable>
      </ReactModal>
    );
  };

  return (
    // landing modal which displays button choices

            
              <DraggableModal isTestModalOpen>

                <div id={styles.title}>

                  <p style={{ fontSize: 15 }}>Test</p>

                </div>

              </DraggableModal>
  );
};

export default TestFile;
