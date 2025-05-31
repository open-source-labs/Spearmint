import React, { useContext } from 'react';
import styles from './Assertion.module.scss';
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'selector' | 'matcherValue'
  ) => {
    const updated = { ...statement, [field]: e.target.value };
    dispatchToReactTestCase(updateAssertion(updated));
  };

  const handleCheckboxChange = () => {
    const updated = { ...statement, isNot: !statement.isNot };
    dispatchToReactTestCase(updateAssertion(updated));
  };

  const handleDelete = () => {
    dispatchToReactTestCase(deleteAssertion(statementId));
  };

  const cypressMatchersWithValues: string[] = [
    'should.have.text',
    'should.have.value',
    'should.contain',
    'should.have.attr',
    'should.have.class',
    'should.have.css',
    'should.have.length',
    'should.include',
    'should.eq',
    'should.be.disabled',
    'should.be.visible',
    'should.not.be.visible',
    'should.not.exist',
    'should.not.have.value',
  ];

  const needsMatcherValue = (matcherType: string) =>
    cypressMatchersWithValues.includes(matcherType);

  return (
    <section id={styles[`assertion${theme}`]} data-testid="assertionCard">
      <AiOutlineClose id={styles.close} onClick={handleDelete} />

      <span className={styles.header}>
          Cypress Assertion <span id={styles.componentName}>{statements.componentName}</span>
        </span>


      {/* Matcher + Value */}
      <div className={styles.matcherFlexBox}>
        <div className={styles.matcherLeft}>
          <div className={styles.matcherLabelFlexBox}>
            <label htmlFor="matcher">Matcher</label>
            <label>
              Not?
              <input
                type="checkbox"
                checked={statement.isNot}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>

          <div className={styles.autoTool}>
            <AutoComplete
              statement={statement}
              statementType="assertion"
              dispatchToTestCase={dispatchToReactTestCase}
              id={styles.matcherAuto}
              testFramework="cypress"
            />
          </div>
        </div>

        {needsMatcherValue(statement.matcherType) && (
          <div>
            <label htmlFor="matcherValue">Expected Value</label>
            <input
              type="text"
              id="matcherValue"
              value={statement.matcherValue}
              onChange={(e) => handleChange(e, 'matcherValue')}
              placeholder={`e.g., 'Dashboard'`}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CypressAssertion;
