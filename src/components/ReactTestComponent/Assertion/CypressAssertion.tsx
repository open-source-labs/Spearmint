import React, { useContext, useEffect } from 'react';
// import styles from './CypressAssertion.module.scss';
import styles from './CypressAssertion.module.scss';
import {
  deleteAssertion,
  updateAssertion,
} from '../../../context/actions/frontendFrameworkTestCaseActions';

// import AutoComplete from '../../AutoComplete/AutoComplete';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';
import {
  ReactTestComponentAssertion,
  cypressMatchersWithValues,
  cypressMatchersWithoutValue,
  AnyMatcherType,
  CypressMatcherWVType,
  CypressMatcherWNVType,
} from '../../../utils/reactTestCase/index';

// selector methods we support
const selectorMethods = [
  'get',
  'contains',
  'find',
  'parent',
  'children',
  'url',
];

const CypressAssertion = ({
  statement,
  statementId,
}: ReactTestComponentAssertion): JSX.Element => {
  const [{ statements }, dispatchToReactTestCase] =
    useContext(ReactTestCaseContext);
  const [{ theme, testFramework }] = useContext(GlobalContext);

  console.log(
    'CypressAssertion, selectorMethod:',
    statement.selectorMethod,
    'selectorValue:',
    statement.selectorValue,
    'matcherType:',
    statement.matcherType
  );
  // Matchers that require an “expected value”
  // const cypressMatchersWithValues: CypressMatcherType[] = [
  //   'should.have.text',
  //   'should.have.value',
  //   'should.contain',
  //   'should.have.attr',
  //   'should.have.class',
  //   'should.have.css',
  //   'should.have.length',
  //   'should.include',
  //   'should.eq',
  //   'should.not.have.value',
  // ];

  // // Matchers that do NOT require an “expected value”
  // const cypressMatchersWithoutValue: CypressMatcherType[] = [
  //   'should.be.disabled',
  //   'should.be.visible',
  //   'should.not.be.visible',
  //   'should.not.exist',
  // ];

  // All possible matcher options (the union of both lists)
  const allMatchers: (CypressMatcherWVType | CypressMatcherWNVType)[] = [
    ...cypressMatchersWithValues,
    ...cypressMatchersWithoutValue,
  ];

  // Helper to know if the current matcher needs a value
  const needsMatcherValue = (matcherType: AnyMatcherType) =>
    cypressMatchersWithValues.includes(matcherType as CypressMatcherWVType);

  // Update the selectorMethod (e.g. 'get', 'contains', etc.)
  const handleSelectorMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newMethod = e.target.value;

    const updated = {
      ...statement,
      selectorMethod: newMethod,
      selectorValue: '', // clear previous value
    };

    dispatchToReactTestCase(updateAssertion(updated));
  };

  // Update the selectorValue (e.g. '#myBtn' or '/some regex/i' when method='contains')
  const handleSelectorValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updated = { ...statement, selectorValue: e.target.value };

    console.log(
      `[CypressAssertion] handleSelectorValueChange → selectorValue=`,
      e.target.value
    );
    dispatchToReactTestCase(updateAssertion(updated));
  };

  const handleMatcherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMatcher = e.target.value as CypressMatcherWVType | CypressMatcherWNVType;;
    console.log(
      `CypressAssertion, handleMatcherChange:  newMatcher=`,
      newMatcher
    );
    // Reset matcherValue if the new matcher does not expect a value,
    // or keep it if it does.
    const updated = {
      ...statement,
      matcherType: newMatcher,
      matcherValue: needsMatcherValue(newMatcher) ? statement.matcherValue : '',
    };
    dispatchToReactTestCase(updateAssertion(updated));
  };

  // Update “matcherValue” in state when the input changes
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      `CypressAssertion, handleValueChange:  matcherValue=`,
      e.target.value
    );
    const updated = { ...statement, matcherValue: e.target.value };
    dispatchToReactTestCase(updateAssertion(updated));
  };

  // Toggle “not?” flag
  const handleNotToggle = () => {
    const updated = { ...statement, isNot: !statement.isNot };
    console.log(`CypressAssertion handleNotToggle:  isNot=`, !statement.isNot);
    dispatchToReactTestCase(updateAssertion(updated));
  };

  // Delete this assertion block
  const handleDelete = () => {
    console.log(`CypressAssertion, handleDelete:  statementId=`, statementId);

    dispatchToReactTestCase(deleteAssertion(statementId));
  };

  // Determine a contextual placeholder based on matcherType
  const getPlaceholder = (matcherType: string): string => {
    switch (matcherType) {
      case 'should.have.text':
        return "e.g. 'Dashboard'";
      case 'should.have.value':
        return "e.g. 'hello@example.com'";
      case 'should.contain':
        return "e.g. 'Welcome'";
      case 'should.have.attr':
        return "e.g. 'href', '/home'";
      case 'should.have.class':
        return "e.g. 'active'";
      case 'should.have.css':
        return "e.g. 'display', 'block'";
      case 'should.have.length':
        return 'e.g. 3';
      case 'should.include':
        return "e.g. 'Hello'";
      case 'should.eq':
        return 'e.g. 42';
      case 'should.not.have.value':
        return "e.g. 'admin'";
      default:
        return ''; // for matchers that don’t need a value
    }
  };

  useEffect(() => {
    if (testFramework === 'cypress') {
    const CypressMT = statement.matcherType as CypressMatcherWVType | CypressMatcherWNVType;

    if (statement.selectorMethod && 
      !selectorMethods.includes(statement.selectorMethod)
    ) {
      console.warn(
        `CypressAssertion selectorMethod "${statement.selectorMethod}" = ""`
      );

      dispatchToReactTestCase(
        updateAssertion({ ...statement, selectorMethod: '', selectorValue: '' })
      );
    }
    // allMatchers only includes cypress matchers so to keep type defined strict, checking for testframework and statement.matcherType
    if (statement.matcherType && !allMatchers.includes(CypressMT)) {
      console.warn(
        `CypressAssertion, matcherType "${CypressMT}" = ""`
      );

      dispatchToReactTestCase(
        updateAssertion({ ...statement, matcherType: '' as any, matcherValue: '' })
      );
    }
  }
  }, [statement.selectorMethod, statement.matcherType]);

  return (
    <section id={styles[`assertion${theme}`]} data-testid="assertionCard">
      {/*Header: Title + Delete Button */}
      <div className={styles.header}>
        <span className={styles.headerText}>
          Cypress Assertion{' '}
          <span id={styles.componentName}>{statements.componentName}</span>
        </span>

        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          aria-label="Delete Assertion"
          title="Delete Assertion"
        >
          <AiOutlineClose />
        </button>
      </div>

      {/*      BELOW IS : selector, matcher,  Expected value, Not? (conditional)            */}
      <div className={styles.contentRow}>
        {/* Selector Block */}
        <div className={styles.selectorBlock}>
          <div className={styles.selectorTopRow}>
            <label
              htmlFor={`selectorBlock-${statementId}`}
              className={styles.selectorLabel}
            >
              Select By
            </label>

            {/*           Selector method for matcher                           */}
            <select
              id={`selectorMethod-${statementId}`}
              value={statement.selectorMethod || ''}
              onChange={handleSelectorMethodChange}
              className={styles.selectorSelect}
            >
              <option value="">(Choose Method)</option>
              {selectorMethods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            {statement.selectorMethod && (
              <input
                type="text"
                id={`selectorValue-${statementId}`}
                className={styles.selectorValueInput}
                placeholder={
                  statement.selectorMethod === 'contains'
                    ? 'e.g. /Your tests will exist in a describe block/i'
                    : "e.g. '#submitBtn' or '.my-class'"
                }
                value={statement.selectorValue}
                onChange={handleSelectorValueChange}
              />
            )}
          </div>
        </div>

        {/* Matcher Block */}
        <div className={styles.matcherBlock}>
          <div className={styles.matcherTopRow}>
            <label
              htmlFor={`matcherType-${statementId}`}
              className={styles.matcherLabel}
            >
              Matcher
            </label>

            {/*               “Not?” toggle switch              */}
            <label className={styles.switchLabel}>
              <input
                type="checkbox"
                checked={statement.isNot}
                onChange={handleNotToggle}
                className={styles.switchCheckbox}
              />
              <span className={styles.switchSlider} />
              <span className={styles.switchText}>Not?</span>
            </label>
          </div>

          {/*             Drop down for selecting matcherType                 */}
          <select
            id={`matcherType-${statementId}`}
            value={statement.matcherType || ''}
            onChange={handleMatcherChange}
            className={styles.matcherSelect}
            disabled={false}
          >
            <option value="">(Select Matcher)</option>
            {allMatchers.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Expected Value Field (renders only if matcher needs a value)*/}
        {needsMatcherValue(statement.matcherType) && (
          <div className={styles.valueBlock}>
            <label
              htmlFor={`matcherValue-${statementId}`}
              className={styles.valueLabel}
            >
              Expected Value
            </label>
            <input
              type="text"
              id={`matcherValue-${statementId}`}
              value={statement.matcherValue}
              onChange={handleValueChange}
              placeholder={getPlaceholder(statement.matcherType)}
              className={styles.valueInput}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CypressAssertion;
