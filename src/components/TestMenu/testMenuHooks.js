import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { setTabIndex } from '../../context/actions/globalActions';

export function useToggleModal(test) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(test);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isFileDirectoryOpen }, dispatchToGlobal] = useContext(GlobalContext);

  const openModal = () => {
    setTitle(test);
    setIsModalOpen(true);
  };

  const openScriptModal = () => {
    setTitle(title);
    setIsModalOpen(true);
    dispatchToGlobal(setTabIndex(2));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle(test);
  };
  
  return {
    title, isModalOpen, openModal, openScriptModal, closeModal, setIsModalOpen
  };
}

export const validateInputs = (testSuite, testCaseState) => {
  let endpoint, assertion;
  const { serverFilePath, addDB, dbFilePath, endpointStatements } = testCaseState;
  switch (testSuite) {
    case 'endpoint':
      if (!serverFilePath || (addDB && !dbFilePath)) return false;
      for (endpoint of endpointStatements) {
        if (!endpoint.method || !endpoint.route) return false;
        for (assertion of endpoint.assertions) {
          if (!assertion.expectedResponse || !assertion.value || !assertion.matcher) return false;
        }
      }
      return true;
    case 'hooks':
      let hookTest, callback;
      for (hookTest of testCaseState) {
        if (!hookTest.hookFilePath || !hookTest.hook) return false;
        for (callback of hookTest.callbackFunc) {
          if (!callback.callbackFunc) {
            return false;
          }
        }
        for (assertion of hookTest.assertions) {
          if (!assertion.expectedState || !assertion.expectedValue || !assertion.matcher)
            return false;
        }
      }
      return true;
    default:
      return true;
  }
};
