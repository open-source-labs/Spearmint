import { createContext } from 'react';
// Importing types for the Security Test Case state and actions
import { SecTestCaseState, Action } from '../../utils/secTypes';
// Importing action types for the Security Test Case reducer
import { actionTypes } from '../actions/secTestCaseActions';

/**
 * Interface for the Security Test Case Context
 * This defines the structure of the context used for managing global state related to security tests.
 */
interface secContext {
  isFileDirectoryOpen: null | boolean; // Tracks whether the file directory is open
  theme: null | string; // Tracks the current theme (e.g., light or dark mode)
  dispatchToGlobal: (n: number) => void; // Function to dispatch actions to the global reducer
}

// Creating the Security Test Case Context
// This context is used to provide and consume state related to security tests across the application.
export const SecTestCaseContext: any = createContext([]);

/* ------------------------- Security Test Case State ------------------------ */

/**
 * Initial State for Security Test Cases
 * This defines the default state for the Security Test Case reducer.
 */
export const secTestCaseState: SecTestCaseState = {
  modalOpen: true, // Tracks whether the informational modal is open
};

/* ------------------------- Security Test Case Reducer ------------------------ */

/**
 * Security Test Case Reducer
 * This reducer function handles actions related to the Security Test Case state.
 * It updates the state based on the action type dispatched.
 *
 * @param {SecTestCaseState} state - The current state of the Security Test Case.
 * @param {Action} action - The action dispatched to update the state.
 * @returns {SecTestCaseState} - The updated state after applying the action.
 */
export const secTestCaseReducer = (state: SecTestCaseState, action: Action) => {
  switch (action.type) {
    // Handle the action to open the informational modal
    case actionTypes.OPEN_INFO_MODAL: {
      return {
        ...state, // Spread the current state to preserve other properties
        modalOpen: true, // Set the modalOpen property to true
      };
    }

    // Handle the action to close the informational modal
    case actionTypes.CLOSE_INFO_MODAL: {
      return {
        ...state, // Spread the current state to preserve other properties
        modalOpen: false, // Set the modalOpen property to false
      };
    }

    // Default case: return the current state if the action type is not recognized
    default:
      return state;
  }
};