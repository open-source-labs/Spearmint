/**
 * functionlity to add and update assertions
 * same layout as action.jsx
 *  - but for only the last assertion card?
 */
// make dragable

import React, { useContext } from 'react';
import styles from './Assertion.module.scss';
import { deleteAssertion, updateAssertion } from '../../../context/actions/vueTestCaseActions';
import ToolTip from '../../ToolTip/ToolTip';
import ToolTipMatcher from '../../ToolTip/ToolTipMatcher';
import AutoComplete from '../../AutoComplete/AutoComplete';
import AutoCompleteMockData from '../../AutoComplete/AutoCompleteMockData';
import { VueTestCaseContext } from '../../../context/reducers/vueTestCaseReducer';

const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');

const Assertion = ({ statement, describeId, itId, statementId }) => {
  const [, dispatchToVueTestCase] = useContext(VueTestCaseContext);

  const handleChangeAssertionFields = (e, field) => {
    let updatedAssertion = { ...statement };
    field === 'isNot'
      ? (updatedAssertion[field] = !updatedAssertion.isNot)
      : (updatedAssertion[field] = e.target.value);
    dispatchToVueTestCase(updateAssertion(updatedAssertion));
  };

  const handleClickDelete = (e) => {
    dispatchToVueTestCase(deleteAssertion(statementId));
  };

  const needsMatcherValue = (matcherType) => {
    const matchersWithValues = [
      'toBe', //takes in a HTML element Ex: <span data-testid="descendant"></span>
      'toEqual', //takes in a string Ex: '<span data-testid="child"></span>'
      'not.toBe', //takes in a HTML element Ex: <span data-testid="descendant"></span>
      'not.toEqual', //takes in a string Ex: '<span data-testid="child"></span>'
    ];
    return matchersWithValues.includes(matcherType);
  };

  return (
    <section id={styles.assertion} data-testid='assertionCard'>
      <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDelete} />
      <div id={styles.assertionHeader}>
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
              value={statement.queryVariant}
              onChange={(e) => handleChangeAssertionFields(e, 'queryVariant')}
            >
              <option value='' />
              <option value='find'>find</option>
              <option value='findComponent'>findComponent</option>
              <option value='get'>get</option>
              <option value='getComponent'>getComponent</option>
              {/* <option value='findBy'>findBy</option>
              <option value='findAllBy'>findAllBy</option> */}
            </select>
            <div id={styles.query}>
              <label htmlFor='queryValue' className={styles.queryLabel}>
                Query
              </label>
              <input
                type='text'
                id='queryValue'
                value={statement.queryValue}
                onChange={(e) => handleChangeAssertionFields(e, 'queryValue')}
              />
            </div>
            <span id={styles.hastooltip} role='tooltip'>
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.queryVariant} />
              </span>
            </span>
            <select
              id='querySelector'
              value={statement.querySelector}
              onChange={(e) => handleChangeAssertionFields(e, 'querySelector')}
            >
              <option value='' />
              <option value='isVisibile'>isVisible</option>
              {/* <option value='findAll'>findAll</option> */}
              <option value='exists'>exists</option>
              <option value='html'>html</option>
              <option value='text'>text</option>
              {/* <option value='DisplayValue'>DisplayValue</option>
              <option value='Role'>Role</option>
              <option value='TestId'>TestId</option> */}
              {/* TextMatch Precision & Normalization will be added */}
            </select>
            <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.querySelector} />
              </span>
            </span>
          </div>
        </div>
        
      </div>
      <div>
        <div id={styles.matcherFlexBox}>
          <div id={styles.matcherLeft}>
            <div id={styles.matcherLabelFlexBox}>
              <div>
                <label htmlFor='matcher'>Matcher</label>
              </div>
              <div>
                Not?
                <input
                  type='checkbox'
                  checked={statement.isNot}
                  onChange={(e) => handleChangeAssertionFields(e, 'isNot')}
                />
              </div>
            </div>
            <div id={styles.autoTool}>
              <AutoComplete
                statement={statement}
                statementType='assertion'
                dispatchToTestCase={dispatchToVueTestCase}
                id={styles.matcherAuto}
                type='vue'
              />

              <span id={styles.hastooltip} role='tooltip'>
                <img src={questionIcon} alt='help' />
                <span id={styles.tooltip}>
                  <ToolTipMatcher toolTipType={statement.matcherType} />
                </span>
              </span>
            </div>
          </div>
          {needsMatcherValue(statement.matcherType) && (
            <div>
              <span id={styles.matcherVal}>
                <input
                  type='text'
                  id={styles.matcherInput}
                  onChange={(e) => handleChangeAssertionFields(e, 'matcherValue')}
                  placeholder='Value'
                />
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Assertion;
