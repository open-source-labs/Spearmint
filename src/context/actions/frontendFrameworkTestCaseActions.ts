/* ------------------------------ Action Types ------------------------------ */

// Actions for all front end frameworks, React, Solid, Svelete, and Vue can all use this because they
// function the same

import {
  UpdateActionProps,
  UpdateAssertionProps,
  CypressCommandStep,
  CypressTestActionStatement,
} from '../../utils/reactTestCase';

export const actionTypes = {
  ADD_DESCRIBE_BLOCK: 'ADD_DESCRIBE_BLOCK',
  DELETE_DESCRIBE_BLOCK: 'DELETE_DESCRIBE_BLOCK',
  UPDATE_DESCRIBE_TEXT: 'UPDATE_DESCRIBE_TEXT',
  UPDATE_DESCRIBE_ORDER: 'UPDATE_DESCRIBE_ORDER',

  ADD_ITSTATEMENT: 'ADD_ITSTATEMENT',
  DELETE_ITSTATEMENT: 'DELETE_ITSTATEMENT',
  UPDATE_ITSTATEMENT_TEXT: 'UPDATE_ITSTATEMENT_TEXT',
  UPDATE_ITSTATEMENT_ORDER: 'UPDATE_ITSTATEMENT_ORDER',

  ADD_ACTION: 'ADD_ACTION',
  DELETE_ACTION: 'DELETE_ACTION',
  UPDATE_ACTION: 'UPDATE_ACTION',

  //!Cypress Actions
  ADD_CYPRESS_ACTION_STEP: 'ADD_CYPRESS_ACTION_STEP',
  UPDATE_CYPRESS_ACTION_STEP: 'UPDATE_CYPRESS_ACTION_STEP',
  DELETE_CYPRESS_ACTION_STEP: 'DELETE_CYPRESS_ACTION_STEP',
  REORDER_CYPRESS_ACTION_STEPS: 'REORDER_CYPRESS_ACTION_STEPS', // not implemented yet, I have a rough outline in reducer for this

  ADD_ASSERTION: 'ADD_ASSERTION',
  DELETE_ASSERTION: 'DELETE_ASSERTION',
  UPDATE_ASSERTION: 'UPDATE_ASSERTION',

  ADD_RENDER: 'ADD_RENDER',
  DELETE_RENDER: 'DELETE_RENDER',
  UPDATE_RENDER_COMPONENT: 'UPDATE_RENDER_COMPONENT',

  ADD_PROP: 'ADD_PROP',
  DELETE_PROP: 'DELETE_PROP',
  UPDATE_PROP: 'UPDATE_PROP',

  //! NEW CONDITIONAL RENDER VISIT URL INPUT
  UPDATE_RENDER_URL: 'UPDATE_RENDER_URL',
  DELETE_RENDER_URL: 'DELETE_RENDER_URL',
  ADD_VISIT: 'ADD_VISIT',
  UPDATE_VISIT: 'UPDATE_VISIT',

  CREATE_NEW_TEST: 'CREATE_NEW_TEST',
  OPEN_INFO_MODAL: 'OPEN_INFO_MODAL',
  CLOSE_INFO_MODAL: 'CLOSE_INFO_MODAL',
  REPLACE_TEST: 'REPLACE_TEST',
  RESET_TESTS: 'RESET_TESTS',
};

/* --------------------------------- Actions -------------------------------- */

export const addDescribeBlock = () => {
  return {
    type: actionTypes.ADD_DESCRIBE_BLOCK,
  };
};

export const deleteDescribeBlock = (describeId: string) => {
  return {
    type: actionTypes.DELETE_DESCRIBE_BLOCK,
    describeId,
  };
};

export const updateDescribeText = (text: string, describeId: string) => ({
  type: actionTypes.UPDATE_DESCRIBE_TEXT,
  text,
  describeId,
});

export const updateDescribeOrder = (reorderedDescribe: string[]) => ({
  type: actionTypes.UPDATE_DESCRIBE_ORDER,
  reorderedDescribe,
});

// not being imported anywhere?
export const addItstatement = (describeId: string) => ({
  type: actionTypes.ADD_ITSTATEMENT,
  describeId,
});

export const deleteItStatement = (describeId: string, itId: string) => ({
  type: actionTypes.DELETE_ITSTATEMENT,
  describeId,
  itId,
});

export const updateItStatementText = (text: string, itId: string) => ({
  type: actionTypes.UPDATE_ITSTATEMENT_TEXT,
  itId,
  text,
});

export const updateItStatementOrder = (
  reorderedIt: string[],
  describeId: string
) => ({
  type: actionTypes.UPDATE_ITSTATEMENT_ORDER,
  reorderedIt,
  describeId,
});

export const addAction = (describeId: string, itId: string) => ({
  type: actionTypes.ADD_ACTION,
  describeId,
  itId,
});

export const deleteAction = (statementId: string) => ({
  type: actionTypes.DELETE_ACTION,
  statementId,
});

//** After we update an action field we land here.
//** */ we build the final action object that gets dispatched*/

export const updateAction = ({
  id,
  eventType,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
  suggestions,
}: UpdateActionProps) => ({
  type: actionTypes.UPDATE_ACTION,
  id,
  eventType,
  eventValue,
  queryVariant,
  querySelector,
  queryValue,
  suggestions,
});

// Add a new step to an existing action block
export function addCypressActionStep(
  actionId: string,
  step: CypressCommandStep
) {
  return {
    type: actionTypes.ADD_CYPRESS_ACTION_STEP,
    actionId,
    step,
  };
}
// Update a single field of an existing step
export function updateCypressActionStep(
  actionId: string,
  stepId: string,
  field: keyof CypressCommandStep,
  value: string
) {
  return {
    type: actionTypes.UPDATE_CYPRESS_ACTION_STEP,
    actionId,
    stepId,
    field,
    value,
  };
}
// Delete a step by ID
export function deleteCypressActionStep(actionId: string, stepId: string) {
  return {
    type: actionTypes.DELETE_CYPRESS_ACTION_STEP,
    actionId,
    stepId,
  };
}

// export function reorderCypressActionSteps(
//   actionId: string,
//   newOrder: string[] // array of step IDs in the new order
// ) {
//   return {
//     type: actionTypes.REORDER_CYPRESS_ACTION_STEPS,
//     actionId,
//     newOrder
//   };
// }

export const addAssertion = (describeId: string, itId: string) => ({
  type: actionTypes.ADD_ASSERTION,
  describeId,
  itId,
});

export const deleteAssertion = (statementId: string) => ({
  type: actionTypes.DELETE_ASSERTION,
  statementId,
});

export const updateAssertion = ({
  id,
  queryVariant,
  querySelector,
  queryValue,
  isNot,
  matcherType,
  matcherValue,
  suggestions,
  selectorMethod,
  selectorValue,
}: UpdateAssertionProps) => ({
  type: actionTypes.UPDATE_ASSERTION,
  id,
  queryVariant,
  querySelector,
  queryValue,
  isNot,
  matcherType,
  matcherValue,
  suggestions,
  selectorMethod,
  selectorValue,
});

export const addRender = (describeId: string, itId: string) => ({
  type: actionTypes.ADD_RENDER,
  describeId,
  itId,
});

export const deleteRender = (statementId: string) => ({
  type: actionTypes.DELETE_RENDER,
  statementId,
});

export const updateRenderComponent = (
  componentName: string,
  filePath: string
) => ({
  type: actionTypes.UPDATE_RENDER_COMPONENT,
  componentName,
  filePath,
});

export const addProp = (statementId: string) => ({
  type: actionTypes.ADD_PROP,
  statementId,
});

export const deleteProp = (statementId: string, id: string) => {
  return {
    type: actionTypes.DELETE_PROP,
    id,
    statementId,
  };
};

export const updateProp = (
  statementId: string,
  id: string,
  propKey: string,
  propValue: string
) => ({
  type: actionTypes.UPDATE_PROP,
  id,
  statementId,
  propKey,
  propValue,
});

// action creators
//! NEW ACTION CREATOR FOR BOTH KEY AND VALUE CHANGE
export const updateRenderUrl = (
  statementId: string,
  id: string,
  visitKey: string,
  visitValue: string
) => ({
  type: actionTypes.UPDATE_RENDER_URL,
  statementId,
  id,
  visitKey,
  visitValue,
});
// console.log('Reducer, Incoming action:', action);
// console.log('Reducer, Current statement:', statement);

// export const updateCypressAction = (
//   id: string,
//   commandChain: CypressCommandStep[]
// ) => ({
//   type: actionTypes.UPDATE_COMMAND_CHAIN,
//   id,
//   commandChain,
// });

//! NEW ACTION CREATOR FOR DELETING COMPONENT
export const deleteRenderUrl = (statementId: string, id: string) => {
  return {
    type: actionTypes.DELETE_RENDER_URL,
    id,
    statementId,
  };
};

export const createNewTest = () => ({
  type: actionTypes.CREATE_NEW_TEST,
});

export const openInfoModal = () => {
  return { type: actionTypes.OPEN_INFO_MODAL };
};

export const closeInfoModal = () => {
  return { type: actionTypes.CLOSE_INFO_MODAL };
};

// -------- NOT IMPORTED IN ANY FILES ---------------
// export const reactReplaceTest = (testState) => ({
//   type: actionTypes.REPLACE_TEST,
//   testState,
// });

// export const svelteReplaceTest = (testState) => ({
//   type: actionTypes.REPLACE_TEST,
//   testState,
// });

// export const vueReplaceTest = (testState) => ({
//   type: actionTypes.REPLACE_TEST,
//   testState,
// });

export const resetTests = () => ({
  type: actionTypes.RESET_TESTS,
});
