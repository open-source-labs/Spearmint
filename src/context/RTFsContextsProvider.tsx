import React, { createContext, useReducer } from 'react';

import {
  reactTestFileReducer,
  initialReactTestFileState,
} from './reducers/updatedReactTestCaseReducer';
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

  const handleAddBlock = (
    e: React.SyntheticEvent,
    objectType: String,
    addObjectToWhere: String //filepath
  ) => {
    console.log('entered handle add');
    const newObjectsKey = uid(8);
    console.log('newObjectsKey', newObjectsKey);
    rTFDispatch(
      addObjectToStateObject(objectType, addObjectToWhere, newObjectsKey)
    );
  };

  const handleChange = (
    e: React.SyntheticEvent,
    propertyToUpdate: String,
    pathToTargetStateObject: String
  ): void => {
    const target = e.target as HTMLButtonElement;
    const value = target.value;
    rTFDispatch(
      updateObjectInStateObject(
        pathToTargetStateObject,
        propertyToUpdate,
        value
      )
    );
  };

  const handleDeleteBlock = (
    pathToObjectToDelete: String, //filepath
    pathToObjectsParent: String //parentsFilepath
  ) => {
    rTFDispatch(
      deleteObjectFromStateObject(pathToObjectToDelete, pathToObjectsParent)
    );
  };

  return (
    <RTFsContexts.Provider
      value={{
        reactTestFileState,
        rTFDispatch,
        handleAddBlock,
        handleChange,
        handleDeleteBlock,
      }}
    >
      {children}
    </RTFsContexts.Provider>
  );
};

export default RTFsContextsProvider;
