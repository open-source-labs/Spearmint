/**
 * functionlity to add and update assertions
 * same layout as action.jsx
 *  - but for only the last assertion card?
 */
import React, { useContext } from 'react';
import styles from '../../ReactTestComponent/Assertion/Assertion.module.scss';
import { deleteAssertion, updateAssertion } from '../../../context/actions/vueTestCaseActions';
import ToolTip from '../../ToolTip/ToolTip';
import ToolTipMatcher from '../../ToolTip/ToolTipMatcher';
import AutoComplete from '../../AutoComplete/AutoComplete';
import AutoCompleteMockData from '../../AutoComplete/AutoCompleteMockData';
import { VueTestCaseContext } from '../../../context/reducers/vueTestCaseReducer';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';

const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');

const Assertion = ({ statement, describeId, itId, statementId }) => {
  const [, dispatchToVueTestCase] = useContext(VueTestCaseContext);
  const [{theme}] = useContext(GlobalContext)

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
      'toBe', 
      'toEqual',
      'toHaveLength',
      'toContain',
      'not.toBe', 
      'not.toEqual', 
      'not.toHaveLength',
      'not.toContain',
    ];
    return matchersWithValues.includes(matcherType);
  };

  return (
    <section id={styles[`assertion${theme}`]} data-testid='assertionCard'>
      <AiOutlineClose id={styles.close} alt='close' onClick={handleClickDelete} />
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
              <option value='findAll'>findAll</option>
              <option value='get'>get</option>
              <option value='getComponent'>getComponent</option>
            </select>
            <div id={styles.query}>
              <input
                type='text'
                id='queryValue'
                value={statement.queryValue}
                onChange={(e) => handleChangeAssertionFields(e, 'queryValue')}
                placeholder='Query'
              />
            </div>
            {/* <span id={styles.hastooltip} role='tooltip'>
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.queryVariant} />
              </span>
            </span> */}
            <select
              id='querySelector'
              value={statement.querySelector}
              onChange={(e) => handleChangeAssertionFields(e, 'querySelector')}
            >
              <option value='' />
              <option value='isVisibile'>isVisible</option>
              <option value='exists'>exists</option>
              <option value='html'>html</option>
              <option value='text'>text</option>
            </select>
            {/* <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.querySelector} />
              </span>
            </span> */}
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

              {/* <span id={styles.hastooltip} role='tooltip'>
                <img src={questionIcon} alt='help' />
                <span id={styles.tooltip}>
                  <ToolTipMatcher toolTipType={statement.matcherType} />
                </span>
              </span> */}
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
