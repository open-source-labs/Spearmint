import React, { useContext } from 'react';
import styles from '../Action/Action.module.scss';
import { deleteAction, updateAction } from '../../../context/actions/vueTestCaseActions';
import AutoComplete from '../../AutoComplete/AutoComplete';
import AutoCompleteMockData from '../../AutoComplete/AutoCompleteMockData';
import ToolTip from '../../ToolTip/ToolTip';
import { MockDataContext } from '../../../context/reducers/mockDataReducer';
import { VueTestCaseContext } from '../../../context/reducers/vueTestCaseReducer';

const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');

// Action box in middle panel (testCase.jsx)
const Action = ({ statement, statementId, describeId, itId }) => {
  const [{ mockData }] = useContext(MockDataContext);
  const [, dispatchToVueTestCase] = useContext(VueTestCaseContext);

  const handleChangeActionFields = (e, field) => {
    let updatedAction = { ...statement };
    updatedAction[field] = e.target.value;
    dispatchToVueTestCase(updateAction(updatedAction));
  };

  const handleClickDeleteAction = (e) => {
    dispatchToVueTestCase(deleteAction(statement.id));
  };
  //conditional rendering for events with values
  const needsEventValue = (eventType) => {
    const eventsWithValues = [
      'keyDown',
      'keyPress',
      'keyUp',
      'change',
      'input',
      'invalid',
      'submit',
    ];
    return eventsWithValues.includes(eventType);
  };

  return (
    <div id={styles.action}>
      <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDeleteAction} />
      <div id={styles.actionHeader}>
        <h3>Action</h3>
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
              onChange={(e) => handleChangeActionFields(e, 'queryVariant')}
            >
              <option value='' />
              <option value='find'>find</option>
              <option value='findComponent'>findComponent</option>
              <option value='findAll'>findAll</option>
              <option value='get'>get</option>
              <option value='getComponent'>getComponent</option>
            </select>
            <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.queryVariant} />
              </span>
            </span>
            <div id={styles.query}>
              <input
                type='text'
                id='queryValue'
                value={statement.queryValue}
                placeholder="eg: '[data-test='test-id']'"
                onChange={(e) => handleChangeActionFields(e, 'queryValue')}
              />
            </div>
          </div>
        </div>
      </div>
      <div id={styles.eventTypeFlexBox}>
        <div id={styles.eventType}>
          <label htmlFor='eventType'>Event Type</label>
          {/* <AutoComplete
            statement={statement}
            statementType='action'
            dispatchToTestCase={dispatchToReactTestCase}
            id={styles.autoComplete}
          /> */}
          <input
            type='text'
            id='eventType'
            value={statement.eventType}
            onChange={(e) => handleChangeActionFields(e, 'eventType')}
            placeholder='eg. click, change, keypress'
          />
        </div>
        <div id={styles.eventTypeVal}>
          {needsEventValue(statement.eventType) && mockData.length > 0 ? (
            <div className={styles.eventValueMock}>
              <label htmlFor='eventValue'> Value </label>
              <AutoCompleteMockData
                statement={statement}
                dispatchToTestCase={dispatchToVueTestCase}
                statementType='action'
                // id={styles2.autoCompleteMockData}
              />
            </div>
          ) : needsEventValue(statement.eventType) ? (
            <span className={styles.eventValue}>
              <label htmlFor='eventValue'> Value </label>
              <input
                type='text'
                id='eventValue'
                onChange={(e) => handleChangeActionFields(e, 'eventValue')}
              />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Action;
