import React, { useContext } from 'react';
import styles from '../../ReactTestComponent/Action/Action.module.scss';
import { deleteAction, updateAction } from '../../../context/actions/frontendFrameworkTestCaseActions';
import AutoCompleteMockData from '../../AutoComplete/AutoCompleteMockData';
import { MockDataContext } from '../../../context/reducers/mockDataReducer';
import { SolidTestCaseContext } from '../../../context/reducers/solidTestCaseReducer';
import { GlobalContext } from '../../../context/reducers/globalReducer';
import { AiOutlineClose } from 'react-icons/ai';


// Action box in middle panel (testCase.jsx)
const Action = ({ statement, statementId, describeId, itId }) => {
  const [{ mockData }] = useContext(MockDataContext);
  const [{ statements }, dispatchTosolidTestCase] = useContext(SolidTestCaseContext); 
  const [{theme}] = useContext(GlobalContext)

  const handleChangeActionFields = (e, field) => {
    let updatedAction = { ...statement };
    updatedAction[field] = e.target.value;
    dispatchTosolidTestCase(updateAction(updatedAction));
  };

  const handleClickDeleteAction = (e) => {
    dispatchTosolidTestCase(deleteAction(statement.id));
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
    <div id={styles[`action${theme}`]}>
      <AiOutlineClose id={styles.close} alt='close' onClick={handleClickDeleteAction} />
        <div className={styles.actionHeader}>
          <span className={styles.header}>
            Action <span id={styles.componentName}>{statements.componentName}</span>
          </span>
        </div>
      {/* event input in action component */}

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
                dispatchToTestCase={dispatchTosolidTestCase}
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
            <select
              id='queryVariant'
              value={statement.queryVariant}
              onChange={(e) => handleChangeActionFields(e, 'queryVariant')}
            >
              <option value='' />
              <option value='find'>find</option>
              <option value='findComponent'>findComponent</option>
              <option value='findAll'>findAll</option>
              <option value='findBy'>findBy</option>
              <option value='findAllBy'>findAllBy</option>
              <option value='get'>get</option>
              <option value='getBy'>getBy</option>
              <option value='getAllBy'>getAllBy</option>
              <option value='getComponent'>getComponent</option>
              <option value='queryBy'>queryBy</option>
              <option value='queryAllBy'>queryAllBy</option>
            </select>
            {/* <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={statement.queryVariant} />
              </span>
            </span> */}
            <select
              id='querySelector'
              value={statement.querySelector}
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
          </div>
        </div>
        <div id={styles.query}>
          <label htmlFor='queryValue' className={styles.queryLabel}>
                Query
          </label>
          <input
          type='text'
          id='queryValue'
          value={statement.queryValue}
          onChange={(e) => handleChangeActionFields(e, 'queryValue')}>
          </input>
        </div>


      </div>
      
    </div>
  );
};

export default Action;
