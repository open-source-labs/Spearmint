import React, { useContext } from 'react';
import styles from '../EndpointTestComponent/Endpoint.module.scss';
import stylez from '../ReactTestComponent/Assertion/Assertion.module.scss';
import { HooksTestCaseContext } from '../../context/reducers/hooksTestCaseReducer';
import { deleteAssertion, updateAssertion } from '../../context/actions/hooksTestCaseActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { openBrowserDocs } from '../../context/actions/globalActions';
import { HooksAssertionProps } from '../../utils/hooksTypes';

type EventTypes = (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>);
type FieldTypes = ('expectedState' | 'expectedValue' | 'not' | 'matcher');

const HooksAssertion = ({ assertion, index, id }: HooksAssertionProps): JSX.Element => {
  const [, dispatchToHooksTestCase] = useContext(HooksTestCaseContext);
  const [, dispatchToGlobal] = useContext(GlobalContext);
  const jestDOMMatcher = [
    '',
    'toBe',
    'toBeDisabled',
    'toBeEnabled',
    'toBeEmpty',
    'toBeEmptyDOMElement',
    'toBeInTheDocument',
    'toBeInvalid',
    'toBeRequired',
    'toBeValid',
    'toBeVisible',
    'toContainElement',
    'toContainHTML',
    'toHaveAttribute',
    'toHaveClass',
    'toHaveFocus',
    'toHaveFormValues',
    'toHaveStyle',
    'toHaveTextContent',
    'toHaveValue',
    'toHaveDisplayValue',
    'toBeChecked',
    'toBePartiallyChecked',
    'toHaveDescription',
  ];

  const questionIcon = require('../../assets/images/help-circle.png');
  const closeIcon = require('../../assets/images/close.png');
  const jestDOMURL = 'https://github.com/testing-library/jest-dom';

  const handleClickDeleteAssertion = (): void => {
    dispatchToHooksTestCase(deleteAssertion(index, id));
  };

  const handleChangeUpdateAssertion = (e: EventTypes, field: FieldTypes): void => {
    const updatedAssertion =
      field === 'not'
        ? { ...assertion, [field]: !assertion[field] }
        : { ...assertion, [field]: e.target.value };
    dispatchToHooksTestCase(updateAssertion(index, id, updatedAssertion));
  };

  const handleClickTooltip = () => {
    dispatchToGlobal(openBrowserDocs(jestDOMURL));
  };

  return (
    <div id={styles.groupFlexboxAssertion}>
      <div id={styles.labelInput}>
        <label htmlFor='expectedState'>Expected State</label>
        <div id={styles.inputFlexBox}>
          <input
            type='text'
            list='responseProperties'
            value={assertion.expectedState}
            onChange={(e) => handleChangeUpdateAssertion(e, 'expectedState')}
          />
        </div>
      </div>
      <div id={styles.dropdownWrapper}>
        <div id={styles.endMatcherLabel}>
          <div>
            <label htmlFor='matcher'>Matcher</label>
          </div>
          <div id={styles.notDiv}>
            Not?
            <input type='checkbox' onChange={(e) => handleChangeUpdateAssertion(e, 'not')} />
          </div>
        </div>
        <div id={styles.dropdownFlex}>
          <select
            id='method'
            value={assertion.matcher}
            onChange={(e) => handleChangeUpdateAssertion(e, 'matcher')}
          >
            {jestDOMMatcher.map((matcher) => (
              <option value={matcher}>{matcher}</option>
            ))}
          </select>{' '}
          <span id={stylez.hastooltip} role='tooltip'>
            <img src={questionIcon} alt='help' onClick={handleClickTooltip} />
            <span id={stylez.tooltip}>
              {/* <ToolTipMatcher toolTipType={statement.matcherType} /> */}
              Click me to find out more about Jest DOM matchers
            </span>
          </span>
        </div>
      </div>
      <div id={styles.labelInput}>
        <label htmlFor='expectedValue'>Expected Value</label>
        <div id={styles.inputFlexBox}>
          <input
            type='text'
            name='expectedValue'
            value={assertion.expectedValue}
            onChange={(e) => handleChangeUpdateAssertion(e, 'expectedValue')}
          />
        </div>
      </div>
      <img
        src={closeIcon}
        style={{ position: 'relative', top: '-15px' }}
        alt='close'
        onClick={handleClickDeleteAssertion}
      />
    </div>
  );
};

export default HooksAssertion;
