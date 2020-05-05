/**
 * functionlity to add and update assertions
 * same layout as action.jsx 
 *  - but for only the last assertion card? 
 */

import React from 'react';
import styles from '../Assertion/Assertion.module.scss';
import { deleteAssertion, updateAssertion } from '../../../context/testCaseActions';
import ToolTip from '../ToolTip/ToolTip';
import ToolTipMatcher from '../ToolTip/ToolTipMatcher';
import AutoComplete from '../AutoComplete/AutoComplete';
import AutoCompleteMockData from '../AutoComplete/AutoCompleteMockData';

const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const LastAssertion = ({ assertion, dispatchToTestCase, isLast }) => {
  const handleChangeAssertionFields = (e, field) => {
    let updatedAssertion = { ...assertion };
    field === 'isNot'
      ? (updatedAssertion[field] = !updatedAssertion.isNot)
      : (updatedAssertion[field] = e.target.value);
    dispatchToTestCase(updateAssertion(updatedAssertion));
  };

  const handleClickDelete = e => {
    dispatchToTestCase(deleteAssertion(assertion.id));
  };

  const needsMatcherValue = matcherType => {
    const matchersWithValues = [
      'toContainElement', //takes in a HTML element Ex: <span data-testid="descendant"></span>
      'toContainHTML', //takes in a string Ex: '<span data-testid="child"></span>'
      'toHaveAttribute', //takes in a string Ex: 'type'
      'toHaveClass', //takes in a string Ex: 'btn-link'
      'toHaveFormValues', //takes in an object Ex: {username: 'jane.doe', rememberMe:}
      'toHaveStyle', //takes in a sting value Ex: 'display: none'
      'toHaveTextContent', //takes in a string value Ex: 'Content'
      'not.toContainElement', //takes in a HTML element Ex: <span data-testid="descendant"></span>
      'not.toContainHTML', //takes in a string Ex: '<span data-testid="child"></span>'
      'not.toHaveAttribute', //takes in a string Ex: 'type'
      'not.toHaveClass', //takes in a string Ex: 'btn-link'
      'not.toHaveFormValues', //takes in an object Ex: {username: 'jane.doe', rememberMe:}
      'not.toHaveStyle', //takes in a sting value Ex: 'display: none'
      'not.toHaveTextContent', //takes in a string value Ex: 'Content'
    ];
    return matchersWithValues.includes(matcherType);
  };

  return (
    <section id={styles.assertion} data-testid='assertionCard'>
      {!isLast && <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDelete} />}
      <div id={styles.assertionHeader}>
        {!isLast && <img src={dragIcon} alt='drag' />}
        <h3>Assertion</h3>
      </div>
      <div id={styles.queryFlexBox}>
        <div id={styles.querySelector}>
          <label htmlFor='queryVariant' className={styles.queryLabel}>
            Query Selector
          </label>
          <div id={styles.dropdownFlex}>
            <select
              id='queryVariant'
              value={assertion.queryVariant}
              onChange={e => handleChangeAssertionFields(e, 'queryVariant')}
            >
              <option value='' />
              <option value='getBy'>getBy</option>
              <option value='getAllBy'>getAllBy</option>
              <option value='queryBy'>queryBy</option>
              <option value='queryAllBy'>queryAllBy</option>
              <option value='findBy'>findBy</option>
              <option value='findAllBy'>findAllBy</option>
            </select>
            <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={assertion.queryVariant} />
              </span>
            </span>
            <select
              id='querySelector'
              value={assertion.querySelector}
              onChange={e => handleChangeAssertionFields(e, 'querySelector')}
            >
              <option value='' />
              <option value='LabelText'>LabelText</option>
              <option value='PlaceholderText'>PlaceholderText</option>
              <option value='Text'>Text</option>
              <option value='AltText'>AltText</option>
              <option value='Title'>Title</option>
              <option value='DisplayValue'>DisplayValue</option>
              <option value='Role'>Role</option>
              <option value='TestId'>TestId</option>
              {/* TextMatch Precision & Normalization will be added */}
            </select>
            <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={assertion.querySelector} />
              </span>
            </span>
          </div>
        </div>
        <div id={styles.query}>
          <label htmlFor='queryValue' className={styles.queryLabel}>
            Query
          </label>
          <AutoCompleteMockData
            statement={assertion}
            dispatchToTestCase={dispatchToTestCase}
            statementType='assertion'
            // id={styles2.autoCompleteMockData}
          />
        </div>
      </div>
      <div id={styles.matcherLabelFlexBox}>
        <div>
          <label htmlFor='matcher'>Matcher</label>
        </div>
        <div>
          Not?
          <input
            type='checkbox'
            checked={assertion.isNot}
            onChange={e => handleChangeAssertionFields(e, 'isNot')}
          />
        </div>
      </div>
      <div>
        <div id={styles.matcherFlexBox}>
          <div id={styles.matcherLeft}>
            <AutoComplete
              statement={assertion}
              statementType='assertion'
              dispatchToTestCase={dispatchToTestCase}
              id={styles.matcherAuto}
            />

            <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTipMatcher toolTipType={assertion.matcherType} />
              </span>
            </span>
          </div>
          {needsMatcherValue(assertion.matcherType) && (
            <span id={styles.matcherVal}>
              <label htmlFor='matcherValue'>Value</label>
              <input
                type='text'
                id={styles.matcherInput}
                onChange={e => handleChangeAssertionFields(e, 'matcherValue')}
              />
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default LastAssertion;
