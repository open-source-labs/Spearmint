import React, { useContext } from 'react';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import { ReactTestComponentAssertion } from '../../../utils/reactTestCase';
import {
  addCypressActionStep,
  updateCypressActionStep,
  deleteCypressActionStep,
  deleteAction,
} from '../../../context/actions/frontendFrameworkTestCaseActions';

import CommandStep from '../Action/commandStep';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@mui/material';

// import AutoComplete from '../../AutoComplete/AutoComplete';
import styles from '../Action/CypressAction.module.scss';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { CypressCommandStep } from '../../../utils/reactTestCase';

const CypressAction = ({
  statement,
  statementId,
}: ReactTestComponentAssertion): JSX.Element => {
  const [{ statements }, dispatchToReactTestCase] =
    useContext(ReactTestCaseContext); // [describe, it, action ] blocks.. reactTestCaseReducer

  const [{ theme }] = useContext(GlobalContext);

  // add a new step
  const handleAddStep = () => {
    const newStep: CypressCommandStep = {
      selectorType: 'get',
      selectorValue: '',
      actionType: '',
      actionValue: '',
      // id is left undefined on purpose, its generated in the reducer
    };
    dispatchToReactTestCase(addCypressActionStep(statementId, newStep));
  };

  // Update one field of a step
  const handleUpdateStep = (
    stepId: string,
    field: keyof CypressCommandStep,
    value: string
  ) => {
    console.log('handleUpdateStep:', { stepId, field, value });
    dispatchToReactTestCase(
      updateCypressActionStep(statementId, stepId, field, value)
    );
  };

  // Delete a step by its ID
  const handleDeleteStep = (stepId: string) => {
    dispatchToReactTestCase(deleteCypressActionStep(statementId, stepId));
  };

  // Delete the entire action block
  const handleDeleteAction = () => {
    dispatchToReactTestCase(deleteAction(statement.id));
  };

  return (
    <div id={styles[`action${theme}`]}>
      <div className={styles.actionHeader}>
        <span className={styles.header}>
          Cypress Action{' '}
          <span id={styles.componentName}>{statements.componentName}</span>
        </span>

        <AiOutlineClose
          id={styles.close}
          onClick={handleDeleteAction}
          aria-label="Delete entire action block"
        />
      </div>

      <div className={styles.commandChainWrapper}>
        {(statement.commandChain || []).map((step) => (
          <CommandStep
            key={step.id}
            step={step}
            onUpdateStep={(stepId, field, value) =>
              handleUpdateStep(stepId, field, value)
            }
            onDeleteStep={(stepId) => handleDeleteStep(stepId)}
            theme={theme}
          />
        ))}

        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleAddStep}
          className={styles.addStepButton}
        >
          + Add Command Step
        </Button>
      </div>
    </div>
  );
};

export default CypressAction;
