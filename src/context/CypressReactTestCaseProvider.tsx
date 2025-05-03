import React, { createContext, useReducer } from 'react';
import { cypressReactTestCaseReducer } from '../context/reducers/cypressReactTestCaseReducer'; // reducer logic
import { initialCypressReactTestCaseState } from '../context/reducers/cypressReactTestCaseReducer';
import { CypressReactTestCaseTypes, ReactReducerAction } from '../utils/cypressReactTypes'; // Types for context and reducer

export const CypressReactTestCaseContext = createContext<
// holds the state of type CypressReactTestCaseTypes
// dispatch function which accepts actions of type ReactReducerAction
  [CypressReactTestCaseTypes, React.Dispatch<ReactReducerAction>]
>([initialCypressReactTestCaseState, () => null]);
// above creates a new react context
// it ensures any component that useContext(CypressReactTestCaseContext) will get [state, dispatch] typed correctly

export const CypressReactTestCaseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cypressReactTestCaseReducer,
    initialCypressReactTestCaseState
  );

  return (
    <CypressReactTestCaseContext.Provider value={[state, dispatch]}>
      {children}
    </CypressReactTestCaseContext.Provider>
  );
};
