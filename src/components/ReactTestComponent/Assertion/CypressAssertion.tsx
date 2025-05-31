import React, { useContext, useEffect } from 'react';
import styles from './CypressAssertion.module.scss';
import {
  deleteAssertion,
  updateAssertion,
} from '../../../context/actions/frontendFrameworkTestCaseActions';

import AutoComplete from '../../AutoComplete/AutoComplete';
import { ReactTestCaseContext } from '../../../context/reducers/reactTestCaseReducer';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';
import { ReactTestComponentAssertion } from '../../../utils/reactTypes';

const CypressAssertion = ({
  statement,
  statementId,
}: ReactTestComponentAssertion): JSX.Element => {
  const [{ statements }, dispatchToReactTestCase] = useContext(ReactTestCaseContext);
  const [{ theme }] = useContext(GlobalContext);

  // Matchers that require an “expected value”
  const matchersWithValue: string[] = [
    'should.have.text',
    'should.have.value',
    'should.contain',
    'should.have.attr',
    'should.have.class',
    'should.have.css',
    'should.have.length',
    'should.include',
    'should.eq',
    'should.not.have.value',
  ];

  // Matchers that do NOT require an “expected value”
  const matchersWithoutValue: string[] = [
    'should.be.disabled',
    'should.be.visible',
    'should.not.be.visible',
    'should.not.exist',
  ];

  // All possible matcher options (the union of both lists)
  const allMatchers: string[] = [
    ...matchersWithValue,
    ...matchersWithoutValue,
  ];


  // Helper to know if the current matcher needs a value
  const needsMatcherValue = (matcherType: string) =>
    matchersWithValue.includes(matcherType);


  const handleMatcherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMatcher = e.target.value;
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
    const updated = { ...statement, matcherValue: e.target.value };
    dispatchToReactTestCase(updateAssertion(updated));
  };


  // Toggle “not?” flag
  const handleNotToggle = () => {
    const updated = { ...statement, isNot: !statement.isNot };
    dispatchToReactTestCase(updateAssertion(updated));
  };


  // Delete this assertion block
  const handleDelete = () => {
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
        return "e.g. 42";
      case 'should.not.have.value':
        return "e.g. 'admin'";
      default:
        return ''; // for matchers that don’t need a value
    }
  };

//  If the stored matcherType was invalid (e.g. removed from list), reset ──
  useEffect(() => {
    if (
      statement.matcherType &&
      !allMatchers.includes(statement.matcherType)
    ) {
      // If somehow matcherType isn’t in our dropdown anymore, clear it.
      const fallback = { ...statement, matcherType: '', matcherValue: '' };
      dispatchToReactTestCase(updateAssertion(fallback));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMatchers.join(','), statement.matcherType]);


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

      {/*Content Row: Matcher/DashToggle + Expected Value (conditional)*/}
      <div className={styles.contentRow}>
        {/* Matcher Block */}
        <div className={styles.matcherBlock}>
          <div className={styles.matcherTopRow}>
            <label htmlFor={`matcherType-${statementId}`} className={styles.matcherLabel}>
              Matcher
            </label>

            {/* “Not?” toggle switch */}
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

          {/*Drop down for selecting matcherType*/}
          <select
            id={`matcherType-${statementId}`}
            value={statement.matcherType}
            onChange={handleMatcherChange}
            className={styles.matcherSelect}
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
