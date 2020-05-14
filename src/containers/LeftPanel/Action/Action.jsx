import React, { useContext } from 'react';
import styles from '../Action/Action.module.scss';
import styles2 from '../AutoComplete/AutoCompleteMockData.module.scss';
import { deleteAction, updateAction } from '../../../context/reactTestCaseActions';
import AutoComplete from '../AutoComplete/AutoComplete';
import AutoCompleteMockData from '../AutoComplete/AutoCompleteMockData';
import ToolTip from '../ToolTip/ToolTip';
import { MockDataContext } from '../../../context/mockDataReducer';
import { ReactTestCaseContext } from '../../../context/reactTestCaseReducer';
const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');

// Action box in middle panel (testCase.jsx)
const Action = ({ statement, statementId, describeId, itId }) => {
  const [{ mockData }] = useContext(MockDataContext);
  const [{}, dispatchToReactTestCase] = useContext(ReactTestCaseContext);

  const handleChangeActionFields = (e, field) => {
    let updatedAction = { ...statement };
    updatedAction[field] = e.target.value;
    dispatchToReactTestCase(updateAction(updatedAction));
  };

  const handleClickDeleteAction = (e) => {
    dispatchToReactTestCase(deleteAction(statement.id));
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
      <div id={styles.eventTypeFlexBox}>
        <div id={styles.eventType}>
          <label htmlFor='eventType'>Event Type</label>

          <AutoComplete
            statement={statement}
            statementType='action'
            dispatchToTestCase={dispatchToReactTestCase}
            id={styles.autoComplete}
          />
        </div>
        <div id={styles.eventTypeVal}>
          {needsEventValue(statement.eventType) && mockData.length > 0 ? (
            <div className={styles.eventValueMock}>
              <label htmlFor='eventValue'> Value </label>
              <AutoCompleteMockData
                statement={statement}
                dispatchToTestCase={dispatchToReactTestCase}
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
      <div id={styles.queryFlexBox}>
        <div id={styles.querySelector}>
          <label htmlFor='queryVariant' className={styles.queryLabel}>
            Query Selector
          </label>
          <div id={styles.dropdownFlex}>
            <select id='queryVariant' onChange={(e) => handleChangeActionFields(e, 'queryVariant')}>
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
                <ToolTip toolTipType={statement.queryVariant} />
              </span>
            </span>

            <select
              id='querySelector'
              onChange={(e) => handleChangeActionFields(e, 'querySelector')}
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
                <ToolTip toolTipType={statement.querySelector} />
              </span>
            </span>
          </div>
        </div>
        <div id={styles.query}>
          <label htmlFor='queryValue' className={styles.queryLabel}>
            Query
          </label>

          <input
            type='text'
            id='queryValue'
            onChange={(e) => handleChangeActionFields(e, 'queryValue')}
          />
        </div>
      </div>
    </div>
  );
};

export default Action;
