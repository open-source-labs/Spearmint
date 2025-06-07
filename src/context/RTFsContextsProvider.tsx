import React, { createContext, useReducer, useContext } from 'react';

import {
  reactTestFileReducer,
  initialReactTestFileState,
} from './reducers/updatedReactTestCaseReducer';
import { styles as modalStyles } from '../Modals/Modal.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConfirmDialogue from '../context/errorHandle/ConfirmDialogue';

import DescribeBlock from '../components/UpdatedReactTestComponent/DescribeBlock/DescribeBlock';
import SetupTeardownBlock from '../components/UpdatedReactTestComponent/SetupTeardownBlock/SetupTeardownBlock';
import TestBlock from '../components/UpdatedReactTestComponent/TestBlock/TestBlock';
import Render from '../components/UpdatedReactTestComponent/Render/NOT_USED_Render';
import Props from '../components/UpdatedReactTestComponent/Render/Prop';
import Action from '../components/UpdatedReactTestComponent/Action/Action';
import Assertion from '../components/UpdatedReactTestComponent/Assertion/Assertion';

import {
  updateRenderComponent,
  addObjectToStateObject,
  updateObjectInStateObject,
  deleteObjectFromStateObject,
} from '../context/actions/updatedFrontendFrameworkTestCaseActions';
import { uid } from 'uid';
import { GlobalContext } from './reducers/globalReducer';

export const RTFsContexts = createContext();

const RTFsContextsProvider = ({ children }) => {
  const [reactTestFileState, rTFDispatch] = useReducer(
    reactTestFileReducer,
    initialReactTestFileState
  );
  const [{ testFramework }] = useContext(GlobalContext);
  console.log(
    '[RTFsContextProvider] testFramework from GlobalContext:',
    testFramework
  );

  const setChildrenComponents = (
    parent
    //, extraClauses = {}
  ) => {
    let setupTeardownBlock = '';
    const arrayOfChildComponents = [];
    Object.values(parent.children).forEach((childComponent: object) => {
      if (childComponent['objectType'] === 'describe') {
        arrayOfChildComponents.push(
          <DescribeBlock
            blockObjectsState={childComponent}
            key={childComponent.filepath}
          />
        );
      } else if (
        childComponent['objectType'] === 'setupTeardown' //&&
        //(!extraClauses || !extraClauses['setupTeardownExist'])
      ) {
        setupTeardownBlock = (
          <SetupTeardownBlock
            blockObjectsState={childComponent}
            key={childComponent.filepath}
          />
        );
        //setHasSetupTeardown(true);
      } else if (childComponent['objectType'] === 'test') {
        arrayOfChildComponents.push(
          <TestBlock
            blockObjectsState={childComponent}
            key={childComponent.filepath}
          />
        );
      } else if (childComponent['objectType'] === 'statement') {
        if (
          childComponent['statementType'] === 'render' //&&
          //(!extraClauses || !extraClauses['setupTeardownExist'])
        ) {
          if (childComponent['type'] === 'visit') {
            console.log('Rendering a Cypress visit statement:', childComponent);
          }
          arrayOfChildComponents.push(
            <Render
              blockObjectsState={childComponent}
              key={childComponent.filepath}
            />
          );
          //setHasSetupTeardown(true);
        } else if (childComponent['statementType'] === 'action') {
          arrayOfChildComponents.push(
            <Action
              blockObjectsState={childComponent}
              key={childComponent.filepath}
            />
          );
        } else if (childComponent['statementType'] === 'assertion') {
          arrayOfChildComponents.push(
            <Assertion
              blockObjectsState={childComponent}
              key={childComponent.filepath}
            />
          );
        }
      }
    });
    return { setupTeardownBlock, arrayOfChildComponents };
  };

  const giveAccordionFunctionality = (arrayOfComponents) => {
    return arrayOfComponents.map((component) => {
      <Accordion hidden={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={styles.accordionSummary}
        >
          {component.props.filepath}
        </AccordionSummary>
        <AccordionDetails id={styles.configGuide}>{component}</AccordionDetails>
      </Accordion>;
    });
  };

  const handleAddBlock = (
    e: React.SyntheticEvent,
    objectType: string,
    addObjectToWhere: string // filepath
  ) => {
    const newObjectsKey = uid(8);

    // what is subType?
    console.log(
      '[RTFsContext] testFramework from GlobalContext:',
      testFramework
    );

    const subType =
      objectType === 'render' && testFramework === 'cypress'
        ? 'visit'
        : undefined;
    console.log('subType in RTFsC:', subType);

    rTFDispatch(
      addObjectToStateObject(
        objectType,
        addObjectToWhere,
        newObjectsKey,
        subType
      )
    );
  };

  const handleChange = (
    pathToTargetStateObject: String,
    propertyToUpdate: String,
    updatedValue: String
  ): void => {
    rTFDispatch(
      updateObjectInStateObject(
        pathToTargetStateObject,
        propertyToUpdate,
        updatedValue
      )
    );
  };

  const handleDeleteBlock = (
    parentsFilepath: String, //filepath
    targetsKey: String //parentsFilepath
  ) => {
    rTFDispatch(deleteObjectFromStateObject(parentsFilepath, targetsKey));
  };

  return (
    <RTFsContexts.Provider
      value={{
        reactTestFileState,
        rTFDispatch,
        DescribeBlock,
        SetupTeardownBlock,
        TestBlock,
        Render,
        Props,
        Action,
        Assertion,
        setChildrenComponents,
        handleAddBlock,
        handleChange,
        handleDeleteBlock,
        Accordion,
        AccordionSummary,
        AccordionDetails,
      }}
    >
      {children}
    </RTFsContexts.Provider>
  );
};

export default RTFsContextsProvider;
