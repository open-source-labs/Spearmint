import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react';

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
import Render from '../components/UpdatedReactTestComponent/Render/Render';
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

export const RTFsContexts = createContext();

const RTFsContextsProvider = ({ children }) => {
  const [reactTestFileState, rTFDispatch] = useReducer(
    reactTestFileReducer,
    initialReactTestFileState
  );

  const setChildrenComponents = (
    parent
    //, extraClauses = {}
  ) => {
    let setupTeardownBlock = '';
    const arrayOfChildComponents = [];
    Object.values(parent.children).forEach((childComponent: object) => {
      switch (childComponent['objectType']) {
        case 'describe':
          arrayOfChildComponents.push(
            <DescribeBlock
              blockObjectsState={childComponent}
              key={childComponent.filepath}
            />
          );
        case 'setupTeardown':
          setupTeardownBlock = (
            <SetupTeardownBlock
              blockObjectsState={childComponent}
              key={childComponent.filepath}
            />
          );
        case 'test':
          arrayOfChildComponents.push(
            <TestBlock
              blockObjectsState={childComponent}
              key={childComponent.filepath}
            />
          );
        case 'statement':
          if (
            childComponent['statementType'] === 'render' //&&
            //(!extraClauses || !extraClauses['setupTeardownExist'])
          ) {
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
      /*if (childComponent['objectType'] === 'describe') {
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
      }*/
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

  const handleAddBlock = useCallback(
    (
      e: React.SyntheticEvent,
      objectType: String,
      addObjectToWhere: String //filepath
    ) => {
      const newObjectsKey = uid(8);
      rTFDispatch(
        addObjectToStateObject(objectType, addObjectToWhere, newObjectsKey)
      );
    },
    []
  );

  const handleChange = useCallback(
    (
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
    },
    []
  );

  const handleDeleteBlock = useCallback(
    (
      parentsFilepath: String, //filepath
      targetsKey: String //parentsFilepath
    ) => {
      rTFDispatch(deleteObjectFromStateObject(parentsFilepath, targetsKey));
    },
    []
  );

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

export const useRTFsContexts = () => {
  return useContext(RTFsContexts);
};

export default RTFsContextsProvider;