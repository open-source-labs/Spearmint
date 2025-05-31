import React, { useContext } from 'react';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import { ReactTestComponentAssertion } from '../../../utils/reactTypes';
import { deleteAction, updateCypressAction } from '../../../context/actions/frontendFrameworkTestCaseActions';

import CommandStep from '../Action/commandStep';
import { AiOutlineClose } from 'react-icons/ai';

// import AutoComplete from '../../AutoComplete/AutoComplete';
import styles from '../Action/Action.module.scss';
import { GlobalContext } from '../../../context/reducers/globalReducer';

const CypressAction = ({ statement, statementId, describeId, itId }: ReactTestComponentAssertion ): JSX.Element => {
const [{ statements, }, dispatchToReactTestCase] = useContext(ReactTestCaseContext); // [describe, it, action ] blocks.. reactTestCaseReducer

  const [{theme}] = useContext(GlobalContext)

  // Update a field inside a command step (selectorType, selectorValue, actionType)

  const handleUpdateStep = (stepIndex: number, field: string, value: string) => {
    const updatedChain = [...(statement.commandChain || [])];
    updatedChain[stepIndex] = {
      ...updatedChain[stepIndex],
      [field]: value,
    };
    dispatchToReactTestCase(updateCypressAction(statementId, updatedChain));
  };

// delete a field inside a command step 
  const handleDeleteStep = (stepIndex: number) => {
    const updatedChain = [...(statement.commandChain || [])];
    updatedChain[stepIndex] = {
      ...updatedChain[stepIndex],
    };
 
  };
//   dispatchToReactTestCase(deleteCypressAction(statementId, updatedChain));


  
  // dispatchToReactTestCase(updateAction(updatedAction));
// dispatchToReactTestCase(updateCypressAction(updatedChain));
/**
 *     dispatchToReactTestCase({
      type: 'UPDATE_COMMAND_CHAIN',
      id: statement.id,
      commandChain: updatedChain,
    });
 * 
 */
  // Add a new step in the chain
  const handleAddStep = () => {
    const newStep = { selectorType: 'get', selectorValue: '', actionType: '' };
    const commandChain = [...(statement.commandChain || []), newStep]
    dispatchToReactTestCase(updateCypressAction(statementId, commandChain));
  };

    /**
   *  dispatchToReactTestCase(updateCypressAction(statementId, newStep));
   * 
 *   dispatchToReactTestCase({
      type: 'UPDATE_COMMAND_CHAIN',
      id: statement.id,
      commandChain: [...statement.commandChain, newStep],
    });
 * 
 */

  // Delete the entire action block
  const handleDeleteAction = () => {
    dispatchToReactTestCase(deleteAction(statement.id));
  };
    //   {/* Optional AutoComplete for global eventType (e.g. click, type) */}
    //   <div className={styles.eventTypeWrapper}>
    //     <label htmlFor="eventType">Global Event Type</label>
    //     <AutoComplete
    //       statement={statement}
    //       statementType="action"
    //       dispatchToTestCase={dispatchToReactTestCase}
    //       id={styles.matcherAuto}
    //       testFramework="cypress"
    //       fieldType="eventType"
    //     />
    //   </div>


  return (
    
    <div id={styles[`action${theme}`]}>
      <AiOutlineClose id={styles.close} onClick={handleDeleteAction} />



      <span className={styles.header}>
          Cypress Action <span id={styles.componentName}>{statements.componentName}</span>
        </span>



      {/* Main Command Chain */}
      <div className={styles.commandChainWrapper}>
        { statement.commandChain && // defensive null check
        statement.commandChain.map((step, index) => (
          <CommandStep
            key={`command-step-${index}`}
            stepIndex={index}
            step={step}
            // stepIndex: number, field: string, value: string
            onUpdateStep={handleUpdateStep}
            onDeleteStep={handleDeleteStep}
            theme={theme}
          />  
        ) )}

        <button className={styles.addStepButton} onClick={handleAddStep}>
          + Add Command Step
        </button>
      </div>


    </div>
  );
};

export default CypressAction;
