import { useState } from 'react';

export function useToggleModal(test) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(test);

  const openModal = () => {
    setTitle('New Test');
    setIsModalOpen(true);
  };

  const openScriptModal = () => {
    setTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle(test);
  };

  return { title, isModalOpen, openModal, openScriptModal, closeModal };
}

export const validateInputs = (testSuite, testCaseState) => {
  switch (testSuite) {
    case 'endpoint':
      const { serverFilePath, addDB, dbFilePath, endpointStatements } = testCaseState;
      let endpoint, assertion;
      if (!serverFilePath || (addDB && !dbFilePath)) return false;
      for (endpoint of endpointStatements) {
        if (!endpoint.method || !endpoint.route) return false;
        for (assertion of endpoint.assertions) {
          if (!assertion.expectedResponse || !assertion.value || !assertion.matcher) return false;
        }
      }
      return true;
    default:
  }
};
