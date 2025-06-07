import React, { useContext, MouseEventHandler } from 'react';
import styles from '../Action/CypressAction.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import { ReactTestComponentAssertion } from '../../../utils/reactTestCase';
import { CypressCommandStep } from '../../../utils/reactTestCase';

interface CommandStepProps {
  step: CypressCommandStep;
  theme: any;
  onUpdateStep: (
    stepId: string,
    field: keyof CypressCommandStep,
    value: string
  ) => void;
  onDeleteStep: (stepId: string) => void;
}

const selectorMethods = [
  'get',
  'find',
  'contains',
  'within', // e.g. cy.get('form').within(() => …)
  'parent', // cy.get('.foo').parent()
  'children', // cy.get('.foo').children()
  'filter', // cy.get('.items').filter('.active')
  'eq', // cy.get('.items').eq(2)
  'getByTestId', // if you’ve added @testing-library/cypress
  'getByRole', // ditto, if you’re using Testing Library queries
];
const actionMethods = [
  'click',
  'dblclick',
  'rightclick',
  'type',
  'clear',
  'check', // for checkboxes / radio
  'uncheck', // for checkboxes
  'select', // for <select> dropdowns
  'scrollIntoView', // scroll that element into view
  'trigger', // e.g. trigger('mouseover')
  'focus',
  'blur',
  'invoke', // e.g. invoke('show') or invoke('text')
];

const CommandStep: React.FC<CommandStepProps> = ({
  step,
  onUpdateStep,
  onDeleteStep,
  theme,
}) => {
  const stepId = step.id!;

  // Does action requires an argument
  const needsArgument = () => {
    switch (step.actionType) {
      case 'type':
        return true; // text to type
      case 'select':
        return true; // dropdown value
      case 'trigger':
        return true; // event name, e.g. "mouseover"
      case 'invoke':
        return true; // method name or property, e.g. "text"
      default:
        return false; // click, clear, check, uncheck, scrollIntoView, focus, blur do not need extra arg
    }
  };

  // dynamic placeholder depending on action chosen
  const getArgumentPlaceholder = () => {
    switch (step.actionType) {
      case 'type':
        return 'e.g. Hello World';
      case 'select':
        return 'e.g. optionValue';
      case 'trigger':
        return 'e.g. mouseover, keydown';
      case 'invoke':
        return 'e.g. text, show, hide';
      default:
        return ''; // no placeholder needed when disabled
    }
  };

  // note: since step.id is added in the reducer and not actually passed I needed to please typescript by saying step.id will never be undefined.
  return (
    <div className={`${styles.commandCard} ${styles[`action${theme}`]}`}>
      <div className={styles.stepHeader}>
        <span className={styles.stepTitle}>Step</span>

        {/* Delete this step */}
        <button
          className={styles.stepDeleteButton}
          onClick={() => onDeleteStep(stepId)}
          aria-label="Delete this step"
        >
          <AiOutlineClose />
        </button>

        {step.selectorType && step.actionType && (
          <span className={styles.stepBadge}>
            {`${step.selectorType}.${step.actionType}()`}
          </span>
        )}
      </div>

      <div className={styles.inputsGrid}>
        {/*          Selector Method            */}
        <div className={styles.inputGroup}>
          <label htmlFor={`selectorType-${stepId}`}>Selector</label>
          <select
            id={`selectorType-${stepId}`}
            value={step.selectorType}
            onChange={(e) =>
              onUpdateStep(stepId, 'selectorType', e.target.value)
            }
          >
            <option value="">Select</option>
            {selectorMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        {/*            Selector Value                */}
        <div className={styles.inputGroup}>
          <label htmlFor={`selectorValue-${stepId}`}>Value</label>
          <input
            id={`selectorValue-${stepId}`}
            type="text"
            placeholder="e.g. .my-button or #username"
            value={step.selectorValue}
            onChange={(e) =>
              onUpdateStep(stepId, 'selectorValue', e.target.value)
            }
          />
        </div>

        {/*                 Action Type                          */}
        <div className={styles.inputGroup}>
          <label htmlFor={`actionType-${stepId}`}>Action</label>
          <select
            id={`actionType-${stepId}`}
            value={step.actionType || ''}
            onChange={(e) => onUpdateStep(stepId, 'actionType', e.target.value)}
          >
            <option value="">(optional)</option>
            {actionMethods.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>

        {/*          Action Argument (if needed)          */}
        <div className={styles.inputGroup}>
          <label htmlFor={`actionValue-${stepId}`}>Argument</label>
          <input
            id={`actionValue-${stepId}`}
            type="text"
            placeholder={getArgumentPlaceholder()}
            value={step.actionValue || ''}
            onChange={(e) =>
              onUpdateStep(stepId, 'actionValue', e.target.value)
            }
            disabled={!needsArgument()}
          />
        </div>
      </div>
    </div>
  );
};

export default CommandStep;
