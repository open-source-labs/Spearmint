import React, { useContext, MouseEventHandler  } from 'react';
import styles from '../Action/Action.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import { ReactTestComponentAssertion } from '../../../utils/reactTypes';

interface CommandStepProps {
  stepIndex: number;
  theme: any
  step: {
    selectorType?: string;
    selectorValue?: string;
    actionType?: string;
      actionValue?: string;
  };
  onUpdateStep: (stepIndex: number, field: string, value: string) => void;
  onDeleteStep: (stepIndex: number) => void;
}

const selectorMethods = ['get', 'find', 'contains'];
const actionMethods = ['click', 'type', 'dblclick', 'clear'];

//   
  // eventValue?: string;
  // queryVariant?: string;
  // querySelector?: string;
  // queryValue?: string;


const CommandStep = ({
  stepIndex,
  step,
  theme,
  onUpdateStep,
  onDeleteStep,
}: CommandStepProps ): JSX.Element => {
    const [{ statements, }, dispatchToReactTestCase] = useContext(ReactTestCaseContext);


      // Define a wrapper function for the onClick event
  const handleDeleteStep = (stepIndex: number) =>  {
    onDeleteStep(stepIndex); // Call onDeleteStep with the stepIndex directly
  };


  return (
     <div id={styles[`action${theme}`]}>
             {/* Remove step */}
      <AiOutlineClose id={styles.close} onClick={() => onDeleteStep(stepIndex)} />


      <span className={styles.header}>
      <span id={styles.componentName}>{statements.componentName}</span>
      </span>


      {/* Selector method dropdown / 'queryVariant' */}
      <select
        value={step.selectorType || ''} // stepIndex: number, field: string, value: string
        onChange={(e) => onUpdateStep(stepIndex, 'selectorType', e.target.value)}
      >
        <option value="">Select</option>
        {selectorMethods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>

      {/* Selector value input / querySelector */}
      <input
        type="text"
        placeholder="e.g. #myDiv or input"
        value={step.selectorValue || ''}
        onChange={(e) => onUpdateStep(stepIndex, 'selectorValue', e.target.value)}
      />

      {/* Optional action dropdown / 'eventValue' */}
      <select
        value={step.actionType || ''}
        onChange={(e) => onUpdateStep(stepIndex, 'actionType', e.target.value)}
      >
        <option value="">(optional) Action</option>
        {actionMethods.map((action) => (
          <option key={action} value={action}>
            {action}
          </option>
        ))}
      </select>

      {/* Optional value for action / 'queryValue' */}
      <input
        type="text"
        placeholder="e.g. /Welcome/i, example@.gmail.com"
        value={step.actionValue || ''}
        onChange={(e) => onUpdateStep(stepIndex, 'actionValue', e.target.value)}
      />
    </div>
  );
};

export default CommandStep;
